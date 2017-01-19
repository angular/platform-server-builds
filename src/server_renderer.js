/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { APP_ID, Inject, Injectable, NgZone, ViewEncapsulation } from '@angular/core/index';
import { AnimationDriver, DOCUMENT } from '@angular/platform-browser/index';
import { isBlank, isPresent, stringify } from './facade/lang';
import { NAMESPACE_URIS, SharedStylesHost, flattenStyles, getDOM, isNamespaced, shimContentAttribute, shimHostAttribute, splitNamespace } from './private_import_platform-browser';
const /** @type {?} */ TEMPLATE_COMMENT_TEXT = 'template bindings={}';
const /** @type {?} */ TEMPLATE_BINDINGS_EXP = /^template bindings=(.*)$/;
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
    }
    /**
     * @param {?} componentProto
     * @return {?}
     */
    renderComponent(componentProto) {
        let /** @type {?} */ renderer = this.registeredComponents.get(componentProto.id);
        if (!renderer) {
            renderer = new ServerRenderer(this, componentProto, this.animationDriver, `${this.appId}-${componentProto.id}`, this._zone);
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
     */
    constructor(_rootRenderer, componentProto, _animationDriver, styleShimId, _zone) {
        this._rootRenderer = _rootRenderer;
        this.componentProto = componentProto;
        this._animationDriver = _animationDriver;
        this._zone = _zone;
        this._styles = flattenStyles(styleShimId, componentProto.styles, []);
        if (componentProto.encapsulation === ViewEncapsulation.Native) {
            throw new Error('Native encapsulation is not supported on the server!');
        }
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
        let /** @type {?} */ el;
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
        let /** @type {?} */ nodesParent;
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
        const /** @type {?} */ renderElement = getDOM().getGlobalEventTarget(target);
        return this.listen(renderElement, name, callback);
    }
    /**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    setElementProperty(renderElement, propertyName, propertyValue) {
        getDOM().setProperty(renderElement, propertyName, propertyValue);
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
}
/**
 * @param {?} sibling
 * @param {?} nodes
 * @return {?}
 */
function moveNodesAfterSibling(sibling /** TODO #9100 */, nodes /** TODO #9100 */) {
    const /** @type {?} */ parent = getDOM().parentElement(sibling);
    if (nodes.length > 0 && isPresent(parent)) {
        const /** @type {?} */ nextSibling = getDOM().nextSibling(sibling);
        if (isPresent(nextSibling)) {
            for (let /** @type {?} */ i = 0; i < nodes.length; i++) {
                getDOM().insertBefore(nextSibling, nodes[i]);
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
function appendNodes(parent /** TODO #9100 */, nodes /** TODO #9100 */) {
    for (let /** @type {?} */ i = 0; i < nodes.length; i++) {
        getDOM().appendChild(parent, nodes[i]);
    }
}
/**
 * @param {?} eventHandler
 * @return {?}
 */
function decoratePreventDefault(eventHandler) {
    return (event /** TODO #9100 */) => {
        const /** @type {?} */ allowDefaultBehavior = eventHandler(event);
        if (allowDefaultBehavior === false) {
            // TODO(tbosch): move preventDefault into event plugins...
            getDOM().preventDefault(event);
        }
    };
}
//# sourceMappingURL=server_renderer.js.map