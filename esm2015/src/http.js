/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const xhr2 = require('xhr2');
import { Injectable, Injector } from '@angular/core';
import { HttpHandler, HttpBackend, XhrFactory, ɵHttpInterceptingHandler as HttpInterceptingHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
export class ServerXhr {
    build() {
        return new xhr2.XMLHttpRequest();
    }
}
ServerXhr.decorators = [
    { type: Injectable }
];
export class ZoneMacroTaskWrapper {
    wrap(request) {
        return new Observable((observer) => {
            let task = null;
            let scheduled = false;
            let sub = null;
            let savedResult = null;
            let savedError = null;
            const scheduleTask = (_task) => {
                task = _task;
                scheduled = true;
                const delegate = this.delegate(request);
                sub = delegate.subscribe(res => savedResult = res, err => {
                    if (!scheduled) {
                        throw new Error('An http observable was completed twice. This shouldn\'t happen, please file a bug.');
                    }
                    savedError = err;
                    scheduled = false;
                    task.invoke();
                }, () => {
                    if (!scheduled) {
                        throw new Error('An http observable was completed twice. This shouldn\'t happen, please file a bug.');
                    }
                    scheduled = false;
                    task.invoke();
                });
            };
            const cancelTask = (_task) => {
                if (!scheduled) {
                    return;
                }
                scheduled = false;
                if (sub) {
                    sub.unsubscribe();
                    sub = null;
                }
            };
            const onComplete = () => {
                if (savedError !== null) {
                    observer.error(savedError);
                }
                else {
                    observer.next(savedResult);
                    observer.complete();
                }
            };
            // MockBackend for Http is synchronous, which means that if scheduleTask is by
            // scheduleMacroTask, the request will hit MockBackend and the response will be
            // sent, causing task.invoke() to be called.
            const _task = Zone.current.scheduleMacroTask('ZoneMacroTaskWrapper.subscribe', onComplete, {}, () => null, cancelTask);
            scheduleTask(_task);
            return () => {
                if (scheduled && task) {
                    task.zone.cancelTask(task);
                    scheduled = false;
                }
                if (sub) {
                    sub.unsubscribe();
                    sub = null;
                }
            };
        });
    }
}
export class ZoneClientBackend extends ZoneMacroTaskWrapper {
    constructor(backend) {
        super();
        this.backend = backend;
    }
    handle(request) {
        return this.wrap(request);
    }
    delegate(request) {
        return this.backend.handle(request);
    }
}
export function zoneWrappedInterceptingHandler(backend, injector) {
    const realBackend = new HttpInterceptingHandler(backend, injector);
    return new ZoneClientBackend(realBackend);
}
export const SERVER_HTTP_PROVIDERS = [
    { provide: XhrFactory, useClass: ServerXhr },
    { provide: HttpHandler, useFactory: zoneWrappedInterceptingHandler, deps: [HttpBackend, Injector] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXNlcnZlci9zcmMvaHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFHSCxNQUFNLElBQUksR0FBUSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFbEMsT0FBTyxFQUFDLFVBQVUsRUFBRSxRQUFRLEVBQVcsTUFBTSxlQUFlLENBQUM7QUFFN0QsT0FBTyxFQUF5QixXQUFXLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSx3QkFBd0IsSUFBSSx1QkFBdUIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRXZKLE9BQU8sRUFBQyxVQUFVLEVBQXlCLE1BQU0sTUFBTSxDQUFDO0FBR3hELE1BQU0sT0FBTyxTQUFTO0lBQ3BCLEtBQUs7UUFDSCxPQUFPLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ25DLENBQUM7OztZQUpGLFVBQVU7O0FBT1gsTUFBTSxPQUFnQixvQkFBb0I7SUFDeEMsSUFBSSxDQUFDLE9BQVU7UUFDYixPQUFPLElBQUksVUFBVSxDQUFDLENBQUMsUUFBcUIsRUFBRSxFQUFFO1lBQzlDLElBQUksSUFBSSxHQUFTLElBQUssQ0FBQztZQUN2QixJQUFJLFNBQVMsR0FBWSxLQUFLLENBQUM7WUFDL0IsSUFBSSxHQUFHLEdBQXNCLElBQUksQ0FBQztZQUNsQyxJQUFJLFdBQVcsR0FBUSxJQUFJLENBQUM7WUFDNUIsSUFBSSxVQUFVLEdBQVEsSUFBSSxDQUFDO1lBRTNCLE1BQU0sWUFBWSxHQUFHLENBQUMsS0FBVyxFQUFFLEVBQUU7Z0JBQ25DLElBQUksR0FBRyxLQUFLLENBQUM7Z0JBQ2IsU0FBUyxHQUFHLElBQUksQ0FBQztnQkFFakIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDeEMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxT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QyxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUM7SUFDMUMsRUFBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSw4QkFBOEIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLEVBQUM7Q0FDbEcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5cbmNvbnN0IHhocjI6IGFueSA9IHJlcXVpcmUoJ3hocjInKTtcblxuaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3RvciwgUHJvdmlkZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0h0dHBFdmVudCwgSHR0cFJlcXVlc3QsIEh0dHBIYW5kbGVyLCBIdHRwQmFja2VuZCwgWGhyRmFjdG9yeSwgybVIdHRwSW50ZXJjZXB0aW5nSGFuZGxlciBhcyBIdHRwSW50ZXJjZXB0aW5nSGFuZGxlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQge09ic2VydmFibGUsIE9ic2VydmVyLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VydmVyWGhyIGltcGxlbWVudHMgWGhyRmFjdG9yeSB7XG4gIGJ1aWxkKCk6IFhNTEh0dHBSZXF1ZXN0IHtcbiAgICByZXR1cm4gbmV3IHhocjIuWE1MSHR0cFJlcXVlc3QoKTtcbiAgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgWm9uZU1hY3JvVGFza1dyYXBwZXI8UywgUj4ge1xuICB3cmFwKHJlcXVlc3Q6IFMpOiBPYnNlcnZhYmxlPFI+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxSPikgPT4ge1xuICAgICAgbGV0IHRhc2s6IFRhc2sgPSBudWxsITtcbiAgICAgIGxldCBzY2hlZHVsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgIGxldCBzdWI6IFN1YnNjcmlwdGlvbnxudWxsID0gbnVsbDtcbiAgICAgIGxldCBzYXZlZFJlc3VsdDogYW55ID0gbnVsbDtcbiAgICAgIGxldCBzYXZlZEVycm9yOiBhbnkgPSBudWxsO1xuXG4gICAgICBjb25zdCBzY2hlZHVsZVRhc2sgPSAoX3Rhc2s6IFRhc2spID0+IHtcbiAgICAgICAgdGFzayA9IF90YXNrO1xuICAgICAgICBzY2hlZHVsZWQgPSB0cnVlO1xuXG4gICAgICAgIGNvbnN0IGRlbGVnYXRlID0gdGhpcy5kZWxlZ2F0ZShyZXF1ZXN0KTtcbiAgICAgICAgc3ViID0gZGVsZWdhdGUuc3Vic2NyaWJlKFxuICAgICAgICAgICAgcmVzID0+IHNhdmVkUmVzdWx0ID0gcmVzLFxuICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFzY2hlZHVsZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICdBbiBodHRwIG9ic2VydmFibGUgd2FzIGNvbXBsZXRlZCB0d2ljZS4gVGhpcyBzaG91bGRuXFwndCBoYXBwZW4sIHBsZWFzZSBmaWxlIGEgYnVnLicpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNhdmVkRXJyb3IgPSBlcnI7XG4gICAgICAgICAgICAgIHNjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICB0YXNrLmludm9rZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFzY2hlZHVsZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICdBbiBodHRwIG9ic2VydmFibGUgd2FzIGNvbXBsZXRlZCB0d2ljZS4gVGhpcyBzaG91bGRuXFwndCBoYXBwZW4sIHBsZWFzZSBmaWxlIGEgYnVnLicpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICB0YXNrLmludm9rZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBjYW5jZWxUYXNrID0gKF90YXNrOiBUYXNrKSA9PiB7XG4gICAgICAgIGlmICghc2NoZWR1bGVkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICBpZiAoc3ViKSB7XG4gICAgICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgc3ViID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgY29uc3Qgb25Db21wbGV0ZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKHNhdmVkRXJyb3IgIT09IG51bGwpIHtcbiAgICAgICAgICBvYnNlcnZlci5lcnJvcihzYXZlZEVycm9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvYnNlcnZlci5uZXh0KHNhdmVkUmVzdWx0KTtcbiAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyBNb2NrQmFja2VuZCBmb3IgSHR0cCBpcyBzeW5jaHJvbm91cywgd2hpY2ggbWVhbnMgdGhhdCBpZiBzY2hlZHVsZVRhc2sgaXMgYnlcbiAgICAgIC8vIHNjaGVkdWxlTWFjcm9UYXNrLCB0aGUgcmVxdWVzdCB3aWxsIGhpdCBNb2NrQmFja2VuZCBhbmQgdGhlIHJlc3BvbnNlIHdpbGwgYmVcbiAgICAgIC8vIHNlbnQsIGNhdXNpbmcgdGFzay5pbnZva2UoKSB0byBiZSBjYWxsZWQuXG4gICAgICBjb25zdCBfdGFzayA9IFpvbmUuY3VycmVudC5zY2hlZHVsZU1hY3JvVGFzayhcbiAgICAgICAgICAnWm9uZU1hY3JvVGFza1dyYXBwZXIuc3Vic2NyaWJlJywgb25Db21wbGV0ZSwge30sICgpID0+IG51bGwsIGNhbmNlbFRhc2spO1xuICAgICAgc2NoZWR1bGVUYXNrKF90YXNrKTtcblxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKHNjaGVkdWxlZCAmJiB0YXNrKSB7XG4gICAgICAgICAgdGFzay56b25lLmNhbmNlbFRhc2sodGFzayk7XG4gICAgICAgICAgc2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN1Yikge1xuICAgICAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIHN1YiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgZGVsZWdhdGUocmVxdWVzdDogUyk6IE9ic2VydmFibGU8Uj47XG59XG5cbmV4cG9ydCBjbGFzcyBab25lQ2xpZW50QmFja2VuZCBleHRlbmRzXG4gICAgWm9uZU1hY3JvVGFza1dyYXBwZXI8SHR0cFJlcXVlc3Q8YW55PiwgSHR0cEV2ZW50PGFueT4+IGltcGxlbWVudHMgSHR0cEJhY2tlbmQge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJhY2tlbmQ6IEh0dHBCYWNrZW5kKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGhhbmRsZShyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+KTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIHJldHVybiB0aGlzLndyYXAocmVxdWVzdCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZGVsZWdhdGUocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55Pik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICByZXR1cm4gdGhpcy5iYWNrZW5kLmhhbmRsZShyZXF1ZXN0KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gem9uZVdyYXBwZWRJbnRlcmNlcHRpbmdIYW5kbGVyKGJhY2tlbmQ6IEh0dHBCYWNrZW5kLCBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgY29uc3QgcmVhbEJhY2tlbmQ6IEh0dHBCYWNrZW5kID0gbmV3IEh0dHBJbnRlcmNlcHRpbmdIYW5kbGVyKGJhY2tlbmQsIGluamVjdG9yKTtcbiAgcmV0dXJuIG5ldyBab25lQ2xpZW50QmFja2VuZChyZWFsQmFja2VuZCk7XG59XG5cbmV4cG9ydCBjb25zdCBTRVJWRVJfSFRUUF9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbXG4gIHtwcm92aWRlOiBYaHJGYWN0b3J5LCB1c2VDbGFzczogU2VydmVyWGhyfSxcbiAge3Byb3ZpZGU6IEh0dHBIYW5kbGVyLCB1c2VGYWN0b3J5OiB6b25lV3JhcHBlZEludGVyY2VwdGluZ0hhbmRsZXIsIGRlcHM6IFtIdHRwQmFja2VuZCwgSW5qZWN0b3JdfVxuXTtcbiJdfQ==