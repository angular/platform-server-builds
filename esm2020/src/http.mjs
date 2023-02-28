/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformLocation, XhrFactory } from '@angular/common';
import { HttpBackend, HttpHandler, ɵHttpInterceptorHandler as HttpInterceptorHandler } from '@angular/common/http';
import { EnvironmentInjector, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as xhr2 from 'xhr2';
import { INITIAL_CONFIG } from './tokens';
import * as i0 from "@angular/core";
// @see https://www.w3.org/Protocols/HTTP/1.1/draft-ietf-http-v11-spec-01#URI-syntax
const isAbsoluteUrl = /^[a-zA-Z\-\+.]+:\/\//;
class ServerXhr {
    build() {
        return new xhr2.XMLHttpRequest();
    }
}
ServerXhr.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.0+sha-a08a8ff", ngImport: i0, type: ServerXhr, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ServerXhr.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0-next.0+sha-a08a8ff", ngImport: i0, type: ServerXhr });
export { ServerXhr };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.0+sha-a08a8ff", ngImport: i0, type: ServerXhr, decorators: [{
            type: Injectable
        }] });
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
    constructor(backend, platformLocation, config) {
        super();
        this.backend = backend;
        this.platformLocation = platformLocation;
        this.config = config;
    }
    handle(request) {
        const { href, protocol, hostname, port } = this.platformLocation;
        if (this.config.useAbsoluteUrl && !isAbsoluteUrl.test(request.url) &&
            isAbsoluteUrl.test(href)) {
            const baseHref = this.platformLocation.getBaseHrefFromDOM() || href;
            const urlPrefix = `${protocol}//${hostname}` + (port ? `:${port}` : '');
            const baseUrl = new URL(baseHref, urlPrefix);
            const url = new URL(request.url, baseUrl);
            return this.wrap(request.clone({ url: url.toString() }));
        }
        return this.wrap(request);
    }
    delegate(request) {
        return this.backend.handle(request);
    }
}
export function zoneWrappedInterceptorHandler(platformLocation, config) {
    return new ZoneClientBackend(new HttpInterceptorHandler(inject(HttpBackend), inject(EnvironmentInjector)), platformLocation, config);
}
export const SERVER_HTTP_PROVIDERS = [
    { provide: XhrFactory, useClass: ServerXhr }, {
        provide: HttpHandler,
        useFactory: zoneWrappedInterceptorHandler,
        deps: [PlatformLocation, INITIAL_CONFIG]
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXNlcnZlci9zcmMvaHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsVUFBVSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0QsT0FBTyxFQUFDLFdBQVcsRUFBYSxXQUFXLEVBQWUsdUJBQXVCLElBQUksc0JBQXNCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN6SSxPQUFPLEVBQUMsbUJBQW1CLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBVyxNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUMsVUFBVSxFQUF5QixNQUFNLE1BQU0sQ0FBQztBQUN4RCxPQUFPLEtBQUssSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUU3QixPQUFPLEVBQUMsY0FBYyxFQUFpQixNQUFNLFVBQVUsQ0FBQzs7QUFFeEQsb0ZBQW9GO0FBQ3BGLE1BQU0sYUFBYSxHQUFHLHNCQUFzQixDQUFDO0FBRTdDLE1BQ2EsU0FBUztJQUNwQixLQUFLO1FBQ0gsT0FBTyxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNuQyxDQUFDOztpSEFIVSxTQUFTO3FIQUFULFNBQVM7U0FBVCxTQUFTO3NHQUFULFNBQVM7a0JBRHJCLFVBQVU7O0FBT1gsTUFBTSxPQUFnQixvQkFBb0I7SUFDeEMsSUFBSSxDQUFDLE9BQVU7UUFDYixPQUFPLElBQUksVUFBVSxDQUFDLENBQUMsUUFBcUIsRUFBRSxFQUFFO1lBQzlDLElBQUksSUFBSSxHQUFTLElBQUssQ0FBQztZQUN2QixJQUFJLFNBQVMsR0FBWSxLQUFLLENBQUM7WUFDL0IsSUFBSSxHQUFHLEdBQXNCLElBQUksQ0FBQztZQUNsQyxJQUFJLFdBQVcsR0FBUSxJQUFJLENBQUM7WUFDNUIsSUFBSSxVQUFVLEdBQVEsSUFBSSxDQUFDO1lBRTNC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TUFBTSxxQkFBcUIsR0FBZTtJQUMvQyxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQyxFQUFFO1FBQzFDLE9BQU8sRUFBRSxXQUFXO1FBQ3BCLFVBQVUsRUFBRSw2QkFBNkI7UUFDekMsSUFBSSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDO0tBQ3pDO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1BsYXRmb3JtTG9jYXRpb24sIFhockZhY3Rvcnl9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0h0dHBCYWNrZW5kLCBIdHRwRXZlbnQsIEh0dHBIYW5kbGVyLCBIdHRwUmVxdWVzdCwgybVIdHRwSW50ZXJjZXB0b3JIYW5kbGVyIGFzIEh0dHBJbnRlcmNlcHRvckhhbmRsZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7RW52aXJvbm1lbnRJbmplY3RvciwgaW5qZWN0LCBJbmplY3RhYmxlLCBQcm92aWRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGUsIE9ic2VydmVyLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0ICogYXMgeGhyMiBmcm9tICd4aHIyJztcblxuaW1wb3J0IHtJTklUSUFMX0NPTkZJRywgUGxhdGZvcm1Db25maWd9IGZyb20gJy4vdG9rZW5zJztcblxuLy8gQHNlZSBodHRwczovL3d3dy53My5vcmcvUHJvdG9jb2xzL0hUVFAvMS4xL2RyYWZ0LWlldGYtaHR0cC12MTEtc3BlYy0wMSNVUkktc3ludGF4XG5jb25zdCBpc0Fic29sdXRlVXJsID0gL15bYS16QS1aXFwtXFwrLl0rOlxcL1xcLy87XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJYaHIgaW1wbGVtZW50cyBYaHJGYWN0b3J5IHtcbiAgYnVpbGQoKTogWE1MSHR0cFJlcXVlc3Qge1xuICAgIHJldHVybiBuZXcgeGhyMi5YTUxIdHRwUmVxdWVzdCgpO1xuICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBab25lTWFjcm9UYXNrV3JhcHBlcjxTLCBSPiB7XG4gIHdyYXAocmVxdWVzdDogUyk6IE9ic2VydmFibGU8Uj4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFI+KSA9PiB7XG4gICAgICBsZXQgdGFzazogVGFzayA9IG51bGwhO1xuICAgICAgbGV0IHNjaGVkdWxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgbGV0IHN1YjogU3Vic2NyaXB0aW9ufG51bGwgPSBudWxsO1xuICAgICAgbGV0IHNhdmVkUmVzdWx0OiBhbnkgPSBudWxsO1xuICAgICAgbGV0IHNhdmVkRXJyb3I6IGFueSA9IG51bGw7XG5cbiAgICAgIGNvbnN0IHNjaGVkdWxlVGFzayA9IChfdGFzazogVGFzaykgPT4ge1xuICAgICAgICB0YXNrID0gX3Rhc2s7XG4gICAgICAgIHNjaGVkdWxlZCA9IHRydWU7XG5cbiAgICAgICAgY29uc3QgZGVsZWdhdGUgPSB0aGlzLmRlbGVnYXRlKHJlcXVlc3QpO1xuICAgICAgICBzdWIgPSBkZWxlZ2F0ZS5zdWJzY3JpYmUoXG4gICAgICAgICAgICByZXMgPT4gc2F2ZWRSZXN1bHQgPSByZXMsXG4gICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICBpZiAoIXNjaGVkdWxlZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICAgICAgJ0FuIGh0dHAgb2JzZXJ2YWJsZSB3YXMgY29tcGxldGVkIHR3aWNlLiBUaGlzIHNob3VsZG5cXCd0IGhhcHBlbiwgcGxlYXNlIGZpbGUgYSBidWcuJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2F2ZWRFcnJvciA9IGVycjtcbiAgICAgICAgICAgICAgc2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgIHRhc2suaW52b2tlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIXNjaGVkdWxlZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICAgICAgJ0FuIGh0dHAgb2JzZXJ2YWJsZSB3YXMgY29tcGxldGVkIHR3aWNlLiBUaGlzIHNob3VsZG5cXCd0IGhhcHBlbiwgcGxlYXNlIGZpbGUgYSBidWcuJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgIHRhc2suaW52b2tlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGNhbmNlbFRhc2sgPSAoX3Rhc2s6IFRhc2spID0+IHtcbiAgICAgICAgaWYgKCFzY2hlZHVsZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICAgIGlmIChzdWIpIHtcbiAgICAgICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICBzdWIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBvbkNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICBpZiAoc2F2ZWRFcnJvciAhPT0gbnVsbCkge1xuICAgICAgICAgIG9ic2VydmVyLmVycm9yKHNhdmVkRXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9ic2VydmVyLm5leHQoc2F2ZWRSZXN1bHQpO1xuICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vIE1vY2tCYWNrZW5kIGZvciBIdHRwIGlzIHN5bmNocm9ub3VzLCB3aGljaCBtZWFucyB0aGF0IGlmIHNjaGVkdWxlVGFzayBpcyBieVxuICAgICAgLy8gc2NoZWR1bGVNYWNyb1Rhc2ssIHRoZSByZXF1ZXN0IHdpbGwgaGl0IE1vY2tCYWNrZW5kIGFuZCB0aGUgcmVzcG9uc2Ugd2lsbCBiZVxuICAgICAgLy8gc2VudCwgY2F1c2luZyB0YXNrLmludm9rZSgpIHRvIGJlIGNhbGxlZC5cbiAgICAgIGNvbnN0IF90YXNrID0gWm9uZS5jdXJyZW50LnNjaGVkdWxlTWFjcm9UYXNrKFxuICAgICAgICAgICdab25lTWFjcm9UYXNrV3JhcHBlci5zdWJzY3JpYmUnLCBvbkNvbXBsZXRlLCB7fSwgKCkgPT4gbnVsbCwgY2FuY2VsVGFzayk7XG4gICAgICBzY2hlZHVsZVRhc2soX3Rhc2spO1xuXG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAoc2NoZWR1bGVkICYmIHRhc2spIHtcbiAgICAgICAgICB0YXNrLnpvbmUuY2FuY2VsVGFzayh0YXNrKTtcbiAgICAgICAgICBzY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3ViKSB7XG4gICAgICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgc3ViID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBkZWxlZ2F0ZShyZXF1ZXN0OiBTKTogT2JzZXJ2YWJsZTxSPjtcbn1cblxuZXhwb3J0IGNsYXNzIFpvbmVDbGllbnRCYWNrZW5kIGV4dGVuZHNcbiAgICBab25lTWFjcm9UYXNrV3JhcHBlcjxIdHRwUmVxdWVzdDxhbnk+LCBIdHRwRXZlbnQ8YW55Pj4gaW1wbGVtZW50cyBIdHRwQmFja2VuZCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBiYWNrZW5kOiBIdHRwQmFja2VuZCwgcHJpdmF0ZSBwbGF0Zm9ybUxvY2F0aW9uOiBQbGF0Zm9ybUxvY2F0aW9uLFxuICAgICAgcHJpdmF0ZSBjb25maWc6IFBsYXRmb3JtQ29uZmlnKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGhhbmRsZShyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+KTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIGNvbnN0IHtocmVmLCBwcm90b2NvbCwgaG9zdG5hbWUsIHBvcnR9ID0gdGhpcy5wbGF0Zm9ybUxvY2F0aW9uO1xuICAgIGlmICh0aGlzLmNvbmZpZy51c2VBYnNvbHV0ZVVybCAmJiAhaXNBYnNvbHV0ZVVybC50ZXN0KHJlcXVlc3QudXJsKSAmJlxuICAgICAgICBpc0Fic29sdXRlVXJsLnRlc3QoaHJlZikpIHtcbiAgICAgIGNvbnN0IGJhc2VIcmVmID0gdGhpcy5wbGF0Zm9ybUxvY2F0aW9uLmdldEJhc2VIcmVmRnJvbURPTSgpIHx8IGhyZWY7XG4gICAgICBjb25zdCB1cmxQcmVmaXggPSBgJHtwcm90b2NvbH0vLyR7aG9zdG5hbWV9YCArIChwb3J0ID8gYDoke3BvcnR9YCA6ICcnKTtcbiAgICAgIGNvbnN0IGJhc2VVcmwgPSBuZXcgVVJMKGJhc2VIcmVmLCB1cmxQcmVmaXgpO1xuICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChyZXF1ZXN0LnVybCwgYmFzZVVybCk7XG4gICAgICByZXR1cm4gdGhpcy53cmFwKHJlcXVlc3QuY2xvbmUoe3VybDogdXJsLnRvU3RyaW5nKCl9KSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLndyYXAocmVxdWVzdCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgZGVsZWdhdGUocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55Pik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICByZXR1cm4gdGhpcy5iYWNrZW5kLmhhbmRsZShyZXF1ZXN0KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gem9uZVdyYXBwZWRJbnRlcmNlcHRvckhhbmRsZXIoXG4gICAgcGxhdGZvcm1Mb2NhdGlvbjogUGxhdGZvcm1Mb2NhdGlvbiwgY29uZmlnOiBQbGF0Zm9ybUNvbmZpZykge1xuICByZXR1cm4gbmV3IFpvbmVDbGllbnRCYWNrZW5kKFxuICAgICAgbmV3IEh0dHBJbnRlcmNlcHRvckhhbmRsZXIoaW5qZWN0KEh0dHBCYWNrZW5kKSwgaW5qZWN0KEVudmlyb25tZW50SW5qZWN0b3IpKSxcbiAgICAgIHBsYXRmb3JtTG9jYXRpb24sIGNvbmZpZyk7XG59XG5cbmV4cG9ydCBjb25zdCBTRVJWRVJfSFRUUF9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbXG4gIHtwcm92aWRlOiBYaHJGYWN0b3J5LCB1c2VDbGFzczogU2VydmVyWGhyfSwge1xuICAgIHByb3ZpZGU6IEh0dHBIYW5kbGVyLFxuICAgIHVzZUZhY3Rvcnk6IHpvbmVXcmFwcGVkSW50ZXJjZXB0b3JIYW5kbGVyLFxuICAgIGRlcHM6IFtQbGF0Zm9ybUxvY2F0aW9uLCBJTklUSUFMX0NPTkZJR11cbiAgfVxuXTtcbiJdfQ==