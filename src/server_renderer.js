/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DomElementSchemaRegistry } from '@angular/compiler/index';
import { APP_ID, Inject, Injectable, NgZone, ViewEncapsulation } from '@angular/core/index';
import { AnimationDriver, DOCUMENT } from '@angular/platform-browser/index';
import { isBlank, isPresent, stringify } from './facade/lang';
import { NAMESPACE_URIS, SharedStylesHost, flattenStyles, getDOM, isNamespaced, shimContentAttribute, shimHostAttribute, splitNamespace } from './private_import_platform-browser';
const /** @type {?} */ TEMPLATE_COMMENT_TEXT = 'template bindings={}';
const /** @type {?} */ TEMPLATE_BINDINGS_EXP = /^template bindings=(.*)$/;
const /** @type {?} */ EMPTY_ARRAY = [];
export class ServerRootRenderer {
    /**
     * @param {?} document
     * @param {?} sharedStylesHost
     * @param {?} animationDriver
     * @param {?} appId
     * @param {?} _zone
     */
    constructor(document, sharedStylesHost, animationDriver, appId, _zone) {
        this.document = document;
        this.sharedStylesHost = sharedStylesHost;
        this.animationDriver = animationDriver;
        this.appId = appId;
        this._zone = _zone;
        this.registeredComponents = new Map();
        this._schema = new DomElementSchemaRegistry();
    }
    /**
     * @param {?} componentProto
     * @return {?}
     */
    renderComponent(componentProto) {
        let /** @type {?} */ renderer = this.registeredComponents.get(componentProto.id);
        if (!renderer) {
            renderer = new ServerRenderer(this, componentProto, this.animationDriver, `${this.appId}-${componentProto.id}`, this._zone, this._schema);
            this.registeredComponents.set(componentProto.id, renderer);
        }
        return renderer;
    }
}
ServerRootRenderer.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ServerRootRenderer.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    { type: SharedStylesHost, },
    { type: AnimationDriver, },
    { type: undefined, decorators: [{ type: Inject, args: [APP_ID,] },] },
    { type: NgZone, },
];
function ServerRootRenderer_tsickle_Closure_declarations() {
    /** @type {?} */
    ServerRootRenderer.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ServerRootRenderer.ctorParameters;
    /** @type {?} */
    ServerRootRenderer.prototype.registeredComponents;
    /** @type {?} */
    ServerRootRenderer.prototype._schema;
    /** @type {?} */
    ServerRootRenderer.prototype.document;
    /** @type {?} */
    ServerRootRenderer.prototype.sharedStylesHost;
    /** @type {?} */
    ServerRootRenderer.prototype.animationDriver;
    /** @type {?} */
    ServerRootRenderer.prototype.appId;
    /** @type {?} */
    ServerRootRenderer.prototype._zone;
}
export class ServerRenderer {
    /**
     * @param {?} _rootRenderer
     * @param {?} componentProto
     * @param {?} _animationDriver
     * @param {?} styleShimId
     * @param {?} _zone
     * @param {?} _schema
     */
    constructor(_rootRenderer, componentProto, _animationDriver, styleShimId, _zone, _schema) {
        this._rootRenderer = _rootRenderer;
        this.componentProto = componentProto;
        this._animationDriver = _animationDriver;
        this._zone = _zone;
        this._schema = _schema;
        this._styles = flattenStyles(styleShimId, componentProto.styles, []);
        if (componentProto.encapsulation === ViewEncapsulation.Native) {
            throw new Error('Native encapsulation is not supported on the server!');
        }
        this._rootRenderer.sharedStylesHost.addStyles(this._styles);
        if (this.componentProto.encapsulation === ViewEncapsulation.Emulated) {
            this._contentAttr = shimContentAttribute(styleShimId);
            this._hostAttr = shimHostAttribute(styleShimId);
        }
        else {
            this._contentAttr = null;
            this._hostAttr = null;
        }
    }
    /**
     * @param {?} selectorOrNode
     * @param {?} debugInfo
     * @return {?}
     */
    selectRootElement(selectorOrNode, debugInfo) {
        let /** @type {?} */ el /** TODO #9100 */;
        if (typeof selectorOrNode === 'string') {
            el = getDOM().querySelector(this._rootRenderer.document, selectorOrNode);
            if (isBlank(el)) {
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
     * @param {?} parent
     * @param {?} name
     * @param {?} debugInfo
     * @return {?}
     */
    createElement(parent, name, debugInfo) {
        let /** @type {?} */ el;
        if (isNamespaced(name)) {
            const /** @type {?} */ nsAndName = splitNamespace(name);
            el = getDOM().createElementNS(NAMESPACE_URIS[nsAndName[0]], nsAndName[1]);
        }
        else {
            el = getDOM().createElement(name);
        }
        if (isPresent(this._contentAttr)) {
            getDOM().setAttribute(el, this._contentAttr, '');
        }
        if (isPresent(parent)) {
            getDOM().appendChild(parent, el);
        }
        return el;
    }
    /**
     * @param {?} hostElement
     * @return {?}
     */
    createViewRoot(hostElement) {
        let /** @type {?} */ nodesParent /** TODO #9100 */;
        if (isPresent(this._hostAttr)) {
            getDOM().setAttribute(hostElement, this._hostAttr, '');
        }
        nodesParent = hostElement;
        return nodesParent;
    }
    /**
     * @param {?} parentElement
     * @param {?} debugInfo
     * @return {?}
     */
    createTemplateAnchor(parentElement, debugInfo) {
        const /** @type {?} */ comment = getDOM().createComment(TEMPLATE_COMMENT_TEXT);
        if (isPresent(parentElement)) {
            getDOM().appendChild(parentElement, comment);
        }
        return comment;
    }
    /**
     * @param {?} parentElement
     * @param {?} value
     * @param {?} debugInfo
     * @return {?}
     */
    createText(parentElement, value, debugInfo) {
        const /** @type {?} */ node = getDOM().createTextNode(value);
        if (isPresent(parentElement)) {
            getDOM().appendChild(parentElement, node);
        }
        return node;
    }
    /**
     * @param {?} parentElement
     * @param {?} nodes
     * @return {?}
     */
    projectNodes(parentElement, nodes) {
        if (isBlank(parentElement))
            return;
        appendNodes(parentElement, nodes);
    }
    /**
     * @param {?} node
     * @param {?} viewRootNodes
     * @return {?}
     */
    attachViewAfter(node, viewRootNodes) { moveNodesAfterSibling(node, viewRootNodes); }
    /**
     * @param {?} viewRootNodes
     * @return {?}
     */
    detachView(viewRootNodes) {
        for (let /** @type {?} */ i = 0; i < viewRootNodes.length; i++) {
            getDOM().remove(viewRootNodes[i]);
        }
    }
    /**
     * @param {?} hostElement
     * @param {?} viewAllNodes
     * @return {?}
     */
    destroyView(hostElement, viewAllNodes) { }
    /**
     * @param {?} renderElement
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    listen(renderElement, name, callback) {
        // Note: We are not using the EventsPlugin here as this is not needed
        // to run our tests.
        const /** @type {?} */ outsideHandler = (event) => this._zone.runGuarded(() => callback(event));
        return this._zone.runOutsideAngular(() => getDOM().onAndCancel(renderElement, name, outsideHandler));
    }
    /**
     * @param {?} target
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    listenGlobal(target, name, callback) {
        const /** @type {?} */ renderElement = getDOM().getGlobalEventTarget(this._rootRenderer.document, target);
        return this.listen(renderElement, name, callback);
    }
    /**
     * @param {?} tagName
     * @param {?} propertyName
     * @return {?}
     */
    _isSafeToReflectProperty(tagName, propertyName) {
        return this._schema.securityContext(tagName, propertyName, true) ===
            this._schema.securityContext(tagName, propertyName, false);
    }
    /**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    setElementProperty(renderElement, propertyName, propertyValue) {
        getDOM().setProperty(renderElement, propertyName, propertyValue);
        // Mirror property values for known HTML element properties in the attributes.
        const /** @type {?} */ tagName = ((renderElement.tagName)).toLowerCase();
        if (isPresent(propertyValue) &&
            (typeof propertyValue === 'number' || typeof propertyValue == 'string') &&
            this._schema.hasElement(tagName, EMPTY_ARRAY) &&
            this._schema.hasProperty(tagName, propertyName, EMPTY_ARRAY) &&
            this._isSafeToReflectProperty(tagName, propertyName)) {
            this.setElementAttribute(renderElement, propertyName, propertyValue.toString());
        }
    }
    /**
     * @param {?} renderElement
     * @param {?} attributeName
     * @param {?} attributeValue
     * @return {?}
     */
    setElementAttribute(renderElement, attributeName, attributeValue) {
        let /** @type {?} */ attrNs;
        let /** @type {?} */ attrNameWithoutNs = attributeName;
        if (isNamespaced(attributeName)) {
            const /** @type {?} */ nsAndName = splitNamespace(attributeName);
            attrNameWithoutNs = nsAndName[1];
            attributeName = nsAndName[0] + ':' + nsAndName[1];
            attrNs = NAMESPACE_URIS[nsAndName[0]];
        }
        if (isPresent(attributeValue)) {
            if (isPresent(attrNs)) {
                getDOM().setAttributeNS(renderElement, attrNs, attributeName, attributeValue);
            }
            else {
                getDOM().setAttribute(renderElement, attributeName, attributeValue);
            }
        }
        else {
            if (isPresent(attrNs)) {
                getDOM().removeAttributeNS(renderElement, attrNs, attrNameWithoutNs);
            }
            else {
                getDOM().removeAttribute(renderElement, attributeName);
            }
        }
    }
    /**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    setBindingDebugInfo(renderElement, propertyName, propertyValue) {
        if (getDOM().isCommentNode(renderElement)) {
            const /** @type {?} */ existingBindings = getDOM().getText(renderElement).replace(/\n/g, '').match(TEMPLATE_BINDINGS_EXP);
            const /** @type {?} */ parsedBindings = JSON.parse(existingBindings[1]);
            ((parsedBindings) /** TODO #9100 */)[propertyName] = propertyValue;
            getDOM().setText(renderElement, TEMPLATE_COMMENT_TEXT.replace('{}', JSON.stringify(parsedBindings, null, 2)));
        }
        else {
            propertyName = propertyName.replace(/\$/g, '_');
            this.setElementAttribute(renderElement, propertyName, propertyValue);
        }
    }
    /**
     * @param {?} renderElement
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    setElementClass(renderElement, className, isAdd) {
        if (isAdd) {
            getDOM().addClass(renderElement, className);
        }
        else {
            getDOM().removeClass(renderElement, className);
        }
    }
    /**
     * @param {?} renderElement
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    setElementStyle(renderElement, styleName, styleValue) {
        if (isPresent(styleValue)) {
            getDOM().setStyle(renderElement, styleName, stringify(styleValue));
        }
        else {
            getDOM().removeStyle(renderElement, styleName);
        }
    }
    /**
     * @param {?} renderElement
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    invokeElementMethod(renderElement, methodName, args) {
        getDOM().invoke(renderElement, methodName, args);
    }
    /**
     * @param {?} renderNode
     * @param {?} text
     * @return {?}
     */
    setText(renderNode, text) { getDOM().setText(renderNode, text); }
    /**
     * @param {?} element
     * @param {?} startingStyles
     * @param {?} keyframes
     * @param {?} duration
     * @param {?} delay
     * @param {?} easing
     * @param {?=} previousPlayers
     * @return {?}
     */
    animate(element, startingStyles, keyframes, duration, delay, easing, previousPlayers = []) {
        return this._animationDriver.animate(element, startingStyles, keyframes, duration, delay, easing, previousPlayers);
    }
}
function ServerRenderer_tsickle_Closure_declarations() {
    /** @type {?} */
    ServerRenderer.prototype._contentAttr;
    /** @type {?} */
    ServerRenderer.prototype._hostAttr;
    /** @type {?} */
    ServerRenderer.prototype._styles;
    /** @type {?} */
    ServerRenderer.prototype._rootRenderer;
    /** @type {?} */
    ServerRenderer.prototype.componentProto;
    /** @type {?} */
    ServerRenderer.prototype._animationDriver;
    /** @type {?} */
    ServerRenderer.prototype._zone;
    /** @type {?} */
    ServerRenderer.prototype._schema;
}
/**
 * @param {?} ref
 * @param {?} nodes
 * @return {?}
 */
function moveNodesAfterSibling(ref, nodes) {
    const /** @type {?} */ parent = getDOM().parentElement(ref);
    if (nodes.length > 0 && parent) {
        const /** @type {?} */ nextSibling = getDOM().nextSibling(ref);
        if (nextSibling) {
            for (let /** @type {?} */ i = 0; i < nodes.length; i++) {
                getDOM().insertBefore(parent, nextSibling, nodes[i]);
            }
        }
        else {
            for (let /** @type {?} */ i = 0; i < nodes.length; i++) {
                getDOM().appendChild(parent, nodes[i]);
            }
        }
    }
}
/**
 * @param {?} parent
 * @param {?} nodes
 * @return {?}
 */
function appendNodes(parent, nodes) {
    for (let /** @type {?} */ i = 0; i < nodes.length; i++) {
        getDOM().appendChild(parent, nodes[i]);
    }
}
export class ServerRendererFactoryV2 {
    /**
     * @param {?} ngZone
     * @param {?} document
     * @param {?} sharedStylesHost
     */
    constructor(ngZone, document, sharedStylesHost) {
        this.ngZone = ngZone;
        this.document = document;
        this.sharedStylesHost = sharedStylesHost;
        this.rendererByCompId = new Map();
        this.defaultRenderer = new DefaultServerRendererV2(document, ngZone);
    }
    ;
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
            case ViewEncapsulation.Emulated: {
                let /** @type {?} */ renderer = this.rendererByCompId.get(type.id);
                if (!renderer) {
                    renderer = new EmulatedEncapsulationServerRendererV2(this.document, this.ngZone, this.sharedStylesHost, type);
                    this.rendererByCompId.set(type.id, renderer);
                }
                ((renderer)).applyToHost(element);
                return renderer;
            }
            case ViewEncapsulation.Native:
                throw new Error('Native encapsulation is not supported on the server!');
            default: {
                if (!this.rendererByCompId.has(type.id)) {
                    const /** @type {?} */ styles = flattenStyles(type.id, type.styles, []);
                    this.sharedStylesHost.addStyles(styles);
                    this.rendererByCompId.set(type.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
        }
    }
}
ServerRendererFactoryV2.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ServerRendererFactoryV2.ctorParameters = () => [
    { type: NgZone, },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    { type: SharedStylesHost, },
];
function ServerRendererFactoryV2_tsickle_Closure_declarations() {
    /** @type {?} */
    ServerRendererFactoryV2.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ServerRendererFactoryV2.ctorParameters;
    /** @type {?} */
    ServerRendererFactoryV2.prototype.rendererByCompId;
    /** @type {?} */
    ServerRendererFactoryV2.prototype.defaultRenderer;
    /** @type {?} */
    ServerRendererFactoryV2.prototype.ngZone;
    /** @type {?} */
    ServerRendererFactoryV2.prototype.document;
    /** @type {?} */
    ServerRendererFactoryV2.prototype.sharedStylesHost;
}
class DefaultServerRendererV2 {
    /**
     * @param {?} document
     * @param {?} ngZone
     */
    constructor(document, ngZone) {
        this.document = document;
        this.ngZone = ngZone;
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
            return getDOM().createElementNS(NAMESPACE_URIS[namespace], name);
        }
        return getDOM().createElement(name);
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
        let /** @type {?} */ el;
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
     * @param {?} hasVendorPrefix
     * @param {?} hasImportant
     * @return {?}
     */
    setStyle(el, style, value, hasVendorPrefix, hasImportant) {
        getDOM().setStyle(el, style, value);
    }
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} hasVendorPrefix
     * @return {?}
     */
    removeStyle(el, style, hasVendorPrefix) {
        getDOM().removeStyle(el, style);
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setProperty(el, name, value) { getDOM().setProperty(el, name, value); }
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
        // Note: We are not using the EventsPlugin here as this is not needed
        // to run our tests.
        const /** @type {?} */ el = typeof target === 'string' ? getDOM().getGlobalEventTarget(this.document, target) : target;
        const /** @type {?} */ outsideHandler = (event) => this.ngZone.runGuarded(() => callback(event));
        return this.ngZone.runOutsideAngular(() => getDOM().onAndCancel(el, eventName, outsideHandler));
    }
}
function DefaultServerRendererV2_tsickle_Closure_declarations() {
    /** @type {?} */
    DefaultServerRendererV2.prototype.destroyNode;
    /** @type {?} */
    DefaultServerRendererV2.prototype.document;
    /** @type {?} */
    DefaultServerRendererV2.prototype.ngZone;
}
class EmulatedEncapsulationServerRendererV2 extends DefaultServerRendererV2 {
    /**
     * @param {?} document
     * @param {?} ngZone
     * @param {?} sharedStylesHost
     * @param {?} component
     */
    constructor(document, ngZone, sharedStylesHost, component) {
        super(document, ngZone);
        this.component = component;
        const styles = flattenStyles(component.id, component.styles, []);
        sharedStylesHost.addStyles(styles);
        this.contentAttr = shimContentAttribute(component.id);
        this.hostAttr = shimHostAttribute(component.id);
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
        const /** @type {?} */ el = super.createElement(parent, name);
        super.setAttribute(el, this.contentAttr, '');
        return el;
    }
}
function EmulatedEncapsulationServerRendererV2_tsickle_Closure_declarations() {
    /** @type {?} */
    EmulatedEncapsulationServerRendererV2.prototype.contentAttr;
    /** @type {?} */
    EmulatedEncapsulationServerRendererV2.prototype.hostAttr;
    /** @type {?} */
    EmulatedEncapsulationServerRendererV2.prototype.component;
}
//# sourceMappingURL=server_renderer.js.map