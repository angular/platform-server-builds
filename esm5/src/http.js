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
import * as tslib_1 from "tslib";
var /** @type {?} */ xhr2 = require('xhr2');
import { Injectable, Optional } from '@angular/core';
import { BrowserXhr, Http, ReadyState, RequestOptions, XHRBackend, XSRFStrategy } from '@angular/http';
import { HttpHandler, HTTP_INTERCEPTORS, HttpBackend, XhrFactory, ɵinterceptingHandler as interceptingHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
var /** @type {?} */ isAbsoluteUrl = /^[a-zA-Z\-\+.]+:\/\//;
/**
 * @param {?} url
 * @return {?}
 */
function validateRequestUrl(url) {
    if (!isAbsoluteUrl.test(url)) {
        throw new Error("URLs requested via Http on the server must be absolute. URL: " + url);
    }
}
var ServerXhr = /** @class */ (function () {
    function ServerXhr() {
    }
    /**
     * @return {?}
     */
    ServerXhr.prototype.build = /**
     * @return {?}
     */
    function () { return new xhr2.XMLHttpRequest(); };
    ServerXhr.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ServerXhr.ctorParameters = function () { return []; };
    return ServerXhr;
}());
export { ServerXhr };
function ServerXhr_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ServerXhr.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ServerXhr.ctorParameters;
}
var ServerXsrfStrategy = /** @class */ (function () {
    function ServerXsrfStrategy() {
    }
    /**
     * @param {?} req
     * @return {?}
     */
    ServerXsrfStrategy.prototype.configureRequest = /**
     * @param {?} req
     * @return {?}
     */
    function (req) { };
    ServerXsrfStrategy.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ServerXsrfStrategy.ctorParameters = function () { return []; };
    return ServerXsrfStrategy;
}());
export { ServerXsrfStrategy };
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
var /**
 * @abstract
 * @template S, R
 */
ZoneMacroTaskWrapper = /** @class */ (function () {
    function ZoneMacroTaskWrapper() {
    }
    /**
     * @param {?} request
     * @return {?}
     */
    ZoneMacroTaskWrapper.prototype.wrap = /**
     * @param {?} request
     * @return {?}
     */
    function (request) {
        var _this = this;
        return new Observable(function (observer) {
            var /** @type {?} */ task = /** @type {?} */ ((null));
            var /** @type {?} */ scheduled = false;
            var /** @type {?} */ sub = null;
            var /** @type {?} */ savedResult = null;
            var /** @type {?} */ savedError = null;
            var /** @type {?} */ scheduleTask = function (_task) {
                task = _task;
                scheduled = true;
                var /** @type {?} */ delegate = _this.delegate(request);
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
            var /** @type {?} */ cancelTask = function (_task) {
                if (!scheduled) {
                    return;
                }
                scheduled = false;
                if (sub) {
                    sub.unsubscribe();
                    sub = null;
                }
            };
            var /** @type {?} */ onComplete = function () {
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
            var /** @type {?} */ _task = Zone.current.scheduleMacroTask('ZoneMacroTaskWrapper.subscribe', onComplete, {}, function () { return null; }, cancelTask);
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
/**
 * @abstract
 * @template S, R
 */
export { ZoneMacroTaskWrapper };
function ZoneMacroTaskWrapper_tsickle_Closure_declarations() {
    /**
     * @abstract
     * @param {?} request
     * @return {?}
     */
    ZoneMacroTaskWrapper.prototype.delegate = function (request) { };
}
var ZoneMacroTaskConnection = /** @class */ (function (_super) {
    tslib_1.__extends(ZoneMacroTaskConnection, _super);
    function ZoneMacroTaskConnection(request, backend) {
        var _this = _super.call(this) || this;
        _this.request = request;
        _this.backend = backend;
        validateRequestUrl(request.url);
        _this.response = _this.wrap(request);
        return _this;
    }
    /**
     * @param {?} request
     * @return {?}
     */
    ZoneMacroTaskConnection.prototype.delegate = /**
     * @param {?} request
     * @return {?}
     */
    function (request) {
        this.lastConnection = this.backend.createConnection(request);
        return /** @type {?} */ (this.lastConnection.response);
    };
    Object.defineProperty(ZoneMacroTaskConnection.prototype, "readyState", {
        get: /**
         * @return {?}
         */
        function () {
            return !!this.lastConnection ? this.lastConnection.readyState : ReadyState.Unsent;
        },
        enumerable: true,
        configurable: true
    });
    return ZoneMacroTaskConnection;
}(ZoneMacroTaskWrapper));
export { ZoneMacroTaskConnection };
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
var ZoneMacroTaskBackend = /** @class */ (function () {
    function ZoneMacroTaskBackend(backend) {
        this.backend = backend;
    }
    /**
     * @param {?} request
     * @return {?}
     */
    ZoneMacroTaskBackend.prototype.createConnection = /**
     * @param {?} request
     * @return {?}
     */
    function (request) {
        return new ZoneMacroTaskConnection(request, this.backend);
    };
    return ZoneMacroTaskBackend;
}());
export { ZoneMacroTaskBackend };
function ZoneMacroTaskBackend_tsickle_Closure_declarations() {
    /** @type {?} */
    ZoneMacroTaskBackend.prototype.backend;
}
var ZoneClientBackend = /** @class */ (function (_super) {
    tslib_1.__extends(ZoneClientBackend, _super);
    function ZoneClientBackend(backend) {
        var _this = _super.call(this) || this;
        _this.backend = backend;
        return _this;
    }
    /**
     * @param {?} request
     * @return {?}
     */
    ZoneClientBackend.prototype.handle = /**
     * @param {?} request
     * @return {?}
     */
    function (request) { return this.wrap(request); };
    /**
     * @param {?} request
     * @return {?}
     */
    ZoneClientBackend.prototype.delegate = /**
     * @param {?} request
     * @return {?}
     */
    function (request) {
        return this.backend.handle(request);
    };
    return ZoneClientBackend;
}(ZoneMacroTaskWrapper));
export { ZoneClientBackend };
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
    var /** @type {?} */ macroBackend = new ZoneMacroTaskBackend(xhrBackend);
    return new Http(macroBackend, options);
}
/**
 * @param {?} backend
 * @param {?} interceptors
 * @return {?}
 */
export function zoneWrappedInterceptingHandler(backend, interceptors) {
    var /** @type {?} */ realBackend = interceptingHandler(backend, interceptors);
    return new ZoneClientBackend(realBackend);
}
export var /** @type {?} */ SERVER_HTTP_PROVIDERS = [
    { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions] },
    { provide: BrowserXhr, useClass: ServerXhr }, { provide: XSRFStrategy, useClass: ServerXsrfStrategy },
    { provide: XhrFactory, useClass: ServerXhr }, {
        provide: HttpHandler,
        useFactory: zoneWrappedInterceptingHandler,
        deps: [HttpBackend, [new Optional(), HTTP_INTERCEPTORS]]
    }
];
//# sourceMappingURL=http.js.map