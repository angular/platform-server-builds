/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-server/src/http.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Injector } from '@angular/core';
import { DOCUMENT } from '@angular/common';
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
/** @type {?} */
const xhr2 = require('xhr2');
// @see https://www.w3.org/Protocols/HTTP/1.1/draft-ietf-http-v11-spec-01#URI-syntax
/** @type {?} */
const isAbsoluteUrl = /^[a-zA-Z\-\+.]+:\/\//;
/** @type {?} */
const FORWARD_SLASH = '/';
export class ServerXhr {
    /**
     * @return {?}
     */
    build() {
        return new xhr2.XMLHttpRequest();
    }
}
ServerXhr.decorators = [
    { type: Injectable },
];
/** @nocollapse */ ServerXhr.ɵfac = function ServerXhr_Factory(t) { return new (t || ServerXhr)(); };
/** @nocollapse */ ServerXhr.ɵprov = i0.ɵɵdefineInjectable({ token: ServerXhr, factory: ServerXhr.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ServerXhr, [{
        type: Injectable
    }], null, null); })();
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
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        (observer) => {
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
            const scheduleTask = (/**
             * @param {?} _task
             * @return {?}
             */
            (_task) => {
                task = _task;
                scheduled = true;
                /** @type {?} */
                const delegate = this.delegate(request);
                sub = delegate.subscribe((/**
                 * @param {?} res
                 * @return {?}
                 */
                res => savedResult = res), (/**
                 * @param {?} err
                 * @return {?}
                 */
                err => {
                    if (!scheduled) {
                        throw new Error('An http observable was completed twice. This shouldn\'t happen, please file a bug.');
                    }
                    savedError = err;
                    scheduled = false;
                    task.invoke();
                }), (/**
                 * @return {?}
                 */
                () => {
                    if (!scheduled) {
                        throw new Error('An http observable was completed twice. This shouldn\'t happen, please file a bug.');
                    }
                    scheduled = false;
                    task.invoke();
                }));
            });
            /** @type {?} */
            const cancelTask = (/**
             * @param {?} _task
             * @return {?}
             */
            (_task) => {
                if (!scheduled) {
                    return;
                }
                scheduled = false;
                if (sub) {
                    sub.unsubscribe();
                    sub = null;
                }
            });
            /** @type {?} */
            const onComplete = (/**
             * @return {?}
             */
            () => {
                if (savedError !== null) {
                    observer.error(savedError);
                }
                else {
                    observer.next(savedResult);
                    observer.complete();
                }
            });
            // MockBackend for Http is synchronous, which means that if scheduleTask is by
            // scheduleMacroTask, the request will hit MockBackend and the response will be
            // sent, causing task.invoke() to be called.
            /** @type {?} */
            const _task = Zone.current.scheduleMacroTask('ZoneMacroTaskWrapper.subscribe', onComplete, {}, (/**
             * @return {?}
             */
            () => null), cancelTask);
            scheduleTask(_task);
            return (/**
             * @return {?}
             */
            () => {
                if (scheduled && task) {
                    task.zone.cancelTask(task);
                    scheduled = false;
                }
                if (sub) {
                    sub.unsubscribe();
                    sub = null;
                }
            });
        }));
    }
}
if (false) {
    /**
     * @abstract
     * @protected
     * @param {?} request
     * @return {?}
     */
    ZoneMacroTaskWrapper.prototype.delegate = function (request) { };
}
export class ZoneClientBackend extends ZoneMacroTaskWrapper {
    /**
     * @param {?} backend
     * @param {?} doc
     */
    constructor(backend, doc) {
        super();
        this.backend = backend;
        this.doc = doc;
    }
    /**
     * @param {?} request
     * @return {?}
     */
    handle(request) {
        /** @type {?} */
        const href = this.doc.location.href;
        if (!isAbsoluteUrl.test(request.url) && href) {
            /** @type {?} */
            const urlParts = Array.from(request.url);
            if (request.url[0] === FORWARD_SLASH && href[href.length - 1] === FORWARD_SLASH) {
                urlParts.shift();
            }
            else if (request.url[0] !== FORWARD_SLASH && href[href.length - 1] !== FORWARD_SLASH) {
                urlParts.splice(0, 0, FORWARD_SLASH);
            }
            return this.wrap(request.clone({ url: href + urlParts.join('') }));
        }
        return this.wrap(request);
    }
    /**
     * @protected
     * @param {?} request
     * @return {?}
     */
    delegate(request) {
        return this.backend.handle(request);
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ZoneClientBackend.prototype.backend;
    /**
     * @type {?}
     * @private
     */
    ZoneClientBackend.prototype.doc;
}
/**
 * @param {?} backend
 * @param {?} injector
 * @param {?} doc
 * @return {?}
 */
export function zoneWrappedInterceptingHandler(backend, injector, doc) {
    /** @type {?} */
    const realBackend = new HttpInterceptingHandler(backend, injector);
    return new ZoneClientBackend(realBackend, doc);
}
/** @type {?} */
export const SERVER_HTTP_PROVIDERS = [
    { provide: XhrFactory, useClass: ServerXhr }, {
        provide: HttpHandler,
        useFactory: zoneWrappedInterceptingHandler,
        deps: [HttpBackend, Injector, DOCUMENT]
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXNlcnZlci9zcmMvaHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQVdBLE9BQU8sRUFBQyxVQUFVLEVBQUUsUUFBUSxFQUFXLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQXlCLFdBQVcsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLHdCQUF3QixJQUFJLHVCQUF1QixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdkosT0FBTyxFQUFDLFVBQVUsRUFBeUIsTUFBTSxNQUFNLENBQUM7Ozs7Ozs7Ozs7TUFMbEQsSUFBSSxHQUFRLE9BQU8sQ0FBQyxNQUFNLENBQUM7OztNQVEzQixhQUFhLEdBQUcsc0JBQXNCOztNQUN0QyxhQUFhLEdBQUcsR0FBRztBQUd6QixNQUFNLE9BQU8sU0FBUzs7OztJQUNwQixLQUFLO1FBQ0gsT0FBTyxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNuQyxDQUFDOzs7WUFKRixVQUFVOztxRkFDRSxTQUFTO29FQUFULFNBQVMsV0FBVCxTQUFTO2tEQUFULFNBQVM7Y0FEckIsVUFBVTs7Ozs7O0FBT1gsTUFBTSxPQUFnQixvQkFBb0I7Ozs7O0lBQ3hDLElBQUksQ0FBQyxPQUFVO1FBQ2IsT0FBTyxJQUFJLFVBQVU7Ozs7UUFBQyxDQUFDLFFBQXFCLEVBQUUsRUFBRTs7Z0JBQzFDLElBQUksR0FBUyxtQkFBQSxJQUFJLEVBQUM7O2dCQUNsQixTQUFTLEdBQVksS0FBSzs7Z0JBQzFCLEdBQUcsR0FBc0IsSUFBSTs7Z0JBQzdCLFdBQVcsR0FBUSxJQUFJOztnQkFDdkIsVUFBVSxHQUFRLElBQUk7O2tCQUVwQixZQUFZOzs7O1lBQUcsQ0FBQyxLQUFXLEVBQUUsRUFBRTtnQkFDbkMsSUFBSSxHQUFHLEtB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LFdBQVc7UUFDcEIsVUFBVSxFQUFFLDhCQUE4QjtRQUMxQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQztLQUN4QztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5cbmNvbnN0IHhocjI6IGFueSA9IHJlcXVpcmUoJ3hocjInKTtcblxuaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3RvciwgUHJvdmlkZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SHR0cEV2ZW50LCBIdHRwUmVxdWVzdCwgSHR0cEhhbmRsZXIsIEh0dHBCYWNrZW5kLCBYaHJGYWN0b3J5LCDJtUh0dHBJbnRlcmNlcHRpbmdIYW5kbGVyIGFzIEh0dHBJbnRlcmNlcHRpbmdIYW5kbGVyfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge09ic2VydmFibGUsIE9ic2VydmVyLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG4vLyBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9Qcm90b2NvbHMvSFRUUC8xLjEvZHJhZnQtaWV0Zi1odHRwLXYxMS1zcGVjLTAxI1VSSS1zeW50YXhcbmNvbnN0IGlzQWJzb2x1dGVVcmwgPSAvXlthLXpBLVpcXC1cXCsuXSs6XFwvXFwvLztcbmNvbnN0IEZPUldBUkRfU0xBU0ggPSAnLyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJYaHIgaW1wbGVtZW50cyBYaHJGYWN0b3J5IHtcbiAgYnVpbGQoKTogWE1MSHR0cFJlcXVlc3Qge1xuICAgIHJldHVybiBuZXcgeGhyMi5YTUxIdHRwUmVxdWVzdCgpO1xuICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBab25lTWFjcm9UYXNrV3JhcHBlcjxTLCBSPiB7XG4gIHdyYXAocmVxdWVzdDogUyk6IE9ic2VydmFibGU8Uj4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFI+KSA9PiB7XG4gICAgICBsZXQgdGFzazogVGFzayA9IG51bGwhO1xuICAgICAgbGV0IHNjaGVkdWxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgbGV0IHN1YjogU3Vic2NyaXB0aW9ufG51bGwgPSBudWxsO1xuICAgICAgbGV0IHNhdmVkUmVzdWx0OiBhbnkgPSBudWxsO1xuICAgICAgbGV0IHNhdmVkRXJyb3I6IGFueSA9IG51bGw7XG5cbiAgICAgIGNvbnN0IHNjaGVkdWxlVGFzayA9IChfdGFzazogVGFzaykgPT4ge1xuICAgICAgICB0YXNrID0gX3Rhc2s7XG4gICAgICAgIHNjaGVkdWxlZCA9IHRydWU7XG5cbiAgICAgICAgY29uc3QgZGVsZWdhdGUgPSB0aGlzLmRlbGVnYXRlKHJlcXVlc3QpO1xuICAgICAgICBzdWIgPSBkZWxlZ2F0ZS5zdWJzY3JpYmUoXG4gICAgICAgICAgICByZXMgPT4gc2F2ZWRSZXN1bHQgPSByZXMsXG4gICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICBpZiAoIXNjaGVkdWxlZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICAgICAgJ0FuIGh0dHAgb2JzZXJ2YWJsZSB3YXMgY29tcGxldGVkIHR3aWNlLiBUaGlzIHNob3VsZG5cXCd0IGhhcHBlbiwgcGxlYXNlIGZpbGUgYSBidWcuJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2F2ZWRFcnJvciA9IGVycjtcbiAgICAgICAgICAgICAgc2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgIHRhc2suaW52b2tlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIXNjaGVkdWxlZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICAgICAgJ0FuIGh0dHAgb2JzZXJ2YWJsZSB3YXMgY29tcGxldGVkIHR3aWNlLiBUaGlzIHNob3VsZG5cXCd0IGhhcHBlbiwgcGxlYXNlIGZpbGUgYSBidWcuJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgIHRhc2suaW52b2tlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGNhbmNlbFRhc2sgPSAoX3Rhc2s6IFRhc2spID0+IHtcbiAgICAgICAgaWYgKCFzY2hlZHVsZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICAgIGlmIChzdWIpIHtcbiAgICAgICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICBzdWIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBvbkNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICBpZiAoc2F2ZWRFcnJvciAhPT0gbnVsbCkge1xuICAgICAgICAgIG9ic2VydmVyLmVycm9yKHNhdmVkRXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9ic2VydmVyLm5leHQoc2F2ZWRSZXN1bHQpO1xuICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vIE1vY2tCYWNrZW5kIGZvciBIdHRwIGlzIHN5bmNocm9ub3VzLCB3aGljaCBtZWFucyB0aGF0IGlmIHNjaGVkdWxlVGFzayBpcyBieVxuICAgICAgLy8gc2NoZWR1bGVNYWNyb1Rhc2ssIHRoZSByZXF1ZXN0IHdpbGwgaGl0IE1vY2tCYWNrZW5kIGFuZCB0aGUgcmVzcG9uc2Ugd2lsbCBiZVxuICAgICAgLy8gc2VudCwgY2F1c2luZyB0YXNrLmludm9rZSgpIHRvIGJlIGNhbGxlZC5cbiAgICAgIGNvbnN0IF90YXNrID0gWm9uZS5jdXJyZW50LnNjaGVkdWxlTWFjcm9UYXNrKFxuICAgICAgICAgICdab25lTWFjcm9UYXNrV3JhcHBlci5zdWJzY3JpYmUnLCBvbkNvbXBsZXRlLCB7fSwgKCkgPT4gbnVsbCwgY2FuY2VsVGFzayk7XG4gICAgICBzY2hlZHVsZVRhc2soX3Rhc2spO1xuXG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAoc2NoZWR1bGVkICYmIHRhc2spIHtcbiAgICAgICAgICB0YXNrLnpvbmUuY2FuY2VsVGFzayh0YXNrKTtcbiAgICAgICAgICBzY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3ViKSB7XG4gICAgICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgc3ViID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBkZWxlZ2F0ZShyZXF1ZXN0OiBTKTogT2JzZXJ2YWJsZTxSPjtcbn1cblxuZXhwb3J0IGNsYXNzIFpvbmVDbGllbnRCYWNrZW5kIGV4dGVuZHNcbiAgICBab25lTWFjcm9UYXNrV3JhcHBlcjxIdHRwUmVxdWVzdDxhbnk+LCBIdHRwRXZlbnQ8YW55Pj4gaW1wbGVtZW50cyBIdHRwQmFja2VuZCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYmFja2VuZDogSHR0cEJhY2tlbmQsIHByaXZhdGUgZG9jOiBEb2N1bWVudCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBoYW5kbGUocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55Pik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICBjb25zdCBocmVmID0gdGhpcy5kb2MubG9jYXRpb24uaHJlZjtcbiAgICBpZiAoIWlzQWJzb2x1dGVVcmwudGVzdChyZXF1ZXN0LnVybCkgJiYgaHJlZikge1xuICAgICAgY29uc3QgdXJsUGFydHMgPSBBcnJheS5mcm9tKHJlcXVlc3QudXJsKTtcbiAgICAgIGlmIChyZXF1ZXN0LnVybFswXSA9PT0gRk9SV0FSRF9TTEFTSCAmJiBocmVmW2hyZWYubGVuZ3RoIC0gMV0gPT09IEZPUldBUkRfU0xBU0gpIHtcbiAgICAgICAgdXJsUGFydHMuc2hpZnQoKTtcbiAgICAgIH0gZWxzZSBpZiAocmVxdWVzdC51cmxbMF0gIT09IEZPUldBUkRfU0xBU0ggJiYgaHJlZltocmVmLmxlbmd0aCAtIDFdICE9PSBGT1JXQVJEX1NMQVNIKSB7XG4gICAgICAgIHVybFBhcnRzLnNwbGljZSgwLCAwLCBGT1JXQVJEX1NMQVNIKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLndyYXAocmVxdWVzdC5jbG9uZSh7dXJsOiBocmVmICsgdXJsUGFydHMuam9pbignJyl9KSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLndyYXAocmVxdWVzdCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZGVsZWdhdGUocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55Pik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICByZXR1cm4gdGhpcy5iYWNrZW5kLmhhbmRsZShyZXF1ZXN0KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gem9uZVdyYXBwZWRJbnRlcmNlcHRpbmdIYW5kbGVyKFxuICAgIGJhY2tlbmQ6IEh0dHBCYWNrZW5kLCBpbmplY3RvcjogSW5qZWN0b3IsIGRvYzogRG9jdW1lbnQpIHtcbiAgY29uc3QgcmVhbEJhY2tlbmQ6IEh0dHBCYWNrZW5kID0gbmV3IEh0dHBJbnRlcmNlcHRpbmdIYW5kbGVyKGJhY2tlbmQsIGluamVjdG9yKTtcbiAgcmV0dXJuIG5ldyBab25lQ2xpZW50QmFja2VuZChyZWFsQmFja2VuZCwgZG9jKTtcbn1cblxuZXhwb3J0IGNvbnN0IFNFUlZFUl9IVFRQX1BST1ZJREVSUzogUHJvdmlkZXJbXSA9IFtcbiAge3Byb3ZpZGU6IFhockZhY3RvcnksIHVzZUNsYXNzOiBTZXJ2ZXJYaHJ9LCB7XG4gICAgcHJvdmlkZTogSHR0cEhhbmRsZXIsXG4gICAgdXNlRmFjdG9yeTogem9uZVdyYXBwZWRJbnRlcmNlcHRpbmdIYW5kbGVyLFxuICAgIGRlcHM6IFtIdHRwQmFja2VuZCwgSW5qZWN0b3IsIERPQ1VNRU5UXVxuICB9XG5dO1xuIl19