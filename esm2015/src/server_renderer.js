/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DomElementSchemaRegistry } from '@angular/compiler';
import { Inject, Injectable, NgZone, ViewEncapsulation } from '@angular/core';
import { DOCUMENT, EventManager, ɵNAMESPACE_URIS as NAMESPACE_URIS, ɵSharedStylesHost as SharedStylesHost, ɵflattenStyles as flattenStyles, ɵgetDOM as getDOM, ɵshimContentAttribute as shimContentAttribute, ɵshimHostAttribute as shimHostAttribute } from '@angular/platform-browser';
/** @type {?} */
const EMPTY_ARRAY = [];
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
        this.schema = new DomElementSchemaRegistry();
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
                (/** @type {?} */ (renderer)).applyToHost(element);
                return renderer;
            }
            case ViewEncapsulation.Native:
                throw new Error('Native encapsulation is not supported on the server!');
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
    /** @type {?} */
    ServerRendererFactory2.prototype.rendererByCompId;
    /** @type {?} */
    ServerRendererFactory2.prototype.defaultRenderer;
    /** @type {?} */
    ServerRendererFactory2.prototype.schema;
    /** @type {?} */
    ServerRendererFactory2.prototype.eventManager;
    /** @type {?} */
    ServerRendererFactory2.prototype.ngZone;
    /** @type {?} */
    ServerRendererFactory2.prototype.document;
    /** @type {?} */
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
    /**
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
        /** @type {?} */
        const tagName = (/** @type {?} */ (el.tagName)).toLowerCase();
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
            return /** @type {?} */ (this.eventManager.addGlobalEventListener(target, eventName, this.decoratePreventDefault(callback)));
        }
        return /** @type {?} */ ((this.eventManager.addEventListener(target, eventName, this.decoratePreventDefault(callback))));
    }
    /**
     * @param {?} eventHandler
     * @return {?}
     */
    decoratePreventDefault(eventHandler) {
        return (event) => {
            /** @type {?} */
            const allowDefaultBehavior = this.ngZone.runGuarded(() => eventHandler(event));
            if (allowDefaultBehavior === false) {
                event.preventDefault();
                event.returnValue = false;
            }
        };
    }
}
if (false) {
    /** @type {?} */
    DefaultServerRenderer2.prototype.data;
    /** @type {?} */
    DefaultServerRenderer2.prototype.destroyNode;
    /** @type {?} */
    DefaultServerRenderer2.prototype.eventManager;
    /** @type {?} */
    DefaultServerRenderer2.prototype.document;
    /** @type {?} */
    DefaultServerRenderer2.prototype.ngZone;
    /** @type {?} */
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
    /** @type {?} */
    EmulatedEncapsulationServerRenderer2.prototype.contentAttr;
    /** @type {?} */
    EmulatedEncapsulationServerRenderer2.prototype.hostAttr;
    /** @type {?} */
    EmulatedEncapsulationServerRenderer2.prototype.component;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tc2VydmVyL3NyYy9zZXJ2ZXJfcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUMzRCxPQUFPLEVBQVMsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQWdILGlCQUFpQixFQUEwQixNQUFNLGVBQWUsQ0FBQztBQUMzTixPQUFPLEVBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxlQUFlLElBQUksY0FBYyxFQUFFLGlCQUFpQixJQUFJLGdCQUFnQixFQUFFLGNBQWMsSUFBSSxhQUFhLEVBQUUsT0FBTyxJQUFJLE1BQU0sRUFBRSxxQkFBcUIsSUFBSSxvQkFBb0IsRUFBRSxrQkFBa0IsSUFBSSxpQkFBaUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDOztBQUV2UixNQUFNLFdBQVcsR0FBVSxFQUFFLENBQUM7QUFHOUIsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7OztJQUtqQyxZQUNZLGNBQW9DLE1BQWMsRUFDaEMsUUFBYSxFQUFVLGdCQUFrQztRQUQzRSxpQkFBWSxHQUFaLFlBQVk7UUFBd0IsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNoQyxhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtnQ0FONUQsSUFBSSxHQUFHLEVBQXFCO3NCQUV0QyxJQUFJLHdCQUF3QixFQUFFO1FBSzdDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxzQkFBc0IsQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDaEc7Ozs7OztJQUVELGNBQWMsQ0FBQyxPQUFZLEVBQUUsSUFBd0I7UUFDbkQsSUFBSSxDQUFDLE9BQU8sSUFBSSxD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Q0FBcUMsU0FBUSxzQkFBc0I7Ozs7Ozs7OztJQUl2RSxZQUNJLFlBQTBCLEVBQUUsUUFBYSxFQUFFLE1BQWMsRUFBRSxnQkFBa0MsRUFDN0YsTUFBZ0MsRUFBVSxTQUF3QjtRQUNwRSxLQUFLLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFERixjQUFTLEdBQVQsU0FBUyxDQUFlOztRQUdwRSxNQUFNLFdBQVcsR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQzs7UUFDdkMsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2hFLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVuQyxJQUFJLENBQUMsV0FBVyxHQUFHLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxRQUFRLEdBQUcsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDaEQ7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQVksSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Ozs7OztJQUU3RSxhQUFhLENBQUMsTUFBVyxFQUFFLElBQVk7O1FBQ3JDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUQsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3QyxPQUFPLEVBQUUsQ0FBQztLQUNYO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RG9tRWxlbWVudFNjaGVtYVJlZ2lzdHJ5fSBmcm9tICdAYW5ndWxhci9jb21waWxlcic7XG5pbXBvcnQge0FQUF9JRCwgSW5qZWN0LCBJbmplY3RhYmxlLCBOZ1pvbmUsIFJlbmRlckNvbXBvbmVudFR5cGUsIFJlbmRlcmVyLCBSZW5kZXJlcjIsIFJlbmRlcmVyRmFjdG9yeTIsIFJlbmRlcmVyU3R5bGVGbGFnczIsIFJlbmRlcmVyVHlwZTIsIFJvb3RSZW5kZXJlciwgVmlld0VuY2Fwc3VsYXRpb24sIMm1c3RyaW5naWZ5IGFzIHN0cmluZ2lmeX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5ULCBFdmVudE1hbmFnZXIsIMm1TkFNRVNQQUNFX1VSSVMgYXMgTkFNRVNQQUNFX1VSSVMsIMm1U2hhcmVkU3R5bGVzSG9zdCBhcyBTaGFyZWRTdHlsZXNIb3N0LCDJtWZsYXR0ZW5TdHlsZXMgYXMgZmxhdHRlblN0eWxlcywgybVnZXRET00gYXMgZ2V0RE9NLCDJtXNoaW1Db250ZW50QXR0cmlidXRlIGFzIHNoaW1Db250ZW50QXR0cmlidXRlLCDJtXNoaW1Ib3N0QXR0cmlidXRlIGFzIHNoaW1Ib3N0QXR0cmlidXRlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuY29uc3QgRU1QVFlfQVJSQVk6IGFueVtdID0gW107XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJSZW5kZXJlckZhY3RvcnkyIGltcGxlbWVudHMgUmVuZGVyZXJGYWN0b3J5MiB7XG4gIHByaXZhdGUgcmVuZGVyZXJCeUNvbXBJZCA9IG5ldyBNYXA8c3RyaW5nLCBSZW5kZXJlcjI+KCk7XG4gIHByaXZhdGUgZGVmYXVsdFJlbmRlcmVyOiBSZW5kZXJlcjI7XG4gIHByaXZhdGUgc2NoZW1hID0gbmV3IERvbUVsZW1lbnRTY2hlbWFSZWdpc3RyeSgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlciwgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSwgcHJpdmF0ZSBzaGFyZWRTdHlsZXNIb3N0OiBTaGFyZWRTdHlsZXNIb3N0KSB7XG4gICAgdGhpcy5kZWZhdWx0UmVuZGVyZXIgPSBuZXcgRGVmYXVsdFNlcnZlclJlbmRlcmVyMihldmVudE1hbmFnZXIsIGRvY3VtZW50LCBuZ1pvbmUsIHRoaXMuc2NoZW1hKTtcbiAgfVxuXG4gIGNyZWF0ZVJlbmRlcmVyKGVsZW1lbnQ6IGFueSwgdHlwZTogUmVuZGVyZXJUeXBlMnxudWxsKTogUmVuZGVyZXIyIHtcbiAgICBpZiAoIWVsZW1lbnQgfHwgIXR5cGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlZmF1bHRSZW5kZXJlcjtcbiAgICB9XG4gICAgc3dpdGNoICh0eXBlLmVuY2Fwc3VsYXRpb24pIHtcbiAgICAgIGNhc2UgVmlld0VuY2Fwc3VsYXRpb24uTmF0aXZlOlxuICAgICAgY2FzZSBWaWV3RW5jYXBzdWxhdGlvbi5FbXVsYXRlZDoge1xuICAgICAgICBsZXQgcmVuZGVyZXIgPSB0aGlzLnJlbmRlcmVyQnlDb21wSWQuZ2V0KHR5cGUuaWQpO1xuICAgICAgICBpZiAoIXJlbmRlcmVyKSB7XG4gICAgICAgICAgcmVuZGVyZXIgPSBuZXcgRW11bGF0ZWRFbmNhcHN1bGF0aW9uU2VydmVyUmVuZGVyZXIyKFxuICAgICAgICAgICAgICB0aGlzLmV2ZW50TWFuYWdlciwgdGhpcy5kb2N1bWVudCwgdGhpcy5uZ1pvbmUsIHRoaXMuc2hhcmVkU3R5bGVzSG9zdCwgdGhpcy5zY2hlbWEsXG4gICAgICAgICAgICAgIHR5cGUpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXJCeUNvbXBJZC5zZXQodHlwZS5pZCwgcmVuZGVyZXIpO1xuICAgICAgICB9XG4gICAgICAgICg8RW11bGF0ZWRFbmNhcHN1bGF0aW9uU2VydmVyUmVuZGVyZXIyPnJlbmRlcmVyKS5hcHBseVRvSG9zdChlbGVtZW50KTtcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyO1xuICAgICAgfVxuICAgICAgY2FzZSBWaWV3RW5jYXBzdWxhdGlvbi5OYXRpdmU6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTmF0aXZlIGVuY2Fwc3VsYXRpb24gaXMgbm90IHN1cHBvcnRlZCBvbiB0aGUgc2VydmVyIScpO1xuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBpZiAoIXRoaXMucmVuZGVyZXJCeUNvbXBJZC5oYXModHlwZS5pZCkpIHtcbiAgICAgICAgICBjb25zdCBzdHlsZXMgPSBmbGF0dGVuU3R5bGVzKHR5cGUuaWQsIHR5cGUuc3R5bGVzLCBbXSk7XG4gICAgICAgICAgdGhpcy5zaGFyZWRTdHlsZXNIb3N0LmFkZFN0eWxlcyhzdHlsZXMpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXJCeUNvbXBJZC5zZXQodHlwZS5pZCwgdGhpcy5kZWZhdWx0UmVuZGVyZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmRlZmF1bHRSZW5kZXJlcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBiZWdpbigpIHt9XG4gIGVuZCgpIHt9XG59XG5cbmNsYXNzIERlZmF1bHRTZXJ2ZXJSZW5kZXJlcjIgaW1wbGVtZW50cyBSZW5kZXJlcjIge1xuICBkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyLCBwcm90ZWN0ZWQgZG9jdW1lbnQ6IGFueSwgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgIHByaXZhdGUgc2NoZW1hOiBEb21FbGVtZW50U2NoZW1hUmVnaXN0cnkpIHt9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHt9XG5cbiAgZGVzdHJveU5vZGU6IG51bGw7XG5cbiAgY3JlYXRlRWxlbWVudChuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZywgZGVidWdJbmZvPzogYW55KTogYW55IHtcbiAgICBpZiAobmFtZXNwYWNlKSB7XG4gICAgICByZXR1cm4gZ2V0RE9NKCkuY3JlYXRlRWxlbWVudE5TKE5BTUVTUEFDRV9VUklTW25hbWVzcGFjZV0sIG5hbWUsIHRoaXMuZG9jdW1lbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBnZXRET00oKS5jcmVhdGVFbGVtZW50KG5hbWUsIHRoaXMuZG9jdW1lbnQpO1xuICB9XG5cbiAgY3JlYXRlQ29tbWVudCh2YWx1ZTogc3RyaW5nLCBkZWJ1Z0luZm8/OiBhbnkpOiBhbnkgeyByZXR1cm4gZ2V0RE9NKCkuY3JlYXRlQ29tbWVudCh2YWx1ZSk7IH1cblxuICBjcmVhdGVUZXh0KHZhbHVlOiBzdHJpbmcsIGRlYnVnSW5mbz86IGFueSk6IGFueSB7IHJldHVybiBnZXRET00oKS5jcmVhdGVUZXh0Tm9kZSh2YWx1ZSk7IH1cblxuICBhcHBlbmRDaGlsZChwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSk6IHZvaWQgeyBnZXRET00oKS5hcHBlbmRDaGlsZChwYXJlbnQsIG5ld0NoaWxkKTsgfVxuXG4gIGluc2VydEJlZm9yZShwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSwgcmVmQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIGdldERPTSgpLmluc2VydEJlZm9yZShwYXJlbnQsIHJlZkNoaWxkLCBuZXdDaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQ2hpbGQocGFyZW50OiBhbnksIG9sZENoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBnZXRET00oKS5yZW1vdmVDaGlsZChwYXJlbnQsIG9sZENoaWxkKTtcbiAgICB9XG4gIH1cblxuICBzZWxlY3RSb290RWxlbWVudChzZWxlY3Rvck9yTm9kZTogc3RyaW5nfGFueSwgZGVidWdJbmZvPzogYW55KTogYW55IHtcbiAgICBsZXQgZWw6IGFueTtcbiAgICBpZiAodHlwZW9mIHNlbGVjdG9yT3JOb2RlID09PSAnc3RyaW5nJykge1xuICAgICAgZWwgPSBnZXRET00oKS5xdWVyeVNlbGVjdG9yKHRoaXMuZG9jdW1lbnQsIHNlbGVjdG9yT3JOb2RlKTtcbiAgICAgIGlmICghZWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgc2VsZWN0b3IgXCIke3NlbGVjdG9yT3JOb2RlfVwiIGRpZCBub3QgbWF0Y2ggYW55IGVsZW1lbnRzYCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsID0gc2VsZWN0b3JPck5vZGU7XG4gICAgfVxuICAgIGdldERPTSgpLmNsZWFyTm9kZXMoZWwpO1xuICAgIHJldHVybiBlbDtcbiAgfVxuXG4gIHBhcmVudE5vZGUobm9kZTogYW55KTogYW55IHsgcmV0dXJuIGdldERPTSgpLnBhcmVudEVsZW1lbnQobm9kZSk7IH1cblxuICBuZXh0U2libGluZyhub2RlOiBhbnkpOiBhbnkgeyByZXR1cm4gZ2V0RE9NKCkubmV4dFNpYmxpbmcobm9kZSk7IH1cblxuICBzZXRBdHRyaWJ1dGUoZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAobmFtZXNwYWNlKSB7XG4gICAgICBnZXRET00oKS5zZXRBdHRyaWJ1dGVOUyhlbCwgTkFNRVNQQUNFX1VSSVNbbmFtZXNwYWNlXSwgbmFtZXNwYWNlICsgJzonICsgbmFtZSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZXRET00oKS5zZXRBdHRyaWJ1dGUoZWwsIG5hbWUsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVBdHRyaWJ1dGUoZWw6IGFueSwgbmFtZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAobmFtZXNwYWNlKSB7XG4gICAgICBnZXRET00oKS5yZW1vdmVBdHRyaWJ1dGVOUyhlbCwgTkFNRVNQQUNFX1VSSVNbbmFtZXNwYWNlXSwgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdldERPTSgpLnJlbW92ZUF0dHJpYnV0ZShlbCwgbmFtZSk7XG4gICAgfVxuICB9XG5cbiAgYWRkQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZCB7IGdldERPTSgpLmFkZENsYXNzKGVsLCBuYW1lKTsgfVxuXG4gIHJlbW92ZUNsYXNzKGVsOiBhbnksIG5hbWU6IHN0cmluZyk6IHZvaWQgeyBnZXRET00oKS5yZW1vdmVDbGFzcyhlbCwgbmFtZSk7IH1cblxuICBzZXRTdHlsZShlbDogYW55LCBzdHlsZTogc3RyaW5nLCB2YWx1ZTogYW55LCBmbGFnczogUmVuZGVyZXJTdHlsZUZsYWdzMik6IHZvaWQge1xuICAgIGdldERPTSgpLnNldFN0eWxlKGVsLCBzdHlsZSwgdmFsdWUpO1xuICB9XG5cbiAgcmVtb3ZlU3R5bGUoZWw6IGFueSwgc3R5bGU6IHN0cmluZywgZmxhZ3M6IFJlbmRlcmVyU3R5bGVGbGFnczIpOiB2b2lkIHtcbiAgICBnZXRET00oKS5yZW1vdmVTdHlsZShlbCwgc3R5bGUpO1xuICB9XG5cbiAgLy8gVGhlIHZhbHVlIHdhcyB2YWxpZGF0ZWQgYWxyZWFkeSBhcyBhIHByb3BlcnR5IGJpbmRpbmcsIGFnYWluc3QgdGhlIHByb3BlcnR5IG5hbWUuXG4gIC8vIFRvIGtub3cgdGhpcyB2YWx1ZSBpcyBzYWZlIHRvIHVzZSBhcyBhbiBhdHRyaWJ1dGUsIHRoZSBzZWN1cml0eSBjb250ZXh0IG9mIHRoZVxuICAvLyBhdHRyaWJ1dGUgd2l0aCB0aGUgZ2l2ZW4gbmFtZSBpcyBjaGVja2VkIGFnYWluc3QgdGhhdCBzZWN1cml0eSBjb250ZXh0IG9mIHRoZVxuICAvLyBwcm9wZXJ0eS5cbiAgcHJpdmF0ZSBfaXNTYWZlVG9SZWZsZWN0UHJvcGVydHkodGFnTmFtZTogc3RyaW5nLCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNjaGVtYS5zZWN1cml0eUNvbnRleHQodGFnTmFtZSwgcHJvcGVydHlOYW1lLCB0cnVlKSA9PT1cbiAgICAgICAgdGhpcy5zY2hlbWEuc2VjdXJpdHlDb250ZXh0KHRhZ05hbWUsIHByb3BlcnR5TmFtZSwgZmFsc2UpO1xuICB9XG5cbiAgc2V0UHJvcGVydHkoZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgY2hlY2tOb1N5bnRoZXRpY1Byb3AobmFtZSwgJ3Byb3BlcnR5Jyk7XG4gICAgZ2V0RE9NKCkuc2V0UHJvcGVydHkoZWwsIG5hbWUsIHZhbHVlKTtcbiAgICAvLyBNaXJyb3IgcHJvcGVydHkgdmFsdWVzIGZvciBrbm93biBIVE1MIGVsZW1lbnQgcHJvcGVydGllcyBpbiB0aGUgYXR0cmlidXRlcy5cbiAgICAvLyBTa2lwIGBpbm5lcmh0bWxgIHdoaWNoIGlzIGNvbnNlcnZhdGl2ZWx5IG1hcmtlZCBhcyBhbiBhdHRyaWJ1dGUgZm9yIHNlY3VyaXR5XG4gICAgLy8gcHVycG9zZXMgYnV0IGlzIG5vdCBhY3R1YWxseSBhbiBhdHRyaWJ1dGUuXG4gICAgY29uc3QgdGFnTmFtZSA9IChlbC50YWdOYW1lIGFzIHN0cmluZykudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAodmFsdWUgIT0gbnVsbCAmJiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyB8fCB0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpICYmXG4gICAgICAgIG5hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2lubmVyaHRtbCcgJiYgdGhpcy5zY2hlbWEuaGFzRWxlbWVudCh0YWdOYW1lLCBFTVBUWV9BUlJBWSkgJiZcbiAgICAgICAgdGhpcy5zY2hlbWEuaGFzUHJvcGVydHkodGFnTmFtZSwgbmFtZSwgRU1QVFlfQVJSQVkpICYmXG4gICAgICAgIHRoaXMuX2lzU2FmZVRvUmVmbGVjdFByb3BlcnR5KHRhZ05hbWUsIG5hbWUpKSB7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZShlbCwgbmFtZSwgdmFsdWUudG9TdHJpbmcoKSk7XG4gICAgfVxuICB9XG5cbiAgc2V0VmFsdWUobm9kZTogYW55LCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7IGdldERPTSgpLnNldFRleHQobm9kZSwgdmFsdWUpOyB9XG5cbiAgbGlzdGVuKFxuICAgICAgdGFyZ2V0OiAnZG9jdW1lbnQnfCd3aW5kb3cnfCdib2R5J3xhbnksIGV2ZW50TmFtZTogc3RyaW5nLFxuICAgICAgY2FsbGJhY2s6IChldmVudDogYW55KSA9PiBib29sZWFuKTogKCkgPT4gdm9pZCB7XG4gICAgY2hlY2tOb1N5bnRoZXRpY1Byb3AoZXZlbnROYW1lLCAnbGlzdGVuZXInKTtcbiAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiA8KCkgPT4gdm9pZD50aGlzLmV2ZW50TWFuYWdlci5hZGRHbG9iYWxFdmVudExpc3RlbmVyKFxuICAgICAgICAgIHRhcmdldCwgZXZlbnROYW1lLCB0aGlzLmRlY29yYXRlUHJldmVudERlZmF1bHQoY2FsbGJhY2spKTtcbiAgICB9XG4gICAgcmV0dXJuIDwoKSA9PiB2b2lkPnRoaXMuZXZlbnRNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgICB0YXJnZXQsIGV2ZW50TmFtZSwgdGhpcy5kZWNvcmF0ZVByZXZlbnREZWZhdWx0KGNhbGxiYWNrKSkgYXMoKSA9PiB2b2lkO1xuICB9XG5cbiAgcHJpdmF0ZSBkZWNvcmF0ZVByZXZlbnREZWZhdWx0KGV2ZW50SGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgcmV0dXJuIChldmVudDogYW55KSA9PiB7XG4gICAgICAvLyBSdW4gdGhlIGV2ZW50IGhhbmRsZXIgaW5zaWRlIHRoZSBuZ1pvbmUgYmVjYXVzZSBldmVudCBoYW5kbGVycyBhcmUgbm90IHBhdGNoZWRcbiAgICAgIC8vIGJ5IFpvbmUgb24gdGhlIHNlcnZlci4gVGhpcyBpcyByZXF1aXJlZCBvbmx5IGZvciB0ZXN0cy5cbiAgICAgIGNvbnN0IGFsbG93RGVmYXVsdEJlaGF2aW9yID0gdGhpcy5uZ1pvbmUucnVuR3VhcmRlZCgoKSA9PiBldmVudEhhbmRsZXIoZXZlbnQpKTtcbiAgICAgIGlmIChhbGxvd0RlZmF1bHRCZWhhdmlvciA9PT0gZmFsc2UpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG5cbmNvbnN0IEFUX0NIQVJDT0RFID0gJ0AnLmNoYXJDb2RlQXQoMCk7XG5mdW5jdGlvbiBjaGVja05vU3ludGhldGljUHJvcChuYW1lOiBzdHJpbmcsIG5hbWVLaW5kOiBzdHJpbmcpIHtcbiAgaWYgKG5hbWUuY2hhckNvZGVBdCgwKSA9PT0gQVRfQ0hBUkNPREUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBGb3VuZCB0aGUgc3ludGhldGljICR7bmFtZUtpbmR9ICR7bmFtZX0uIFBsZWFzZSBpbmNsdWRlIGVpdGhlciBcIkJyb3dzZXJBbmltYXRpb25zTW9kdWxlXCIgb3IgXCJOb29wQW5pbWF0aW9uc01vZHVsZVwiIGluIHlvdXIgYXBwbGljYXRpb24uYCk7XG4gIH1cbn1cblxuY2xhc3MgRW11bGF0ZWRFbmNhcHN1bGF0aW9uU2VydmVyUmVuZGVyZXIyIGV4dGVuZHMgRGVmYXVsdFNlcnZlclJlbmRlcmVyMiB7XG4gIHByaXZhdGUgY29udGVudEF0dHI6IHN0cmluZztcbiAgcHJpdmF0ZSBob3N0QXR0cjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsIGRvY3VtZW50OiBhbnksIG5nWm9uZTogTmdab25lLCBzaGFyZWRTdHlsZXNIb3N0OiBTaGFyZWRTdHlsZXNIb3N0LFxuICAgICAgc2NoZW1hOiBEb21FbGVtZW50U2NoZW1hUmVnaXN0cnksIHByaXZhdGUgY29tcG9uZW50OiBSZW5kZXJlclR5cGUyKSB7XG4gICAgc3VwZXIoZXZlbnRNYW5hZ2VyLCBkb2N1bWVudCwgbmdab25lLCBzY2hlbWEpO1xuICAgIC8vIEFkZCBhICdzJyBwcmVmaXggdG8gc3R5bGUgYXR0cmlidXRlcyB0byBpbmRpY2F0ZSBzZXJ2ZXIuXG4gICAgY29uc3QgY29tcG9uZW50SWQgPSAncycgKyBjb21wb25lbnQuaWQ7XG4gICAgY29uc3Qgc3R5bGVzID0gZmxhdHRlblN0eWxlcyhjb21wb25lbnRJZCwgY29tcG9uZW50LnN0eWxlcywgW10pO1xuICAgIHNoYXJlZFN0eWxlc0hvc3QuYWRkU3R5bGVzKHN0eWxlcyk7XG5cbiAgICB0aGlzLmNvbnRlbnRBdHRyID0gc2hpbUNvbnRlbnRBdHRyaWJ1dGUoY29tcG9uZW50SWQpO1xuICAgIHRoaXMuaG9zdEF0dHIgPSBzaGltSG9zdEF0dHJpYnV0ZShjb21wb25lbnRJZCk7XG4gIH1cblxuICBhcHBseVRvSG9zdChlbGVtZW50OiBhbnkpIHsgc3VwZXIuc2V0QXR0cmlidXRlKGVsZW1lbnQsIHRoaXMuaG9zdEF0dHIsICcnKTsgfVxuXG4gIGNyZWF0ZUVsZW1lbnQocGFyZW50OiBhbnksIG5hbWU6IHN0cmluZyk6IEVsZW1lbnQge1xuICAgIGNvbnN0IGVsID0gc3VwZXIuY3JlYXRlRWxlbWVudChwYXJlbnQsIG5hbWUsIHRoaXMuZG9jdW1lbnQpO1xuICAgIHN1cGVyLnNldEF0dHJpYnV0ZShlbCwgdGhpcy5jb250ZW50QXR0ciwgJycpO1xuICAgIHJldHVybiBlbDtcbiAgfVxufVxuIl19