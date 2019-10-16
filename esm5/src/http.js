import * as tslib_1 from "tslib";
import { Injectable, Injector } from '@angular/core';
import { HttpHandler, HttpBackend, XhrFactory, ɵHttpInterceptingHandler as HttpInterceptingHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var xhr2 = require('xhr2');
var ServerXhr = /** @class */ (function () {
    function ServerXhr() {
    }
    ServerXhr.prototype.build = function () { return new xhr2.XMLHttpRequest(); };
    ServerXhr.ɵfac = function ServerXhr_Factory(t) { return new (t || ServerXhr)(); };
    ServerXhr.ɵprov = i0.ɵɵdefineInjectable({ token: ServerXhr, factory: function (t) { return ServerXhr.ɵfac(t); }, providedIn: null });
    return ServerXhr;
}());
export { ServerXhr };
/*@__PURE__*/ i0.ɵsetClassMetadata(ServerXhr, [{
        type: Injectable
    }], null, null);
var ZoneMacroTaskWrapper = /** @class */ (function () {
    function ZoneMacroTaskWrapper() {
    }
    ZoneMacroTaskWrapper.prototype.wrap = function (request) {
        var _this = this;
        return new Observable(function (observer) {
            var task = null;
            var scheduled = false;
            var sub = null;
            var savedResult = null;
            var savedError = null;
            var scheduleTask = function (_task) {
                task = _task;
                scheduled = true;
                var delegate = _this.delegate(request);
                sub = delegate.subscribe(function (res) { return savedResult = res; }, function (err) {
                    if (!scheduled) {
                        throw new Error('An http observable was completed twice. This shouldn\'t happen, please file a bug.');
                    }
                    savedError = err;
                    scheduled = false;
                    task.invoke();
                }, function () {
                    if (!scheduled) {
                        throw new Error('An http observable was completed twice. This shouldn\'t happen, please file a bug.');
                    }
                    scheduled = false;
                    task.invoke();
                });
            };
            var cancelTask = function (_task) {
                if (!scheduled) {
                    return;
                }
                scheduled = false;
                if (sub) {
                    sub.unsubscribe();
                    sub = null;
                }
            };
            var onComplete = function () {
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
            var _task = Zone.current.scheduleMacroTask('ZoneMacroTaskWrapper.subscribe', onComplete, {}, function () { return null; }, cancelTask);
            scheduleTask(_task);
            return function () {
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
    };
    return ZoneMacroTaskWrapper;
}());
export { ZoneMacroTaskWrapper };
var ZoneClientBackend = /** @class */ (function (_super) {
    tslib_1.__extends(ZoneClientBackend, _super);
    function ZoneClientBackend(backend) {
        var _this = _super.call(this) || this;
        _this.backend = backend;
        return _this;
    }
    ZoneClientBackend.prototype.handle = function (request) { return this.wrap(request); };
    ZoneClientBackend.prototype.delegate = function (request) {
        return this.backend.handle(request);
    };
    return ZoneClientBackend;
}(ZoneMacroTaskWrapper));
export { ZoneClientBackend };
export function zoneWrappedInterceptingHandler(backend, injector) {
    var realBackend = new HttpInterceptingHandler(backend, injector);
    return new ZoneClientBackend(realBackend);
}
export var SERVER_HTTP_PROVIDERS = [
    { provide: XhrFactory, useClass: ServerXhr }, {
        provide: HttpHandler,
        useFactory: zoneWrappedInterceptingHandler,
        deps: [HttpBackend, Injector]
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXNlcnZlci9zcmMvaHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBV0EsT0FBTyxFQUFDLFVBQVUsRUFBRSxRQUFRLEVBQVcsTUFBTSxlQUFlLENBQUM7QUFFN0QsT0FBTyxFQUF5QixXQUFXLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSx3QkFBd0IsSUFBSSx1QkFBdUIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRXZKLE9BQU8sRUFBQyxVQUFVLEVBQXlCLE1BQU0sTUFBTSxDQUFDOztBQWZ4RDs7Ozs7O0dBTUc7QUFHSCxJQUFNLElBQUksR0FBUSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFRbEM7SUFBQTtLQUdDO0lBREMseUJBQUssR0FBTCxjQUEwQixPQUFPLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztzRUFEbEQsU0FBUztxREFBVCxTQUFTLGlDQUFULFNBQVM7b0JBbEJ0QjtDQW9CQyxBQUhELElBR0M7U0FGWSxTQUFTO21DQUFULFNBQVM7Y0FEckIsVUFBVTs7QUFLWDtJQUFBO0lBNEVBLENBQUM7SUEzRUMsbUNBQUksR0FBSixVQUFLLE9BQVU7UUFBZixpQkF3RUM7UUF2RUMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxVQUFDLFFBQXFCO1lBQzFDLElBQUksSUFBSSxHQUFTLElBQU0sQ0FBQztZQUN4QixJQUFJLFNBQVMsR0FBWSxLQUFLLENBQUM7WUFDL0IsSUFBSSxHQUFHLEdBQXNCLElBQUksQ0FBQztZQUNsQyxJQUFJLFdBQVcsR0FBUSxJQUFJLENBQUM7WUFDNUIsSUFBSSxVQUFVLEdBQVEsSUFBSSxDQUFDO1lBRTNCLElBQU0sWUFBWSxHQUFHLFVBQUMsS0FBVztnQkFDL0IsSUFBSSxHQUFHLEtBQUssQ0FBQztnQkFDYixTQUFTLEdBQUcsSUFBSSxDQUFD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dUIsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEYsT0FBTyxJQUFJLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFFRCxNQUFNLENBQUMsSUFBTSxxQkFBcUIsR0FBZTtJQUMvQyxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQyxFQUFFO1FBQzFDLE9BQU8sRUFBRSxXQUFXO1FBQ3BCLFVBQVUsRUFBRSw4QkFBOEI7UUFDMUMsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQztLQUM5QjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cblxuY29uc3QgeGhyMjogYW55ID0gcmVxdWlyZSgneGhyMicpO1xuXG5pbXBvcnQge0luamVjdGFibGUsIEluamVjdG9yLCBQcm92aWRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7SHR0cEV2ZW50LCBIdHRwUmVxdWVzdCwgSHR0cEhhbmRsZXIsIEh0dHBCYWNrZW5kLCBYaHJGYWN0b3J5LCDJtUh0dHBJbnRlcmNlcHRpbmdIYW5kbGVyIGFzIEh0dHBJbnRlcmNlcHRpbmdIYW5kbGVyfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7T2JzZXJ2YWJsZSwgT2JzZXJ2ZXIsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJYaHIgaW1wbGVtZW50cyBYaHJGYWN0b3J5IHtcbiAgYnVpbGQoKTogWE1MSHR0cFJlcXVlc3QgeyByZXR1cm4gbmV3IHhocjIuWE1MSHR0cFJlcXVlc3QoKTsgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgWm9uZU1hY3JvVGFza1dyYXBwZXI8UywgUj4ge1xuICB3cmFwKHJlcXVlc3Q6IFMpOiBPYnNlcnZhYmxlPFI+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxSPikgPT4ge1xuICAgICAgbGV0IHRhc2s6IFRhc2sgPSBudWxsICE7XG4gICAgICBsZXQgc2NoZWR1bGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgICBsZXQgc3ViOiBTdWJzY3JpcHRpb258bnVsbCA9IG51bGw7XG4gICAgICBsZXQgc2F2ZWRSZXN1bHQ6IGFueSA9IG51bGw7XG4gICAgICBsZXQgc2F2ZWRFcnJvcjogYW55ID0gbnVsbDtcblxuICAgICAgY29uc3Qgc2NoZWR1bGVUYXNrID0gKF90YXNrOiBUYXNrKSA9PiB7XG4gICAgICAgIHRhc2sgPSBfdGFzaztcbiAgICAgICAgc2NoZWR1bGVkID0gdHJ1ZTtcblxuICAgICAgICBjb25zdCBkZWxlZ2F0ZSA9IHRoaXMuZGVsZWdhdGUocmVxdWVzdCk7XG4gICAgICAgIHN1YiA9IGRlbGVnYXRlLnN1YnNjcmliZShcbiAgICAgICAgICAgIHJlcyA9PiBzYXZlZFJlc3VsdCA9IHJlcyxcbiAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgIGlmICghc2NoZWR1bGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICAgICAnQW4gaHR0cCBvYnNlcnZhYmxlIHdhcyBjb21wbGV0ZWQgdHdpY2UuIFRoaXMgc2hvdWxkblxcJ3QgaGFwcGVuLCBwbGVhc2UgZmlsZSBhIGJ1Zy4nKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzYXZlZEVycm9yID0gZXJyO1xuICAgICAgICAgICAgICBzY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGFzay5pbnZva2UoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghc2NoZWR1bGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICAgICAnQW4gaHR0cCBvYnNlcnZhYmxlIHdhcyBjb21wbGV0ZWQgdHdpY2UuIFRoaXMgc2hvdWxkblxcJ3QgaGFwcGVuLCBwbGVhc2UgZmlsZSBhIGJ1Zy4nKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGFzay5pbnZva2UoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgY2FuY2VsVGFzayA9IChfdGFzazogVGFzaykgPT4ge1xuICAgICAgICBpZiAoIXNjaGVkdWxlZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHN1Yikge1xuICAgICAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIHN1YiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IG9uQ29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgIGlmIChzYXZlZEVycm9yICE9PSBudWxsKSB7XG4gICAgICAgICAgb2JzZXJ2ZXIuZXJyb3Ioc2F2ZWRFcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChzYXZlZFJlc3VsdCk7XG4gICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8gTW9ja0JhY2tlbmQgZm9yIEh0dHAgaXMgc3luY2hyb25vdXMsIHdoaWNoIG1lYW5zIHRoYXQgaWYgc2NoZWR1bGVUYXNrIGlzIGJ5XG4gICAgICAvLyBzY2hlZHVsZU1hY3JvVGFzaywgdGhlIHJlcXVlc3Qgd2lsbCBoaXQgTW9ja0JhY2tlbmQgYW5kIHRoZSByZXNwb25zZSB3aWxsIGJlXG4gICAgICAvLyBzZW50LCBjYXVzaW5nIHRhc2suaW52b2tlKCkgdG8gYmUgY2FsbGVkLlxuICAgICAgY29uc3QgX3Rhc2sgPSBab25lLmN1cnJlbnQuc2NoZWR1bGVNYWNyb1Rhc2soXG4gICAgICAgICAgJ1pvbmVNYWNyb1Rhc2tXcmFwcGVyLnN1YnNjcmliZScsIG9uQ29tcGxldGUsIHt9LCAoKSA9PiBudWxsLCBjYW5jZWxUYXNrKTtcbiAgICAgIHNjaGVkdWxlVGFzayhfdGFzayk7XG5cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmIChzY2hlZHVsZWQgJiYgdGFzaykge1xuICAgICAgICAgIHRhc2suem9uZS5jYW5jZWxUYXNrKHRhc2spO1xuICAgICAgICAgIHNjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdWIpIHtcbiAgICAgICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICBzdWIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGRlbGVnYXRlKHJlcXVlc3Q6IFMpOiBPYnNlcnZhYmxlPFI+O1xufVxuXG5leHBvcnQgY2xhc3MgWm9uZUNsaWVudEJhY2tlbmQgZXh0ZW5kc1xuICAgIFpvbmVNYWNyb1Rhc2tXcmFwcGVyPEh0dHBSZXF1ZXN0PGFueT4sIEh0dHBFdmVudDxhbnk+PiBpbXBsZW1lbnRzIEh0dHBCYWNrZW5kIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBiYWNrZW5kOiBIdHRwQmFja2VuZCkgeyBzdXBlcigpOyB9XG5cbiAgaGFuZGxlKHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4pOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7IHJldHVybiB0aGlzLndyYXAocmVxdWVzdCk7IH1cblxuICBwcm90ZWN0ZWQgZGVsZWdhdGUocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55Pik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICByZXR1cm4gdGhpcy5iYWNrZW5kLmhhbmRsZShyZXF1ZXN0KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gem9uZVdyYXBwZWRJbnRlcmNlcHRpbmdIYW5kbGVyKGJhY2tlbmQ6IEh0dHBCYWNrZW5kLCBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgY29uc3QgcmVhbEJhY2tlbmQ6IEh0dHBCYWNrZW5kID0gbmV3IEh0dHBJbnRlcmNlcHRpbmdIYW5kbGVyKGJhY2tlbmQsIGluamVjdG9yKTtcbiAgcmV0dXJuIG5ldyBab25lQ2xpZW50QmFja2VuZChyZWFsQmFja2VuZCk7XG59XG5cbmV4cG9ydCBjb25zdCBTRVJWRVJfSFRUUF9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbXG4gIHtwcm92aWRlOiBYaHJGYWN0b3J5LCB1c2VDbGFzczogU2VydmVyWGhyfSwge1xuICAgIHByb3ZpZGU6IEh0dHBIYW5kbGVyLFxuICAgIHVzZUZhY3Rvcnk6IHpvbmVXcmFwcGVkSW50ZXJjZXB0aW5nSGFuZGxlcixcbiAgICBkZXBzOiBbSHR0cEJhY2tlbmQsIEluamVjdG9yXVxuICB9XG5dO1xuIl19