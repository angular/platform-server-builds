/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DomElementSchemaRegistry } from '@angular/compiler';
import { Inject, Injectable, NgZone, ViewEncapsulation } from '@angular/core';
import { DOCUMENT, EventManager, ɵNAMESPACE_URIS as NAMESPACE_URIS, ɵSharedStylesHost as SharedStylesHost, ɵflattenStyles as flattenStyles, ɵgetDOM as getDOM, ɵshimContentAttribute as shimContentAttribute, ɵshimHostAttribute as shimHostAttribute } from '@angular/platform-browser';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** @type {?} */
const EMPTY_ARRAY = [];
/** @type {?} */
const DEFAULT_SCHEMA = new DomElementSchemaRegistry();
export class ServerRendererFactory2 {
    /**
     * @param {?} eventManager
     * @param {?} ngZone
     * @param {?} document
     * @param {?} sharedStylesHost
     */
    constructor(eventManager, ngZone, document, sharedStylesHost) {
        this.eventManager = eventManager;
        this.ngZone = ngZone;
        this.document = document;
        this.sharedStylesHost = sharedStylesHost;
        this.rendererByCompId = new Map();
        this.schema = DEFAULT_SCHEMA;
        this.defaultRenderer = new DefaultServerRenderer2(eventManager, document, ngZone, this.schema);
    }
    /**
     * @param {?} element
     * @param {?} type
     * @return {?}
     */
    createRenderer(element, type) {
        if (!element || !type) {
            return this.defaultRenderer;
        }
        switch (type.encapsulation) {
            case ViewEncapsulation.Native:
            case ViewEncapsulation.Emulated: {
                /** @type {?} */
                let renderer = this.rendererByCompId.get(type.id);
                if (!renderer) {
                    renderer = new EmulatedEncapsulationServerRenderer2(this.eventManager, this.document, this.ngZone, this.sharedStylesHost, this.schema, type);
                    this.rendererByCompId.set(type.id, renderer);
                }
                ((/** @type {?} */ (renderer))).applyToHost(element);
                return renderer;
            }
            default: {
                if (!this.rendererByCompId.has(type.id)) {
                    /** @type {?} */
                    const styles = flattenStyles(type.id, type.styles, []);
                    this.sharedStylesHost.addStyles(styles);
                    this.rendererByCompId.set(type.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
        }
    }
    /**
     * @return {?}
     */
    begin() { }
    /**
     * @return {?}
     */
    end() { }
}
ServerRendererFactory2.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ServerRendererFactory2.ctorParameters = () => [
    { type: EventManager },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: SharedStylesHost }
];
/** @nocollapse */ ServerRendererFactory2.ngInjectableDef = i0.defineInjectable({ token: ServerRendererFactory2, factory: function ServerRendererFactory2_Factory(t) { return new (t || ServerRendererFactory2)(i0.inject(i1.EventManager), i0.inject(i0.NgZone), i0.inject(DOCUMENT), i0.inject(i1.ɵSharedStylesHost)); }, providedIn: null });
/*@__PURE__*/ i0.ɵsetClassMetadata(ServerRendererFactory2, [{
        type: Injectable
    }], function () { return [{ type: i1.EventManager }, { type: i0.NgZone }, { type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: i1.ɵSharedStylesHost }]; }, null);
if (false) {
    /**
     * @type {?}
     * @private
     */
    ServerRendererFactory2.prototype.rendererByCompId;
    /**
     * @type {?}
     * @private
     */
    ServerRendererFactory2.prototype.defaultRenderer;
    /**
     * @type {?}
     * @private
     */
    ServerRendererFactory2.prototype.schema;
    /**
     * @type {?}
     * @private
     */
    ServerRendererFactory2.prototype.eventManager;
    /**
     * @type {?}
     * @private
     */
    ServerRendererFactory2.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    ServerRendererFactory2.prototype.document;
    /**
     * @type {?}
     * @private
     */
    ServerRendererFactory2.prototype.sharedStylesHost;
}
class DefaultServerRenderer2 {
    /**
     * @param {?} eventManager
     * @param {?} document
     * @param {?} ngZone
     * @param {?} schema
     */
    constructor(eventManager, document, ngZone, schema) {
        this.eventManager = eventManager;
        this.document = document;
        this.ngZone = ngZone;
        this.schema = schema;
        this.data = Object.create(null);
    }
    /**
     * @return {?}
     */
    destroy() { }
    /**
     * @param {?} name
     * @param {?=} namespace
     * @param {?=} debugInfo
     * @return {?}
     */
    createElement(name, namespace, debugInfo) {
        if (namespace) {
            return getDOM().createElementNS(NAMESPACE_URIS[namespace], name, this.document);
        }
        return getDOM().createElement(name, this.document);
    }
    /**
     * @param {?} value
     * @param {?=} debugInfo
     * @return {?}
     */
    createComment(value, debugInfo) { return getDOM().createComment(value); }
    /**
     * @param {?} value
     * @param {?=} debugInfo
     * @return {?}
     */
    createText(value, debugInfo) { return getDOM().createTextNode(value); }
    /**
     * @param {?} parent
     * @param {?} newChild
     * @return {?}
     */
    appendChild(parent, newChild) { getDOM().appendChild(parent, newChild); }
    /**
     * @param {?} parent
     * @param {?} newChild
     * @param {?} refChild
     * @return {?}
     */
    insertBefore(parent, newChild, refChild) {
        if (parent) {
            getDOM().insertBefore(parent, refChild, newChild);
        }
    }
    /**
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */
    removeChild(parent, oldChild) {
        if (parent) {
            getDOM().removeChild(parent, oldChild);
        }
    }
    /**
     * @param {?} selectorOrNode
     * @param {?=} debugInfo
     * @return {?}
     */
    selectRootElement(selectorOrNode, debugInfo) {
        /** @type {?} */
        let el;
        if (typeof selectorOrNode === 'string') {
            el = getDOM().querySelector(this.document, selectorOrNode);
            if (!el) {
                throw new Error(`The selector "${selectorOrNode}" did not match any elements`);
            }
        }
        else {
            el = selectorOrNode;
        }
        getDOM().clearNodes(el);
        return el;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    parentNode(node) { return getDOM().parentElement(node); }
    /**
     * @param {?} node
     * @return {?}
     */
    nextSibling(node) { return getDOM().nextSibling(node); }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?=} namespace
     * @return {?}
     */
    setAttribute(el, name, value, namespace) {
        if (namespace) {
            getDOM().setAttributeNS(el, NAMESPACE_URIS[namespace], namespace + ':' + name, value);
        }
        else {
            getDOM().setAttribute(el, name, value);
        }
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    removeAttribute(el, name, namespace) {
        if (namespace) {
            getDOM().removeAttributeNS(el, NAMESPACE_URIS[namespace], name);
        }
        else {
            getDOM().removeAttribute(el, name);
        }
    }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    addClass(el, name) { getDOM().addClass(el, name); }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    removeClass(el, name) { getDOM().removeClass(el, name); }
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?} flags
     * @return {?}
     */
    setStyle(el, style, value, flags) {
        getDOM().setStyle(el, style, value);
    }
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} flags
     * @return {?}
     */
    removeStyle(el, style, flags) {
        getDOM().removeStyle(el, style);
    }
    // The value was validated already as a property binding, against the property name.
    // To know this value is safe to use as an attribute, the security context of the
    // attribute with the given name is checked against that security context of the
    // property.
    /**
     * @private
     * @param {?} tagName
     * @param {?} propertyName
     * @return {?}
     */
    _isSafeToReflectProperty(tagName, propertyName) {
        return this.schema.securityContext(tagName, propertyName, true) ===
            this.schema.securityContext(tagName, propertyName, false);
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setProperty(el, name, value) {
        checkNoSyntheticProp(name, 'property');
        getDOM().setProperty(el, name, value);
        // Mirror property values for known HTML element properties in the attributes.
        // Skip `innerhtml` which is conservatively marked as an attribute for security
        // purposes but is not actually an attribute.
        /** @type {?} */
        const tagName = ((/** @type {?} */ (el.tagName))).toLowerCase();
        if (value != null && (typeof value === 'number' || typeof value == 'string') &&
            name.toLowerCase() !== 'innerhtml' && this.schema.hasElement(tagName, EMPTY_ARRAY) &&
            this.schema.hasProperty(tagName, name, EMPTY_ARRAY) &&
            this._isSafeToReflectProperty(tagName, name)) {
            this.setAttribute(el, name, value.toString());
        }
    }
    /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    setValue(node, value) { getDOM().setText(node, value); }
    /**
     * @param {?} target
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    listen(target, eventName, callback) {
        checkNoSyntheticProp(eventName, 'listener');
        if (typeof target === 'string') {
            return (/** @type {?} */ (this.eventManager.addGlobalEventListener(target, eventName, this.decoratePreventDefault(callback))));
        }
        return (/** @type {?} */ ((/** @type {?} */ (this.eventManager.addEventListener(target, eventName, this.decoratePreventDefault(callback))))));
    }
    /**
     * @private
     * @param {?} eventHandler
     * @return {?}
     */
    decoratePreventDefault(eventHandler) {
        return (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            // Run the event handler inside the ngZone because event handlers are not patched
            // by Zone on the server. This is required only for tests.
            /** @type {?} */
            const allowDefaultBehavior = this.ngZone.runGuarded((/**
             * @return {?}
             */
            () => eventHandler(event)));
            if (allowDefaultBehavior === false) {
                event.preventDefault();
                event.returnValue = false;
            }
        });
    }
}
if (false) {
    /** @type {?} */
    DefaultServerRenderer2.prototype.data;
    /** @type {?} */
    DefaultServerRenderer2.prototype.destroyNode;
    /**
     * @type {?}
     * @private
     */
    DefaultServerRenderer2.prototype.eventManager;
    /**
     * @type {?}
     * @protected
     */
    DefaultServerRenderer2.prototype.document;
    /**
     * @type {?}
     * @private
     */
    DefaultServerRenderer2.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    DefaultServerRenderer2.prototype.schema;
}
/** @type {?} */
const AT_CHARCODE = '@'.charCodeAt(0);
/**
 * @param {?} name
 * @param {?} nameKind
 * @return {?}
 */
function checkNoSyntheticProp(name, nameKind) {
    if (name.charCodeAt(0) === AT_CHARCODE) {
        throw new Error(`Found the synthetic ${nameKind} ${name}. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.`);
    }
}
class EmulatedEncapsulationServerRenderer2 extends DefaultServerRenderer2 {
    /**
     * @param {?} eventManager
     * @param {?} document
     * @param {?} ngZone
     * @param {?} sharedStylesHost
     * @param {?} schema
     * @param {?} component
     */
    constructor(eventManager, document, ngZone, sharedStylesHost, schema, component) {
        super(eventManager, document, ngZone, schema);
        this.component = component;
        // Add a 's' prefix to style attributes to indicate server.
        /** @type {?} */
        const componentId = 's' + component.id;
        /** @type {?} */
        const styles = flattenStyles(componentId, component.styles, []);
        sharedStylesHost.addStyles(styles);
        this.contentAttr = shimContentAttribute(componentId);
        this.hostAttr = shimHostAttribute(componentId);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    applyToHost(element) { super.setAttribute(element, this.hostAttr, ''); }
    /**
     * @param {?} parent
     * @param {?} name
     * @return {?}
     */
    createElement(parent, name) {
        /** @type {?} */
        const el = super.createElement(parent, name, this.document);
        super.setAttribute(el, this.contentAttr, '');
        return el;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    EmulatedEncapsulationServerRenderer2.prototype.contentAttr;
    /**
     * @type {?}
     * @private
     */
    EmulatedEncapsulationServerRenderer2.prototype.hostAttr;
    /**
     * @type {?}
     * @private
     */
    EmulatedEncapsulationServerRenderer2.prototype.component;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tc2VydmVyL3NyYy9zZXJ2ZXJfcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQVFBLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzNELE9BQU8sRUFBUyxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBZ0gsaUJBQWlCLEVBQTBCLE1BQU0sZUFBZSxDQUFDO0FBQzNOLE9BQU8sRUFBQyxRQUFRLEVBQUUsWUFBWSxFQUFFLGVBQWUsSUFBSSxjQUFjLEVBQUUsaUJBQWlCLElBQUksZ0JBQWdCLEVBQUUsY0FBYyxJQUFJLGFBQWEsRUFBRSxPQUFPLElBQUksTUFBTSxFQUFFLHFCQUFxQixJQUFJLG9CQUFvQixFQUFFLGtCQUFrQixJQUFJLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7Ozs7Ozs7Ozs7O01BRWpSLFdBQVcsR0FBVSxFQUFFOztNQUV2QixjQUFjLEdBQUcsSUFBSSx3QkFBd0IsRUFBRTtBQUdyRCxNQUFNLE9BQU8sc0JBQXNCOzs7Ozs7O0lBS2pDLFlBQ1ksWUFBMEIsRUFBVSxNQUFjLEVBQ2hDLFFBQWEsRUFBVSxnQkFBa0M7UUFEM0UsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2hDLGFBQVEsR0FBUixRQUFRLENBQUs7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBTi9FLHFCQUFnQixHQUFHLElBQUksR0FBRyxFQUFxQixDQUFDO1FBRWhELFdBQU0sR0FBRyxjQUFjLENBQUM7UUFLOUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLHNCQUFzQixDQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqRyxDQUFDOzs7Ozs7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VyxDQUFDLE9BQVksSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7O0lBRTdFLGFBQWEsQ0FBQyxNQUFXLEVBQUUsSUFBWTs7Y0FDL0IsRUFBRSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzNELEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0MsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0NBQ0Y7Ozs7OztJQXZCQywyREFBNEI7Ozs7O0lBQzVCLHdEQUF5Qjs7Ozs7SUFJYSx5REFBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RG9tRWxlbWVudFNjaGVtYVJlZ2lzdHJ5fSBmcm9tICdAYW5ndWxhci9jb21waWxlcic7XG5pbXBvcnQge0FQUF9JRCwgSW5qZWN0LCBJbmplY3RhYmxlLCBOZ1pvbmUsIFJlbmRlckNvbXBvbmVudFR5cGUsIFJlbmRlcmVyLCBSZW5kZXJlcjIsIFJlbmRlcmVyRmFjdG9yeTIsIFJlbmRlcmVyU3R5bGVGbGFnczIsIFJlbmRlcmVyVHlwZTIsIFJvb3RSZW5kZXJlciwgVmlld0VuY2Fwc3VsYXRpb24sIMm1c3RyaW5naWZ5IGFzIHN0cmluZ2lmeX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5ULCBFdmVudE1hbmFnZXIsIMm1TkFNRVNQQUNFX1VSSVMgYXMgTkFNRVNQQUNFX1VSSVMsIMm1U2hhcmVkU3R5bGVzSG9zdCBhcyBTaGFyZWRTdHlsZXNIb3N0LCDJtWZsYXR0ZW5TdHlsZXMgYXMgZmxhdHRlblN0eWxlcywgybVnZXRET00gYXMgZ2V0RE9NLCDJtXNoaW1Db250ZW50QXR0cmlidXRlIGFzIHNoaW1Db250ZW50QXR0cmlidXRlLCDJtXNoaW1Ib3N0QXR0cmlidXRlIGFzIHNoaW1Ib3N0QXR0cmlidXRlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuY29uc3QgRU1QVFlfQVJSQVk6IGFueVtdID0gW107XG5cbmNvbnN0IERFRkFVTFRfU0NIRU1BID0gbmV3IERvbUVsZW1lbnRTY2hlbWFSZWdpc3RyeSgpO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VydmVyUmVuZGVyZXJGYWN0b3J5MiBpbXBsZW1lbnRzIFJlbmRlcmVyRmFjdG9yeTIge1xuICBwcml2YXRlIHJlbmRlcmVyQnlDb21wSWQgPSBuZXcgTWFwPHN0cmluZywgUmVuZGVyZXIyPigpO1xuICBwcml2YXRlIGRlZmF1bHRSZW5kZXJlcjogUmVuZGVyZXIyO1xuICBwcml2YXRlIHNjaGVtYSA9IERFRkFVTFRfU0NIRU1BO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlciwgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSwgcHJpdmF0ZSBzaGFyZWRTdHlsZXNIb3N0OiBTaGFyZWRTdHlsZXNIb3N0KSB7XG4gICAgdGhpcy5kZWZhdWx0UmVuZGVyZXIgPSBuZXcgRGVmYXVsdFNlcnZlclJlbmRlcmVyMihldmVudE1hbmFnZXIsIGRvY3VtZW50LCBuZ1pvbmUsIHRoaXMuc2NoZW1hKTtcbiAgfVxuXG4gIGNyZWF0ZVJlbmRlcmVyKGVsZW1lbnQ6IGFueSwgdHlwZTogUmVuZGVyZXJUeXBlMnxudWxsKTogUmVuZGVyZXIyIHtcbiAgICBpZiAoIWVsZW1lbnQgfHwgIXR5cGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlZmF1bHRSZW5kZXJlcjtcbiAgICB9XG4gICAgc3dpdGNoICh0eXBlLmVuY2Fwc3VsYXRpb24pIHtcbiAgICAgIGNhc2UgVmlld0VuY2Fwc3VsYXRpb24uTmF0aXZlOlxuICAgICAgY2FzZSBWaWV3RW5jYXBzdWxhdGlvbi5FbXVsYXRlZDoge1xuICAgICAgICBsZXQgcmVuZGVyZXIgPSB0aGlzLnJlbmRlcmVyQnlDb21wSWQuZ2V0KHR5cGUuaWQpO1xuICAgICAgICBpZiAoIXJlbmRlcmVyKSB7XG4gICAgICAgICAgcmVuZGVyZXIgPSBuZXcgRW11bGF0ZWRFbmNhcHN1bGF0aW9uU2VydmVyUmVuZGVyZXIyKFxuICAgICAgICAgICAgICB0aGlzLmV2ZW50TWFuYWdlciwgdGhpcy5kb2N1bWVudCwgdGhpcy5uZ1pvbmUsIHRoaXMuc2hhcmVkU3R5bGVzSG9zdCwgdGhpcy5zY2hlbWEsXG4gICAgICAgICAgICAgIHR5cGUpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXJCeUNvbXBJZC5zZXQodHlwZS5pZCwgcmVuZGVyZXIpO1xuICAgICAgICB9XG4gICAgICAgICg8RW11bGF0ZWRFbmNhcHN1bGF0aW9uU2VydmVyUmVuZGVyZXIyPnJlbmRlcmVyKS5hcHBseVRvSG9zdChlbGVtZW50KTtcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBpZiAoIXRoaXMucmVuZGVyZXJCeUNvbXBJZC5oYXModHlwZS5pZCkpIHtcbiAgICAgICAgICBjb25zdCBzdHlsZXMgPSBmbGF0dGVuU3R5bGVzKHR5cGUuaWQsIHR5cGUuc3R5bGVzLCBbXSk7XG4gICAgICAgICAgdGhpcy5zaGFyZWRTdHlsZXNIb3N0LmFkZFN0eWxlcyhzdHlsZXMpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXJCeUNvbXBJZC5zZXQodHlwZS5pZCwgdGhpcy5kZWZhdWx0UmVuZGVyZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmRlZmF1bHRSZW5kZXJlcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBiZWdpbigpIHt9XG4gIGVuZCgpIHt9XG59XG5cbmNsYXNzIERlZmF1bHRTZXJ2ZXJSZW5kZXJlcjIgaW1wbGVtZW50cyBSZW5kZXJlcjIge1xuICBkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyLCBwcm90ZWN0ZWQgZG9jdW1lbnQ6IGFueSwgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgIHByaXZhdGUgc2NoZW1hOiBEb21FbGVtZW50U2NoZW1hUmVnaXN0cnkpIHt9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHt9XG5cbiAgZGVzdHJveU5vZGU6IG51bGw7XG5cbiAgY3JlYXRlRWxlbWVudChuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZywgZGVidWdJbmZvPzogYW55KTogYW55IHtcbiAgICBpZiAobmFtZXNwYWNlKSB7XG4gICAgICByZXR1cm4gZ2V0RE9NKCkuY3JlYXRlRWxlbWVudE5TKE5BTUVTUEFDRV9VUklTW25hbWVzcGFjZV0sIG5hbWUsIHRoaXMuZG9jdW1lbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBnZXRET00oKS5jcmVhdGVFbGVtZW50KG5hbWUsIHRoaXMuZG9jdW1lbnQpO1xuICB9XG5cbiAgY3JlYXRlQ29tbWVudCh2YWx1ZTogc3RyaW5nLCBkZWJ1Z0luZm8/OiBhbnkpOiBhbnkgeyByZXR1cm4gZ2V0RE9NKCkuY3JlYXRlQ29tbWVudCh2YWx1ZSk7IH1cblxuICBjcmVhdGVUZXh0KHZhbHVlOiBzdHJpbmcsIGRlYnVnSW5mbz86IGFueSk6IGFueSB7IHJldHVybiBnZXRET00oKS5jcmVhdGVUZXh0Tm9kZSh2YWx1ZSk7IH1cblxuICBhcHBlbmRDaGlsZChwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSk6IHZvaWQgeyBnZXRET00oKS5hcHBlbmRDaGlsZChwYXJlbnQsIG5ld0NoaWxkKTsgfVxuXG4gIGluc2VydEJlZm9yZShwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSwgcmVmQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIGdldERPTSgpLmluc2VydEJlZm9yZShwYXJlbnQsIHJlZkNoaWxkLCBuZXdDaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQ2hpbGQocGFyZW50OiBhbnksIG9sZENoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBnZXRET00oKS5yZW1vdmVDaGlsZChwYXJlbnQsIG9sZENoaWxkKTtcbiAgICB9XG4gIH1cblxuICBzZWxlY3RSb290RWxlbWVudChzZWxlY3Rvck9yTm9kZTogc3RyaW5nfGFueSwgZGVidWdJbmZvPzogYW55KTogYW55IHtcbiAgICBsZXQgZWw6IGFueTtcbiAgICBpZiAodHlwZW9mIHNlbGVjdG9yT3JOb2RlID09PSAnc3RyaW5nJykge1xuICAgICAgZWwgPSBnZXRET00oKS5xdWVyeVNlbGVjdG9yKHRoaXMuZG9jdW1lbnQsIHNlbGVjdG9yT3JOb2RlKTtcbiAgICAgIGlmICghZWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgc2VsZWN0b3IgXCIke3NlbGVjdG9yT3JOb2RlfVwiIGRpZCBub3QgbWF0Y2ggYW55IGVsZW1lbnRzYCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsID0gc2VsZWN0b3JPck5vZGU7XG4gICAgfVxuICAgIGdldERPTSgpLmNsZWFyTm9kZXMoZWwpO1xuICAgIHJldHVybiBlbDtcbiAgfVxuXG4gIHBhcmVudE5vZGUobm9kZTogYW55KTogYW55IHsgcmV0dXJuIGdldERPTSgpLnBhcmVudEVsZW1lbnQobm9kZSk7IH1cblxuICBuZXh0U2libGluZyhub2RlOiBhbnkpOiBhbnkgeyByZXR1cm4gZ2V0RE9NKCkubmV4dFNpYmxpbmcobm9kZSk7IH1cblxuICBzZXRBdHRyaWJ1dGUoZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAobmFtZXNwYWNlKSB7XG4gICAgICBnZXRET00oKS5zZXRBdHRyaWJ1dGVOUyhlbCwgTkFNRVNQQUNFX1VSSVNbbmFtZXNwYWNlXSwgbmFtZXNwYWNlICsgJzonICsgbmFtZSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZXRET00oKS5zZXRBdHRyaWJ1dGUoZWwsIG5hbWUsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVBdHRyaWJ1dGUoZWw6IGFueSwgbmFtZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAobmFtZXNwYWNlKSB7XG4gICAgICBnZXRET00oKS5yZW1vdmVBdHRyaWJ1dGVOUyhlbCwgTkFNRVNQQUNFX1VSSVNbbmFtZXNwYWNlXSwgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdldERPTSgpLnJlbW92ZUF0dHJpYnV0ZShlbCwgbmFtZSk7XG4gICAgfVxuICB9XG5cbiAgYWRkQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZCB7IGdldERPTSgpLmFkZENsYXNzKGVsLCBuYW1lKTsgfVxuXG4gIHJlbW92ZUNsYXNzKGVsOiBhbnksIG5hbWU6IHN0cmluZyk6IHZvaWQgeyBnZXRET00oKS5yZW1vdmVDbGFzcyhlbCwgbmFtZSk7IH1cblxuICBzZXRTdHlsZShlbDogYW55LCBzdHlsZTogc3RyaW5nLCB2YWx1ZTogYW55LCBmbGFnczogUmVuZGVyZXJTdHlsZUZsYWdzMik6IHZvaWQge1xuICAgIGdldERPTSgpLnNldFN0eWxlKGVsLCBzdHlsZSwgdmFsdWUpO1xuICB9XG5cbiAgcmVtb3ZlU3R5bGUoZWw6IGFueSwgc3R5bGU6IHN0cmluZywgZmxhZ3M6IFJlbmRlcmVyU3R5bGVGbGFnczIpOiB2b2lkIHtcbiAgICBnZXRET00oKS5yZW1vdmVTdHlsZShlbCwgc3R5bGUpO1xuICB9XG5cbiAgLy8gVGhlIHZhbHVlIHdhcyB2YWxpZGF0ZWQgYWxyZWFkeSBhcyBhIHByb3BlcnR5IGJpbmRpbmcsIGFnYWluc3QgdGhlIHByb3BlcnR5IG5hbWUuXG4gIC8vIFRvIGtub3cgdGhpcyB2YWx1ZSBpcyBzYWZlIHRvIHVzZSBhcyBhbiBhdHRyaWJ1dGUsIHRoZSBzZWN1cml0eSBjb250ZXh0IG9mIHRoZVxuICAvLyBhdHRyaWJ1dGUgd2l0aCB0aGUgZ2l2ZW4gbmFtZSBpcyBjaGVja2VkIGFnYWluc3QgdGhhdCBzZWN1cml0eSBjb250ZXh0IG9mIHRoZVxuICAvLyBwcm9wZXJ0eS5cbiAgcHJpdmF0ZSBfaXNTYWZlVG9SZWZsZWN0UHJvcGVydHkodGFnTmFtZTogc3RyaW5nLCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNjaGVtYS5zZWN1cml0eUNvbnRleHQodGFnTmFtZSwgcHJvcGVydHlOYW1lLCB0cnVlKSA9PT1cbiAgICAgICAgdGhpcy5zY2hlbWEuc2VjdXJpdHlDb250ZXh0KHRhZ05hbWUsIHByb3BlcnR5TmFtZSwgZmFsc2UpO1xuICB9XG5cbiAgc2V0UHJvcGVydHkoZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgY2hlY2tOb1N5bnRoZXRpY1Byb3AobmFtZSwgJ3Byb3BlcnR5Jyk7XG4gICAgZ2V0RE9NKCkuc2V0UHJvcGVydHkoZWwsIG5hbWUsIHZhbHVlKTtcbiAgICAvLyBNaXJyb3IgcHJvcGVydHkgdmFsdWVzIGZvciBrbm93biBIVE1MIGVsZW1lbnQgcHJvcGVydGllcyBpbiB0aGUgYXR0cmlidXRlcy5cbiAgICAvLyBTa2lwIGBpbm5lcmh0bWxgIHdoaWNoIGlzIGNvbnNlcnZhdGl2ZWx5IG1hcmtlZCBhcyBhbiBhdHRyaWJ1dGUgZm9yIHNlY3VyaXR5XG4gICAgLy8gcHVycG9zZXMgYnV0IGlzIG5vdCBhY3R1YWxseSBhbiBhdHRyaWJ1dGUuXG4gICAgY29uc3QgdGFnTmFtZSA9IChlbC50YWdOYW1lIGFzIHN0cmluZykudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAodmFsdWUgIT0gbnVsbCAmJiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyB8fCB0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpICYmXG4gICAgICAgIG5hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2lubmVyaHRtbCcgJiYgdGhpcy5zY2hlbWEuaGFzRWxlbWVudCh0YWdOYW1lLCBFTVBUWV9BUlJBWSkgJiZcbiAgICAgICAgdGhpcy5zY2hlbWEuaGFzUHJvcGVydHkodGFnTmFtZSwgbmFtZSwgRU1QVFlfQVJSQVkpICYmXG4gICAgICAgIHRoaXMuX2lzU2FmZVRvUmVmbGVjdFByb3BlcnR5KHRhZ05hbWUsIG5hbWUpKSB7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZShlbCwgbmFtZSwgdmFsdWUudG9TdHJpbmcoKSk7XG4gICAgfVxuICB9XG5cbiAgc2V0VmFsdWUobm9kZTogYW55LCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7IGdldERPTSgpLnNldFRleHQobm9kZSwgdmFsdWUpOyB9XG5cbiAgbGlzdGVuKFxuICAgICAgdGFyZ2V0OiAnZG9jdW1lbnQnfCd3aW5kb3cnfCdib2R5J3xhbnksIGV2ZW50TmFtZTogc3RyaW5nLFxuICAgICAgY2FsbGJhY2s6IChldmVudDogYW55KSA9PiBib29sZWFuKTogKCkgPT4gdm9pZCB7XG4gICAgY2hlY2tOb1N5bnRoZXRpY1Byb3AoZXZlbnROYW1lLCAnbGlzdGVuZXInKTtcbiAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiA8KCkgPT4gdm9pZD50aGlzLmV2ZW50TWFuYWdlci5hZGRHbG9iYWxFdmVudExpc3RlbmVyKFxuICAgICAgICAgIHRhcmdldCwgZXZlbnROYW1lLCB0aGlzLmRlY29yYXRlUHJldmVudERlZmF1bHQoY2FsbGJhY2spKTtcbiAgICB9XG4gICAgcmV0dXJuIDwoKSA9PiB2b2lkPnRoaXMuZXZlbnRNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgICB0YXJnZXQsIGV2ZW50TmFtZSwgdGhpcy5kZWNvcmF0ZVByZXZlbnREZWZhdWx0KGNhbGxiYWNrKSkgYXMoKSA9PiB2b2lkO1xuICB9XG5cbiAgcHJpdmF0ZSBkZWNvcmF0ZVByZXZlbnREZWZhdWx0KGV2ZW50SGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgcmV0dXJuIChldmVudDogYW55KSA9PiB7XG4gICAgICAvLyBSdW4gdGhlIGV2ZW50IGhhbmRsZXIgaW5zaWRlIHRoZSBuZ1pvbmUgYmVjYXVzZSBldmVudCBoYW5kbGVycyBhcmUgbm90IHBhdGNoZWRcbiAgICAgIC8vIGJ5IFpvbmUgb24gdGhlIHNlcnZlci4gVGhpcyBpcyByZXF1aXJlZCBvbmx5IGZvciB0ZXN0cy5cbiAgICAgIGNvbnN0IGFsbG93RGVmYXVsdEJlaGF2aW9yID0gdGhpcy5uZ1pvbmUucnVuR3VhcmRlZCgoKSA9PiBldmVudEhhbmRsZXIoZXZlbnQpKTtcbiAgICAgIGlmIChhbGxvd0RlZmF1bHRCZWhhdmlvciA9PT0gZmFsc2UpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG5cbmNvbnN0IEFUX0NIQVJDT0RFID0gJ0AnLmNoYXJDb2RlQXQoMCk7XG5mdW5jdGlvbiBjaGVja05vU3ludGhldGljUHJvcChuYW1lOiBzdHJpbmcsIG5hbWVLaW5kOiBzdHJpbmcpIHtcbiAgaWYgKG5hbWUuY2hhckNvZGVBdCgwKSA9PT0gQVRfQ0hBUkNPREUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBGb3VuZCB0aGUgc3ludGhldGljICR7bmFtZUtpbmR9ICR7bmFtZX0uIFBsZWFzZSBpbmNsdWRlIGVpdGhlciBcIkJyb3dzZXJBbmltYXRpb25zTW9kdWxlXCIgb3IgXCJOb29wQW5pbWF0aW9uc01vZHVsZVwiIGluIHlvdXIgYXBwbGljYXRpb24uYCk7XG4gIH1cbn1cblxuY2xhc3MgRW11bGF0ZWRFbmNhcHN1bGF0aW9uU2VydmVyUmVuZGVyZXIyIGV4dGVuZHMgRGVmYXVsdFNlcnZlclJlbmRlcmVyMiB7XG4gIHByaXZhdGUgY29udGVudEF0dHI6IHN0cmluZztcbiAgcHJpdmF0ZSBob3N0QXR0cjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsIGRvY3VtZW50OiBhbnksIG5nWm9uZTogTmdab25lLCBzaGFyZWRTdHlsZXNIb3N0OiBTaGFyZWRTdHlsZXNIb3N0LFxuICAgICAgc2NoZW1hOiBEb21FbGVtZW50U2NoZW1hUmVnaXN0cnksIHByaXZhdGUgY29tcG9uZW50OiBSZW5kZXJlclR5cGUyKSB7XG4gICAgc3VwZXIoZXZlbnRNYW5hZ2VyLCBkb2N1bWVudCwgbmdab25lLCBzY2hlbWEpO1xuICAgIC8vIEFkZCBhICdzJyBwcmVmaXggdG8gc3R5bGUgYXR0cmlidXRlcyB0byBpbmRpY2F0ZSBzZXJ2ZXIuXG4gICAgY29uc3QgY29tcG9uZW50SWQgPSAncycgKyBjb21wb25lbnQuaWQ7XG4gICAgY29uc3Qgc3R5bGVzID0gZmxhdHRlblN0eWxlcyhjb21wb25lbnRJZCwgY29tcG9uZW50LnN0eWxlcywgW10pO1xuICAgIHNoYXJlZFN0eWxlc0hvc3QuYWRkU3R5bGVzKHN0eWxlcyk7XG5cbiAgICB0aGlzLmNvbnRlbnRBdHRyID0gc2hpbUNvbnRlbnRBdHRyaWJ1dGUoY29tcG9uZW50SWQpO1xuICAgIHRoaXMuaG9zdEF0dHIgPSBzaGltSG9zdEF0dHJpYnV0ZShjb21wb25lbnRJZCk7XG4gIH1cblxuICBhcHBseVRvSG9zdChlbGVtZW50OiBhbnkpIHsgc3VwZXIuc2V0QXR0cmlidXRlKGVsZW1lbnQsIHRoaXMuaG9zdEF0dHIsICcnKTsgfVxuXG4gIGNyZWF0ZUVsZW1lbnQocGFyZW50OiBhbnksIG5hbWU6IHN0cmluZyk6IEVsZW1lbnQge1xuICAgIGNvbnN0IGVsID0gc3VwZXIuY3JlYXRlRWxlbWVudChwYXJlbnQsIG5hbWUsIHRoaXMuZG9jdW1lbnQpO1xuICAgIHN1cGVyLnNldEF0dHJpYnV0ZShlbCwgdGhpcy5jb250ZW50QXR0ciwgJycpO1xuICAgIHJldHVybiBlbDtcbiAgfVxufVxuIl19