/**
 * @license Angular v12.0.0-next.2+9.sha-953e98e
 * (c) 2010-2021 Google LLC. https://angular.io/
 * License: MIT
 */

import { ɵBrowserDomAdapter } from '@angular/platform-browser';
import { ɵsetRootDomAdapter } from '@angular/common';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const domino = require('domino');
function _notImplemented(methodName) {
    return new Error('This method is not implemented in DominoAdapter: ' + methodName);
}
function setDomTypes() {
    // Make all Domino types available in the global env.
    Object.assign(global, domino.impl);
    global['KeyboardEvent'] = domino.impl.Event;
}
/**
 * Parses a document string to a Document object.
 */
function parseDocument(html, url = '/') {
    let window = domino.createWindow(html, url);
    let doc = window.document;
    return doc;
}
/**
 * Serializes a document to string.
 */
function serializeDocument(doc) {
    return doc.serialize();
}
/**
 * DOM Adapter for the server platform based on https://github.com/fgnass/domino.
 */
class DominoAdapter extends ɵBrowserDomAdapter {
    static makeCurrent() {
        setDomTypes();
        ɵsetRootDomAdapter(new DominoAdapter());
    }
    log(error) {
        // tslint:disable-next-line:no-console
        console.log(error);
    }
    logGroup(error) {
        console.error(error);
    }
    logGroupEnd() { }
    supportsDOMEvents() {
        return false;
    }
    createHtmlDocument() {
        return parseDocument('<html><head><title>fakeTitle</title></head><body></body></html>');
    }
    getDefaultDocument() {
        if (!DominoAdapter.defaultDoc) {
            DominoAdapter.defaultDoc = domino.createDocument();
        }
        return DominoAdapter.defaultDoc;
    }
    isElementNode(node) {
        return node ? node.nodeType === DominoAdapter.defaultDoc.ELEMENT_NODE : false;
    }
    isShadowRoot(node) {
        return node.shadowRoot == node;
    }
    getProperty(el, name) {
        if (name === 'href') {
            // Domino tries to resolve href-s which we do not want. Just return the
            // attribute value.
            return el.getAttribute('href');
        }
        else if (name === 'innerText') {
            // Domino does not support innerText. Just map it to textContent.
            return el.textContent;
        }
        return el[name];
    }
    getGlobalEventTarget(doc, target) {
        if (target === 'window') {
            return doc.defaultView;
        }
        if (target === 'document') {
            return doc;
        }
        if (target === 'body') {
            return doc.body;
        }
        return null;
    }
    getBaseHref(doc) {
        const base = doc.documentElement.querySelector('base');
        let href = '';
        if (base) {
            href = base.getAttribute('href');
        }
        // TODO(alxhub): Need relative path logic from BrowserDomAdapter here?
        return href;
    }
    dispatchEvent(el, evt) {
        el.dispatchEvent(evt);
        // Dispatch the event to the window also.
        const doc = el.ownerDocument || el;
        const win = doc.defaultView;
        if (win) {
            win.dispatchEvent(evt);
        }
    }
    getHistory() {
        throw _notImplemented('getHistory');
    }
    getLocation() {
        throw _notImplemented('getLocation');
    }
    getUserAgent() {
        return 'Fake user agent';
    }
    performanceNow() {
        return Date.now();
    }
    supportsCookies() {
        return false;
    }
    getCookie(name) {
        throw _notImplemented('getCookie');
    }
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Apply the necessary shims to make DOM globals (such as `Element`, `HTMLElement`, etc.) available
 * on the environment.
 */
function applyShims() {
    setDomTypes();
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
applyShims();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */
//# sourceMappingURL=init.js.map
