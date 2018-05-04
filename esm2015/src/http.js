/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const /** @type {?} */ xhr2 = require('xhr2');
import { Injectable, Optional } from '@angular/core';
import { BrowserXhr, Http, ReadyState, RequestOptions, XHRBackend, XSRFStrategy } from '@angular/http';
import { HttpHandler, HTTP_INTERCEPTORS, HttpBackend, XhrFactory, ɵinterceptingHandler as interceptingHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
const /** @type {?} */ isAbsoluteUrl = /^[a-zA-Z\-\+.]+:\/\//;
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
/** @nocollapse */
ServerXhr.ctorParameters = () => [];
function ServerXhr_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ServerXhr.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ServerXhr.ctorParameters;
}
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
/** @nocollapse */
ServerXsrfStrategy.ctorParameters = () => [];
function ServerXsrfStrategy_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ServerXsrfStrategy.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ServerXsrfStrategy.ctorParameters;
}
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
            let /** @type {?} */ task = /** @type {?} */ ((null));
            let /** @type {?} */ scheduled = false;
            let /** @type {?} */ sub = null;
            let /** @type {?} */ savedResult = null;
            let /** @type {?} */ savedError = null;
            const /** @type {?} */ scheduleTask = (_task) => {
                task = _task;
                scheduled = true;
                const /** @type {?} */ delegate = this.delegate(request);
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
            const /** @type {?} */ cancelTask = (_task) => {
                if (!scheduled) {
                    return;
                }
                scheduled = false;
                if (sub) {
                    sub.unsubscribe();
                    sub = null;
                }
            };
            const /** @type {?} */ onComplete = () => {
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
            const /** @type {?} */ _task = Zone.current.scheduleMacroTask('ZoneMacroTaskWrapper.subscribe', onComplete, {}, () => null, cancelTask);
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
function ZoneMacroTaskWrapper_tsickle_Closure_declarations() {
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
        return /** @type {?} */ (this.lastConnection.response);
    }
    /**
     * @return {?}
     */
    get readyState() {
        return !!this.lastConnection ? this.lastConnection.readyState : ReadyState.Unsent;
    }
}
function ZoneMacroTaskConnection_tsickle_Closure_declarations() {
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
function ZoneMacroTaskBackend_tsickle_Closure_declarations() {
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
function ZoneClientBackend_tsickle_Closure_declarations() {
    /** @type {?} */
    ZoneClientBackend.prototype.backend;
}
/**
 * @param {?} xhrBackend
 * @param {?} options
 * @return {?}
 */
export function httpFactory(xhrBackend, options) {
    const /** @type {?} */ macroBackend = new ZoneMacroTaskBackend(xhrBackend);
    return new Http(macroBackend, options);
}
/**
 * @param {?} backend
 * @param {?} interceptors
 * @return {?}
 */
export function zoneWrappedInterceptingHandler(backend, interceptors) {
    const /** @type {?} */ realBackend = interceptingHandler(backend, interceptors);
    return new ZoneClientBackend(realBackend);
}
export const /** @type {?} */ SERVER_HTTP_PROVIDERS = [
    { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions] },
    { provide: BrowserXhr, useClass: ServerXhr }, { provide: XSRFStrategy, useClass: ServerXsrfStrategy },
    { provide: XhrFactory, useClass: ServerXhr }, {
        provide: HttpHandler,
        useFactory: zoneWrappedInterceptingHandler,
        deps: [HttpBackend, [new Optional(), HTTP_INTERCEPTORS]]
    }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXNlcnZlci9zcmMvaHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLHVCQUFNLElBQUksR0FBUSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFbEMsT0FBTyxFQUFDLFVBQVUsRUFBRSxRQUFRLEVBQVcsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFDLFVBQVUsRUFBaUMsSUFBSSxFQUFFLFVBQVUsRUFBVyxjQUFjLEVBQVksVUFBVSxFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV2SixPQUFPLEVBQXlCLFdBQVcsRUFBbUIsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxvQkFBb0IsSUFBSSxtQkFBbUIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRW5MLE9BQU8sRUFBQyxVQUFVLEVBQXlCLE1BQU0sTUFBTSxDQUFDO0FBRXhELHVCQUFNLGFBQWEsR0FBRyxzQkFBc0IsQ0FBQzs7Ozs7QUFFN0MsNEJBQTRCLEdBQVc7SUFDckMsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLGdFQUFnRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0tBQ3hGO0NBQ0Y7QUFHRCxNQUFNOzs7O0lBQ0osS0FBSyxLQUFxQixNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsRUFBRTs7O1lBRjlELFVBQVU7Ozs7Ozs7Ozs7Ozs7QUFNWCxNQUFNOzs7OztJQUNKLGdCQUFnQixDQUFDLEdBQVksS0FBVTs7O1lBRnhDLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS1gsTUFBTTs7Ozs7SUFDSixJQUFJLENBQUMsT0FBVTtRQUNiLE1BQU0sQ0FBQyxJQUFJLFVBQVUs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RixRQUFRLENBQUMsT0FBeUI7UUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3JDO0NBQ0Y7Ozs7Ozs7Ozs7QUFFRCxNQUFNLHNCQUFzQixVQUFzQixFQUFFLE9BQXVCO0lBQ3pFLHVCQUFNLFlBQVksR0FBRyxJQUFJLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzFELE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7Q0FDeEM7Ozs7OztBQUVELE1BQU0seUNBQ0YsT0FBb0IsRUFBRSxZQUFzQztJQUM5RCx1QkFBTSxXQUFXLEdBQWdCLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztJQUM1RSxNQUFNLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztDQUMzQztBQUVELE1BQU0sQ0FBQyx1QkFBTSxxQkFBcUIsR0FBZTtJQUMvQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLEVBQUM7SUFDNUUsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFDO0lBQ2pHLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFDLEVBQUU7UUFDMUMsT0FBTyxFQUFFLFdBQVc7UUFDcEIsVUFBVSxFQUFFLDhCQUE4QjtRQUMxQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLFFBQVEsRUFBRSxFQUFFLGlCQUFpQixDQUFDLENBQUM7S0FDekQ7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5jb25zdCB4aHIyOiBhbnkgPSByZXF1aXJlKCd4aHIyJyk7XG5cbmltcG9ydCB7SW5qZWN0YWJsZSwgT3B0aW9uYWwsIFByb3ZpZGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QnJvd3NlclhociwgQ29ubmVjdGlvbiwgQ29ubmVjdGlvbkJhY2tlbmQsIEh0dHAsIFJlYWR5U3RhdGUsIFJlcXVlc3QsIFJlcXVlc3RPcHRpb25zLCBSZXNwb25zZSwgWEhSQmFja2VuZCwgWFNSRlN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9odHRwJztcblxuaW1wb3J0IHtIdHRwRXZlbnQsIEh0dHBSZXF1ZXN0LCBIdHRwSGFuZGxlciwgSHR0cEludGVyY2VwdG9yLCBIVFRQX0lOVEVSQ0VQVE9SUywgSHR0cEJhY2tlbmQsIFhockZhY3RvcnksIMm1aW50ZXJjZXB0aW5nSGFuZGxlciBhcyBpbnRlcmNlcHRpbmdIYW5kbGVyfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7T2JzZXJ2YWJsZSwgT2JzZXJ2ZXIsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmNvbnN0IGlzQWJzb2x1dGVVcmwgPSAvXlthLXpBLVpcXC1cXCsuXSs6XFwvXFwvLztcblxuZnVuY3Rpb24gdmFsaWRhdGVSZXF1ZXN0VXJsKHVybDogc3RyaW5nKTogdm9pZCB7XG4gIGlmICghaXNBYnNvbHV0ZVVybC50ZXN0KHVybCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVSTHMgcmVxdWVzdGVkIHZpYSBIdHRwIG9uIHRoZSBzZXJ2ZXIgbXVzdCBiZSBhYnNvbHV0ZS4gVVJMOiAke3VybH1gKTtcbiAgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VydmVyWGhyIGltcGxlbWVudHMgQnJvd3NlclhociB7XG4gIGJ1aWxkKCk6IFhNTEh0dHBSZXF1ZXN0IHsgcmV0dXJuIG5ldyB4aHIyLlhNTEh0dHBSZXF1ZXN0KCk7IH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZlclhzcmZTdHJhdGVneSBpbXBsZW1lbnRzIFhTUkZTdHJhdGVneSB7XG4gIGNvbmZpZ3VyZVJlcXVlc3QocmVxOiBSZXF1ZXN0KTogdm9pZCB7fVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgWm9uZU1hY3JvVGFza1dyYXBwZXI8UywgUj4ge1xuICB3cmFwKHJlcXVlc3Q6IFMpOiBPYnNlcnZhYmxlPFI+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxSPikgPT4ge1xuICAgICAgbGV0IHRhc2s6IFRhc2sgPSBudWxsICE7XG4gICAgICBsZXQgc2NoZWR1bGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgICBsZXQgc3ViOiBTdWJzY3JpcHRpb258bnVsbCA9IG51bGw7XG4gICAgICBsZXQgc2F2ZWRSZXN1bHQ6IGFueSA9IG51bGw7XG4gICAgICBsZXQgc2F2ZWRFcnJvcjogYW55ID0gbnVsbDtcblxuICAgICAgY29uc3Qgc2NoZWR1bGVUYXNrID0gKF90YXNrOiBUYXNrKSA9PiB7XG4gICAgICAgIHRhc2sgPSBfdGFzaztcbiAgICAgICAgc2NoZWR1bGVkID0gdHJ1ZTtcblxuICAgICAgICBjb25zdCBkZWxlZ2F0ZSA9IHRoaXMuZGVsZWdhdGUocmVxdWVzdCk7XG4gICAgICAgIHN1YiA9IGRlbGVnYXRlLnN1YnNjcmliZShcbiAgICAgICAgICAgIHJlcyA9PiBzYXZlZFJlc3VsdCA9IHJlcyxcbiAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgIGlmICghc2NoZWR1bGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICAgICAnQW4gaHR0cCBvYnNlcnZhYmxlIHdhcyBjb21wbGV0ZWQgdHdpY2UuIFRoaXMgc2hvdWxkblxcJ3QgaGFwcGVuLCBwbGVhc2UgZmlsZSBhIGJ1Zy4nKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzYXZlZEVycm9yID0gZXJyO1xuICAgICAgICAgICAgICBzY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGFzay5pbnZva2UoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghc2NoZWR1bGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICAgICAnQW4gaHR0cCBvYnNlcnZhYmxlIHdhcyBjb21wbGV0ZWQgdHdpY2UuIFRoaXMgc2hvdWxkblxcJ3QgaGFwcGVuLCBwbGVhc2UgZmlsZSBhIGJ1Zy4nKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGFzay5pbnZva2UoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgY2FuY2VsVGFzayA9IChfdGFzazogVGFzaykgPT4ge1xuICAgICAgICBpZiAoIXNjaGVkdWxlZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHN1Yikge1xuICAgICAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIHN1YiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IG9uQ29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgIGlmIChzYXZlZEVycm9yICE9PSBudWxsKSB7XG4gICAgICAgICAgb2JzZXJ2ZXIuZXJyb3Ioc2F2ZWRFcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChzYXZlZFJlc3VsdCk7XG4gICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8gTW9ja0JhY2tlbmQgZm9yIEh0dHAgaXMgc3luY2hyb25vdXMsIHdoaWNoIG1lYW5zIHRoYXQgaWYgc2NoZWR1bGVUYXNrIGlzIGJ5XG4gICAgICAvLyBzY2hlZHVsZU1hY3JvVGFzaywgdGhlIHJlcXVlc3Qgd2lsbCBoaXQgTW9ja0JhY2tlbmQgYW5kIHRoZSByZXNwb25zZSB3aWxsIGJlXG4gICAgICAvLyBzZW50LCBjYXVzaW5nIHRhc2suaW52b2tlKCkgdG8gYmUgY2FsbGVkLlxuICAgICAgY29uc3QgX3Rhc2sgPSBab25lLmN1cnJlbnQuc2NoZWR1bGVNYWNyb1Rhc2soXG4gICAgICAgICAgJ1pvbmVNYWNyb1Rhc2tXcmFwcGVyLnN1YnNjcmliZScsIG9uQ29tcGxldGUsIHt9LCAoKSA9PiBudWxsLCBjYW5jZWxUYXNrKTtcbiAgICAgIHNjaGVkdWxlVGFzayhfdGFzayk7XG5cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmIChzY2hlZHVsZWQgJiYgdGFzaykge1xuICAgICAgICAgIHRhc2suem9uZS5jYW5jZWxUYXNrKHRhc2spO1xuICAgICAgICAgIHNjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdWIpIHtcbiAgICAgICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICBzdWIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGRlbGVnYXRlKHJlcXVlc3Q6IFMpOiBPYnNlcnZhYmxlPFI+O1xufVxuXG5leHBvcnQgY2xhc3MgWm9uZU1hY3JvVGFza0Nvbm5lY3Rpb24gZXh0ZW5kcyBab25lTWFjcm9UYXNrV3JhcHBlcjxSZXF1ZXN0LCBSZXNwb25zZT4gaW1wbGVtZW50c1xuICAgIENvbm5lY3Rpb24ge1xuICByZXNwb25zZTogT2JzZXJ2YWJsZTxSZXNwb25zZT47XG4gIGxhc3RDb25uZWN0aW9uOiBDb25uZWN0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZXF1ZXN0OiBSZXF1ZXN0LCBwcml2YXRlIGJhY2tlbmQ6IFhIUkJhY2tlbmQpIHtcbiAgICBzdXBlcigpO1xuICAgIHZhbGlkYXRlUmVxdWVzdFVybChyZXF1ZXN0LnVybCk7XG4gICAgdGhpcy5yZXNwb25zZSA9IHRoaXMud3JhcChyZXF1ZXN0KTtcbiAgfVxuXG4gIGRlbGVnYXRlKHJlcXVlc3Q6IFJlcXVlc3QpOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XG4gICAgdGhpcy5sYXN0Q29ubmVjdGlvbiA9IHRoaXMuYmFja2VuZC5jcmVhdGVDb25uZWN0aW9uKHJlcXVlc3QpO1xuICAgIHJldHVybiB0aGlzLmxhc3RDb25uZWN0aW9uLnJlc3BvbnNlIGFzIE9ic2VydmFibGU8UmVzcG9uc2U+O1xuICB9XG5cbiAgZ2V0IHJlYWR5U3RhdGUoKTogUmVhZHlTdGF0ZSB7XG4gICAgcmV0dXJuICEhdGhpcy5sYXN0Q29ubmVjdGlvbiA/IHRoaXMubGFzdENvbm5lY3Rpb24ucmVhZHlTdGF0ZSA6IFJlYWR5U3RhdGUuVW5zZW50O1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBab25lTWFjcm9UYXNrQmFja2VuZCBpbXBsZW1lbnRzIENvbm5lY3Rpb25CYWNrZW5kIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBiYWNrZW5kOiBYSFJCYWNrZW5kKSB7fVxuXG4gIGNyZWF0ZUNvbm5lY3Rpb24ocmVxdWVzdDogYW55KTogWm9uZU1hY3JvVGFza0Nvbm5lY3Rpb24ge1xuICAgIHJldHVybiBuZXcgWm9uZU1hY3JvVGFza0Nvbm5lY3Rpb24ocmVxdWVzdCwgdGhpcy5iYWNrZW5kKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgWm9uZUNsaWVudEJhY2tlbmQgZXh0ZW5kc1xuICAgIFpvbmVNYWNyb1Rhc2tXcmFwcGVyPEh0dHBSZXF1ZXN0PGFueT4sIEh0dHBFdmVudDxhbnk+PiBpbXBsZW1lbnRzIEh0dHBCYWNrZW5kIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBiYWNrZW5kOiBIdHRwQmFja2VuZCkgeyBzdXBlcigpOyB9XG5cbiAgaGFuZGxlKHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4pOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7IHJldHVybiB0aGlzLndyYXAocmVxdWVzdCk7IH1cblxuICBwcm90ZWN0ZWQgZGVsZWdhdGUocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55Pik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICByZXR1cm4gdGhpcy5iYWNrZW5kLmhhbmRsZShyZXF1ZXN0KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaHR0cEZhY3RvcnkoeGhyQmFja2VuZDogWEhSQmFja2VuZCwgb3B0aW9uczogUmVxdWVzdE9wdGlvbnMpIHtcbiAgY29uc3QgbWFjcm9CYWNrZW5kID0gbmV3IFpvbmVNYWNyb1Rhc2tCYWNrZW5kKHhockJhY2tlbmQpO1xuICByZXR1cm4gbmV3IEh0dHAobWFjcm9CYWNrZW5kLCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHpvbmVXcmFwcGVkSW50ZXJjZXB0aW5nSGFuZGxlcihcbiAgICBiYWNrZW5kOiBIdHRwQmFja2VuZCwgaW50ZXJjZXB0b3JzOiBIdHRwSW50ZXJjZXB0b3JbXSB8IG51bGwpIHtcbiAgY29uc3QgcmVhbEJhY2tlbmQ6IEh0dHBCYWNrZW5kID0gaW50ZXJjZXB0aW5nSGFuZGxlcihiYWNrZW5kLCBpbnRlcmNlcHRvcnMpO1xuICByZXR1cm4gbmV3IFpvbmVDbGllbnRCYWNrZW5kKHJlYWxCYWNrZW5kKTtcbn1cblxuZXhwb3J0IGNvbnN0IFNFUlZFUl9IVFRQX1BST1ZJREVSUzogUHJvdmlkZXJbXSA9IFtcbiAge3Byb3ZpZGU6IEh0dHAsIHVzZUZhY3Rvcnk6IGh0dHBGYWN0b3J5LCBkZXBzOiBbWEhSQmFja2VuZCwgUmVxdWVzdE9wdGlvbnNdfSxcbiAge3Byb3ZpZGU6IEJyb3dzZXJYaHIsIHVzZUNsYXNzOiBTZXJ2ZXJYaHJ9LCB7cHJvdmlkZTogWFNSRlN0cmF0ZWd5LCB1c2VDbGFzczogU2VydmVyWHNyZlN0cmF0ZWd5fSxcbiAge3Byb3ZpZGU6IFhockZhY3RvcnksIHVzZUNsYXNzOiBTZXJ2ZXJYaHJ9LCB7XG4gICAgcHJvdmlkZTogSHR0cEhhbmRsZXIsXG4gICAgdXNlRmFjdG9yeTogem9uZVdyYXBwZWRJbnRlcmNlcHRpbmdIYW5kbGVyLFxuICAgIGRlcHM6IFtIdHRwQmFja2VuZCwgW25ldyBPcHRpb25hbCgpLCBIVFRQX0lOVEVSQ0VQVE9SU11dXG4gIH1cbl07XG4iXX0=