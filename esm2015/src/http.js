/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** @type {?} */
const xhr2 = require('xhr2');
import { Injectable, Injector } from '@angular/core';
import { BrowserXhr, Http, ReadyState, RequestOptions, XHRBackend, XSRFStrategy } from '@angular/http';
import { HttpHandler, HttpBackend, XhrFactory, ɵHttpInterceptingHandler as HttpInterceptingHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
/** @type {?} */
const isAbsoluteUrl = /^[a-zA-Z\-\+.]+:\/\//;
/**
 * @param {?} url
 * @return {?}
 */
function validateRequestUrl(url) {
    if (!isAbsoluteUrl.test(url)) {
        throw new Error(`URLs requested via Http on the server must be absolute. URL: ${url}`);
    }
}
export class ServerXhr {
    /**
     * @return {?}
     */
    build() { return new xhr2.XMLHttpRequest(); }
}
ServerXhr.decorators = [
    { type: Injectable }
];
export class ServerXsrfStrategy {
    /**
     * @param {?} req
     * @return {?}
     */
    configureRequest(req) { }
}
ServerXsrfStrategy.decorators = [
    { type: Injectable }
];
/**
 * @abstract
 * @template S, R
 */
export class ZoneMacroTaskWrapper {
    /**
     * @param {?} request
     * @return {?}
     */
    wrap(request) {
        return new Observable((observer) => {
            /** @type {?} */
            let task = (/** @type {?} */ (null));
            /** @type {?} */
            let scheduled = false;
            /** @type {?} */
            let sub = null;
            /** @type {?} */
            let savedResult = null;
            /** @type {?} */
            let savedError = null;
            /** @type {?} */
            const scheduleTask = (_task) => {
                task = _task;
                scheduled = true;
                /** @type {?} */
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
            /** @type {?} */
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
            /** @type {?} */
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
            /** @type {?} */
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
if (false) {
    /**
     * @abstract
     * @param {?} request
     * @return {?}
     */
    ZoneMacroTaskWrapper.prototype.delegate = function (request) { };
}
export class ZoneMacroTaskConnection extends ZoneMacroTaskWrapper {
    /**
     * @param {?} request
     * @param {?} backend
     */
    constructor(request, backend) {
        super();
        this.request = request;
        this.backend = backend;
        validateRequestUrl(request.url);
        this.response = this.wrap(request);
    }
    /**
     * @param {?} request
     * @return {?}
     */
    delegate(request) {
        this.lastConnection = this.backend.createConnection(request);
        return (/** @type {?} */ (this.lastConnection.response));
    }
    /**
     * @return {?}
     */
    get readyState() {
        return !!this.lastConnection ? this.lastConnection.readyState : ReadyState.Unsent;
    }
}
if (false) {
    /** @type {?} */
    ZoneMacroTaskConnection.prototype.response;
    /** @type {?} */
    ZoneMacroTaskConnection.prototype.lastConnection;
    /** @type {?} */
    ZoneMacroTaskConnection.prototype.request;
    /** @type {?} */
    ZoneMacroTaskConnection.prototype.backend;
}
export class ZoneMacroTaskBackend {
    /**
     * @param {?} backend
     */
    constructor(backend) {
        this.backend = backend;
    }
    /**
     * @param {?} request
     * @return {?}
     */
    createConnection(request) {
        return new ZoneMacroTaskConnection(request, this.backend);
    }
}
if (false) {
    /** @type {?} */
    ZoneMacroTaskBackend.prototype.backend;
}
export class ZoneClientBackend extends ZoneMacroTaskWrapper {
    /**
     * @param {?} backend
     */
    constructor(backend) {
        super();
        this.backend = backend;
    }
    /**
     * @param {?} request
     * @return {?}
     */
    handle(request) { return this.wrap(request); }
    /**
     * @param {?} request
     * @return {?}
     */
    delegate(request) {
        return this.backend.handle(request);
    }
}
if (false) {
    /** @type {?} */
    ZoneClientBackend.prototype.backend;
}
/**
 * @param {?} xhrBackend
 * @param {?} options
 * @return {?}
 */
export function httpFactory(xhrBackend, options) {
    /** @type {?} */
    const macroBackend = new ZoneMacroTaskBackend(xhrBackend);
    return new Http(macroBackend, options);
}
/**
 * @param {?} backend
 * @param {?} injector
 * @return {?}
 */
export function zoneWrappedInterceptingHandler(backend, injector) {
    /** @type {?} */
    const realBackend = new HttpInterceptingHandler(backend, injector);
    return new ZoneClientBackend(realBackend);
}
/** @type {?} */
export const SERVER_HTTP_PROVIDERS = [
    { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions] },
    { provide: BrowserXhr, useClass: ServerXhr }, { provide: XSRFStrategy, useClass: ServerXsrfStrategy },
    { provide: XhrFactory, useClass: ServerXhr }, {
        provide: HttpHandler,
        useFactory: zoneWrappedInterceptingHandler,
        deps: [HttpBackend, Injector]
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL3BsYXRmb3JtLXNlcnZlci9zcmMvaHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7TUFRTSxJQUFJLEdBQVEsT0FBTyxDQUFDLE1BQU0sQ0FBQztBQUVqQyxPQUFPLEVBQUMsVUFBVSxFQUFFLFFBQVEsRUFBa0MsTUFBTSxlQUFlLENBQUM7QUFDcEYsT0FBTyxFQUFDLFVBQVUsRUFBaUMsSUFBSSxFQUFFLFVBQVUsRUFBVyxjQUFjLEVBQVksVUFBVSxFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV2SixPQUFPLEVBQXlCLFdBQVcsRUFBc0MsV0FBVyxFQUFFLFVBQVUsRUFBRSx3QkFBd0IsSUFBSSx1QkFBdUIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRTNMLE9BQU8sRUFBQyxVQUFVLEVBQXlCLE1BQU0sTUFBTSxDQUFDOztNQUVsRCxhQUFhLEdBQUcsc0JBQXNCOzs7OztBQUU1QyxTQUFTLGtCQUFrQixDQUFDLEdBQVc7SUFDckMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxnRUFBZ0UsR0FBRyxFQUFFLENBQUMsQ0FBQztLQUN4RjtBQUNILENBQUM7QUFHRCxNQUFNLE9BQU8sU0FBUzs7OztJQUNwQixLQUFLLEtBQXFCLE9BQU8sSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7WUFGOUQsVUFBVTs7QUFNWCxNQUFNLE9BQU8sa0JBQWtCOzs7OztJQUM3QixnQkFBZ0IsQ0FBQyxHQUFZLElBQVMsQ0FBQzs7O1lBRnhDLFVBQVU7Ozs7OztBQUtYLE1BQU0sT0FBZ0Isb0JBQW9COzs7OztJQUN4QyxJQUFJLENBQUMsT0FBVTtRQUNiLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBQyxRQUFxQixFQUFFLEVBQUU7O2dCQUMx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VUFBVSxXQUFXLENBQUMsVUFBc0IsRUFBRSxPQUF1Qjs7VUFDbkUsWUFBWSxHQUFHLElBQUksb0JBQW9CLENBQUMsVUFBVSxDQUFDO0lBQ3pELE9BQU8sSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3pDLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSw4QkFBOEIsQ0FBQyxPQUFvQixFQUFFLFFBQWtCOztVQUMvRSxXQUFXLEdBQWdCLElBQUksdUJBQXVCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQztJQUMvRSxPQUFPLElBQUksaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDNUMsQ0FBQzs7QUFFRCxNQUFNLE9BQU8scUJBQXFCLEdBQWU7SUFDL0MsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxFQUFDO0lBQzVFLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBQztJQUNqRyxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQyxFQUFFO1FBQzFDLE9BQU8sRUFBRSxXQUFXO1FBQ3BCLFVBQVUsRUFBRSw4QkFBOEI7UUFDMUMsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQztLQUM5QjtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5jb25zdCB4aHIyOiBhbnkgPSByZXF1aXJlKCd4aHIyJyk7XG5cbmltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0b3IsIE9wdGlvbmFsLCBQcm92aWRlciwgSW5qZWN0RmxhZ3N9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCcm93c2VyWGhyLCBDb25uZWN0aW9uLCBDb25uZWN0aW9uQmFja2VuZCwgSHR0cCwgUmVhZHlTdGF0ZSwgUmVxdWVzdCwgUmVxdWVzdE9wdGlvbnMsIFJlc3BvbnNlLCBYSFJCYWNrZW5kLCBYU1JGU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuXG5pbXBvcnQge0h0dHBFdmVudCwgSHR0cFJlcXVlc3QsIEh0dHBIYW5kbGVyLCBIdHRwSW50ZXJjZXB0b3IsIEhUVFBfSU5URVJDRVBUT1JTLCBIdHRwQmFja2VuZCwgWGhyRmFjdG9yeSwgybVIdHRwSW50ZXJjZXB0aW5nSGFuZGxlciBhcyBIdHRwSW50ZXJjZXB0aW5nSGFuZGxlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQge09ic2VydmFibGUsIE9ic2VydmVyLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG5jb25zdCBpc0Fic29sdXRlVXJsID0gL15bYS16QS1aXFwtXFwrLl0rOlxcL1xcLy87XG5cbmZ1bmN0aW9uIHZhbGlkYXRlUmVxdWVzdFVybCh1cmw6IHN0cmluZyk6IHZvaWQge1xuICBpZiAoIWlzQWJzb2x1dGVVcmwudGVzdCh1cmwpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVUkxzIHJlcXVlc3RlZCB2aWEgSHR0cCBvbiB0aGUgc2VydmVyIG11c3QgYmUgYWJzb2x1dGUuIFVSTDogJHt1cmx9YCk7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZlclhociBpbXBsZW1lbnRzIEJyb3dzZXJYaHIge1xuICBidWlsZCgpOiBYTUxIdHRwUmVxdWVzdCB7IHJldHVybiBuZXcgeGhyMi5YTUxIdHRwUmVxdWVzdCgpOyB9XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJYc3JmU3RyYXRlZ3kgaW1wbGVtZW50cyBYU1JGU3RyYXRlZ3kge1xuICBjb25maWd1cmVSZXF1ZXN0KHJlcTogUmVxdWVzdCk6IHZvaWQge31cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFpvbmVNYWNyb1Rhc2tXcmFwcGVyPFMsIFI+IHtcbiAgd3JhcChyZXF1ZXN0OiBTKTogT2JzZXJ2YWJsZTxSPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8Uj4pID0+IHtcbiAgICAgIGxldCB0YXNrOiBUYXNrID0gbnVsbCAhO1xuICAgICAgbGV0IHNjaGVkdWxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgbGV0IHN1YjogU3Vic2NyaXB0aW9ufG51bGwgPSBudWxsO1xuICAgICAgbGV0IHNhdmVkUmVzdWx0OiBhbnkgPSBudWxsO1xuICAgICAgbGV0IHNhdmVkRXJyb3I6IGFueSA9IG51bGw7XG5cbiAgICAgIGNvbnN0IHNjaGVkdWxlVGFzayA9IChfdGFzazogVGFzaykgPT4ge1xuICAgICAgICB0YXNrID0gX3Rhc2s7XG4gICAgICAgIHNjaGVkdWxlZCA9IHRydWU7XG5cbiAgICAgICAgY29uc3QgZGVsZWdhdGUgPSB0aGlzLmRlbGVnYXRlKHJlcXVlc3QpO1xuICAgICAgICBzdWIgPSBkZWxlZ2F0ZS5zdWJzY3JpYmUoXG4gICAgICAgICAgICByZXMgPT4gc2F2ZWRSZXN1bHQgPSByZXMsXG4gICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICBpZiAoIXNjaGVkdWxlZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICAgICAgJ0FuIGh0dHAgb2JzZXJ2YWJsZSB3YXMgY29tcGxldGVkIHR3aWNlLiBUaGlzIHNob3VsZG5cXCd0IGhhcHBlbiwgcGxlYXNlIGZpbGUgYSBidWcuJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2F2ZWRFcnJvciA9IGVycjtcbiAgICAgICAgICAgICAgc2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgIHRhc2suaW52b2tlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIXNjaGVkdWxlZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICAgICAgJ0FuIGh0dHAgb2JzZXJ2YWJsZSB3YXMgY29tcGxldGVkIHR3aWNlLiBUaGlzIHNob3VsZG5cXCd0IGhhcHBlbiwgcGxlYXNlIGZpbGUgYSBidWcuJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgIHRhc2suaW52b2tlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGNhbmNlbFRhc2sgPSAoX3Rhc2s6IFRhc2spID0+IHtcbiAgICAgICAgaWYgKCFzY2hlZHVsZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICAgIGlmIChzdWIpIHtcbiAgICAgICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICBzdWIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBvbkNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICBpZiAoc2F2ZWRFcnJvciAhPT0gbnVsbCkge1xuICAgICAgICAgIG9ic2VydmVyLmVycm9yKHNhdmVkRXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9ic2VydmVyLm5leHQoc2F2ZWRSZXN1bHQpO1xuICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vIE1vY2tCYWNrZW5kIGZvciBIdHRwIGlzIHN5bmNocm9ub3VzLCB3aGljaCBtZWFucyB0aGF0IGlmIHNjaGVkdWxlVGFzayBpcyBieVxuICAgICAgLy8gc2NoZWR1bGVNYWNyb1Rhc2ssIHRoZSByZXF1ZXN0IHdpbGwgaGl0IE1vY2tCYWNrZW5kIGFuZCB0aGUgcmVzcG9uc2Ugd2lsbCBiZVxuICAgICAgLy8gc2VudCwgY2F1c2luZyB0YXNrLmludm9rZSgpIHRvIGJlIGNhbGxlZC5cbiAgICAgIGNvbnN0IF90YXNrID0gWm9uZS5jdXJyZW50LnNjaGVkdWxlTWFjcm9UYXNrKFxuICAgICAgICAgICdab25lTWFjcm9UYXNrV3JhcHBlci5zdWJzY3JpYmUnLCBvbkNvbXBsZXRlLCB7fSwgKCkgPT4gbnVsbCwgY2FuY2VsVGFzayk7XG4gICAgICBzY2hlZHVsZVRhc2soX3Rhc2spO1xuXG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAoc2NoZWR1bGVkICYmIHRhc2spIHtcbiAgICAgICAgICB0YXNrLnpvbmUuY2FuY2VsVGFzayh0YXNrKTtcbiAgICAgICAgICBzY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3ViKSB7XG4gICAgICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgc3ViID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBkZWxlZ2F0ZShyZXF1ZXN0OiBTKTogT2JzZXJ2YWJsZTxSPjtcbn1cblxuZXhwb3J0IGNsYXNzIFpvbmVNYWNyb1Rhc2tDb25uZWN0aW9uIGV4dGVuZHMgWm9uZU1hY3JvVGFza1dyYXBwZXI8UmVxdWVzdCwgUmVzcG9uc2U+IGltcGxlbWVudHNcbiAgICBDb25uZWN0aW9uIHtcbiAgcmVzcG9uc2U6IE9ic2VydmFibGU8UmVzcG9uc2U+O1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgbGFzdENvbm5lY3Rpb24gITogQ29ubmVjdGlvbjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVxdWVzdDogUmVxdWVzdCwgcHJpdmF0ZSBiYWNrZW5kOiBYSFJCYWNrZW5kKSB7XG4gICAgc3VwZXIoKTtcbiAgICB2YWxpZGF0ZVJlcXVlc3RVcmwocmVxdWVzdC51cmwpO1xuICAgIHRoaXMucmVzcG9uc2UgPSB0aGlzLndyYXAocmVxdWVzdCk7XG4gIH1cblxuICBkZWxlZ2F0ZShyZXF1ZXN0OiBSZXF1ZXN0KTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xuICAgIHRoaXMubGFzdENvbm5lY3Rpb24gPSB0aGlzLmJhY2tlbmQuY3JlYXRlQ29ubmVjdGlvbihyZXF1ZXN0KTtcbiAgICByZXR1cm4gdGhpcy5sYXN0Q29ubmVjdGlvbi5yZXNwb25zZSBhcyBPYnNlcnZhYmxlPFJlc3BvbnNlPjtcbiAgfVxuXG4gIGdldCByZWFkeVN0YXRlKCk6IFJlYWR5U3RhdGUge1xuICAgIHJldHVybiAhIXRoaXMubGFzdENvbm5lY3Rpb24gPyB0aGlzLmxhc3RDb25uZWN0aW9uLnJlYWR5U3RhdGUgOiBSZWFkeVN0YXRlLlVuc2VudDtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgWm9uZU1hY3JvVGFza0JhY2tlbmQgaW1wbGVtZW50cyBDb25uZWN0aW9uQmFja2VuZCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYmFja2VuZDogWEhSQmFja2VuZCkge31cblxuICBjcmVhdGVDb25uZWN0aW9uKHJlcXVlc3Q6IGFueSk6IFpvbmVNYWNyb1Rhc2tDb25uZWN0aW9uIHtcbiAgICByZXR1cm4gbmV3IFpvbmVNYWNyb1Rhc2tDb25uZWN0aW9uKHJlcXVlc3QsIHRoaXMuYmFja2VuZCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFpvbmVDbGllbnRCYWNrZW5kIGV4dGVuZHNcbiAgICBab25lTWFjcm9UYXNrV3JhcHBlcjxIdHRwUmVxdWVzdDxhbnk+LCBIdHRwRXZlbnQ8YW55Pj4gaW1wbGVtZW50cyBIdHRwQmFja2VuZCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYmFja2VuZDogSHR0cEJhY2tlbmQpIHsgc3VwZXIoKTsgfVxuXG4gIGhhbmRsZShyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+KTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4geyByZXR1cm4gdGhpcy53cmFwKHJlcXVlc3QpOyB9XG5cbiAgcHJvdGVjdGVkIGRlbGVnYXRlKHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4pOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgcmV0dXJuIHRoaXMuYmFja2VuZC5oYW5kbGUocmVxdWVzdCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGh0dHBGYWN0b3J5KHhockJhY2tlbmQ6IFhIUkJhY2tlbmQsIG9wdGlvbnM6IFJlcXVlc3RPcHRpb25zKSB7XG4gIGNvbnN0IG1hY3JvQmFja2VuZCA9IG5ldyBab25lTWFjcm9UYXNrQmFja2VuZCh4aHJCYWNrZW5kKTtcbiAgcmV0dXJuIG5ldyBIdHRwKG1hY3JvQmFja2VuZCwgb3B0aW9ucyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB6b25lV3JhcHBlZEludGVyY2VwdGluZ0hhbmRsZXIoYmFja2VuZDogSHR0cEJhY2tlbmQsIGluamVjdG9yOiBJbmplY3Rvcikge1xuICBjb25zdCByZWFsQmFja2VuZDogSHR0cEJhY2tlbmQgPSBuZXcgSHR0cEludGVyY2VwdGluZ0hhbmRsZXIoYmFja2VuZCwgaW5qZWN0b3IpO1xuICByZXR1cm4gbmV3IFpvbmVDbGllbnRCYWNrZW5kKHJlYWxCYWNrZW5kKTtcbn1cblxuZXhwb3J0IGNvbnN0IFNFUlZFUl9IVFRQX1BST1ZJREVSUzogUHJvdmlkZXJbXSA9IFtcbiAge3Byb3ZpZGU6IEh0dHAsIHVzZUZhY3Rvcnk6IGh0dHBGYWN0b3J5LCBkZXBzOiBbWEhSQmFja2VuZCwgUmVxdWVzdE9wdGlvbnNdfSxcbiAge3Byb3ZpZGU6IEJyb3dzZXJYaHIsIHVzZUNsYXNzOiBTZXJ2ZXJYaHJ9LCB7cHJvdmlkZTogWFNSRlN0cmF0ZWd5LCB1c2VDbGFzczogU2VydmVyWHNyZlN0cmF0ZWd5fSxcbiAge3Byb3ZpZGU6IFhockZhY3RvcnksIHVzZUNsYXNzOiBTZXJ2ZXJYaHJ9LCB7XG4gICAgcHJvdmlkZTogSHR0cEhhbmRsZXIsXG4gICAgdXNlRmFjdG9yeTogem9uZVdyYXBwZWRJbnRlcmNlcHRpbmdIYW5kbGVyLFxuICAgIGRlcHM6IFtIdHRwQmFja2VuZCwgSW5qZWN0b3JdXG4gIH1cbl07XG4iXX0=