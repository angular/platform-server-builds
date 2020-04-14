/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-server/src/http.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
/** @type {?} */
const xhr2 = require('xhr2');
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
     */
    constructor(backend) {
        super();
        this.backend = backend;
    }
    /**
     * @param {?} request
     * @return {?}
     */
    handle(request) {
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
    { provide: XhrFactory, useClass: ServerXhr },
    { provide: HttpHandler, useFactory: zoneWrappedInterceptingHandler, deps: [HttpBackend, Injector] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXNlcnZlci9zcmMvaHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQVdBLE9BQU8sRUFBQyxVQUFVLEVBQUUsUUFBUSxFQUFXLE1BQU0sZUFBZSxDQUFDO0FBRTdELE9BQU8sRUFBeUIsV0FBVyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsd0JBQXdCLElBQUksdUJBQXVCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUV2SixPQUFPLEVBQUMsVUFBVSxFQUF5QixNQUFNLE1BQU0sQ0FBQzs7Ozs7Ozs7OztNQU5sRCxJQUFJLEdBQVEsT0FBTyxDQUFDLE1BQU0sQ0FBQztBQVNqQyxNQUFNLE9BQU8sU0FBUzs7OztJQUNwQixLQUFLO1FBQ0gsT0FBTyxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNuQyxDQUFDOzs7WUFKRixVQUFVOztxRkFDRSxTQUFTO29FQUFULFNBQVMsV0FBVCxTQUFTO2tEQUFULFNBQVM7Y0FEckIsVUFBVTs7Ozs7O0FBT1gsTUFBTSxPQUFnQixvQkFBb0I7Ozs7O0lBQ3hDLElBQUksQ0FBQyxPQUFVO1FBQ2IsT0FBTyxJQUFJLFVBQVU7Ozs7UUFBQyxDQUFDLFFBQXFCLEVBQUUsRUFBRTs7Z0JBQzFDLElBQUksR0FBUyxtQkFBQSxJQUFJLEVBQUM7O2dCQUNsQixTQUFTLEdBQVksS0FBSzs7Z0JBQzFCLEdBQUcsR0FBc0IsSUFBSTs7Z0JBQzdCLFdBQVcsR0FBUSxJQUFJOztnQkFDdkIsVUFBVSxHQUFRLElBQUk7O2tCQUVwQixZQUFZOzs7O1lBQUcsQ0FBQyxLQUFXLEVBQUUsRUFBRTtnQkFDbkMsSUFBSSxHQUFHLEtBQUssQ0FBQztnQkFDYixTQUFTLEdBQUcsSUFBSSxDQUFDOztzQkFFWCxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7Z0JBQ3ZDLEdB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RCxNQUFNLE9BQU8scUJBQXFCLEdBQWU7SUFDL0MsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUM7SUFDMUMsRUFBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSw4QkFBOEIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLEVBQUM7Q0FDbEciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cblxuY29uc3QgeGhyMjogYW55ID0gcmVxdWlyZSgneGhyMicpO1xuXG5pbXBvcnQge0luamVjdGFibGUsIEluamVjdG9yLCBQcm92aWRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7SHR0cEV2ZW50LCBIdHRwUmVxdWVzdCwgSHR0cEhhbmRsZXIsIEh0dHBCYWNrZW5kLCBYaHJGYWN0b3J5LCDJtUh0dHBJbnRlcmNlcHRpbmdIYW5kbGVyIGFzIEh0dHBJbnRlcmNlcHRpbmdIYW5kbGVyfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7T2JzZXJ2YWJsZSwgT2JzZXJ2ZXIsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJYaHIgaW1wbGVtZW50cyBYaHJGYWN0b3J5IHtcbiAgYnVpbGQoKTogWE1MSHR0cFJlcXVlc3Qge1xuICAgIHJldHVybiBuZXcgeGhyMi5YTUxIdHRwUmVxdWVzdCgpO1xuICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBab25lTWFjcm9UYXNrV3JhcHBlcjxTLCBSPiB7XG4gIHdyYXAocmVxdWVzdDogUyk6IE9ic2VydmFibGU8Uj4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFI+KSA9PiB7XG4gICAgICBsZXQgdGFzazogVGFzayA9IG51bGwhO1xuICAgICAgbGV0IHNjaGVkdWxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgbGV0IHN1YjogU3Vic2NyaXB0aW9ufG51bGwgPSBudWxsO1xuICAgICAgbGV0IHNhdmVkUmVzdWx0OiBhbnkgPSBudWxsO1xuICAgICAgbGV0IHNhdmVkRXJyb3I6IGFueSA9IG51bGw7XG5cbiAgICAgIGNvbnN0IHNjaGVkdWxlVGFzayA9IChfdGFzazogVGFzaykgPT4ge1xuICAgICAgICB0YXNrID0gX3Rhc2s7XG4gICAgICAgIHNjaGVkdWxlZCA9IHRydWU7XG5cbiAgICAgICAgY29uc3QgZGVsZWdhdGUgPSB0aGlzLmRlbGVnYXRlKHJlcXVlc3QpO1xuICAgICAgICBzdWIgPSBkZWxlZ2F0ZS5zdWJzY3JpYmUoXG4gICAgICAgICAgICByZXMgPT4gc2F2ZWRSZXN1bHQgPSByZXMsXG4gICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICBpZiAoIXNjaGVkdWxlZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICAgICAgJ0FuIGh0dHAgb2JzZXJ2YWJsZSB3YXMgY29tcGxldGVkIHR3aWNlLiBUaGlzIHNob3VsZG5cXCd0IGhhcHBlbiwgcGxlYXNlIGZpbGUgYSBidWcuJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2F2ZWRFcnJvciA9IGVycjtcbiAgICAgICAgICAgICAgc2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgIHRhc2suaW52b2tlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIXNjaGVkdWxlZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICAgICAgJ0FuIGh0dHAgb2JzZXJ2YWJsZSB3YXMgY29tcGxldGVkIHR3aWNlLiBUaGlzIHNob3VsZG5cXCd0IGhhcHBlbiwgcGxlYXNlIGZpbGUgYSBidWcuJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgIHRhc2suaW52b2tlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGNhbmNlbFRhc2sgPSAoX3Rhc2s6IFRhc2spID0+IHtcbiAgICAgICAgaWYgKCFzY2hlZHVsZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICAgIGlmIChzdWIpIHtcbiAgICAgICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICBzdWIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBvbkNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICBpZiAoc2F2ZWRFcnJvciAhPT0gbnVsbCkge1xuICAgICAgICAgIG9ic2VydmVyLmVycm9yKHNhdmVkRXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9ic2VydmVyLm5leHQoc2F2ZWRSZXN1bHQpO1xuICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vIE1vY2tCYWNrZW5kIGZvciBIdHRwIGlzIHN5bmNocm9ub3VzLCB3aGljaCBtZWFucyB0aGF0IGlmIHNjaGVkdWxlVGFzayBpcyBieVxuICAgICAgLy8gc2NoZWR1bGVNYWNyb1Rhc2ssIHRoZSByZXF1ZXN0IHdpbGwgaGl0IE1vY2tCYWNrZW5kIGFuZCB0aGUgcmVzcG9uc2Ugd2lsbCBiZVxuICAgICAgLy8gc2VudCwgY2F1c2luZyB0YXNrLmludm9rZSgpIHRvIGJlIGNhbGxlZC5cbiAgICAgIGNvbnN0IF90YXNrID0gWm9uZS5jdXJyZW50LnNjaGVkdWxlTWFjcm9UYXNrKFxuICAgICAgICAgICdab25lTWFjcm9UYXNrV3JhcHBlci5zdWJzY3JpYmUnLCBvbkNvbXBsZXRlLCB7fSwgKCkgPT4gbnVsbCwgY2FuY2VsVGFzayk7XG4gICAgICBzY2hlZHVsZVRhc2soX3Rhc2spO1xuXG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAoc2NoZWR1bGVkICYmIHRhc2spIHtcbiAgICAgICAgICB0YXNrLnpvbmUuY2FuY2VsVGFzayh0YXNrKTtcbiAgICAgICAgICBzY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3ViKSB7XG4gICAgICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgc3ViID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBkZWxlZ2F0ZShyZXF1ZXN0OiBTKTogT2JzZXJ2YWJsZTxSPjtcbn1cblxuZXhwb3J0IGNsYXNzIFpvbmVDbGllbnRCYWNrZW5kIGV4dGVuZHNcbiAgICBab25lTWFjcm9UYXNrV3JhcHBlcjxIdHRwUmVxdWVzdDxhbnk+LCBIdHRwRXZlbnQ8YW55Pj4gaW1wbGVtZW50cyBIdHRwQmFja2VuZCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYmFja2VuZDogSHR0cEJhY2tlbmQpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgaGFuZGxlKHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4pOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgcmV0dXJuIHRoaXMud3JhcChyZXF1ZXN0KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBkZWxlZ2F0ZShyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+KTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIHJldHVybiB0aGlzLmJhY2tlbmQuaGFuZGxlKHJlcXVlc3QpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB6b25lV3JhcHBlZEludGVyY2VwdGluZ0hhbmRsZXIoYmFja2VuZDogSHR0cEJhY2tlbmQsIGluamVjdG9yOiBJbmplY3Rvcikge1xuICBjb25zdCByZWFsQmFja2VuZDogSHR0cEJhY2tlbmQgPSBuZXcgSHR0cEludGVyY2VwdGluZ0hhbmRsZXIoYmFja2VuZCwgaW5qZWN0b3IpO1xuICByZXR1cm4gbmV3IFpvbmVDbGllbnRCYWNrZW5kKHJlYWxCYWNrZW5kKTtcbn1cblxuZXhwb3J0IGNvbnN0IFNFUlZFUl9IVFRQX1BST1ZJREVSUzogUHJvdmlkZXJbXSA9IFtcbiAge3Byb3ZpZGU6IFhockZhY3RvcnksIHVzZUNsYXNzOiBTZXJ2ZXJYaHJ9LFxuICB7cHJvdmlkZTogSHR0cEhhbmRsZXIsIHVzZUZhY3Rvcnk6IHpvbmVXcmFwcGVkSW50ZXJjZXB0aW5nSGFuZGxlciwgZGVwczogW0h0dHBCYWNrZW5kLCBJbmplY3Rvcl19XG5dO1xuIl19