/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var /** @type {?} */ xhr2 = require('xhr2');
import { Injectable } from '@angular/core';
import { BrowserXhr, Http, ReadyState, RequestOptions, XHRBackend, XSRFStrategy } from '@angular/http';
import { Observable } from 'rxjs/Observable';
var ServerXhr = (function () {
    function ServerXhr() {
    }
    /**
     * @return {?}
     */
    ServerXhr.prototype.build = function () { return new xhr2.XMLHttpRequest(); };
    return ServerXhr;
}());
export { ServerXhr };
ServerXhr.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ServerXhr.ctorParameters = function () { return []; };
function ServerXhr_tsickle_Closure_declarations() {
    /** @type {?} */
    ServerXhr.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ServerXhr.ctorParameters;
}
var ServerXsrfStrategy = (function () {
    function ServerXsrfStrategy() {
    }
    /**
     * @param {?} req
     * @return {?}
     */
    ServerXsrfStrategy.prototype.configureRequest = function (req) { };
    return ServerXsrfStrategy;
}());
export { ServerXsrfStrategy };
ServerXsrfStrategy.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ServerXsrfStrategy.ctorParameters = function () { return []; };
function ServerXsrfStrategy_tsickle_Closure_declarations() {
    /** @type {?} */
    ServerXsrfStrategy.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ServerXsrfStrategy.ctorParameters;
}
var ZoneMacroTaskConnection = (function () {
    /**
     * @param {?} request
     * @param {?} backend
     */
    function ZoneMacroTaskConnection(request, backend) {
        var _this = this;
        this.request = request;
        this.response = new Observable(function (observer) {
            var task = null;
            var scheduled = false;
            var sub = null;
            var savedResult = null;
            var savedError = null;
            var scheduleTask = function (_task) {
                task = _task;
                scheduled = true;
                _this.lastConnection = backend.createConnection(request);
                sub = _this.lastConnection.response
                    .subscribe(function (res) { return savedResult = res; }, function (err) {
                    if (!scheduled) {
                        throw new Error('invoke twice');
                    }
                    savedError = err;
                    scheduled = false;
                    task.invoke();
                }, function () {
                    if (!scheduled) {
                        throw new Error('invoke twice');
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
            // MockBackend is currently synchronous, which means that if scheduleTask is by
            // scheduleMacroTask, the request will hit MockBackend and the response will be
            // sent, causing task.invoke() to be called.
            var _task = Zone.current.scheduleMacroTask('ZoneMacroTaskConnection.subscribe', onComplete, {}, function () { return null; }, cancelTask);
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
    }
    Object.defineProperty(ZoneMacroTaskConnection.prototype, "readyState", {
        /**
         * @return {?}
         */
        get: function () {
            return !!this.lastConnection ? this.lastConnection.readyState : ReadyState.Unsent;
        },
        enumerable: true,
        configurable: true
    });
    return ZoneMacroTaskConnection;
}());
export { ZoneMacroTaskConnection };
function ZoneMacroTaskConnection_tsickle_Closure_declarations() {
    /** @type {?} */
    ZoneMacroTaskConnection.prototype.response;
    /** @type {?} */
    ZoneMacroTaskConnection.prototype.lastConnection;
    /** @type {?} */
    ZoneMacroTaskConnection.prototype.request;
}
var ZoneMacroTaskBackend = (function () {
    /**
     * @param {?} backend
     */
    function ZoneMacroTaskBackend(backend) {
        this.backend = backend;
    }
    /**
     * @param {?} request
     * @return {?}
     */
    ZoneMacroTaskBackend.prototype.createConnection = function (request) {
        return new ZoneMacroTaskConnection(request, this.backend);
    };
    return ZoneMacroTaskBackend;
}());
export { ZoneMacroTaskBackend };
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
    var /** @type {?} */ macroBackend = new ZoneMacroTaskBackend(xhrBackend);
    return new Http(macroBackend, options);
}
export var /** @type {?} */ SERVER_HTTP_PROVIDERS = [
    { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions] },
    { provide: BrowserXhr, useClass: ServerXhr },
    { provide: XSRFStrategy, useClass: ServerXsrfStrategy },
];
//# sourceMappingURL=http.js.map