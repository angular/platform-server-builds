/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { ApplicationRef, Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SharedStylesHost, getDOM } from './private_import_platform-browser';
var ServerStylesHost = (function (_super) {
    __extends(ServerStylesHost, _super);
    /**
     * @param {?} doc
     * @param {?} appRef
     */
    function ServerStylesHost(doc, appRef) {
        var _this = _super.call(this) || this;
        _this.doc = doc;
        _this.appRef = appRef;
        _this.root = null;
        _this.buffer = [];
        return _this;
    }
    /**
     * @param {?} style
     * @return {?}
     */
    ServerStylesHost.prototype._addStyle = function (style) {
        var /** @type {?} */ adapter = (getDOM());
        var /** @type {?} */ el = adapter.createElement('style');
        adapter.setText(el, style);
        adapter.appendChild(this.root, el);
    };
    /**
     * @param {?} additions
     * @return {?}
     */
    ServerStylesHost.prototype.onStylesAdded = function (additions) {
        var _this = this;
        if (!this.root) {
            additions.forEach(function (style) { return _this.buffer.push(style); });
        }
        else {
            additions.forEach(function (style) { return _this._addStyle(style); });
        }
    };
    /**
     * @return {?}
     */
    ServerStylesHost.prototype.rootComponentIsReady = function () {
        var _this = this;
        if (!!this.root) {
            return;
        }
        this.root = this.appRef.components[0].location.nativeElement;
        this.buffer.forEach(function (style) { return _this._addStyle(style); });
        this.buffer = null;
    };
    return ServerStylesHost;
}(SharedStylesHost));
export { ServerStylesHost };
ServerStylesHost.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ServerStylesHost.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    { type: ApplicationRef, },
]; };
function ServerStylesHost_tsickle_Closure_declarations() {
    /** @type {?} */
    ServerStylesHost.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ServerStylesHost.ctorParameters;
    /** @type {?} */
    ServerStylesHost.prototype.root;
    /** @type {?} */
    ServerStylesHost.prototype.buffer;
    /** @type {?} */
    ServerStylesHost.prototype.doc;
    /** @type {?} */
    ServerStylesHost.prototype.appRef;
}
//# sourceMappingURL=styles_host.js.map