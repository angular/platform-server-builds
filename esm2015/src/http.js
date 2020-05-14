/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-server/src/http.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
import { DOCUMENT } from '@angular/common';
import { HttpHandler, HttpBackend, XhrFactory, ɵHttpInterceptingHandler as HttpInterceptingHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
// @see https://www.w3.org/Protocols/HTTP/1.1/draft-ietf-http-v11-spec-01#URI-syntax
/** @type {?} */
const isAbsoluteUrl = /^[a-zA-Z\-\+.]+:\/\//;
/** @type {?} */
const FORWARD_SLASH = '/';
let ServerXhr = /** @class */ (() => {
    class ServerXhr {
        /**
         * @return {?}
         */
        build() {
            return new xhr2.XMLHttpRequest();
        }
    }
    ServerXhr.decorators = [
        { type: Injectable }
    ];
    return ServerXhr;
})();
export { ServerXhr };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXNlcnZlci9zcmMvaHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O01BU00sSUFBSSxHQUFRLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFFakMsT0FBTyxFQUFDLFVBQVUsRUFBRSxRQUFRLEVBQVcsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBeUIsV0FBVyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsd0JBQXdCLElBQUksdUJBQXVCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN2SixPQUFPLEVBQUMsVUFBVSxFQUF5QixNQUFNLE1BQU0sQ0FBQzs7O01BR2xELGFBQWEsR0FBRyxzQkFBc0I7O01BQ3RDLGFBQWEsR0FBRyxHQUFHO0FBRXpCO0lBQUEsTUFDYSxTQUFTOzs7O1FBQ3BCLEtBQUs7WUFDSCxPQUFPLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25DLENBQUM7OztnQkFKRixVQUFVOztJQUtYLGdCQUFDO0tBQUE7U0FKWSxTQUFTOzs7OztBQU10QixNQUFNLE9BQWdCLG9CQUFvQjs7Ozs7SUFDeEMsSUFBSSxDQUFDLE9BQVU7UUFDYixPQUFPLElBQUksVUFBVTs7OztRQUFDLENBQUMsUUFBcUIsRUFBRSxFQUFFOztnQkFDMUMsSUFBSSxHQUFTLG1CQUFBLElBQUksRUFBQzs7Z0JBQ2xCLFNBQVMsR0FBWSxLQUFLOztnQkFDMUIsR0FBRyxHQUFzQixJQUFJOztnQkFDN0IsV0FBVyxHQUFRLElBQUk7O2dCQUN2QixVQUFVLEdBQVEsSUFBSTs7a0JBRXBCLFlBQVk7Ozs7WUFBRyxDQUFDLEtBQVcsRUFBRSxFQUFFO2dCQUNuQyxJQUFJLEdBQUcsS0FBSyxDQUFDO2dCQUNiLFNBQVMsR0FBRyxJQUFJ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O1FBQzFDLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDO0tBQ3hDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cblxuY29uc3QgeGhyMjogYW55ID0gcmVxdWlyZSgneGhyMicpO1xuXG5pbXBvcnQge0luamVjdGFibGUsIEluamVjdG9yLCBQcm92aWRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtIdHRwRXZlbnQsIEh0dHBSZXF1ZXN0LCBIdHRwSGFuZGxlciwgSHR0cEJhY2tlbmQsIFhockZhY3RvcnksIMm1SHR0cEludGVyY2VwdGluZ0hhbmRsZXIgYXMgSHR0cEludGVyY2VwdGluZ0hhbmRsZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgT2JzZXJ2ZXIsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbi8vIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1Byb3RvY29scy9IVFRQLzEuMS9kcmFmdC1pZXRmLWh0dHAtdjExLXNwZWMtMDEjVVJJLXN5bnRheFxuY29uc3QgaXNBYnNvbHV0ZVVybCA9IC9eW2EtekEtWlxcLVxcKy5dKzpcXC9cXC8vO1xuY29uc3QgRk9SV0FSRF9TTEFTSCA9ICcvJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZlclhociBpbXBsZW1lbnRzIFhockZhY3Rvcnkge1xuICBidWlsZCgpOiBYTUxIdHRwUmVxdWVzdCB7XG4gICAgcmV0dXJuIG5ldyB4aHIyLlhNTEh0dHBSZXF1ZXN0KCk7XG4gIH1cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFpvbmVNYWNyb1Rhc2tXcmFwcGVyPFMsIFI+IHtcbiAgd3JhcChyZXF1ZXN0OiBTKTogT2JzZXJ2YWJsZTxSPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8Uj4pID0+IHtcbiAgICAgIGxldCB0YXNrOiBUYXNrID0gbnVsbCE7XG4gICAgICBsZXQgc2NoZWR1bGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgICBsZXQgc3ViOiBTdWJzY3JpcHRpb258bnVsbCA9IG51bGw7XG4gICAgICBsZXQgc2F2ZWRSZXN1bHQ6IGFueSA9IG51bGw7XG4gICAgICBsZXQgc2F2ZWRFcnJvcjogYW55ID0gbnVsbDtcblxuICAgICAgY29uc3Qgc2NoZWR1bGVUYXNrID0gKF90YXNrOiBUYXNrKSA9PiB7XG4gICAgICAgIHRhc2sgPSBfdGFzaztcbiAgICAgICAgc2NoZWR1bGVkID0gdHJ1ZTtcblxuICAgICAgICBjb25zdCBkZWxlZ2F0ZSA9IHRoaXMuZGVsZWdhdGUocmVxdWVzdCk7XG4gICAgICAgIHN1YiA9IGRlbGVnYXRlLnN1YnNjcmliZShcbiAgICAgICAgICAgIHJlcyA9PiBzYXZlZFJlc3VsdCA9IHJlcyxcbiAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgIGlmICghc2NoZWR1bGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICAgICAnQW4gaHR0cCBvYnNlcnZhYmxlIHdhcyBjb21wbGV0ZWQgdHdpY2UuIFRoaXMgc2hvdWxkblxcJ3QgaGFwcGVuLCBwbGVhc2UgZmlsZSBhIGJ1Zy4nKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzYXZlZEVycm9yID0gZXJyO1xuICAgICAgICAgICAgICBzY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGFzay5pbnZva2UoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghc2NoZWR1bGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICAgICAnQW4gaHR0cCBvYnNlcnZhYmxlIHdhcyBjb21wbGV0ZWQgdHdpY2UuIFRoaXMgc2hvdWxkblxcJ3QgaGFwcGVuLCBwbGVhc2UgZmlsZSBhIGJ1Zy4nKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGFzay5pbnZva2UoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgY2FuY2VsVGFzayA9IChfdGFzazogVGFzaykgPT4ge1xuICAgICAgICBpZiAoIXNjaGVkdWxlZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHN1Yikge1xuICAgICAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIHN1YiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IG9uQ29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgIGlmIChzYXZlZEVycm9yICE9PSBudWxsKSB7XG4gICAgICAgICAgb2JzZXJ2ZXIuZXJyb3Ioc2F2ZWRFcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChzYXZlZFJlc3VsdCk7XG4gICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8gTW9ja0JhY2tlbmQgZm9yIEh0dHAgaXMgc3luY2hyb25vdXMsIHdoaWNoIG1lYW5zIHRoYXQgaWYgc2NoZWR1bGVUYXNrIGlzIGJ5XG4gICAgICAvLyBzY2hlZHVsZU1hY3JvVGFzaywgdGhlIHJlcXVlc3Qgd2lsbCBoaXQgTW9ja0JhY2tlbmQgYW5kIHRoZSByZXNwb25zZSB3aWxsIGJlXG4gICAgICAvLyBzZW50LCBjYXVzaW5nIHRhc2suaW52b2tlKCkgdG8gYmUgY2FsbGVkLlxuICAgICAgY29uc3QgX3Rhc2sgPSBab25lLmN1cnJlbnQuc2NoZWR1bGVNYWNyb1Rhc2soXG4gICAgICAgICAgJ1pvbmVNYWNyb1Rhc2tXcmFwcGVyLnN1YnNjcmliZScsIG9uQ29tcGxldGUsIHt9LCAoKSA9PiBudWxsLCBjYW5jZWxUYXNrKTtcbiAgICAgIHNjaGVkdWxlVGFzayhfdGFzayk7XG5cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmIChzY2hlZHVsZWQgJiYgdGFzaykge1xuICAgICAgICAgIHRhc2suem9uZS5jYW5jZWxUYXNrKHRhc2spO1xuICAgICAgICAgIHNjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdWIpIHtcbiAgICAgICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICBzdWIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGRlbGVnYXRlKHJlcXVlc3Q6IFMpOiBPYnNlcnZhYmxlPFI+O1xufVxuXG5leHBvcnQgY2xhc3MgWm9uZUNsaWVudEJhY2tlbmQgZXh0ZW5kc1xuICAgIFpvbmVNYWNyb1Rhc2tXcmFwcGVyPEh0dHBSZXF1ZXN0PGFueT4sIEh0dHBFdmVudDxhbnk+PiBpbXBsZW1lbnRzIEh0dHBCYWNrZW5kIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBiYWNrZW5kOiBIdHRwQmFja2VuZCwgcHJpdmF0ZSBkb2M6IERvY3VtZW50KSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGhhbmRsZShyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+KTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIGNvbnN0IGhyZWYgPSB0aGlzLmRvYy5sb2NhdGlvbi5ocmVmO1xuICAgIGlmICghaXNBYnNvbHV0ZVVybC50ZXN0KHJlcXVlc3QudXJsKSAmJiBocmVmKSB7XG4gICAgICBjb25zdCB1cmxQYXJ0cyA9IEFycmF5LmZyb20ocmVxdWVzdC51cmwpO1xuICAgICAgaWYgKHJlcXVlc3QudXJsWzBdID09PSBGT1JXQVJEX1NMQVNIICYmIGhyZWZbaHJlZi5sZW5ndGggLSAxXSA9PT0gRk9SV0FSRF9TTEFTSCkge1xuICAgICAgICB1cmxQYXJ0cy5zaGlmdCgpO1xuICAgICAgfSBlbHNlIGlmIChyZXF1ZXN0LnVybFswXSAhPT0gRk9SV0FSRF9TTEFTSCAmJiBocmVmW2hyZWYubGVuZ3RoIC0gMV0gIT09IEZPUldBUkRfU0xBU0gpIHtcbiAgICAgICAgdXJsUGFydHMuc3BsaWNlKDAsIDAsIEZPUldBUkRfU0xBU0gpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMud3JhcChyZXF1ZXN0LmNsb25lKHt1cmw6IGhyZWYgKyB1cmxQYXJ0cy5qb2luKCcnKX0pKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMud3JhcChyZXF1ZXN0KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBkZWxlZ2F0ZShyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+KTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIHJldHVybiB0aGlzLmJhY2tlbmQuaGFuZGxlKHJlcXVlc3QpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB6b25lV3JhcHBlZEludGVyY2VwdGluZ0hhbmRsZXIoXG4gICAgYmFja2VuZDogSHR0cEJhY2tlbmQsIGluamVjdG9yOiBJbmplY3RvciwgZG9jOiBEb2N1bWVudCkge1xuICBjb25zdCByZWFsQmFja2VuZDogSHR0cEJhY2tlbmQgPSBuZXcgSHR0cEludGVyY2VwdGluZ0hhbmRsZXIoYmFja2VuZCwgaW5qZWN0b3IpO1xuICByZXR1cm4gbmV3IFpvbmVDbGllbnRCYWNrZW5kKHJlYWxCYWNrZW5kLCBkb2MpO1xufVxuXG5leHBvcnQgY29uc3QgU0VSVkVSX0hUVFBfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xuICB7cHJvdmlkZTogWGhyRmFjdG9yeSwgdXNlQ2xhc3M6IFNlcnZlclhocn0sIHtcbiAgICBwcm92aWRlOiBIdHRwSGFuZGxlcixcbiAgICB1c2VGYWN0b3J5OiB6b25lV3JhcHBlZEludGVyY2VwdGluZ0hhbmRsZXIsXG4gICAgZGVwczogW0h0dHBCYWNrZW5kLCBJbmplY3RvciwgRE9DVU1FTlRdXG4gIH1cbl07XG4iXX0=