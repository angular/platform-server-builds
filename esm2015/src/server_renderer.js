/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { DomElementSchemaRegistry } from '@angular/compiler';
import { Inject, Injectable, NgZone, ViewEncapsulation } from '@angular/core';
import { EventManager, ɵNAMESPACE_URIS as NAMESPACE_URIS, ɵSharedStylesHost as SharedStylesHost, ɵflattenStyles as flattenStyles, ɵgetDOM as getDOM, ɵshimContentAttribute as shimContentAttribute, ɵshimHostAttribute as shimHostAttribute } from '@angular/platform-browser';
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
    { type: Injectable }
];
/** @nocollapse */
ServerRendererFactory2.ctorParameters = () => [
    { type: EventManager },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: SharedStylesHost }
];
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
            // Ivy uses `Function` as a special token that allows us to unwrap the function
            // so that it can be invoked programmatically by `DebugNode.triggerEventHandler`.
            if (event === Function) {
                return eventHandler;
            }
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
            return undefined;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tc2VydmVyL3NyYy9zZXJ2ZXJfcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDM0QsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFtRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3SSxPQUFPLEVBQUMsWUFBWSxFQUFFLGVBQWUsSUFBSSxjQUFjLEVBQUUsaUJBQWlCLElBQUksZ0JBQWdCLEVBQUUsY0FBYyxJQUFJLGFBQWEsRUFBRSxPQUFPLElBQUksTUFBTSxFQUFFLHFCQUFxQixJQUFJLG9CQUFvQixFQUFFLGtCQUFrQixJQUFJLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7O01BRXZRLFdBQVcsR0FBVSxFQUFFOztNQUV2QixjQUFjLEdBQUcsSUFBSSx3QkFBd0IsRUFBRTtBQUdyRCxNQUFNLE9BQU8sc0JBQXNCOzs7Ozs7O0lBS2pDLFlBQ1ksWUFBMEIsRUFBVSxNQUFjLEVBQ2hDLFFBQWEsRUFBVSxnQkFBa0M7UUFEM0UsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2hDLGFBQVEsR0FBUixRQUFRLENBQUs7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBTi9FLHFCQUFnQixHQUFHLElBQUksR0FBRyxFQUFxQixDQUFDO1FBRWhELFdBQU0sR0FBRyxjQUFjLENBQUM7UUFLOUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLHNCQUFzQixDQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxN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QUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pELENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQVksSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7O0lBRTdFLGFBQWEsQ0FBQyxNQUFXLEVBQUUsSUFBWTs7Y0FDL0IsRUFBRSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzNELEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0MsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0NBQ0Y7Ozs7OztJQXZCQywyREFBNEI7Ozs7O0lBQzVCLHdEQUF5Qjs7Ozs7SUFJYSx5REFBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0RvbUVsZW1lbnRTY2hlbWFSZWdpc3RyeX0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXInO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE5nWm9uZSwgUmVuZGVyZXIyLCBSZW5kZXJlckZhY3RvcnkyLCBSZW5kZXJlclN0eWxlRmxhZ3MyLCBSZW5kZXJlclR5cGUyLCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0V2ZW50TWFuYWdlciwgybVOQU1FU1BBQ0VfVVJJUyBhcyBOQU1FU1BBQ0VfVVJJUywgybVTaGFyZWRTdHlsZXNIb3N0IGFzIFNoYXJlZFN0eWxlc0hvc3QsIMm1ZmxhdHRlblN0eWxlcyBhcyBmbGF0dGVuU3R5bGVzLCDJtWdldERPTSBhcyBnZXRET00sIMm1c2hpbUNvbnRlbnRBdHRyaWJ1dGUgYXMgc2hpbUNvbnRlbnRBdHRyaWJ1dGUsIMm1c2hpbUhvc3RBdHRyaWJ1dGUgYXMgc2hpbUhvc3RBdHRyaWJ1dGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5jb25zdCBFTVBUWV9BUlJBWTogYW55W10gPSBbXTtcblxuY29uc3QgREVGQVVMVF9TQ0hFTUEgPSBuZXcgRG9tRWxlbWVudFNjaGVtYVJlZ2lzdHJ5KCk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJSZW5kZXJlckZhY3RvcnkyIGltcGxlbWVudHMgUmVuZGVyZXJGYWN0b3J5MiB7XG4gIHByaXZhdGUgcmVuZGVyZXJCeUNvbXBJZCA9IG5ldyBNYXA8c3RyaW5nLCBSZW5kZXJlcjI+KCk7XG4gIHByaXZhdGUgZGVmYXVsdFJlbmRlcmVyOiBSZW5kZXJlcjI7XG4gIHByaXZhdGUgc2NoZW1hID0gREVGQVVMVF9TQ0hFTUE7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyLCBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LCBwcml2YXRlIHNoYXJlZFN0eWxlc0hvc3Q6IFNoYXJlZFN0eWxlc0hvc3QpIHtcbiAgICB0aGlzLmRlZmF1bHRSZW5kZXJlciA9IG5ldyBEZWZhdWx0U2VydmVyUmVuZGVyZXIyKGV2ZW50TWFuYWdlciwgZG9jdW1lbnQsIG5nWm9uZSwgdGhpcy5zY2hlbWEpO1xuICB9XG5cbiAgY3JlYXRlUmVuZGVyZXIoZWxlbWVudDogYW55LCB0eXBlOiBSZW5kZXJlclR5cGUyfG51bGwpOiBSZW5kZXJlcjIge1xuICAgIGlmICghZWxlbWVudCB8fCAhdHlwZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFJlbmRlcmVyO1xuICAgIH1cbiAgICBzd2l0Y2ggKHR5cGUuZW5jYXBzdWxhdGlvbikge1xuICAgICAgY2FzZSBWaWV3RW5jYXBzdWxhdGlvbi5OYXRpdmU6XG4gICAgICBjYXNlIFZpZXdFbmNhcHN1bGF0aW9uLkVtdWxhdGVkOiB7XG4gICAgICAgIGxldCByZW5kZXJlciA9IHRoaXMucmVuZGVyZXJCeUNvbXBJZC5nZXQodHlwZS5pZCk7XG4gICAgICAgIGlmICghcmVuZGVyZXIpIHtcbiAgICAgICAgICByZW5kZXJlciA9IG5ldyBFbXVsYXRlZEVuY2Fwc3VsYXRpb25TZXJ2ZXJSZW5kZXJlcjIoXG4gICAgICAgICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyLCB0aGlzLmRvY3VtZW50LCB0aGlzLm5nWm9uZSwgdGhpcy5zaGFyZWRTdHlsZXNIb3N0LCB0aGlzLnNjaGVtYSxcbiAgICAgICAgICAgICAgdHlwZSk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlckJ5Q29tcElkLnNldCh0eXBlLmlkLCByZW5kZXJlcik7XG4gICAgICAgIH1cbiAgICAgICAgKDxFbXVsYXRlZEVuY2Fwc3VsYXRpb25TZXJ2ZXJSZW5kZXJlcjI+cmVuZGVyZXIpLmFwcGx5VG9Ib3N0KGVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gcmVuZGVyZXI7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGlmICghdGhpcy5yZW5kZXJlckJ5Q29tcElkLmhhcyh0eXBlLmlkKSkge1xuICAgICAgICAgIGNvbnN0IHN0eWxlcyA9IGZsYXR0ZW5TdHlsZXModHlwZS5pZCwgdHlwZS5zdHlsZXMsIFtdKTtcbiAgICAgICAgICB0aGlzLnNoYXJlZFN0eWxlc0hvc3QuYWRkU3R5bGVzKHN0eWxlcyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlckJ5Q29tcElkLnNldCh0eXBlLmlkLCB0aGlzLmRlZmF1bHRSZW5kZXJlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFJlbmRlcmVyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGJlZ2luKCkge31cbiAgZW5kKCkge31cbn1cblxuY2xhc3MgRGVmYXVsdFNlcnZlclJlbmRlcmVyMiBpbXBsZW1lbnRzIFJlbmRlcmVyMiB7XG4gIGRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsIHByb3RlY3RlZCBkb2N1bWVudDogYW55LCBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgcHJpdmF0ZSBzY2hlbWE6IERvbUVsZW1lbnRTY2hlbWFSZWdpc3RyeSkge31cblxuICBkZXN0cm95KCk6IHZvaWQge31cblxuICBkZXN0cm95Tm9kZTogbnVsbDtcblxuICBjcmVhdGVFbGVtZW50KG5hbWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nLCBkZWJ1Z0luZm8/OiBhbnkpOiBhbnkge1xuICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgIHJldHVybiBnZXRET00oKS5jcmVhdGVFbGVtZW50TlMoTkFNRVNQQUNFX1VSSVNbbmFtZXNwYWNlXSwgbmFtZSwgdGhpcy5kb2N1bWVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdldERPTSgpLmNyZWF0ZUVsZW1lbnQobmFtZSwgdGhpcy5kb2N1bWVudCk7XG4gIH1cblxuICBjcmVhdGVDb21tZW50KHZhbHVlOiBzdHJpbmcsIGRlYnVnSW5mbz86IGFueSk6IGFueSB7IHJldHVybiBnZXRET00oKS5jcmVhdGVDb21tZW50KHZhbHVlKTsgfVxuXG4gIGNyZWF0ZVRleHQodmFsdWU6IHN0cmluZywgZGVidWdJbmZvPzogYW55KTogYW55IHsgcmV0dXJuIGdldERPTSgpLmNyZWF0ZVRleHROb2RlKHZhbHVlKTsgfVxuXG4gIGFwcGVuZENoaWxkKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55KTogdm9pZCB7IGdldERPTSgpLmFwcGVuZENoaWxkKHBhcmVudCwgbmV3Q2hpbGQpOyB9XG5cbiAgaW5zZXJ0QmVmb3JlKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55LCByZWZDaGlsZDogYW55KTogdm9pZCB7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgZ2V0RE9NKCkuaW5zZXJ0QmVmb3JlKHBhcmVudCwgcmVmQ2hpbGQsIG5ld0NoaWxkKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVDaGlsZChwYXJlbnQ6IGFueSwgb2xkQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIGdldERPTSgpLnJlbW92ZUNoaWxkKHBhcmVudCwgb2xkQ2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yT3JOb2RlOiBzdHJpbmd8YW55LCBkZWJ1Z0luZm8/OiBhbnkpOiBhbnkge1xuICAgIGxldCBlbDogYW55O1xuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3JPck5vZGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbCA9IGdldERPTSgpLnF1ZXJ5U2VsZWN0b3IodGhpcy5kb2N1bWVudCwgc2VsZWN0b3JPck5vZGUpO1xuICAgICAgaWYgKCFlbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBzZWxlY3RvciBcIiR7c2VsZWN0b3JPck5vZGV9XCIgZGlkIG5vdCBtYXRjaCBhbnkgZWxlbWVudHNgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWwgPSBzZWxlY3Rvck9yTm9kZTtcbiAgICB9XG4gICAgZ2V0RE9NKCkuY2xlYXJOb2RlcyhlbCk7XG4gICAgcmV0dXJuIGVsO1xuICB9XG5cbiAgcGFyZW50Tm9kZShub2RlOiBhbnkpOiBhbnkgeyByZXR1cm4gZ2V0RE9NKCkucGFyZW50RWxlbWVudChub2RlKTsgfVxuXG4gIG5leHRTaWJsaW5nKG5vZGU6IGFueSk6IGFueSB7IHJldHVybiBnZXRET00oKS5uZXh0U2libGluZyhub2RlKTsgfVxuXG4gIHNldEF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgIGdldERPTSgpLnNldEF0dHJpYnV0ZU5TKGVsLCBOQU1FU1BBQ0VfVVJJU1tuYW1lc3BhY2VdLCBuYW1lc3BhY2UgKyAnOicgKyBuYW1lLCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdldERPTSgpLnNldEF0dHJpYnV0ZShlbCwgbmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgIGdldERPTSgpLnJlbW92ZUF0dHJpYnV0ZU5TKGVsLCBOQU1FU1BBQ0VfVVJJU1tuYW1lc3BhY2VdLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2V0RE9NKCkucmVtb3ZlQXR0cmlidXRlKGVsLCBuYW1lKTtcbiAgICB9XG4gIH1cblxuICBhZGRDbGFzcyhlbDogYW55LCBuYW1lOiBzdHJpbmcpOiB2b2lkIHsgZ2V0RE9NKCkuYWRkQ2xhc3MoZWwsIG5hbWUpOyB9XG5cbiAgcmVtb3ZlQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZCB7IGdldERPTSgpLnJlbW92ZUNsYXNzKGVsLCBuYW1lKTsgfVxuXG4gIHNldFN0eWxlKGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIHZhbHVlOiBhbnksIGZsYWdzOiBSZW5kZXJlclN0eWxlRmxhZ3MyKTogdm9pZCB7XG4gICAgZ2V0RE9NKCkuc2V0U3R5bGUoZWwsIHN0eWxlLCB2YWx1ZSk7XG4gIH1cblxuICByZW1vdmVTdHlsZShlbDogYW55LCBzdHlsZTogc3RyaW5nLCBmbGFnczogUmVuZGVyZXJTdHlsZUZsYWdzMik6IHZvaWQge1xuICAgIGdldERPTSgpLnJlbW92ZVN0eWxlKGVsLCBzdHlsZSk7XG4gIH1cblxuICAvLyBUaGUgdmFsdWUgd2FzIHZhbGlkYXRlZCBhbHJlYWR5IGFzIGEgcHJvcGVydHkgYmluZGluZywgYWdhaW5zdCB0aGUgcHJvcGVydHkgbmFtZS5cbiAgLy8gVG8ga25vdyB0aGlzIHZhbHVlIGlzIHNhZmUgdG8gdXNlIGFzIGFuIGF0dHJpYnV0ZSwgdGhlIHNlY3VyaXR5IGNvbnRleHQgb2YgdGhlXG4gIC8vIGF0dHJpYnV0ZSB3aXRoIHRoZSBnaXZlbiBuYW1lIGlzIGNoZWNrZWQgYWdhaW5zdCB0aGF0IHNlY3VyaXR5IGNvbnRleHQgb2YgdGhlXG4gIC8vIHByb3BlcnR5LlxuICBwcml2YXRlIF9pc1NhZmVUb1JlZmxlY3RQcm9wZXJ0eSh0YWdOYW1lOiBzdHJpbmcsIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2NoZW1hLnNlY3VyaXR5Q29udGV4dCh0YWdOYW1lLCBwcm9wZXJ0eU5hbWUsIHRydWUpID09PVxuICAgICAgICB0aGlzLnNjaGVtYS5zZWN1cml0eUNvbnRleHQodGFnTmFtZSwgcHJvcGVydHlOYW1lLCBmYWxzZSk7XG4gIH1cblxuICBzZXRQcm9wZXJ0eShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBjaGVja05vU3ludGhldGljUHJvcChuYW1lLCAncHJvcGVydHknKTtcbiAgICBnZXRET00oKS5zZXRQcm9wZXJ0eShlbCwgbmFtZSwgdmFsdWUpO1xuICAgIC8vIE1pcnJvciBwcm9wZXJ0eSB2YWx1ZXMgZm9yIGtub3duIEhUTUwgZWxlbWVudCBwcm9wZXJ0aWVzIGluIHRoZSBhdHRyaWJ1dGVzLlxuICAgIC8vIFNraXAgYGlubmVyaHRtbGAgd2hpY2ggaXMgY29uc2VydmF0aXZlbHkgbWFya2VkIGFzIGFuIGF0dHJpYnV0ZSBmb3Igc2VjdXJpdHlcbiAgICAvLyBwdXJwb3NlcyBidXQgaXMgbm90IGFjdHVhbGx5IGFuIGF0dHJpYnV0ZS5cbiAgICBjb25zdCB0YWdOYW1lID0gKGVsLnRhZ05hbWUgYXMgc3RyaW5nKS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICh2YWx1ZSAhPSBudWxsICYmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInIHx8IHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykgJiZcbiAgICAgICAgbmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnaW5uZXJodG1sJyAmJiB0aGlzLnNjaGVtYS5oYXNFbGVtZW50KHRhZ05hbWUsIEVNUFRZX0FSUkFZKSAmJlxuICAgICAgICB0aGlzLnNjaGVtYS5oYXNQcm9wZXJ0eSh0YWdOYW1lLCBuYW1lLCBFTVBUWV9BUlJBWSkgJiZcbiAgICAgICAgdGhpcy5faXNTYWZlVG9SZWZsZWN0UHJvcGVydHkodGFnTmFtZSwgbmFtZSkpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGVsLCBuYW1lLCB2YWx1ZS50b1N0cmluZygpKTtcbiAgICB9XG4gIH1cblxuICBzZXRWYWx1ZShub2RlOiBhbnksIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHsgZ2V0RE9NKCkuc2V0VGV4dChub2RlLCB2YWx1ZSk7IH1cblxuICBsaXN0ZW4oXG4gICAgICB0YXJnZXQ6ICdkb2N1bWVudCd8J3dpbmRvdyd8J2JvZHknfGFueSwgZXZlbnROYW1lOiBzdHJpbmcsXG4gICAgICBjYWxsYmFjazogKGV2ZW50OiBhbnkpID0+IGJvb2xlYW4pOiAoKSA9PiB2b2lkIHtcbiAgICBjaGVja05vU3ludGhldGljUHJvcChldmVudE5hbWUsICdsaXN0ZW5lcicpO1xuICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIDwoKSA9PiB2b2lkPnRoaXMuZXZlbnRNYW5hZ2VyLmFkZEdsb2JhbEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgdGFyZ2V0LCBldmVudE5hbWUsIHRoaXMuZGVjb3JhdGVQcmV2ZW50RGVmYXVsdChjYWxsYmFjaykpO1xuICAgIH1cbiAgICByZXR1cm4gPCgpID0+IHZvaWQ+dGhpcy5ldmVudE1hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgIHRhcmdldCwgZXZlbnROYW1lLCB0aGlzLmRlY29yYXRlUHJldmVudERlZmF1bHQoY2FsbGJhY2spKSBhcygpID0+IHZvaWQ7XG4gIH1cblxuICBwcml2YXRlIGRlY29yYXRlUHJldmVudERlZmF1bHQoZXZlbnRIYW5kbGVyOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICByZXR1cm4gKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgIC8vIEl2eSB1c2VzIGBGdW5jdGlvbmAgYXMgYSBzcGVjaWFsIHRva2VuIHRoYXQgYWxsb3dzIHVzIHRvIHVud3JhcCB0aGUgZnVuY3Rpb25cbiAgICAgIC8vIHNvIHRoYXQgaXQgY2FuIGJlIGludm9rZWQgcHJvZ3JhbW1hdGljYWxseSBieSBgRGVidWdOb2RlLnRyaWdnZXJFdmVudEhhbmRsZXJgLlxuICAgICAgaWYgKGV2ZW50ID09PSBGdW5jdGlvbikge1xuICAgICAgICByZXR1cm4gZXZlbnRIYW5kbGVyO1xuICAgICAgfVxuXG4gICAgICAvLyBSdW4gdGhlIGV2ZW50IGhhbmRsZXIgaW5zaWRlIHRoZSBuZ1pvbmUgYmVjYXVzZSBldmVudCBoYW5kbGVycyBhcmUgbm90IHBhdGNoZWRcbiAgICAgIC8vIGJ5IFpvbmUgb24gdGhlIHNlcnZlci4gVGhpcyBpcyByZXF1aXJlZCBvbmx5IGZvciB0ZXN0cy5cbiAgICAgIGNvbnN0IGFsbG93RGVmYXVsdEJlaGF2aW9yID0gdGhpcy5uZ1pvbmUucnVuR3VhcmRlZCgoKSA9PiBldmVudEhhbmRsZXIoZXZlbnQpKTtcbiAgICAgIGlmIChhbGxvd0RlZmF1bHRCZWhhdmlvciA9PT0gZmFsc2UpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICB9XG59XG5cbmNvbnN0IEFUX0NIQVJDT0RFID0gJ0AnLmNoYXJDb2RlQXQoMCk7XG5mdW5jdGlvbiBjaGVja05vU3ludGhldGljUHJvcChuYW1lOiBzdHJpbmcsIG5hbWVLaW5kOiBzdHJpbmcpIHtcbiAgaWYgKG5hbWUuY2hhckNvZGVBdCgwKSA9PT0gQVRfQ0hBUkNPREUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBGb3VuZCB0aGUgc3ludGhldGljICR7bmFtZUtpbmR9ICR7bmFtZX0uIFBsZWFzZSBpbmNsdWRlIGVpdGhlciBcIkJyb3dzZXJBbmltYXRpb25zTW9kdWxlXCIgb3IgXCJOb29wQW5pbWF0aW9uc01vZHVsZVwiIGluIHlvdXIgYXBwbGljYXRpb24uYCk7XG4gIH1cbn1cblxuY2xhc3MgRW11bGF0ZWRFbmNhcHN1bGF0aW9uU2VydmVyUmVuZGVyZXIyIGV4dGVuZHMgRGVmYXVsdFNlcnZlclJlbmRlcmVyMiB7XG4gIHByaXZhdGUgY29udGVudEF0dHI6IHN0cmluZztcbiAgcHJpdmF0ZSBob3N0QXR0cjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsIGRvY3VtZW50OiBhbnksIG5nWm9uZTogTmdab25lLCBzaGFyZWRTdHlsZXNIb3N0OiBTaGFyZWRTdHlsZXNIb3N0LFxuICAgICAgc2NoZW1hOiBEb21FbGVtZW50U2NoZW1hUmVnaXN0cnksIHByaXZhdGUgY29tcG9uZW50OiBSZW5kZXJlclR5cGUyKSB7XG4gICAgc3VwZXIoZXZlbnRNYW5hZ2VyLCBkb2N1bWVudCwgbmdab25lLCBzY2hlbWEpO1xuICAgIC8vIEFkZCBhICdzJyBwcmVmaXggdG8gc3R5bGUgYXR0cmlidXRlcyB0byBpbmRpY2F0ZSBzZXJ2ZXIuXG4gICAgY29uc3QgY29tcG9uZW50SWQgPSAncycgKyBjb21wb25lbnQuaWQ7XG4gICAgY29uc3Qgc3R5bGVzID0gZmxhdHRlblN0eWxlcyhjb21wb25lbnRJZCwgY29tcG9uZW50LnN0eWxlcywgW10pO1xuICAgIHNoYXJlZFN0eWxlc0hvc3QuYWRkU3R5bGVzKHN0eWxlcyk7XG5cbiAgICB0aGlzLmNvbnRlbnRBdHRyID0gc2hpbUNvbnRlbnRBdHRyaWJ1dGUoY29tcG9uZW50SWQpO1xuICAgIHRoaXMuaG9zdEF0dHIgPSBzaGltSG9zdEF0dHJpYnV0ZShjb21wb25lbnRJZCk7XG4gIH1cblxuICBhcHBseVRvSG9zdChlbGVtZW50OiBhbnkpIHsgc3VwZXIuc2V0QXR0cmlidXRlKGVsZW1lbnQsIHRoaXMuaG9zdEF0dHIsICcnKTsgfVxuXG4gIGNyZWF0ZUVsZW1lbnQocGFyZW50OiBhbnksIG5hbWU6IHN0cmluZyk6IEVsZW1lbnQge1xuICAgIGNvbnN0IGVsID0gc3VwZXIuY3JlYXRlRWxlbWVudChwYXJlbnQsIG5hbWUsIHRoaXMuZG9jdW1lbnQpO1xuICAgIHN1cGVyLnNldEF0dHJpYnV0ZShlbCwgdGhpcy5jb250ZW50QXR0ciwgJycpO1xuICAgIHJldHVybiBlbDtcbiAgfVxufVxuIl19