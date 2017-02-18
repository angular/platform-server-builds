/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ApplicationRef, Inject, Injectable } from '@angular/core/index';
import { DOCUMENT } from '@angular/platform-browser/index';
import { SharedStylesHost, getDOM } from './private_import_platform-browser';
export class ServerStylesHost extends SharedStylesHost {
    /**
     * @param {?} doc
     * @param {?} appRef
     */
    constructor(doc, appRef) {
        super();
        this.doc = doc;
        this.appRef = appRef;
        this.root = null;
        this.buffer = [];
    }
    /**
     * @param {?} style
     * @return {?}
     */
    _addStyle(style) {
        let /** @type {?} */ adapter = (getDOM());
        const /** @type {?} */ el = adapter.createElement('style');
        adapter.setText(el, style);
        adapter.appendChild(this.root, el);
    }
    /**
     * @param {?} additions
     * @return {?}
     */
    onStylesAdded(additions) {
        if (!this.root) {
            additions.forEach(style => this.buffer.push(style));
        }
        else {
            additions.forEach(style => this._addStyle(style));
        }
    }
    /**
     * @return {?}
     */
    rootComponentIsReady() {
        if (!!this.root) {
            return;
        }
        this.root = this.appRef.components[0].location.nativeElement;
        this.buffer.forEach(style => this._addStyle(style));
        this.buffer = null;
    }
}
ServerStylesHost.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ServerStylesHost.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    { type: ApplicationRef, },
];
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