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
import { Inject, Injectable, Optional } from '@angular/core';
import { DOCUMENT, ɵgetDOM as getDOM } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import * as url from 'url';
import { INITIAL_CONFIG } from './tokens';
/**
 * @param {?} urlStr
 * @return {?}
 */
function parseUrl(urlStr) {
    var /** @type {?} */ parsedUrl = url.parse(urlStr);
    return {
        pathname: parsedUrl.pathname || '',
        search: parsedUrl.search || '',
        hash: parsedUrl.hash || '',
    };
}
/**
 * Server-side implementation of URL state. Implements `pathname`, `search`, and `hash`
 * but not the state stack.
 */
var ServerPlatformLocation = /** @class */ (function () {
    function ServerPlatformLocation(_doc, _config) {
        this._doc = _doc;
        this.pathname = '/';
        this.search = '';
        this.hash = '';
        this._hashUpdate = new Subject();
        var /** @type {?} */ config = /** @type {?} */ (_config);
        if (!!config && !!config.url) {
            var /** @type {?} */ parsedUrl = parseUrl(config.url);
            this.pathname = parsedUrl.pathname;
            this.search = parsedUrl.search;
            this.hash = parsedUrl.hash;
        }
    }
    /**
     * @return {?}
     */
    ServerPlatformLocation.prototype.getBaseHrefFromDOM = /**
     * @return {?}
     */
    function () { return /** @type {?} */ ((getDOM().getBaseHref(this._doc))); };
    /**
     * @param {?} fn
     * @return {?}
     */
    ServerPlatformLocation.prototype.onPopState = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        // No-op: a state stack is not implemented, so
        // no events will ever come.
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ServerPlatformLocation.prototype.onHashChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._hashUpdate.subscribe(fn); };
    Object.defineProperty(ServerPlatformLocation.prototype, "url", {
        get: /**
         * @return {?}
         */
        function () { return "" + this.pathname + this.search + this.hash; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @param {?} oldUrl
     * @return {?}
     */
    ServerPlatformLocation.prototype.setHash = /**
     * @param {?} value
     * @param {?} oldUrl
     * @return {?}
     */
    function (value, oldUrl) {
        var _this = this;
        if (this.hash === value) {
            // Don't fire events if the hash has not changed.
            return;
        }
        (/** @type {?} */ (this)).hash = value;
        var /** @type {?} */ newUrl = this.url;
        scheduleMicroTask(function () {
            return _this._hashUpdate.next(/** @type {?} */ ({
                type: 'hashchange', state: null, oldUrl: oldUrl, newUrl: newUrl
            }));
        });
    };
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} newUrl
     * @return {?}
     */
    ServerPlatformLocation.prototype.replaceState = /**
     * @param {?} state
     * @param {?} title
     * @param {?} newUrl
     * @return {?}
     */
    function (state, title, newUrl) {
        var /** @type {?} */ oldUrl = this.url;
        var /** @type {?} */ parsedUrl = parseUrl(newUrl);
        (/** @type {?} */ (this)).pathname = parsedUrl.pathname;
        (/** @type {?} */ (this)).search = parsedUrl.search;
        this.setHash(parsedUrl.hash, oldUrl);
    };
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} newUrl
     * @return {?}
     */
    ServerPlatformLocation.prototype.pushState = /**
     * @param {?} state
     * @param {?} title
     * @param {?} newUrl
     * @return {?}
     */
    function (state, title, newUrl) {
        this.replaceState(state, title, newUrl);
    };
    /**
     * @return {?}
     */
    ServerPlatformLocation.prototype.forward = /**
     * @return {?}
     */
    function () { throw new Error('Not implemented'); };
    /**
     * @return {?}
     */
    ServerPlatformLocation.prototype.back = /**
     * @return {?}
     */
    function () { throw new Error('Not implemented'); };
    ServerPlatformLocation.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ServerPlatformLocation.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [INITIAL_CONFIG,] },] },
    ]; };
    return ServerPlatformLocation;
}());
export { ServerPlatformLocation };
function ServerPlatformLocation_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ServerPlatformLocation.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ServerPlatformLocation.ctorParameters;
    /** @type {?} */
    ServerPlatformLocation.prototype.pathname;
    /** @type {?} */
    ServerPlatformLocation.prototype.search;
    /** @type {?} */
    ServerPlatformLocation.prototype.hash;
    /** @type {?} */
    ServerPlatformLocation.prototype._hashUpdate;
    /** @type {?} */
    ServerPlatformLocation.prototype._doc;
}
/**
 * @param {?} fn
 * @return {?}
 */
export function scheduleMicroTask(fn) {
    Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
}
//# sourceMappingURL=location.js.map