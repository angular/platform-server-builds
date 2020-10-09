/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT, ɵgetDOM as getDOM } from '@angular/common';
import { DomElementSchemaRegistry } from '@angular/compiler';
import { Inject, Injectable, NgZone, ViewEncapsulation } from '@angular/core';
import { EventManager, ɵflattenStyles as flattenStyles, ɵNAMESPACE_URIS as NAMESPACE_URIS, ɵSharedStylesHost as SharedStylesHost, ɵshimContentAttribute as shimContentAttribute, ɵshimHostAttribute as shimHostAttribute } from '@angular/platform-browser';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
const EMPTY_ARRAY = [];
const DEFAULT_SCHEMA = new DomElementSchemaRegistry();
export class ServerRendererFactory2 {
    constructor(eventManager, ngZone, document, sharedStylesHost) {
        this.eventManager = eventManager;
        this.ngZone = ngZone;
        this.document = document;
        this.sharedStylesHost = sharedStylesHost;
        this.rendererByCompId = new Map();
        this.schema = DEFAULT_SCHEMA;
        this.defaultRenderer = new DefaultServerRenderer2(eventManager, document, ngZone, this.schema);
    }
    createRenderer(element, type) {
        if (!element || !type) {
            return this.defaultRenderer;
        }
        switch (type.encapsulation) {
            case ViewEncapsulation.Emulated: {
                let renderer = this.rendererByCompId.get(type.id);
                if (!renderer) {
                    renderer = new EmulatedEncapsulationServerRenderer2(this.eventManager, this.document, this.ngZone, this.sharedStylesHost, this.schema, type);
                    this.rendererByCompId.set(type.id, renderer);
                }
                renderer.applyToHost(element);
                return renderer;
            }
            default: {
                if (!this.rendererByCompId.has(type.id)) {
                    const styles = flattenStyles(type.id, type.styles, []);
                    this.sharedStylesHost.addStyles(styles);
                    this.rendererByCompId.set(type.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
        }
    }
    begin() { }
    end() { }
}
ServerRendererFactory2.ɵfac = function ServerRendererFactory2_Factory(t) { return new (t || ServerRendererFactory2)(i0.ɵɵinject(i1.EventManager), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(DOCUMENT), i0.ɵɵinject(i1.ɵSharedStylesHost)); };
ServerRendererFactory2.ɵprov = i0.ɵɵdefineInjectable({ token: ServerRendererFactory2, factory: ServerRendererFactory2.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ServerRendererFactory2, [{
        type: Injectable
    }], function () { return [{ type: i1.EventManager }, { type: i0.NgZone }, { type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: i1.ɵSharedStylesHost }]; }, null); })();
class DefaultServerRenderer2 {
    constructor(eventManager, document, ngZone, schema) {
        this.eventManager = eventManager;
        this.document = document;
        this.ngZone = ngZone;
        this.schema = schema;
        this.data = Object.create(null);
    }
    destroy() { }
    createElement(name, namespace, debugInfo) {
        if (namespace) {
            const doc = this.document || getDOM().getDefaultDocument();
            // TODO(FW-811): Ivy may cause issues here because it's passing around
            // full URIs for namespaces, therefore this lookup will fail.
            return doc.createElementNS(NAMESPACE_URIS[namespace], name);
        }
        return getDOM().createElement(name, this.document);
    }
    createComment(value, debugInfo) {
        return getDOM().getDefaultDocument().createComment(value);
    }
    createText(value, debugInfo) {
        const doc = getDOM().getDefaultDocument();
        return doc.createTextNode(value);
    }
    appendChild(parent, newChild) {
        parent.appendChild(newChild);
    }
    insertBefore(parent, newChild, refChild) {
        if (parent) {
            parent.insertBefore(newChild, refChild);
        }
    }
    removeChild(parent, oldChild) {
        if (parent) {
            parent.removeChild(oldChild);
        }
    }
    selectRootElement(selectorOrNode, debugInfo) {
        let el;
        if (typeof selectorOrNode === 'string') {
            el = this.document.querySelector(selectorOrNode);
            if (!el) {
                throw new Error(`The selector "${selectorOrNode}" did not match any elements`);
            }
        }
        else {
            el = selectorOrNode;
        }
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
        return el;
    }
    parentNode(node) {
        return node.parentNode;
    }
    nextSibling(node) {
        return node.nextSibling;
    }
    setAttribute(el, name, value, namespace) {
        if (namespace) {
            // TODO(FW-811): Ivy may cause issues here because it's passing around
            // full URIs for namespaces, therefore this lookup will fail.
            el.setAttributeNS(NAMESPACE_URIS[namespace], namespace + ':' + name, value);
        }
        else {
            el.setAttribute(name, value);
        }
    }
    removeAttribute(el, name, namespace) {
        if (namespace) {
            // TODO(FW-811): Ivy may cause issues here because it's passing around
            // full URIs for namespaces, therefore this lookup will fail.
            el.removeAttributeNS(NAMESPACE_URIS[namespace], name);
        }
        else {
            el.removeAttribute(name);
        }
    }
    addClass(el, name) {
        el.classList.add(name);
    }
    removeClass(el, name) {
        el.classList.remove(name);
    }
    setStyle(el, style, value, flags) {
        style = style.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        const styleMap = _readStyleAttribute(el);
        styleMap[style] = value == null ? '' : value;
        _writeStyleAttribute(el, styleMap);
    }
    removeStyle(el, style, flags) {
        // IE requires '' instead of null
        // see https://github.com/angular/angular/issues/7916
        this.setStyle(el, style, '', flags);
    }
    // The value was validated already as a property binding, against the property name.
    // To know this value is safe to use as an attribute, the security context of the
    // attribute with the given name is checked against that security context of the
    // property.
    _isSafeToReflectProperty(tagName, propertyName) {
        return this.schema.securityContext(tagName, propertyName, true) ===
            this.schema.securityContext(tagName, propertyName, false);
    }
    setProperty(el, name, value) {
        checkNoSyntheticProp(name, 'property');
        if (name === 'innerText') {
            // Domino does not support innerText. Just map it to textContent.
            el.textContent = value;
        }
        el[name] = value;
        // Mirror property values for known HTML element properties in the attributes.
        // Skip `innerhtml` which is conservatively marked as an attribute for security
        // purposes but is not actually an attribute.
        const tagName = el.tagName.toLowerCase();
        if (value != null && (typeof value === 'number' || typeof value == 'string') &&
            name.toLowerCase() !== 'innerhtml' && this.schema.hasElement(tagName, EMPTY_ARRAY) &&
            this.schema.hasProperty(tagName, name, EMPTY_ARRAY) &&
            this._isSafeToReflectProperty(tagName, name)) {
            this.setAttribute(el, name, value.toString());
        }
    }
    setValue(node, value) {
        node.textContent = value;
    }
    listen(target, eventName, callback) {
        checkNoSyntheticProp(eventName, 'listener');
        if (typeof target === 'string') {
            return this.eventManager.addGlobalEventListener(target, eventName, this.decoratePreventDefault(callback));
        }
        return this.eventManager.addEventListener(target, eventName, this.decoratePreventDefault(callback));
    }
    decoratePreventDefault(eventHandler) {
        return (event) => {
            // Ivy uses `Function` as a special token that allows us to unwrap the function
            // so that it can be invoked programmatically by `DebugNode.triggerEventHandler`.
            if (event === Function) {
                return eventHandler;
            }
            // Run the event handler inside the ngZone because event handlers are not patched
            // by Zone on the server. This is required only for tests.
            const allowDefaultBehavior = this.ngZone.runGuarded(() => eventHandler(event));
            if (allowDefaultBehavior === false) {
                event.preventDefault();
                event.returnValue = false;
            }
            return undefined;
        };
    }
}
const AT_CHARCODE = '@'.charCodeAt(0);
function checkNoSyntheticProp(name, nameKind) {
    if (name.charCodeAt(0) === AT_CHARCODE) {
        throw new Error(`Found the synthetic ${nameKind} ${name}. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.`);
    }
}
class EmulatedEncapsulationServerRenderer2 extends DefaultServerRenderer2 {
    constructor(eventManager, document, ngZone, sharedStylesHost, schema, component) {
        super(eventManager, document, ngZone, schema);
        this.component = component;
        // Add a 's' prefix to style attributes to indicate server.
        const componentId = 's' + component.id;
        const styles = flattenStyles(componentId, component.styles, []);
        sharedStylesHost.addStyles(styles);
        this.contentAttr = shimContentAttribute(componentId);
        this.hostAttr = shimHostAttribute(componentId);
    }
    applyToHost(element) {
        super.setAttribute(element, this.hostAttr, '');
    }
    createElement(parent, name) {
        const el = super.createElement(parent, name, this.document);
        super.setAttribute(el, this.contentAttr, '');
        return el;
    }
}
function _readStyleAttribute(element) {
    const styleMap = {};
    const styleAttribute = element.getAttribute('style');
    if (styleAttribute) {
        const styleList = styleAttribute.split(/;+/g);
        for (let i = 0; i < styleList.length; i++) {
            const style = styleList[i].trim();
            if (style.length > 0) {
                const colonIndex = style.indexOf(':');
                if (colonIndex === -1) {
                    throw new Error(`Invalid CSS style: ${style}`);
                }
                const name = style.substr(0, colonIndex).trim();
                styleMap[name] = style.substr(colonIndex + 1).trim();
            }
        }
    }
    return styleMap;
}
function _writeStyleAttribute(element, styleMap) {
    let styleAttrValue = '';
    for (const key in styleMap) {
        const newValue = styleMap[key];
        if (newValue != null) {
            styleAttrValue += key + ':' + styleMap[key] + ';';
        }
    }
    element.setAttribute('style', styleAttrValue);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tc2VydmVyL3NyYy9zZXJ2ZXJfcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBRSxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDNUQsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDM0QsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFtRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3SSxPQUFPLEVBQUMsWUFBWSxFQUFFLGNBQWMsSUFBSSxhQUFhLEVBQUUsZUFBZSxJQUFJLGNBQWMsRUFBRSxpQkFBaUIsSUFBSSxnQkFBZ0IsRUFBRSxxQkFBcUIsSUFBSSxvQkFBb0IsRUFBRSxrQkFBa0IsSUFBSSxpQkFBaUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDOzs7QUFFMVAsTUFBTSxXQUFXLEdBQVUsRUFBRSxDQUFDO0FBRTlCLE1BQU0sY0FBYyxHQUFHLElBQUksd0JBQXdCLEVBQUUsQ0FBQztBQUd0RCxNQUFNLE9BQU8sc0JBQXNCO0lBS2pDLFlBQ1ksWUFBMEIsRUFBVSxNQUFjLEVBQ2hDLFFBQWEsRUFBVSxnQkFBa0M7UUFEM0UsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2hDLGFBQVEsR0FBUixRQUFRLENBQUs7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBTi9FLHFCQUFnQixHQUFHLElBQUksR0FBRyxFQUFxQixDQUFDO1FBRWhELFdBQU0sR0FBRyxjQUFjLENBQUM7UUFLOUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLHNCQUFzQixDQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFB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QyxDQUFDO2dCQUN0QyxJQUFJLFVBQVUsS0FBSyxDQUFDLENBQUMsRUFBRTtvQkFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsS0FBSyxFQUFFLENBQUMsQ0FBQztpQkFDaEQ7Z0JBQ0QsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2hELFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN0RDtTQUNGO0tBQ0Y7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDO0FBRUQsU0FBUyxvQkFBb0IsQ0FBQyxPQUFZLEVBQUUsUUFBa0M7SUFDNUUsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLEtBQUssTUFBTSxHQUFHLElBQUksUUFBUSxFQUFFO1FBQzFCLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQixJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUU7WUFDcEIsY0FBYyxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztTQUNuRDtLQUNGO0lBQ0QsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDaEQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5ULCDJtWdldERPTSBhcyBnZXRET019IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0RvbUVsZW1lbnRTY2hlbWFSZWdpc3RyeX0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXInO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE5nWm9uZSwgUmVuZGVyZXIyLCBSZW5kZXJlckZhY3RvcnkyLCBSZW5kZXJlclN0eWxlRmxhZ3MyLCBSZW5kZXJlclR5cGUyLCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0V2ZW50TWFuYWdlciwgybVmbGF0dGVuU3R5bGVzIGFzIGZsYXR0ZW5TdHlsZXMsIMm1TkFNRVNQQUNFX1VSSVMgYXMgTkFNRVNQQUNFX1VSSVMsIMm1U2hhcmVkU3R5bGVzSG9zdCBhcyBTaGFyZWRTdHlsZXNIb3N0LCDJtXNoaW1Db250ZW50QXR0cmlidXRlIGFzIHNoaW1Db250ZW50QXR0cmlidXRlLCDJtXNoaW1Ib3N0QXR0cmlidXRlIGFzIHNoaW1Ib3N0QXR0cmlidXRlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuY29uc3QgRU1QVFlfQVJSQVk6IGFueVtdID0gW107XG5cbmNvbnN0IERFRkFVTFRfU0NIRU1BID0gbmV3IERvbUVsZW1lbnRTY2hlbWFSZWdpc3RyeSgpO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VydmVyUmVuZGVyZXJGYWN0b3J5MiBpbXBsZW1lbnRzIFJlbmRlcmVyRmFjdG9yeTIge1xuICBwcml2YXRlIHJlbmRlcmVyQnlDb21wSWQgPSBuZXcgTWFwPHN0cmluZywgUmVuZGVyZXIyPigpO1xuICBwcml2YXRlIGRlZmF1bHRSZW5kZXJlcjogUmVuZGVyZXIyO1xuICBwcml2YXRlIHNjaGVtYSA9IERFRkFVTFRfU0NIRU1BO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlciwgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSwgcHJpdmF0ZSBzaGFyZWRTdHlsZXNIb3N0OiBTaGFyZWRTdHlsZXNIb3N0KSB7XG4gICAgdGhpcy5kZWZhdWx0UmVuZGVyZXIgPSBuZXcgRGVmYXVsdFNlcnZlclJlbmRlcmVyMihldmVudE1hbmFnZXIsIGRvY3VtZW50LCBuZ1pvbmUsIHRoaXMuc2NoZW1hKTtcbiAgfVxuXG4gIGNyZWF0ZVJlbmRlcmVyKGVsZW1lbnQ6IGFueSwgdHlwZTogUmVuZGVyZXJUeXBlMnxudWxsKTogUmVuZGVyZXIyIHtcbiAgICBpZiAoIWVsZW1lbnQgfHwgIXR5cGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlZmF1bHRSZW5kZXJlcjtcbiAgICB9XG4gICAgc3dpdGNoICh0eXBlLmVuY2Fwc3VsYXRpb24pIHtcbiAgICAgIGNhc2UgVmlld0VuY2Fwc3VsYXRpb24uRW11bGF0ZWQ6IHtcbiAgICAgICAgbGV0IHJlbmRlcmVyID0gdGhpcy5yZW5kZXJlckJ5Q29tcElkLmdldCh0eXBlLmlkKTtcbiAgICAgICAgaWYgKCFyZW5kZXJlcikge1xuICAgICAgICAgIHJlbmRlcmVyID0gbmV3IEVtdWxhdGVkRW5jYXBzdWxhdGlvblNlcnZlclJlbmRlcmVyMihcbiAgICAgICAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIsIHRoaXMuZG9jdW1lbnQsIHRoaXMubmdab25lLCB0aGlzLnNoYXJlZFN0eWxlc0hvc3QsIHRoaXMuc2NoZW1hLFxuICAgICAgICAgICAgICB0eXBlKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyQnlDb21wSWQuc2V0KHR5cGUuaWQsIHJlbmRlcmVyKTtcbiAgICAgICAgfVxuICAgICAgICAoPEVtdWxhdGVkRW5jYXBzdWxhdGlvblNlcnZlclJlbmRlcmVyMj5yZW5kZXJlcikuYXBwbHlUb0hvc3QoZWxlbWVudCk7XG4gICAgICAgIHJldHVybiByZW5kZXJlcjtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgaWYgKCF0aGlzLnJlbmRlcmVyQnlDb21wSWQuaGFzKHR5cGUuaWQpKSB7XG4gICAgICAgICAgY29uc3Qgc3R5bGVzID0gZmxhdHRlblN0eWxlcyh0eXBlLmlkLCB0eXBlLnN0eWxlcywgW10pO1xuICAgICAgICAgIHRoaXMuc2hhcmVkU3R5bGVzSG9zdC5hZGRTdHlsZXMoc3R5bGVzKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyQnlDb21wSWQuc2V0KHR5cGUuaWQsIHRoaXMuZGVmYXVsdFJlbmRlcmVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5kZWZhdWx0UmVuZGVyZXI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYmVnaW4oKSB7fVxuICBlbmQoKSB7fVxufVxuXG5jbGFzcyBEZWZhdWx0U2VydmVyUmVuZGVyZXIyIGltcGxlbWVudHMgUmVuZGVyZXIyIHtcbiAgZGF0YToge1trZXk6IHN0cmluZ106IGFueX0gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlciwgcHJvdGVjdGVkIGRvY3VtZW50OiBhbnksIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgICBwcml2YXRlIHNjaGVtYTogRG9tRWxlbWVudFNjaGVtYVJlZ2lzdHJ5KSB7fVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7fVxuXG4gIGRlc3Ryb3lOb2RlOiBudWxsO1xuXG4gIGNyZWF0ZUVsZW1lbnQobmFtZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmcsIGRlYnVnSW5mbz86IGFueSk6IGFueSB7XG4gICAgaWYgKG5hbWVzcGFjZSkge1xuICAgICAgY29uc3QgZG9jID0gdGhpcy5kb2N1bWVudCB8fCBnZXRET00oKS5nZXREZWZhdWx0RG9jdW1lbnQoKTtcbiAgICAgIC8vIFRPRE8oRlctODExKTogSXZ5IG1heSBjYXVzZSBpc3N1ZXMgaGVyZSBiZWNhdXNlIGl0J3MgcGFzc2luZyBhcm91bmRcbiAgICAgIC8vIGZ1bGwgVVJJcyBmb3IgbmFtZXNwYWNlcywgdGhlcmVmb3JlIHRoaXMgbG9va3VwIHdpbGwgZmFpbC5cbiAgICAgIHJldHVybiBkb2MuY3JlYXRlRWxlbWVudE5TKE5BTUVTUEFDRV9VUklTW25hbWVzcGFjZV0sIG5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiBnZXRET00oKS5jcmVhdGVFbGVtZW50KG5hbWUsIHRoaXMuZG9jdW1lbnQpO1xuICB9XG5cbiAgY3JlYXRlQ29tbWVudCh2YWx1ZTogc3RyaW5nLCBkZWJ1Z0luZm8/OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBnZXRET00oKS5nZXREZWZhdWx0RG9jdW1lbnQoKS5jcmVhdGVDb21tZW50KHZhbHVlKTtcbiAgfVxuXG4gIGNyZWF0ZVRleHQodmFsdWU6IHN0cmluZywgZGVidWdJbmZvPzogYW55KTogYW55IHtcbiAgICBjb25zdCBkb2MgPSBnZXRET00oKS5nZXREZWZhdWx0RG9jdW1lbnQoKTtcbiAgICByZXR1cm4gZG9jLmNyZWF0ZVRleHROb2RlKHZhbHVlKTtcbiAgfVxuXG4gIGFwcGVuZENoaWxkKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55KTogdm9pZCB7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKG5ld0NoaWxkKTtcbiAgfVxuXG4gIGluc2VydEJlZm9yZShwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSwgcmVmQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUobmV3Q2hpbGQsIHJlZkNoaWxkKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVDaGlsZChwYXJlbnQ6IGFueSwgb2xkQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChvbGRDaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3JPck5vZGU6IHN0cmluZ3xhbnksIGRlYnVnSW5mbz86IGFueSk6IGFueSB7XG4gICAgbGV0IGVsOiBhbnk7XG4gICAgaWYgKHR5cGVvZiBzZWxlY3Rvck9yTm9kZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVsID0gdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yT3JOb2RlKTtcbiAgICAgIGlmICghZWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgc2VsZWN0b3IgXCIke3NlbGVjdG9yT3JOb2RlfVwiIGRpZCBub3QgbWF0Y2ggYW55IGVsZW1lbnRzYCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsID0gc2VsZWN0b3JPck5vZGU7XG4gICAgfVxuICAgIHdoaWxlIChlbC5maXJzdENoaWxkKSB7XG4gICAgICBlbC5yZW1vdmVDaGlsZChlbC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsO1xuICB9XG5cbiAgcGFyZW50Tm9kZShub2RlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBub2RlLnBhcmVudE5vZGU7XG4gIH1cblxuICBuZXh0U2libGluZyhub2RlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBub2RlLm5leHRTaWJsaW5nO1xuICB9XG5cbiAgc2V0QXR0cmlidXRlKGVsOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKG5hbWVzcGFjZSkge1xuICAgICAgLy8gVE9ETyhGVy04MTEpOiBJdnkgbWF5IGNhdXNlIGlzc3VlcyBoZXJlIGJlY2F1c2UgaXQncyBwYXNzaW5nIGFyb3VuZFxuICAgICAgLy8gZnVsbCBVUklzIGZvciBuYW1lc3BhY2VzLCB0aGVyZWZvcmUgdGhpcyBsb29rdXAgd2lsbCBmYWlsLlxuICAgICAgZWwuc2V0QXR0cmlidXRlTlMoTkFNRVNQQUNFX1VSSVNbbmFtZXNwYWNlXSwgbmFtZXNwYWNlICsgJzonICsgbmFtZSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgIC8vIFRPRE8oRlctODExKTogSXZ5IG1heSBjYXVzZSBpc3N1ZXMgaGVyZSBiZWNhdXNlIGl0J3MgcGFzc2luZyBhcm91bmRcbiAgICAgIC8vIGZ1bGwgVVJJcyBmb3IgbmFtZXNwYWNlcywgdGhlcmVmb3JlIHRoaXMgbG9va3VwIHdpbGwgZmFpbC5cbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZU5TKE5BTUVTUEFDRV9VUklTW25hbWVzcGFjZV0sIG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgfVxuICB9XG5cbiAgYWRkQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgZWwuY2xhc3NMaXN0LmFkZChuYW1lKTtcbiAgfVxuXG4gIHJlbW92ZUNsYXNzKGVsOiBhbnksIG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XG4gIH1cblxuICBzZXRTdHlsZShlbDogYW55LCBzdHlsZTogc3RyaW5nLCB2YWx1ZTogYW55LCBmbGFnczogUmVuZGVyZXJTdHlsZUZsYWdzMik6IHZvaWQge1xuICAgIHN0eWxlID0gc3R5bGUucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLSQyJykudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBzdHlsZU1hcCA9IF9yZWFkU3R5bGVBdHRyaWJ1dGUoZWwpO1xuICAgIHN0eWxlTWFwW3N0eWxlXSA9IHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuICAgIF93cml0ZVN0eWxlQXR0cmlidXRlKGVsLCBzdHlsZU1hcCk7XG4gIH1cblxuICByZW1vdmVTdHlsZShlbDogYW55LCBzdHlsZTogc3RyaW5nLCBmbGFnczogUmVuZGVyZXJTdHlsZUZsYWdzMik6IHZvaWQge1xuICAgIC8vIElFIHJlcXVpcmVzICcnIGluc3RlYWQgb2YgbnVsbFxuICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy83OTE2XG4gICAgdGhpcy5zZXRTdHlsZShlbCwgc3R5bGUsICcnLCBmbGFncyk7XG4gIH1cblxuICAvLyBUaGUgdmFsdWUgd2FzIHZhbGlkYXRlZCBhbHJlYWR5IGFzIGEgcHJvcGVydHkgYmluZGluZywgYWdhaW5zdCB0aGUgcHJvcGVydHkgbmFtZS5cbiAgLy8gVG8ga25vdyB0aGlzIHZhbHVlIGlzIHNhZmUgdG8gdXNlIGFzIGFuIGF0dHJpYnV0ZSwgdGhlIHNlY3VyaXR5IGNvbnRleHQgb2YgdGhlXG4gIC8vIGF0dHJpYnV0ZSB3aXRoIHRoZSBnaXZlbiBuYW1lIGlzIGNoZWNrZWQgYWdhaW5zdCB0aGF0IHNlY3VyaXR5IGNvbnRleHQgb2YgdGhlXG4gIC8vIHByb3BlcnR5LlxuICBwcml2YXRlIF9pc1NhZmVUb1JlZmxlY3RQcm9wZXJ0eSh0YWdOYW1lOiBzdHJpbmcsIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2NoZW1hLnNlY3VyaXR5Q29udGV4dCh0YWdOYW1lLCBwcm9wZXJ0eU5hbWUsIHRydWUpID09PVxuICAgICAgICB0aGlzLnNjaGVtYS5zZWN1cml0eUNvbnRleHQodGFnTmFtZSwgcHJvcGVydHlOYW1lLCBmYWxzZSk7XG4gIH1cblxuICBzZXRQcm9wZXJ0eShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBjaGVja05vU3ludGhldGljUHJvcChuYW1lLCAncHJvcGVydHknKTtcbiAgICBpZiAobmFtZSA9PT0gJ2lubmVyVGV4dCcpIHtcbiAgICAgIC8vIERvbWlubyBkb2VzIG5vdCBzdXBwb3J0IGlubmVyVGV4dC4gSnVzdCBtYXAgaXQgdG8gdGV4dENvbnRlbnQuXG4gICAgICBlbC50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgIH1cbiAgICAoPGFueT5lbClbbmFtZV0gPSB2YWx1ZTtcbiAgICAvLyBNaXJyb3IgcHJvcGVydHkgdmFsdWVzIGZvciBrbm93biBIVE1MIGVsZW1lbnQgcHJvcGVydGllcyBpbiB0aGUgYXR0cmlidXRlcy5cbiAgICAvLyBTa2lwIGBpbm5lcmh0bWxgIHdoaWNoIGlzIGNvbnNlcnZhdGl2ZWx5IG1hcmtlZCBhcyBhbiBhdHRyaWJ1dGUgZm9yIHNlY3VyaXR5XG4gICAgLy8gcHVycG9zZXMgYnV0IGlzIG5vdCBhY3R1YWxseSBhbiBhdHRyaWJ1dGUuXG4gICAgY29uc3QgdGFnTmFtZSA9IChlbC50YWdOYW1lIGFzIHN0cmluZykudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAodmFsdWUgIT0gbnVsbCAmJiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyB8fCB0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpICYmXG4gICAgICAgIG5hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2lubmVyaHRtbCcgJiYgdGhpcy5zY2hlbWEuaGFzRWxlbWVudCh0YWdOYW1lLCBFTVBUWV9BUlJBWSkgJiZcbiAgICAgICAgdGhpcy5zY2hlbWEuaGFzUHJvcGVydHkodGFnTmFtZSwgbmFtZSwgRU1QVFlfQVJSQVkpICYmXG4gICAgICAgIHRoaXMuX2lzU2FmZVRvUmVmbGVjdFByb3BlcnR5KHRhZ05hbWUsIG5hbWUpKSB7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZShlbCwgbmFtZSwgdmFsdWUudG9TdHJpbmcoKSk7XG4gICAgfVxuICB9XG5cbiAgc2V0VmFsdWUobm9kZTogYW55LCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgbm9kZS50ZXh0Q29udGVudCA9IHZhbHVlO1xuICB9XG5cbiAgbGlzdGVuKFxuICAgICAgdGFyZ2V0OiAnZG9jdW1lbnQnfCd3aW5kb3cnfCdib2R5J3xhbnksIGV2ZW50TmFtZTogc3RyaW5nLFxuICAgICAgY2FsbGJhY2s6IChldmVudDogYW55KSA9PiBib29sZWFuKTogKCkgPT4gdm9pZCB7XG4gICAgY2hlY2tOb1N5bnRoZXRpY1Byb3AoZXZlbnROYW1lLCAnbGlzdGVuZXInKTtcbiAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiA8KCkgPT4gdm9pZD50aGlzLmV2ZW50TWFuYWdlci5hZGRHbG9iYWxFdmVudExpc3RlbmVyKFxuICAgICAgICAgIHRhcmdldCwgZXZlbnROYW1lLCB0aGlzLmRlY29yYXRlUHJldmVudERlZmF1bHQoY2FsbGJhY2spKTtcbiAgICB9XG4gICAgcmV0dXJuIDwoKSA9PiB2b2lkPnRoaXMuZXZlbnRNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgICB0YXJnZXQsIGV2ZW50TmFtZSwgdGhpcy5kZWNvcmF0ZVByZXZlbnREZWZhdWx0KGNhbGxiYWNrKSkgYXMgKCkgPT4gdm9pZDtcbiAgfVxuXG4gIHByaXZhdGUgZGVjb3JhdGVQcmV2ZW50RGVmYXVsdChldmVudEhhbmRsZXI6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIHJldHVybiAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgLy8gSXZ5IHVzZXMgYEZ1bmN0aW9uYCBhcyBhIHNwZWNpYWwgdG9rZW4gdGhhdCBhbGxvd3MgdXMgdG8gdW53cmFwIHRoZSBmdW5jdGlvblxuICAgICAgLy8gc28gdGhhdCBpdCBjYW4gYmUgaW52b2tlZCBwcm9ncmFtbWF0aWNhbGx5IGJ5IGBEZWJ1Z05vZGUudHJpZ2dlckV2ZW50SGFuZGxlcmAuXG4gICAgICBpZiAoZXZlbnQgPT09IEZ1bmN0aW9uKSB7XG4gICAgICAgIHJldHVybiBldmVudEhhbmRsZXI7XG4gICAgICB9XG5cbiAgICAgIC8vIFJ1biB0aGUgZXZlbnQgaGFuZGxlciBpbnNpZGUgdGhlIG5nWm9uZSBiZWNhdXNlIGV2ZW50IGhhbmRsZXJzIGFyZSBub3QgcGF0Y2hlZFxuICAgICAgLy8gYnkgWm9uZSBvbiB0aGUgc2VydmVyLiBUaGlzIGlzIHJlcXVpcmVkIG9ubHkgZm9yIHRlc3RzLlxuICAgICAgY29uc3QgYWxsb3dEZWZhdWx0QmVoYXZpb3IgPSB0aGlzLm5nWm9uZS5ydW5HdWFyZGVkKCgpID0+IGV2ZW50SGFuZGxlcihldmVudCkpO1xuICAgICAgaWYgKGFsbG93RGVmYXVsdEJlaGF2aW9yID09PSBmYWxzZSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gIH1cbn1cblxuY29uc3QgQVRfQ0hBUkNPREUgPSAnQCcuY2hhckNvZGVBdCgwKTtcbmZ1bmN0aW9uIGNoZWNrTm9TeW50aGV0aWNQcm9wKG5hbWU6IHN0cmluZywgbmFtZUtpbmQ6IHN0cmluZykge1xuICBpZiAobmFtZS5jaGFyQ29kZUF0KDApID09PSBBVF9DSEFSQ09ERSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgRm91bmQgdGhlIHN5bnRoZXRpYyAke25hbWVLaW5kfSAke1xuICAgICAgICBuYW1lfS4gUGxlYXNlIGluY2x1ZGUgZWl0aGVyIFwiQnJvd3NlckFuaW1hdGlvbnNNb2R1bGVcIiBvciBcIk5vb3BBbmltYXRpb25zTW9kdWxlXCIgaW4geW91ciBhcHBsaWNhdGlvbi5gKTtcbiAgfVxufVxuXG5jbGFzcyBFbXVsYXRlZEVuY2Fwc3VsYXRpb25TZXJ2ZXJSZW5kZXJlcjIgZXh0ZW5kcyBEZWZhdWx0U2VydmVyUmVuZGVyZXIyIHtcbiAgcHJpdmF0ZSBjb250ZW50QXR0cjogc3RyaW5nO1xuICBwcml2YXRlIGhvc3RBdHRyOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlciwgZG9jdW1lbnQ6IGFueSwgbmdab25lOiBOZ1pvbmUsIHNoYXJlZFN0eWxlc0hvc3Q6IFNoYXJlZFN0eWxlc0hvc3QsXG4gICAgICBzY2hlbWE6IERvbUVsZW1lbnRTY2hlbWFSZWdpc3RyeSwgcHJpdmF0ZSBjb21wb25lbnQ6IFJlbmRlcmVyVHlwZTIpIHtcbiAgICBzdXBlcihldmVudE1hbmFnZXIsIGRvY3VtZW50LCBuZ1pvbmUsIHNjaGVtYSk7XG4gICAgLy8gQWRkIGEgJ3MnIHByZWZpeCB0byBzdHlsZSBhdHRyaWJ1dGVzIHRvIGluZGljYXRlIHNlcnZlci5cbiAgICBjb25zdCBjb21wb25lbnRJZCA9ICdzJyArIGNvbXBvbmVudC5pZDtcbiAgICBjb25zdCBzdHlsZXMgPSBmbGF0dGVuU3R5bGVzKGNvbXBvbmVudElkLCBjb21wb25lbnQuc3R5bGVzLCBbXSk7XG4gICAgc2hhcmVkU3R5bGVzSG9zdC5hZGRTdHlsZXMoc3R5bGVzKTtcblxuICAgIHRoaXMuY29udGVudEF0dHIgPSBzaGltQ29udGVudEF0dHJpYnV0ZShjb21wb25lbnRJZCk7XG4gICAgdGhpcy5ob3N0QXR0ciA9IHNoaW1Ib3N0QXR0cmlidXRlKGNvbXBvbmVudElkKTtcbiAgfVxuXG4gIGFwcGx5VG9Ib3N0KGVsZW1lbnQ6IGFueSkge1xuICAgIHN1cGVyLnNldEF0dHJpYnV0ZShlbGVtZW50LCB0aGlzLmhvc3RBdHRyLCAnJyk7XG4gIH1cblxuICBjcmVhdGVFbGVtZW50KHBhcmVudDogYW55LCBuYW1lOiBzdHJpbmcpOiBFbGVtZW50IHtcbiAgICBjb25zdCBlbCA9IHN1cGVyLmNyZWF0ZUVsZW1lbnQocGFyZW50LCBuYW1lLCB0aGlzLmRvY3VtZW50KTtcbiAgICBzdXBlci5zZXRBdHRyaWJ1dGUoZWwsIHRoaXMuY29udGVudEF0dHIsICcnKTtcbiAgICByZXR1cm4gZWw7XG4gIH1cbn1cblxuZnVuY3Rpb24gX3JlYWRTdHlsZUF0dHJpYnV0ZShlbGVtZW50OiBhbnkpOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ30ge1xuICBjb25zdCBzdHlsZU1hcDoge1tuYW1lOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gIGNvbnN0IHN0eWxlQXR0cmlidXRlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gIGlmIChzdHlsZUF0dHJpYnV0ZSkge1xuICAgIGNvbnN0IHN0eWxlTGlzdCA9IHN0eWxlQXR0cmlidXRlLnNwbGl0KC87Ky9nKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0eWxlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc3R5bGUgPSBzdHlsZUxpc3RbaV0udHJpbSgpO1xuICAgICAgaWYgKHN0eWxlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgY29sb25JbmRleCA9IHN0eWxlLmluZGV4T2YoJzonKTtcbiAgICAgICAgaWYgKGNvbG9uSW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIENTUyBzdHlsZTogJHtzdHlsZX1gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuYW1lID0gc3R5bGUuc3Vic3RyKDAsIGNvbG9uSW5kZXgpLnRyaW0oKTtcbiAgICAgICAgc3R5bGVNYXBbbmFtZV0gPSBzdHlsZS5zdWJzdHIoY29sb25JbmRleCArIDEpLnRyaW0oKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0eWxlTWFwO1xufVxuXG5mdW5jdGlvbiBfd3JpdGVTdHlsZUF0dHJpYnV0ZShlbGVtZW50OiBhbnksIHN0eWxlTWFwOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ30pIHtcbiAgbGV0IHN0eWxlQXR0clZhbHVlID0gJyc7XG4gIGZvciAoY29uc3Qga2V5IGluIHN0eWxlTWFwKSB7XG4gICAgY29uc3QgbmV3VmFsdWUgPSBzdHlsZU1hcFtrZXldO1xuICAgIGlmIChuZXdWYWx1ZSAhPSBudWxsKSB7XG4gICAgICBzdHlsZUF0dHJWYWx1ZSArPSBrZXkgKyAnOicgKyBzdHlsZU1hcFtrZXldICsgJzsnO1xuICAgIH1cbiAgfVxuICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBzdHlsZUF0dHJWYWx1ZSk7XG59XG4iXX0=