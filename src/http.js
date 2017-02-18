/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const /** @type {?} */ xhr2 = require('xhr2');
import { Injectable } from '@angular/core/index';
import { BrowserXhr, Http, ReadyState, RequestOptions, XHRBackend, XSRFStrategy } from '@angular/http/index';
import { Observable } from 'rxjs/Observable';
export class ServerXhr {
    /**
     * @return {?}
     */
    build() { return new xhr2.XMLHttpRequest(); }
}
ServerXhr.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ServerXhr.ctorParameters = () => [];
function ServerXhr_tsickle_Closure_declarations() {
    /** @type {?} */
    ServerXhr.decorators;
    /**
     * @nocollapse
     * @type {?}
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
    { type: Injectable },
];
/** @nocollapse */
ServerXsrfStrategy.ctorParameters = () => [];
function ServerXsrfStrategy_tsickle_Closure_declarations() {
    /** @type {?} */
    ServerXsrfStrategy.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ServerXsrfStrategy.ctorParameters;
}
export class ZoneMacroTaskConnection {
    /**
     * @param {?} request
     * @param {?} backend
     */
    constructor(request, backend) {
        this.request = request;
        this.response = new Observable((observer) => {
            let task = null;
            let scheduled = false;
            let sub = null;
            let savedResult = null;
            let savedError = null;
            const scheduleTask = (_task) => {
                task = _task;
                scheduled = true;
                this.lastConnection = backend.createConnection(request);
                sub = this.lastConnection.response
                    .subscribe(res => savedResult = res, err => {
                    if (!scheduled) {
                        throw new Error('invoke twice');
                    }
                    savedError = err;
                    scheduled = false;
                    task.invoke();
                }, () => {
                    if (!scheduled) {
                        throw new Error('invoke twice');
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
            // MockBackend is currently synchronous, which means that if scheduleTask is by
            // scheduleMacroTask, the request will hit MockBackend and the response will be
            // sent, causing task.invoke() to be called.
            const _task = Zone.current.scheduleMacroTask('ZoneMacroTaskConnection.subscribe', onComplete, {}, () => null, cancelTask);
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
/**
 * @param {?} xhrBackend
 * @param {?} options
 * @return {?}
 */
export function httpFactory(xhrBackend, options) {
    const /** @type {?} */ macroBackend = new ZoneMacroTaskBackend(xhrBackend);
    return new Http(macroBackend, options);
}
export const /** @type {?} */ SERVER_HTTP_PROVIDERS = [
    { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions] },
    { provide: BrowserXhr, useClass: ServerXhr },
    { provide: XSRFStrategy, useClass: ServerXsrfStrategy },
];
//# sourceMappingURL=http.js.map