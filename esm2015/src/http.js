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
import { Injectable, Injector } from '@angular/core';
import { BrowserXhr, Http, ReadyState, RequestOptions, XHRBackend, XSRFStrategy } from '@angular/http';
import { HttpHandler, HttpBackend, XhrFactory, ɵHttpInterceptingHandler as HttpInterceptingHandler } from '@angular/common/http';
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
 * @param {?} injector
 * @return {?}
 */
export function zoneWrappedInterceptingHandler(backend, injector) {
    const /** @type {?} */ realBackend = new HttpInterceptingHandler(backend, injector);
    return new ZoneClientBackend(realBackend);
}
export const /** @type {?} */ SERVER_HTTP_PROVIDERS = [
    { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions] },
    { provide: BrowserXhr, useClass: ServerXhr }, { provide: XSRFStrategy, useClass: ServerXsrfStrategy },
    { provide: XhrFactory, useClass: ServerXhr }, {
        provide: HttpHandler,
        useFactory: zoneWrappedInterceptingHandler,
        deps: [HttpBackend, Injector]
    }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXNlcnZlci9zcmMvaHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLHVCQUFNLElBQUksR0FBUSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFbEMsT0FBTyxFQUFDLFVBQVUsRUFBRSxRQUFRLEVBQWtDLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxVQUFVLEVBQWlDLElBQUksRUFBRSxVQUFVLEVBQVcsY0FBYyxFQUFZLFVBQVUsRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFdkosT0FBTyxFQUF5QixXQUFXLEVBQXNDLFdBQVcsRUFBRSxVQUFVLEVBQUUsd0JBQXdCLElBQUksdUJBQXVCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUUzTCxPQUFPLEVBQUMsVUFBVSxFQUF5QixNQUFNLE1BQU0sQ0FBQztBQUV4RCx1QkFBTSxhQUFhLEdBQUcsc0JBQXNCLENBQUM7Ozs7O0FBRTdDLDRCQUE0QixHQUFXO0lBQ3JDLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxnRUFBZ0UsR0FBRyxFQUFFLENBQUMsQ0FBQztLQUN4RjtDQUNGO0FBR0QsTUFBTTs7OztJQUNKLEtBQUssS0FBcUIsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUU7OztZQUY5RCxVQUFVOztBQU1YLE1BQU07Ozs7O0lBQ0osZ0JBQWdCLENBQUMsR0FBWSxLQUFVOzs7WUFGeEMsVUFBVTs7Ozs7O0FBS1gsTUFBTTs7Ozs7SUFDSixJQUFJLENBQUMsT0FBVTtRQUNiLE1BQU0sQ0FBQyxJQUFJLFVBQVUsQ0FBQyxDQUFDLFFBQXFCLEVBQUUsRUFBRTtZQUM5Qyxx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LElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3JDO0NBQ0Y7Ozs7Ozs7Ozs7QUFFRCxNQUFNLHNCQUFzQixVQUFzQixFQUFFLE9BQXVCO0lBQ3pFLHVCQUFNLFlBQVksR0FBRyxJQUFJLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzFELE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7Q0FDeEM7Ozs7OztBQUVELE1BQU0seUNBQXlDLE9BQW9CLEVBQUUsUUFBa0I7SUFDckYsdUJBQU0sV0FBVyxHQUFnQixJQUFJLHVCQUF1QixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNoRixNQUFNLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztDQUMzQztBQUVELE1BQU0sQ0FBQyx1QkFBTSxxQkFBcUIsR0FBZTtJQUMvQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLEVBQUM7SUFDNUUsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFDO0lBQ2pHLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFDLEVBQUU7UUFDMUMsT0FBTyxFQUFFLFdBQVc7UUFDcEIsVUFBVSxFQUFFLDhCQUE4QjtRQUMxQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDO0tBQzlCO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuY29uc3QgeGhyMjogYW55ID0gcmVxdWlyZSgneGhyMicpO1xuXG5pbXBvcnQge0luamVjdGFibGUsIEluamVjdG9yLCBPcHRpb25hbCwgUHJvdmlkZXIsIEluamVjdEZsYWdzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QnJvd3NlclhociwgQ29ubmVjdGlvbiwgQ29ubmVjdGlvbkJhY2tlbmQsIEh0dHAsIFJlYWR5U3RhdGUsIFJlcXVlc3QsIFJlcXVlc3RPcHRpb25zLCBSZXNwb25zZSwgWEhSQmFja2VuZCwgWFNSRlN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9odHRwJztcblxuaW1wb3J0IHtIdHRwRXZlbnQsIEh0dHBSZXF1ZXN0LCBIdHRwSGFuZGxlciwgSHR0cEludGVyY2VwdG9yLCBIVFRQX0lOVEVSQ0VQVE9SUywgSHR0cEJhY2tlbmQsIFhockZhY3RvcnksIMm1SHR0cEludGVyY2VwdGluZ0hhbmRsZXIgYXMgSHR0cEludGVyY2VwdGluZ0hhbmRsZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHtPYnNlcnZhYmxlLCBPYnNlcnZlciwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuY29uc3QgaXNBYnNvbHV0ZVVybCA9IC9eW2EtekEtWlxcLVxcKy5dKzpcXC9cXC8vO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZVJlcXVlc3RVcmwodXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgaWYgKCFpc0Fic29sdXRlVXJsLnRlc3QodXJsKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgVVJMcyByZXF1ZXN0ZWQgdmlhIEh0dHAgb24gdGhlIHNlcnZlciBtdXN0IGJlIGFic29sdXRlLiBVUkw6ICR7dXJsfWApO1xuICB9XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJYaHIgaW1wbGVtZW50cyBCcm93c2VyWGhyIHtcbiAgYnVpbGQoKTogWE1MSHR0cFJlcXVlc3QgeyByZXR1cm4gbmV3IHhocjIuWE1MSHR0cFJlcXVlc3QoKTsgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VydmVyWHNyZlN0cmF0ZWd5IGltcGxlbWVudHMgWFNSRlN0cmF0ZWd5IHtcbiAgY29uZmlndXJlUmVxdWVzdChyZXE6IFJlcXVlc3QpOiB2b2lkIHt9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBab25lTWFjcm9UYXNrV3JhcHBlcjxTLCBSPiB7XG4gIHdyYXAocmVxdWVzdDogUyk6IE9ic2VydmFibGU8Uj4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFI+KSA9PiB7XG4gICAgICBsZXQgdGFzazogVGFzayA9IG51bGwgITtcbiAgICAgIGxldCBzY2hlZHVsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgIGxldCBzdWI6IFN1YnNjcmlwdGlvbnxudWxsID0gbnVsbDtcbiAgICAgIGxldCBzYXZlZFJlc3VsdDogYW55ID0gbnVsbDtcbiAgICAgIGxldCBzYXZlZEVycm9yOiBhbnkgPSBudWxsO1xuXG4gICAgICBjb25zdCBzY2hlZHVsZVRhc2sgPSAoX3Rhc2s6IFRhc2spID0+IHtcbiAgICAgICAgdGFzayA9IF90YXNrO1xuICAgICAgICBzY2hlZHVsZWQgPSB0cnVlO1xuXG4gICAgICAgIGNvbnN0IGRlbGVnYXRlID0gdGhpcy5kZWxlZ2F0ZShyZXF1ZXN0KTtcbiAgICAgICAgc3ViID0gZGVsZWdhdGUuc3Vic2NyaWJlKFxuICAgICAgICAgICAgcmVzID0+IHNhdmVkUmVzdWx0ID0gcmVzLFxuICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFzY2hlZHVsZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICdBbiBodHRwIG9ic2VydmFibGUgd2FzIGNvbXBsZXRlZCB0d2ljZS4gVGhpcyBzaG91bGRuXFwndCBoYXBwZW4sIHBsZWFzZSBmaWxlIGEgYnVnLicpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNhdmVkRXJyb3IgPSBlcnI7XG4gICAgICAgICAgICAgIHNjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICB0YXNrLmludm9rZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFzY2hlZHVsZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICdBbiBodHRwIG9ic2VydmFibGUgd2FzIGNvbXBsZXRlZCB0d2ljZS4gVGhpcyBzaG91bGRuXFwndCBoYXBwZW4sIHBsZWFzZSBmaWxlIGEgYnVnLicpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICB0YXNrLmludm9rZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBjYW5jZWxUYXNrID0gKF90YXNrOiBUYXNrKSA9PiB7XG4gICAgICAgIGlmICghc2NoZWR1bGVkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICBpZiAoc3ViKSB7XG4gICAgICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgc3ViID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgY29uc3Qgb25Db21wbGV0ZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKHNhdmVkRXJyb3IgIT09IG51bGwpIHtcbiAgICAgICAgICBvYnNlcnZlci5lcnJvcihzYXZlZEVycm9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvYnNlcnZlci5uZXh0KHNhdmVkUmVzdWx0KTtcbiAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyBNb2NrQmFja2VuZCBmb3IgSHR0cCBpcyBzeW5jaHJvbm91cywgd2hpY2ggbWVhbnMgdGhhdCBpZiBzY2hlZHVsZVRhc2sgaXMgYnlcbiAgICAgIC8vIHNjaGVkdWxlTWFjcm9UYXNrLCB0aGUgcmVxdWVzdCB3aWxsIGhpdCBNb2NrQmFja2VuZCBhbmQgdGhlIHJlc3BvbnNlIHdpbGwgYmVcbiAgICAgIC8vIHNlbnQsIGNhdXNpbmcgdGFzay5pbnZva2UoKSB0byBiZSBjYWxsZWQuXG4gICAgICBjb25zdCBfdGFzayA9IFpvbmUuY3VycmVudC5zY2hlZHVsZU1hY3JvVGFzayhcbiAgICAgICAgICAnWm9uZU1hY3JvVGFza1dyYXBwZXIuc3Vic2NyaWJlJywgb25Db21wbGV0ZSwge30sICgpID0+IG51bGwsIGNhbmNlbFRhc2spO1xuICAgICAgc2NoZWR1bGVUYXNrKF90YXNrKTtcblxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKHNjaGVkdWxlZCAmJiB0YXNrKSB7XG4gICAgICAgICAgdGFzay56b25lLmNhbmNlbFRhc2sodGFzayk7XG4gICAgICAgICAgc2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN1Yikge1xuICAgICAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIHN1YiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgZGVsZWdhdGUocmVxdWVzdDogUyk6IE9ic2VydmFibGU8Uj47XG59XG5cbmV4cG9ydCBjbGFzcyBab25lTWFjcm9UYXNrQ29ubmVjdGlvbiBleHRlbmRzIFpvbmVNYWNyb1Rhc2tXcmFwcGVyPFJlcXVlc3QsIFJlc3BvbnNlPiBpbXBsZW1lbnRzXG4gICAgQ29ubmVjdGlvbiB7XG4gIHJlc3BvbnNlOiBPYnNlcnZhYmxlPFJlc3BvbnNlPjtcbiAgbGFzdENvbm5lY3Rpb246IENvbm5lY3Rpb247XG5cbiAgY29uc3RydWN0b3IocHVibGljIHJlcXVlc3Q6IFJlcXVlc3QsIHByaXZhdGUgYmFja2VuZDogWEhSQmFja2VuZCkge1xuICAgIHN1cGVyKCk7XG4gICAgdmFsaWRhdGVSZXF1ZXN0VXJsKHJlcXVlc3QudXJsKTtcbiAgICB0aGlzLnJlc3BvbnNlID0gdGhpcy53cmFwKHJlcXVlc3QpO1xuICB9XG5cbiAgZGVsZWdhdGUocmVxdWVzdDogUmVxdWVzdCk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICB0aGlzLmxhc3RDb25uZWN0aW9uID0gdGhpcy5iYWNrZW5kLmNyZWF0ZUNvbm5lY3Rpb24ocmVxdWVzdCk7XG4gICAgcmV0dXJuIHRoaXMubGFzdENvbm5lY3Rpb24ucmVzcG9uc2UgYXMgT2JzZXJ2YWJsZTxSZXNwb25zZT47XG4gIH1cblxuICBnZXQgcmVhZHlTdGF0ZSgpOiBSZWFkeVN0YXRlIHtcbiAgICByZXR1cm4gISF0aGlzLmxhc3RDb25uZWN0aW9uID8gdGhpcy5sYXN0Q29ubmVjdGlvbi5yZWFkeVN0YXRlIDogUmVhZHlTdGF0ZS5VbnNlbnQ7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFpvbmVNYWNyb1Rhc2tCYWNrZW5kIGltcGxlbWVudHMgQ29ubmVjdGlvbkJhY2tlbmQge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJhY2tlbmQ6IFhIUkJhY2tlbmQpIHt9XG5cbiAgY3JlYXRlQ29ubmVjdGlvbihyZXF1ZXN0OiBhbnkpOiBab25lTWFjcm9UYXNrQ29ubmVjdGlvbiB7XG4gICAgcmV0dXJuIG5ldyBab25lTWFjcm9UYXNrQ29ubmVjdGlvbihyZXF1ZXN0LCB0aGlzLmJhY2tlbmQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBab25lQ2xpZW50QmFja2VuZCBleHRlbmRzXG4gICAgWm9uZU1hY3JvVGFza1dyYXBwZXI8SHR0cFJlcXVlc3Q8YW55PiwgSHR0cEV2ZW50PGFueT4+IGltcGxlbWVudHMgSHR0cEJhY2tlbmQge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJhY2tlbmQ6IEh0dHBCYWNrZW5kKSB7IHN1cGVyKCk7IH1cblxuICBoYW5kbGUocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55Pik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHsgcmV0dXJuIHRoaXMud3JhcChyZXF1ZXN0KTsgfVxuXG4gIHByb3RlY3RlZCBkZWxlZ2F0ZShyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+KTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIHJldHVybiB0aGlzLmJhY2tlbmQuaGFuZGxlKHJlcXVlc3QpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBodHRwRmFjdG9yeSh4aHJCYWNrZW5kOiBYSFJCYWNrZW5kLCBvcHRpb25zOiBSZXF1ZXN0T3B0aW9ucykge1xuICBjb25zdCBtYWNyb0JhY2tlbmQgPSBuZXcgWm9uZU1hY3JvVGFza0JhY2tlbmQoeGhyQmFja2VuZCk7XG4gIHJldHVybiBuZXcgSHR0cChtYWNyb0JhY2tlbmQsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gem9uZVdyYXBwZWRJbnRlcmNlcHRpbmdIYW5kbGVyKGJhY2tlbmQ6IEh0dHBCYWNrZW5kLCBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgY29uc3QgcmVhbEJhY2tlbmQ6IEh0dHBCYWNrZW5kID0gbmV3IEh0dHBJbnRlcmNlcHRpbmdIYW5kbGVyKGJhY2tlbmQsIGluamVjdG9yKTtcbiAgcmV0dXJuIG5ldyBab25lQ2xpZW50QmFja2VuZChyZWFsQmFja2VuZCk7XG59XG5cbmV4cG9ydCBjb25zdCBTRVJWRVJfSFRUUF9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbXG4gIHtwcm92aWRlOiBIdHRwLCB1c2VGYWN0b3J5OiBodHRwRmFjdG9yeSwgZGVwczogW1hIUkJhY2tlbmQsIFJlcXVlc3RPcHRpb25zXX0sXG4gIHtwcm92aWRlOiBCcm93c2VyWGhyLCB1c2VDbGFzczogU2VydmVyWGhyfSwge3Byb3ZpZGU6IFhTUkZTdHJhdGVneSwgdXNlQ2xhc3M6IFNlcnZlclhzcmZTdHJhdGVneX0sXG4gIHtwcm92aWRlOiBYaHJGYWN0b3J5LCB1c2VDbGFzczogU2VydmVyWGhyfSwge1xuICAgIHByb3ZpZGU6IEh0dHBIYW5kbGVyLFxuICAgIHVzZUZhY3Rvcnk6IHpvbmVXcmFwcGVkSW50ZXJjZXB0aW5nSGFuZGxlcixcbiAgICBkZXBzOiBbSHR0cEJhY2tlbmQsIEluamVjdG9yXVxuICB9XG5dO1xuIl19