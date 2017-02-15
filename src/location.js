/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Inject, Injectable } from '@angular/core/index';
import { DOCUMENT } from '@angular/platform-browser/index';
import { Subject } from 'rxjs/Subject';
import * as url from 'url';
import { scheduleMicroTask } from './facade/lang';
import { getDOM } from './private_import_platform-browser';
/**
 * Server-side implementation of URL state. Implements `pathname`, `search`, and `hash`
 * but not the state stack.
 */
export class ServerPlatformLocation {
    /**
     * @param {?} _doc
     */
    constructor(_doc) {
        this._doc = _doc;
        this._path = '/';
        this._search = '';
        this._hash = '';
        this._hashUpdate = new Subject();
    }
    /**
     * @return {?}
     */
    getBaseHrefFromDOM() { return getDOM().getBaseHref(this._doc); }
    /**
     * @param {?} fn
     * @return {?}
     */
    onPopState(fn) {
        // No-op: a state stack is not implemented, so
        // no events will ever come.
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    onHashChange(fn) { this._hashUpdate.subscribe(fn); }
    /**
     * @return {?}
     */
    get pathname() { return this._path; }
    /**
     * @return {?}
     */
    get search() { return this._search; }
    /**
     * @return {?}
     */
    get hash() { return this._hash; }
    /**
     * @return {?}
     */
    get url() { return `${this.pathname}${this.search}${this.hash}`; }
    /**
     * @param {?} value
     * @param {?} oldUrl
     * @return {?}
     */
    setHash(value, oldUrl) {
        if (this._hash === value) {
            // Don't fire events if the hash has not changed.
            return;
        }
        this._hash = value;
        const /** @type {?} */ newUrl = this.url;
        scheduleMicroTask(() => this._hashUpdate.next(/** @type {?} */ ({ type: 'hashchange', oldUrl, newUrl })));
    }
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} newUrl
     * @return {?}
     */
    replaceState(state, title, newUrl) {
        const /** @type {?} */ oldUrl = this.url;
        const /** @type {?} */ parsedUrl = url.parse(newUrl, true);
        this._path = parsedUrl.path;
        this._search = parsedUrl.search;
        this.setHash(parsedUrl.hash, oldUrl);
    }
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} newUrl
     * @return {?}
     */
    pushState(state, title, newUrl) {
        this.replaceState(state, title, newUrl);
    }
    /**
     * @return {?}
     */
    forward() { throw new Error('Not implemented'); }
    /**
     * @return {?}
     */
    back() { throw new Error('Not implemented'); }
}
ServerPlatformLocation.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ServerPlatformLocation.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
];
function ServerPlatformLocation_tsickle_Closure_declarations() {
    /** @type {?} */
    ServerPlatformLocation.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ServerPlatformLocation.ctorParameters;
    /** @type {?} */
    ServerPlatformLocation.prototype._path;
    /** @type {?} */
    ServerPlatformLocation.prototype._search;
    /** @type {?} */
    ServerPlatformLocation.prototype._hash;
    /** @type {?} */
    ServerPlatformLocation.prototype._hashUpdate;
    /** @type {?} */
    ServerPlatformLocation.prototype._doc;
}
//# sourceMappingURL=location.js.map