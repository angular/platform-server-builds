/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { DomElementSchemaRegistry } from '@angular/compiler';
import { Inject, Injectable, NgZone, ViewEncapsulation } from '@angular/core';
import { DOCUMENT, EventManager, ɵNAMESPACE_URIS as NAMESPACE_URIS, ɵSharedStylesHost as SharedStylesHost, ɵflattenStyles as flattenStyles, ɵgetDOM as getDOM, ɵshimContentAttribute as shimContentAttribute, ɵshimHostAttribute as shimHostAttribute } from '@angular/platform-browser';
var EMPTY_ARRAY = [];
var ServerRendererFactory2 = /** @class */ (function () {
    function ServerRendererFactory2(eventManager, ngZone, document, sharedStylesHost) {
        this.eventManager = eventManager;
        this.ngZone = ngZone;
        this.document = document;
        this.sharedStylesHost = sharedStylesHost;
        this.rendererByCompId = new Map();
        this.schema = new DomElementSchemaRegistry();
        this.defaultRenderer = new DefaultServerRenderer2(eventManager, document, ngZone, this.schema);
    }
    ServerRendererFactory2.prototype.createRenderer = function (element, type) {
        if (!element || !type) {
            return this.defaultRenderer;
        }
        switch (type.encapsulation) {
            case ViewEncapsulation.Native:
            case ViewEncapsulation.Emulated: {
                var renderer = this.rendererByCompId.get(type.id);
                if (!renderer) {
                    renderer = new EmulatedEncapsulationServerRenderer2(this.eventManager, this.document, this.ngZone, this.sharedStylesHost, this.schema, type);
                    this.rendererByCompId.set(type.id, renderer);
                }
                renderer.applyToHost(element);
                return renderer;
            }
            case ViewEncapsulation.Native:
                throw new Error('Native encapsulation is not supported on the server!');
            default: {
                if (!this.rendererByCompId.has(type.id)) {
                    var styles = flattenStyles(type.id, type.styles, []);
                    this.sharedStylesHost.addStyles(styles);
                    this.rendererByCompId.set(type.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
        }
    };
    ServerRendererFactory2.prototype.begin = function () { };
    ServerRendererFactory2.prototype.end = function () { };
    ServerRendererFactory2.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ServerRendererFactory2.ctorParameters = function () { return [
        { type: EventManager, },
        { type: NgZone, },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
        { type: SharedStylesHost, },
    ]; };
    return ServerRendererFactory2;
}());
export { ServerRendererFactory2 };
var DefaultServerRenderer2 = /** @class */ (function () {
    function DefaultServerRenderer2(eventManager, document, ngZone, schema) {
        this.eventManager = eventManager;
        this.document = document;
        this.ngZone = ngZone;
        this.schema = schema;
        this.data = Object.create(null);
    }
    DefaultServerRenderer2.prototype.destroy = function () { };
    DefaultServerRenderer2.prototype.createElement = function (name, namespace, debugInfo) {
        if (namespace) {
            return getDOM().createElementNS(NAMESPACE_URIS[namespace], name, this.document);
        }
        return getDOM().createElement(name, this.document);
    };
    DefaultServerRenderer2.prototype.createComment = function (value, debugInfo) { return getDOM().createComment(value); };
    DefaultServerRenderer2.prototype.createText = function (value, debugInfo) { return getDOM().createTextNode(value); };
    DefaultServerRenderer2.prototype.appendChild = function (parent, newChild) { getDOM().appendChild(parent, newChild); };
    DefaultServerRenderer2.prototype.insertBefore = function (parent, newChild, refChild) {
        if (parent) {
            getDOM().insertBefore(parent, refChild, newChild);
        }
    };
    DefaultServerRenderer2.prototype.removeChild = function (parent, oldChild) {
        if (parent) {
            getDOM().removeChild(parent, oldChild);
        }
    };
    DefaultServerRenderer2.prototype.selectRootElement = function (selectorOrNode, debugInfo) {
        var el;
        if (typeof selectorOrNode === 'string') {
            el = getDOM().querySelector(this.document, selectorOrNode);
            if (!el) {
                throw new Error("The selector \"" + selectorOrNode + "\" did not match any elements");
            }
        }
        else {
            el = selectorOrNode;
        }
        getDOM().clearNodes(el);
        return el;
    };
    DefaultServerRenderer2.prototype.parentNode = function (node) { return getDOM().parentElement(node); };
    DefaultServerRenderer2.prototype.nextSibling = function (node) { return getDOM().nextSibling(node); };
    DefaultServerRenderer2.prototype.setAttribute = function (el, name, value, namespace) {
        if (namespace) {
            getDOM().setAttributeNS(el, NAMESPACE_URIS[namespace], namespace + ':' + name, value);
        }
        else {
            getDOM().setAttribute(el, name, value);
        }
    };
    DefaultServerRenderer2.prototype.removeAttribute = function (el, name, namespace) {
        if (namespace) {
            getDOM().removeAttributeNS(el, NAMESPACE_URIS[namespace], name);
        }
        else {
            getDOM().removeAttribute(el, name);
        }
    };
    DefaultServerRenderer2.prototype.addClass = function (el, name) { getDOM().addClass(el, name); };
    DefaultServerRenderer2.prototype.removeClass = function (el, name) { getDOM().removeClass(el, name); };
    DefaultServerRenderer2.prototype.setStyle = function (el, style, value, flags) {
        getDOM().setStyle(el, style, value);
    };
    DefaultServerRenderer2.prototype.removeStyle = function (el, style, flags) {
        getDOM().removeStyle(el, style);
    };
    // The value was validated already as a property binding, against the property name.
    // To know this value is safe to use as an attribute, the security context of the
    // attribute with the given name is checked against that security context of the
    // property.
    // The value was validated already as a property binding, against the property name.
    // To know this value is safe to use as an attribute, the security context of the
    // attribute with the given name is checked against that security context of the
    // property.
    DefaultServerRenderer2.prototype._isSafeToReflectProperty = 
    // The value was validated already as a property binding, against the property name.
    // To know this value is safe to use as an attribute, the security context of the
    // attribute with the given name is checked against that security context of the
    // property.
    function (tagName, propertyName) {
        return this.schema.securityContext(tagName, propertyName, true) ===
            this.schema.securityContext(tagName, propertyName, false);
    };
    DefaultServerRenderer2.prototype.setProperty = function (el, name, value) {
        checkNoSyntheticProp(name, 'property');
        getDOM().setProperty(el, name, value);
        // Mirror property values for known HTML element properties in the attributes.
        var tagName = el.tagName.toLowerCase();
        if (value != null && (typeof value === 'number' || typeof value == 'string') &&
            this.schema.hasElement(tagName, EMPTY_ARRAY) &&
            this.schema.hasProperty(tagName, name, EMPTY_ARRAY) &&
            this._isSafeToReflectProperty(tagName, name)) {
            this.setAttribute(el, name, value.toString());
        }
    };
    DefaultServerRenderer2.prototype.setValue = function (node, value) { getDOM().setText(node, value); };
    DefaultServerRenderer2.prototype.listen = function (target, eventName, callback) {
        checkNoSyntheticProp(eventName, 'listener');
        if (typeof target === 'string') {
            return this.eventManager.addGlobalEventListener(target, eventName, this.decoratePreventDefault(callback));
        }
        return this.eventManager.addEventListener(target, eventName, this.decoratePreventDefault(callback));
    };
    DefaultServerRenderer2.prototype.decoratePreventDefault = function (eventHandler) {
        var _this = this;
        return function (event) {
            // Run the event handler inside the ngZone because event handlers are not patched
            // by Zone on the server. This is required only for tests.
            var allowDefaultBehavior = _this.ngZone.runGuarded(function () { return eventHandler(event); });
            if (allowDefaultBehavior === false) {
                event.preventDefault();
                event.returnValue = false;
            }
        };
    };
    return DefaultServerRenderer2;
}());
var AT_CHARCODE = '@'.charCodeAt(0);
function checkNoSyntheticProp(name, nameKind) {
    if (name.charCodeAt(0) === AT_CHARCODE) {
        throw new Error("Found the synthetic " + nameKind + " " + name + ". Please include either \"BrowserAnimationsModule\" or \"NoopAnimationsModule\" in your application.");
    }
}
var EmulatedEncapsulationServerRenderer2 = /** @class */ (function (_super) {
    tslib_1.__extends(EmulatedEncapsulationServerRenderer2, _super);
    function EmulatedEncapsulationServerRenderer2(eventManager, document, ngZone, sharedStylesHost, schema, component) {
        var _this = _super.call(this, eventManager, document, ngZone, schema) || this;
        _this.component = component;
        // Add a 's' prefix to style attributes to indicate server.
        var componentId = 's' + component.id;
        var styles = flattenStyles(componentId, component.styles, []);
        sharedStylesHost.addStyles(styles);
        _this.contentAttr = shimContentAttribute(componentId);
        _this.hostAttr = shimHostAttribute(componentId);
        return _this;
    }
    EmulatedEncapsulationServerRenderer2.prototype.applyToHost = function (element) { _super.prototype.setAttribute.call(this, element, this.hostAttr, ''); };
    EmulatedEncapsulationServerRenderer2.prototype.createElement = function (parent, name) {
        var el = _super.prototype.createElement.call(this, parent, name, this.document);
        _super.prototype.setAttribute.call(this, el, this.contentAttr, '');
        return el;
    };
    return EmulatedEncapsulationServerRenderer2;
}(DefaultServerRenderer2));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tc2VydmVyL3NyYy9zZXJ2ZXJfcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUMzRCxPQUFPLEVBQVMsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQWdILGlCQUFpQixFQUEwQixNQUFNLGVBQWUsQ0FBQztBQUMzTixPQUFPLEVBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxlQUFlLElBQUksY0FBYyxFQUFFLGlCQUFpQixJQUFJLGdCQUFnQixFQUFFLGNBQWMsSUFBSSxhQUFhLEVBQUUsT0FBTyxJQUFJLE1BQU0sRUFBRSxxQkFBcUIsSUFBSSxvQkFBb0IsRUFBRSxrQkFBa0IsSUFBSSxpQkFBaUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRXZSLElBQU0sV0FBVyxHQUFVLEVBQUUsQ0FBQzs7SUFRNUIsZ0NBQ1ksWUFBMEIsRUFBVSxNQUFjLEVBQ2hDLFVBQXVCLGdCQUFrQztRQUQzRSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDaEMsYUFBUSxHQUFSLFFBQVE7UUFBZSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO2dDQU41RCxJQUFJLEdBQUcsRUFBcUI7c0JBRXRDLElBQUksd0JBQXdCLEVBQUU7UUFLN0MsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLHNCQUFzQixDQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNoRztJQUVELCtDQUFjLEdBQWQsVUFBZSxPQUFZLEVBQUUsSUFBd0I7UUFDbkQsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRTtZQUNyQixP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SUFBQTtJQUFtRCxnRUFBc0I7SUFJdkUsOENBQ0ksWUFBMEIsRUFBRSxRQUFhLEVBQUUsTUFBYyxFQUFFLGdCQUFrQyxFQUM3RixNQUFnQyxFQUFVLFNBQXdCO1FBRnRFLFlBR0Usa0JBQU0sWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLFNBUTlDO1FBVDZDLGVBQVMsR0FBVCxTQUFTLENBQWU7O1FBR3BFLElBQU0sV0FBVyxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDO1FBQ3ZDLElBQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNoRSxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFbkMsS0FBSSxDQUFDLFdBQVcsR0FBRyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNyRCxLQUFJLENBQUMsUUFBUSxHQUFHLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDOztLQUNoRDtJQUVELDBEQUFXLEdBQVgsVUFBWSxPQUFZLElBQUksaUJBQU0sWUFBWSxZQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFFN0UsNERBQWEsR0FBYixVQUFjLE1BQVcsRUFBRSxJQUFZO1FBQ3JDLElBQU0sRUFBRSxHQUFHLGlCQUFNLGFBQWEsWUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1RCxpQkFBTSxZQUFZLFlBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0MsT0FBTyxFQUFFLENBQUM7S0FDWDsrQ0EvTkg7RUF3TW1ELHNCQUFzQixFQXdCeEUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEb21FbGVtZW50U2NoZW1hUmVnaXN0cnl9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyJztcbmltcG9ydCB7QVBQX0lELCBJbmplY3QsIEluamVjdGFibGUsIE5nWm9uZSwgUmVuZGVyQ29tcG9uZW50VHlwZSwgUmVuZGVyZXIsIFJlbmRlcmVyMiwgUmVuZGVyZXJGYWN0b3J5MiwgUmVuZGVyZXJTdHlsZUZsYWdzMiwgUmVuZGVyZXJUeXBlMiwgUm9vdFJlbmRlcmVyLCBWaWV3RW5jYXBzdWxhdGlvbiwgybVzdHJpbmdpZnkgYXMgc3RyaW5naWZ5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlQsIEV2ZW50TWFuYWdlciwgybVOQU1FU1BBQ0VfVVJJUyBhcyBOQU1FU1BBQ0VfVVJJUywgybVTaGFyZWRTdHlsZXNIb3N0IGFzIFNoYXJlZFN0eWxlc0hvc3QsIMm1ZmxhdHRlblN0eWxlcyBhcyBmbGF0dGVuU3R5bGVzLCDJtWdldERPTSBhcyBnZXRET00sIMm1c2hpbUNvbnRlbnRBdHRyaWJ1dGUgYXMgc2hpbUNvbnRlbnRBdHRyaWJ1dGUsIMm1c2hpbUhvc3RBdHRyaWJ1dGUgYXMgc2hpbUhvc3RBdHRyaWJ1dGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5jb25zdCBFTVBUWV9BUlJBWTogYW55W10gPSBbXTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZlclJlbmRlcmVyRmFjdG9yeTIgaW1wbGVtZW50cyBSZW5kZXJlckZhY3RvcnkyIHtcbiAgcHJpdmF0ZSByZW5kZXJlckJ5Q29tcElkID0gbmV3IE1hcDxzdHJpbmcsIFJlbmRlcmVyMj4oKTtcbiAgcHJpdmF0ZSBkZWZhdWx0UmVuZGVyZXI6IFJlbmRlcmVyMjtcbiAgcHJpdmF0ZSBzY2hlbWEgPSBuZXcgRG9tRWxlbWVudFNjaGVtYVJlZ2lzdHJ5KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyLCBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LCBwcml2YXRlIHNoYXJlZFN0eWxlc0hvc3Q6IFNoYXJlZFN0eWxlc0hvc3QpIHtcbiAgICB0aGlzLmRlZmF1bHRSZW5kZXJlciA9IG5ldyBEZWZhdWx0U2VydmVyUmVuZGVyZXIyKGV2ZW50TWFuYWdlciwgZG9jdW1lbnQsIG5nWm9uZSwgdGhpcy5zY2hlbWEpO1xuICB9XG5cbiAgY3JlYXRlUmVuZGVyZXIoZWxlbWVudDogYW55LCB0eXBlOiBSZW5kZXJlclR5cGUyfG51bGwpOiBSZW5kZXJlcjIge1xuICAgIGlmICghZWxlbWVudCB8fCAhdHlwZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFJlbmRlcmVyO1xuICAgIH1cbiAgICBzd2l0Y2ggKHR5cGUuZW5jYXBzdWxhdGlvbikge1xuICAgICAgY2FzZSBWaWV3RW5jYXBzdWxhdGlvbi5OYXRpdmU6XG4gICAgICBjYXNlIFZpZXdFbmNhcHN1bGF0aW9uLkVtdWxhdGVkOiB7XG4gICAgICAgIGxldCByZW5kZXJlciA9IHRoaXMucmVuZGVyZXJCeUNvbXBJZC5nZXQodHlwZS5pZCk7XG4gICAgICAgIGlmICghcmVuZGVyZXIpIHtcbiAgICAgICAgICByZW5kZXJlciA9IG5ldyBFbXVsYXRlZEVuY2Fwc3VsYXRpb25TZXJ2ZXJSZW5kZXJlcjIoXG4gICAgICAgICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyLCB0aGlzLmRvY3VtZW50LCB0aGlzLm5nWm9uZSwgdGhpcy5zaGFyZWRTdHlsZXNIb3N0LCB0aGlzLnNjaGVtYSxcbiAgICAgICAgICAgICAgdHlwZSk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlckJ5Q29tcElkLnNldCh0eXBlLmlkLCByZW5kZXJlcik7XG4gICAgICAgIH1cbiAgICAgICAgKDxFbXVsYXRlZEVuY2Fwc3VsYXRpb25TZXJ2ZXJSZW5kZXJlcjI+cmVuZGVyZXIpLmFwcGx5VG9Ib3N0KGVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gcmVuZGVyZXI7XG4gICAgICB9XG4gICAgICBjYXNlIFZpZXdFbmNhcHN1bGF0aW9uLk5hdGl2ZTpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOYXRpdmUgZW5jYXBzdWxhdGlvbiBpcyBub3Qgc3VwcG9ydGVkIG9uIHRoZSBzZXJ2ZXIhJyk7XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGlmICghdGhpcy5yZW5kZXJlckJ5Q29tcElkLmhhcyh0eXBlLmlkKSkge1xuICAgICAgICAgIGNvbnN0IHN0eWxlcyA9IGZsYXR0ZW5TdHlsZXModHlwZS5pZCwgdHlwZS5zdHlsZXMsIFtdKTtcbiAgICAgICAgICB0aGlzLnNoYXJlZFN0eWxlc0hvc3QuYWRkU3R5bGVzKHN0eWxlcyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlckJ5Q29tcElkLnNldCh0eXBlLmlkLCB0aGlzLmRlZmF1bHRSZW5kZXJlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFJlbmRlcmVyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGJlZ2luKCkge31cbiAgZW5kKCkge31cbn1cblxuY2xhc3MgRGVmYXVsdFNlcnZlclJlbmRlcmVyMiBpbXBsZW1lbnRzIFJlbmRlcmVyMiB7XG4gIGRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsIHByb3RlY3RlZCBkb2N1bWVudDogYW55LCBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgcHJpdmF0ZSBzY2hlbWE6IERvbUVsZW1lbnRTY2hlbWFSZWdpc3RyeSkge31cblxuICBkZXN0cm95KCk6IHZvaWQge31cblxuICBkZXN0cm95Tm9kZTogbnVsbDtcblxuICBjcmVhdGVFbGVtZW50KG5hbWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nLCBkZWJ1Z0luZm8/OiBhbnkpOiBhbnkge1xuICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgIHJldHVybiBnZXRET00oKS5jcmVhdGVFbGVtZW50TlMoTkFNRVNQQUNFX1VSSVNbbmFtZXNwYWNlXSwgbmFtZSwgdGhpcy5kb2N1bWVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdldERPTSgpLmNyZWF0ZUVsZW1lbnQobmFtZSwgdGhpcy5kb2N1bWVudCk7XG4gIH1cblxuICBjcmVhdGVDb21tZW50KHZhbHVlOiBzdHJpbmcsIGRlYnVnSW5mbz86IGFueSk6IGFueSB7IHJldHVybiBnZXRET00oKS5jcmVhdGVDb21tZW50KHZhbHVlKTsgfVxuXG4gIGNyZWF0ZVRleHQodmFsdWU6IHN0cmluZywgZGVidWdJbmZvPzogYW55KTogYW55IHsgcmV0dXJuIGdldERPTSgpLmNyZWF0ZVRleHROb2RlKHZhbHVlKTsgfVxuXG4gIGFwcGVuZENoaWxkKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55KTogdm9pZCB7IGdldERPTSgpLmFwcGVuZENoaWxkKHBhcmVudCwgbmV3Q2hpbGQpOyB9XG5cbiAgaW5zZXJ0QmVmb3JlKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55LCByZWZDaGlsZDogYW55KTogdm9pZCB7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgZ2V0RE9NKCkuaW5zZXJ0QmVmb3JlKHBhcmVudCwgcmVmQ2hpbGQsIG5ld0NoaWxkKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVDaGlsZChwYXJlbnQ6IGFueSwgb2xkQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIGdldERPTSgpLnJlbW92ZUNoaWxkKHBhcmVudCwgb2xkQ2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yT3JOb2RlOiBzdHJpbmd8YW55LCBkZWJ1Z0luZm8/OiBhbnkpOiBhbnkge1xuICAgIGxldCBlbDogYW55O1xuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3JPck5vZGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbCA9IGdldERPTSgpLnF1ZXJ5U2VsZWN0b3IodGhpcy5kb2N1bWVudCwgc2VsZWN0b3JPck5vZGUpO1xuICAgICAgaWYgKCFlbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBzZWxlY3RvciBcIiR7c2VsZWN0b3JPck5vZGV9XCIgZGlkIG5vdCBtYXRjaCBhbnkgZWxlbWVudHNgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWwgPSBzZWxlY3Rvck9yTm9kZTtcbiAgICB9XG4gICAgZ2V0RE9NKCkuY2xlYXJOb2RlcyhlbCk7XG4gICAgcmV0dXJuIGVsO1xuICB9XG5cbiAgcGFyZW50Tm9kZShub2RlOiBhbnkpOiBhbnkgeyByZXR1cm4gZ2V0RE9NKCkucGFyZW50RWxlbWVudChub2RlKTsgfVxuXG4gIG5leHRTaWJsaW5nKG5vZGU6IGFueSk6IGFueSB7IHJldHVybiBnZXRET00oKS5uZXh0U2libGluZyhub2RlKTsgfVxuXG4gIHNldEF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgIGdldERPTSgpLnNldEF0dHJpYnV0ZU5TKGVsLCBOQU1FU1BBQ0VfVVJJU1tuYW1lc3BhY2VdLCBuYW1lc3BhY2UgKyAnOicgKyBuYW1lLCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdldERPTSgpLnNldEF0dHJpYnV0ZShlbCwgbmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgIGdldERPTSgpLnJlbW92ZUF0dHJpYnV0ZU5TKGVsLCBOQU1FU1BBQ0VfVVJJU1tuYW1lc3BhY2VdLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2V0RE9NKCkucmVtb3ZlQXR0cmlidXRlKGVsLCBuYW1lKTtcbiAgICB9XG4gIH1cblxuICBhZGRDbGFzcyhlbDogYW55LCBuYW1lOiBzdHJpbmcpOiB2b2lkIHsgZ2V0RE9NKCkuYWRkQ2xhc3MoZWwsIG5hbWUpOyB9XG5cbiAgcmVtb3ZlQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZCB7IGdldERPTSgpLnJlbW92ZUNsYXNzKGVsLCBuYW1lKTsgfVxuXG4gIHNldFN0eWxlKGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIHZhbHVlOiBhbnksIGZsYWdzOiBSZW5kZXJlclN0eWxlRmxhZ3MyKTogdm9pZCB7XG4gICAgZ2V0RE9NKCkuc2V0U3R5bGUoZWwsIHN0eWxlLCB2YWx1ZSk7XG4gIH1cblxuICByZW1vdmVTdHlsZShlbDogYW55LCBzdHlsZTogc3RyaW5nLCBmbGFnczogUmVuZGVyZXJTdHlsZUZsYWdzMik6IHZvaWQge1xuICAgIGdldERPTSgpLnJlbW92ZVN0eWxlKGVsLCBzdHlsZSk7XG4gIH1cblxuICAvLyBUaGUgdmFsdWUgd2FzIHZhbGlkYXRlZCBhbHJlYWR5IGFzIGEgcHJvcGVydHkgYmluZGluZywgYWdhaW5zdCB0aGUgcHJvcGVydHkgbmFtZS5cbiAgLy8gVG8ga25vdyB0aGlzIHZhbHVlIGlzIHNhZmUgdG8gdXNlIGFzIGFuIGF0dHJpYnV0ZSwgdGhlIHNlY3VyaXR5IGNvbnRleHQgb2YgdGhlXG4gIC8vIGF0dHJpYnV0ZSB3aXRoIHRoZSBnaXZlbiBuYW1lIGlzIGNoZWNrZWQgYWdhaW5zdCB0aGF0IHNlY3VyaXR5IGNvbnRleHQgb2YgdGhlXG4gIC8vIHByb3BlcnR5LlxuICBwcml2YXRlIF9pc1NhZmVUb1JlZmxlY3RQcm9wZXJ0eSh0YWdOYW1lOiBzdHJpbmcsIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2NoZW1hLnNlY3VyaXR5Q29udGV4dCh0YWdOYW1lLCBwcm9wZXJ0eU5hbWUsIHRydWUpID09PVxuICAgICAgICB0aGlzLnNjaGVtYS5zZWN1cml0eUNvbnRleHQodGFnTmFtZSwgcHJvcGVydHlOYW1lLCBmYWxzZSk7XG4gIH1cblxuICBzZXRQcm9wZXJ0eShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBjaGVja05vU3ludGhldGljUHJvcChuYW1lLCAncHJvcGVydHknKTtcbiAgICBnZXRET00oKS5zZXRQcm9wZXJ0eShlbCwgbmFtZSwgdmFsdWUpO1xuICAgIC8vIE1pcnJvciBwcm9wZXJ0eSB2YWx1ZXMgZm9yIGtub3duIEhUTUwgZWxlbWVudCBwcm9wZXJ0aWVzIGluIHRoZSBhdHRyaWJ1dGVzLlxuICAgIGNvbnN0IHRhZ05hbWUgPSAoZWwudGFnTmFtZSBhcyBzdHJpbmcpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKHZhbHVlICE9IG51bGwgJiYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgfHwgdHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSAmJlxuICAgICAgICB0aGlzLnNjaGVtYS5oYXNFbGVtZW50KHRhZ05hbWUsIEVNUFRZX0FSUkFZKSAmJlxuICAgICAgICB0aGlzLnNjaGVtYS5oYXNQcm9wZXJ0eSh0YWdOYW1lLCBuYW1lLCBFTVBUWV9BUlJBWSkgJiZcbiAgICAgICAgdGhpcy5faXNTYWZlVG9SZWZsZWN0UHJvcGVydHkodGFnTmFtZSwgbmFtZSkpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGVsLCBuYW1lLCB2YWx1ZS50b1N0cmluZygpKTtcbiAgICB9XG4gIH1cblxuICBzZXRWYWx1ZShub2RlOiBhbnksIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHsgZ2V0RE9NKCkuc2V0VGV4dChub2RlLCB2YWx1ZSk7IH1cblxuICBsaXN0ZW4oXG4gICAgICB0YXJnZXQ6ICdkb2N1bWVudCd8J3dpbmRvdyd8J2JvZHknfGFueSwgZXZlbnROYW1lOiBzdHJpbmcsXG4gICAgICBjYWxsYmFjazogKGV2ZW50OiBhbnkpID0+IGJvb2xlYW4pOiAoKSA9PiB2b2lkIHtcbiAgICBjaGVja05vU3ludGhldGljUHJvcChldmVudE5hbWUsICdsaXN0ZW5lcicpO1xuICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIDwoKSA9PiB2b2lkPnRoaXMuZXZlbnRNYW5hZ2VyLmFkZEdsb2JhbEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgdGFyZ2V0LCBldmVudE5hbWUsIHRoaXMuZGVjb3JhdGVQcmV2ZW50RGVmYXVsdChjYWxsYmFjaykpO1xuICAgIH1cbiAgICByZXR1cm4gPCgpID0+IHZvaWQ+dGhpcy5ldmVudE1hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgIHRhcmdldCwgZXZlbnROYW1lLCB0aGlzLmRlY29yYXRlUHJldmVudERlZmF1bHQoY2FsbGJhY2spKSBhcygpID0+IHZvaWQ7XG4gIH1cblxuICBwcml2YXRlIGRlY29yYXRlUHJldmVudERlZmF1bHQoZXZlbnRIYW5kbGVyOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICByZXR1cm4gKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgIC8vIFJ1biB0aGUgZXZlbnQgaGFuZGxlciBpbnNpZGUgdGhlIG5nWm9uZSBiZWNhdXNlIGV2ZW50IGhhbmRsZXJzIGFyZSBub3QgcGF0Y2hlZFxuICAgICAgLy8gYnkgWm9uZSBvbiB0aGUgc2VydmVyLiBUaGlzIGlzIHJlcXVpcmVkIG9ubHkgZm9yIHRlc3RzLlxuICAgICAgY29uc3QgYWxsb3dEZWZhdWx0QmVoYXZpb3IgPSB0aGlzLm5nWm9uZS5ydW5HdWFyZGVkKCgpID0+IGV2ZW50SGFuZGxlcihldmVudCkpO1xuICAgICAgaWYgKGFsbG93RGVmYXVsdEJlaGF2aW9yID09PSBmYWxzZSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cblxuY29uc3QgQVRfQ0hBUkNPREUgPSAnQCcuY2hhckNvZGVBdCgwKTtcbmZ1bmN0aW9uIGNoZWNrTm9TeW50aGV0aWNQcm9wKG5hbWU6IHN0cmluZywgbmFtZUtpbmQ6IHN0cmluZykge1xuICBpZiAobmFtZS5jaGFyQ29kZUF0KDApID09PSBBVF9DSEFSQ09ERSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYEZvdW5kIHRoZSBzeW50aGV0aWMgJHtuYW1lS2luZH0gJHtuYW1lfS4gUGxlYXNlIGluY2x1ZGUgZWl0aGVyIFwiQnJvd3NlckFuaW1hdGlvbnNNb2R1bGVcIiBvciBcIk5vb3BBbmltYXRpb25zTW9kdWxlXCIgaW4geW91ciBhcHBsaWNhdGlvbi5gKTtcbiAgfVxufVxuXG5jbGFzcyBFbXVsYXRlZEVuY2Fwc3VsYXRpb25TZXJ2ZXJSZW5kZXJlcjIgZXh0ZW5kcyBEZWZhdWx0U2VydmVyUmVuZGVyZXIyIHtcbiAgcHJpdmF0ZSBjb250ZW50QXR0cjogc3RyaW5nO1xuICBwcml2YXRlIGhvc3RBdHRyOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlciwgZG9jdW1lbnQ6IGFueSwgbmdab25lOiBOZ1pvbmUsIHNoYXJlZFN0eWxlc0hvc3Q6IFNoYXJlZFN0eWxlc0hvc3QsXG4gICAgICBzY2hlbWE6IERvbUVsZW1lbnRTY2hlbWFSZWdpc3RyeSwgcHJpdmF0ZSBjb21wb25lbnQ6IFJlbmRlcmVyVHlwZTIpIHtcbiAgICBzdXBlcihldmVudE1hbmFnZXIsIGRvY3VtZW50LCBuZ1pvbmUsIHNjaGVtYSk7XG4gICAgLy8gQWRkIGEgJ3MnIHByZWZpeCB0byBzdHlsZSBhdHRyaWJ1dGVzIHRvIGluZGljYXRlIHNlcnZlci5cbiAgICBjb25zdCBjb21wb25lbnRJZCA9ICdzJyArIGNvbXBvbmVudC5pZDtcbiAgICBjb25zdCBzdHlsZXMgPSBmbGF0dGVuU3R5bGVzKGNvbXBvbmVudElkLCBjb21wb25lbnQuc3R5bGVzLCBbXSk7XG4gICAgc2hhcmVkU3R5bGVzSG9zdC5hZGRTdHlsZXMoc3R5bGVzKTtcblxuICAgIHRoaXMuY29udGVudEF0dHIgPSBzaGltQ29udGVudEF0dHJpYnV0ZShjb21wb25lbnRJZCk7XG4gICAgdGhpcy5ob3N0QXR0ciA9IHNoaW1Ib3N0QXR0cmlidXRlKGNvbXBvbmVudElkKTtcbiAgfVxuXG4gIGFwcGx5VG9Ib3N0KGVsZW1lbnQ6IGFueSkgeyBzdXBlci5zZXRBdHRyaWJ1dGUoZWxlbWVudCwgdGhpcy5ob3N0QXR0ciwgJycpOyB9XG5cbiAgY3JlYXRlRWxlbWVudChwYXJlbnQ6IGFueSwgbmFtZTogc3RyaW5nKTogRWxlbWVudCB7XG4gICAgY29uc3QgZWwgPSBzdXBlci5jcmVhdGVFbGVtZW50KHBhcmVudCwgbmFtZSwgdGhpcy5kb2N1bWVudCk7XG4gICAgc3VwZXIuc2V0QXR0cmlidXRlKGVsLCB0aGlzLmNvbnRlbnRBdHRyLCAnJyk7XG4gICAgcmV0dXJuIGVsO1xuICB9XG59XG4iXX0=