/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const /** @type {?} */ parse5 = require('parse5');
import { ListWrapper } from '../src/facade/collection';
import { DomAdapter, setRootDomAdapter } from './private_import_platform-browser';
import { isPresent, isBlank, global, setValueOnPath } from '../src/facade/lang';
import { SelectorMatcher, CssSelector } from '@angular/compiler/index';
let /** @type {?} */ treeAdapter;
const /** @type {?} */ _attrToPropMap = {
    'class': 'className',
    'innerHtml': 'innerHTML',
    'readonly': 'readOnly',
    'tabindex': 'tabIndex',
};
const /** @type {?} */ mapProps = ['attribs', 'x-attribsNamespace', 'x-attribsPrefix'];
/**
 * @param {?} methodName
 * @return {?}
 */
function _notImplemented(methodName) {
    return new Error('This method is not implemented in Parse5DomAdapter: ' + methodName);
}
/**
 * Parses a document string to a Document object.
 * @param {?} html
 * @return {?}
 */
export function parseDocument(html) {
    return parse5.parse(html, { treeAdapter: parse5.treeAdapters.htmlparser2 });
}
/**
 * A `DomAdapter` powered by the `parse5` NodeJS module.
 *
 * \@security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 */
export class Parse5DomAdapter extends DomAdapter {
    /**
     * @return {?}
     */
    static makeCurrent() {
        treeAdapter = parse5.treeAdapters.htmlparser2;
        setRootDomAdapter(new Parse5DomAdapter());
    }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    hasProperty(element, name) {
        return _HTMLElementPropertyList.indexOf(name) > -1;
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setProperty(el, name, value) {
        if (name === 'innerHTML') {
            this.setInnerHTML(el, value);
        }
        else if (name === 'className') {
            el.attribs['class'] = el.className = value;
        }
        else {
            el[name] = value;
        }
    }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    getProperty(el, name) { return el[name]; }
    /**
     * @param {?} error
     * @return {?}
     */
    logError(error) { console.error(error); }
    /**
     * @param {?} error
     * @return {?}
     */
    log(error) { console.log(error); }
    /**
     * @param {?} error
     * @return {?}
     */
    logGroup(error) { console.error(error); }
    /**
     * @return {?}
     */
    logGroupEnd() { }
    /**
     * @return {?}
     */
    get attrToPropMap() { return _attrToPropMap; }
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    querySelector(el, selector) { return this.querySelectorAll(el, selector)[0]; }
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    querySelectorAll(el, selector) {
        const /** @type {?} */ res = [];
        const /** @type {?} */ _recursive = (result, node, selector, matcher) => {
            const /** @type {?} */ cNodes = node.childNodes;
            if (cNodes && cNodes.length > 0) {
                for (let /** @type {?} */ i = 0; i < cNodes.length; i++) {
                    const /** @type {?} */ childNode = cNodes[i];
                    if (this.elementMatches(childNode, selector, matcher)) {
                        result.push(childNode);
                    }
                    _recursive(result, childNode, selector, matcher);
                }
            }
        };
        const /** @type {?} */ matcher = new SelectorMatcher();
        matcher.addSelectables(CssSelector.parse(selector));
        _recursive(res, el, selector, matcher);
        return res;
    }
    /**
     * @param {?} node
     * @param {?} selector
     * @param {?=} matcher
     * @return {?}
     */
    elementMatches(node, selector, matcher = null) {
        if (this.isElementNode(node) && selector === '*') {
            return true;
        }
        let /** @type {?} */ result = false;
        if (selector && selector.charAt(0) == '#') {
            result = this.getAttribute(node, 'id') == selector.substring(1);
        }
        else if (selector) {
            if (!matcher) {
                matcher = new SelectorMatcher();
                matcher.addSelectables(CssSelector.parse(selector));
            }
            const /** @type {?} */ cssSelector = new CssSelector();
            cssSelector.setElement(this.tagName(node));
            if (node.attribs) {
                for (const /** @type {?} */ attrName in node.attribs) {
                    cssSelector.addAttribute(attrName, node.attribs[attrName]);
                }
            }
            const /** @type {?} */ classList = this.classList(node);
            for (let /** @type {?} */ i = 0; i < classList.length; i++) {
                cssSelector.addClassName(classList[i]);
            }
            matcher.match(cssSelector, function (selector, cb) { result = true; });
        }
        return result;
    }
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    on(el, evt, listener) {
        let /** @type {?} */ listenersMap = el._eventListenersMap;
        if (!listenersMap) {
            listenersMap = {};
            el._eventListenersMap = listenersMap;
        }
        const /** @type {?} */ listeners = listenersMap[evt] || [];
        listenersMap[evt] = [...listeners, listener];
    }
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    onAndCancel(el, evt, listener) {
        this.on(el, evt, listener);
        return () => { ListWrapper.remove(/** @type {?} */ ((el._eventListenersMap[evt])), listener); };
    }
    /**
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */
    dispatchEvent(el, evt) {
        if (!evt.target) {
            evt.target = el;
        }
        if (el._eventListenersMap) {
            const /** @type {?} */ listeners = el._eventListenersMap[evt.type];
            if (listeners) {
                for (let /** @type {?} */ i = 0; i < listeners.length; i++) {
                    listeners[i](evt);
                }
            }
        }
        if (el.parent) {
            this.dispatchEvent(el.parent, evt);
        }
        if (el._window) {
            this.dispatchEvent(el._window, evt);
        }
    }
    /**
     * @param {?} eventType
     * @return {?}
     */
    createMouseEvent(eventType) { return this.createEvent(eventType); }
    /**
     * @param {?} eventType
     * @return {?}
     */
    createEvent(eventType) {
        const /** @type {?} */ event = ({
            type: eventType,
            defaultPrevented: false,
            preventDefault: () => { ((event)).defaultPrevented = true; }
        });
        return event;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    preventDefault(event) { event.returnValue = false; }
    /**
     * @param {?} event
     * @return {?}
     */
    isPrevented(event) { return isPresent(event.returnValue) && !event.returnValue; }
    /**
     * @param {?} el
     * @return {?}
     */
    getInnerHTML(el) {
        return parse5.serialize(this.templateAwareRoot(el), { treeAdapter });
    }
    /**
     * @param {?} el
     * @return {?}
     */
    getTemplateContent(el) { return null; }
    /**
     * @param {?} el
     * @return {?}
     */
    getOuterHTML(el) {
        const /** @type {?} */ fragment = treeAdapter.createDocumentFragment();
        this.appendChild(fragment, el);
        return parse5.serialize(fragment, { treeAdapter });
    }
    /**
     * @param {?} node
     * @return {?}
     */
    nodeName(node) { return node.tagName; }
    /**
     * @param {?} node
     * @return {?}
     */
    nodeValue(node) { return node.nodeValue; }
    /**
     * @param {?} node
     * @return {?}
     */
    type(node) { throw _notImplemented('type'); }
    /**
     * @param {?} node
     * @return {?}
     */
    content(node) { return node.childNodes[0]; }
    /**
     * @param {?} el
     * @return {?}
     */
    firstChild(el) { return el.firstChild; }
    /**
     * @param {?} el
     * @return {?}
     */
    nextSibling(el) { return el.nextSibling; }
    /**
     * @param {?} el
     * @return {?}
     */
    parentElement(el) { return el.parent; }
    /**
     * @param {?} el
     * @return {?}
     */
    childNodes(el) { return el.childNodes; }
    /**
     * @param {?} el
     * @return {?}
     */
    childNodesAsList(el) {
        const /** @type {?} */ childNodes = el.childNodes;
        const /** @type {?} */ res = new Array(childNodes.length);
        for (let /** @type {?} */ i = 0; i < childNodes.length; i++) {
            res[i] = childNodes[i];
        }
        return res;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    clearNodes(el) {
        while (el.childNodes.length > 0) {
            this.remove(el.childNodes[0]);
        }
    }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    appendChild(el, node) {
        this.remove(node);
        treeAdapter.appendChild(this.templateAwareRoot(el), node);
    }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    removeChild(el, node) {
        if (el.childNodes.indexOf(node) > -1) {
            this.remove(node);
        }
    }
    /**
     * @param {?} el
     * @return {?}
     */
    remove(el) {
        const /** @type {?} */ parent = el.parent;
        if (parent) {
            const /** @type {?} */ index = parent.childNodes.indexOf(el);
            parent.childNodes.splice(index, 1);
        }
        const /** @type {?} */ prev = el.previousSibling;
        const /** @type {?} */ next = el.nextSibling;
        if (prev) {
            prev.next = next;
        }
        if (next) {
            next.prev = prev;
        }
        el.prev = null;
        el.next = null;
        el.parent = null;
        return el;
    }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    insertBefore(el, node) {
        this.remove(node);
        treeAdapter.insertBefore(el.parent, node, el);
    }
    /**
     * @param {?} el
     * @param {?} nodes
     * @return {?}
     */
    insertAllBefore(el, nodes) { nodes.forEach((n) => this.insertBefore(el, n)); }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    insertAfter(el, node) {
        if (el.nextSibling) {
            this.insertBefore(el.nextSibling, node);
        }
        else {
            this.appendChild(el.parent, node);
        }
    }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setInnerHTML(el, value) {
        this.clearNodes(el);
        const /** @type {?} */ content = parse5.parseFragment(value, { treeAdapter });
        for (let /** @type {?} */ i = 0; i < content.childNodes.length; i++) {
            treeAdapter.appendChild(el, content.childNodes[i]);
        }
    }
    /**
     * @param {?} el
     * @param {?=} isRecursive
     * @return {?}
     */
    getText(el, isRecursive) {
        if (this.isTextNode(el)) {
            return el.data;
        }
        if (this.isCommentNode(el)) {
            // In the DOM, comments within an element return an empty string for textContent
            // However, comment node instances return the comment content for textContent getter
            return isRecursive ? '' : el.data;
        }
        if (!el.childNodes || el.childNodes.length == 0) {
            return '';
        }
        let /** @type {?} */ textContent = '';
        for (let /** @type {?} */ i = 0; i < el.childNodes.length; i++) {
            textContent += this.getText(el.childNodes[i], true);
        }
        return textContent;
    }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setText(el, value) {
        if (this.isTextNode(el) || this.isCommentNode(el)) {
            el.data = value;
        }
        else {
            this.clearNodes(el);
            if (value !== '')
                treeAdapter.insertText(el, value);
        }
    }
    /**
     * @param {?} el
     * @return {?}
     */
    getValue(el) { return el.value; }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setValue(el, value) { el.value = value; }
    /**
     * @param {?} el
     * @return {?}
     */
    getChecked(el) { return el.checked; }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setChecked(el, value) { el.checked = value; }
    /**
     * @param {?} text
     * @return {?}
     */
    createComment(text) { return treeAdapter.createCommentNode(text); }
    /**
     * @param {?} html
     * @return {?}
     */
    createTemplate(html) {
        const /** @type {?} */ template = treeAdapter.createElement('template', 'http://www.w3.org/1999/xhtml', []);
        const /** @type {?} */ content = parse5.parseFragment(html, { treeAdapter });
        treeAdapter.setTemplateContent(template, content);
        return template;
    }
    /**
     * @param {?} tagName
     * @return {?}
     */
    createElement(tagName) {
        return treeAdapter.createElement(tagName, 'http://www.w3.org/1999/xhtml', []);
    }
    /**
     * @param {?} ns
     * @param {?} tagName
     * @return {?}
     */
    createElementNS(ns, tagName) {
        return treeAdapter.createElement(tagName, ns, []);
    }
    /**
     * @param {?} text
     * @return {?}
     */
    createTextNode(text) {
        const /** @type {?} */ t = (this.createComment(text));
        t.type = 'text';
        return t;
    }
    /**
     * @param {?} attrName
     * @param {?} attrValue
     * @return {?}
     */
    createScriptTag(attrName, attrValue) {
        return treeAdapter.createElement('script', 'http://www.w3.org/1999/xhtml', [{ name: attrName, value: attrValue }]);
    }
    /**
     * @param {?} css
     * @return {?}
     */
    createStyleElement(css) {
        const /** @type {?} */ style = this.createElement('style');
        this.setText(style, css);
        return (style);
    }
    /**
     * @param {?} el
     * @return {?}
     */
    createShadowRoot(el) {
        el.shadowRoot = treeAdapter.createDocumentFragment();
        el.shadowRoot.parent = el;
        return el.shadowRoot;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    getShadowRoot(el) { return el.shadowRoot; }
    /**
     * @param {?} el
     * @return {?}
     */
    getHost(el) { return el.host; }
    /**
     * @param {?} el
     * @return {?}
     */
    getDistributedNodes(el) { throw _notImplemented('getDistributedNodes'); }
    /**
     * @param {?} node
     * @return {?}
     */
    clone(node) {
        const /** @type {?} */ _recursive = (node) => {
            const /** @type {?} */ nodeClone = Object.create(Object.getPrototypeOf(node));
            for (const /** @type {?} */ prop in node) {
                const /** @type {?} */ desc = Object.getOwnPropertyDescriptor(node, prop);
                if (desc && 'value' in desc && typeof desc.value !== 'object') {
                    nodeClone[prop] = node[prop];
                }
            }
            nodeClone.parent = null;
            nodeClone.prev = null;
            nodeClone.next = null;
            nodeClone.children = null;
            mapProps.forEach(mapName => {
                if (isPresent(node[mapName])) {
                    nodeClone[mapName] = {};
                    for (const /** @type {?} */ prop in node[mapName]) {
                        nodeClone[mapName][prop] = node[mapName][prop];
                    }
                }
            });
            const /** @type {?} */ cNodes = node.children;
            if (cNodes) {
                const /** @type {?} */ cNodesClone = new Array(cNodes.length);
                for (let /** @type {?} */ i = 0; i < cNodes.length; i++) {
                    const /** @type {?} */ childNode = cNodes[i];
                    const /** @type {?} */ childNodeClone = _recursive(childNode);
                    cNodesClone[i] = childNodeClone;
                    if (i > 0) {
                        childNodeClone.prev = cNodesClone[i - 1];
                        cNodesClone[i - 1].next = childNodeClone;
                    }
                    childNodeClone.parent = nodeClone;
                }
                nodeClone.children = cNodesClone;
            }
            return nodeClone;
        };
        return _recursive(node);
    }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getElementsByClassName(element, name) {
        return this.querySelectorAll(element, '.' + name);
    }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getElementsByTagName(element, name) {
        throw _notImplemented('getElementsByTagName');
    }
    /**
     * @param {?} element
     * @return {?}
     */
    classList(element) {
        let /** @type {?} */ classAttrValue = null;
        const /** @type {?} */ attributes = element.attribs;
        if (attributes && attributes.hasOwnProperty('class')) {
            classAttrValue = attributes['class'];
        }
        return classAttrValue ? classAttrValue.trim().split(/\s+/g) : [];
    }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    addClass(element, className) {
        const /** @type {?} */ classList = this.classList(element);
        const /** @type {?} */ index = classList.indexOf(className);
        if (index == -1) {
            classList.push(className);
            element.attribs['class'] = element.className = classList.join(' ');
        }
    }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    removeClass(element, className) {
        const /** @type {?} */ classList = this.classList(element);
        const /** @type {?} */ index = classList.indexOf(className);
        if (index > -1) {
            classList.splice(index, 1);
            element.attribs['class'] = element.className = classList.join(' ');
        }
    }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    hasClass(element, className) {
        return this.classList(element).indexOf(className) > -1;
    }
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */
    hasStyle(element, styleName, styleValue = null) {
        const /** @type {?} */ value = this.getStyle(element, styleName) || '';
        return styleValue ? value == styleValue : value.length > 0;
    }
    /**
     * \@internal
     * @param {?} element
     * @return {?}
     */
    _readStyleAttribute(element) {
        const /** @type {?} */ styleMap = {};
        const /** @type {?} */ attributes = element.attribs;
        if (attributes && attributes.hasOwnProperty('style')) {
            const /** @type {?} */ styleAttrValue = attributes['style'];
            const /** @type {?} */ styleList = styleAttrValue.split(/;+/g);
            for (let /** @type {?} */ i = 0; i < styleList.length; i++) {
                if (styleList[i].length > 0) {
                    const /** @type {?} */ elems = styleList[i].split(/:+/g);
                    ((styleMap))[elems[0].trim()] = elems[1].trim();
                }
            }
        }
        return styleMap;
    }
    /**
     * \@internal
     * @param {?} element
     * @param {?} styleMap
     * @return {?}
     */
    _writeStyleAttribute(element, styleMap) {
        let /** @type {?} */ styleAttrValue = '';
        for (const /** @type {?} */ key in styleMap) {
            const /** @type {?} */ newValue = styleMap[key];
            if (newValue) {
                styleAttrValue += key + ':' + styleMap[key] + ';';
            }
        }
        element.attribs['style'] = styleAttrValue;
    }
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    setStyle(element, styleName, styleValue) {
        const /** @type {?} */ styleMap = this._readStyleAttribute(element);
        ((styleMap))[styleName] = styleValue;
        this._writeStyleAttribute(element, styleMap);
    }
    /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    removeStyle(element, styleName) { this.setStyle(element, styleName, null); }
    /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    getStyle(element, styleName) {
        const /** @type {?} */ styleMap = this._readStyleAttribute(element);
        return styleMap.hasOwnProperty(styleName) ? ((styleMap))[styleName] : '';
    }
    /**
     * @param {?} element
     * @return {?}
     */
    tagName(element) { return element.tagName == 'style' ? 'STYLE' : element.tagName; }
    /**
     * @param {?} element
     * @return {?}
     */
    attributeMap(element) {
        const /** @type {?} */ res = new Map();
        const /** @type {?} */ elAttrs = treeAdapter.getAttrList(element);
        for (let /** @type {?} */ i = 0; i < elAttrs.length; i++) {
            const /** @type {?} */ attrib = elAttrs[i];
            res.set(attrib.name, attrib.value);
        }
        return res;
    }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    hasAttribute(element, attribute) {
        return element.attribs && element.attribs.hasOwnProperty(attribute);
    }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    hasAttributeNS(element, ns, attribute) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    getAttribute(element, attribute) {
        return element.attribs && element.attribs.hasOwnProperty(attribute) ?
            element.attribs[attribute] :
            null;
    }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    getAttributeNS(element, ns, attribute) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} attribute
     * @param {?} value
     * @return {?}
     */
    setAttribute(element, attribute, value) {
        if (attribute) {
            element.attribs[attribute] = value;
            if (attribute === 'class') {
                element.className = value;
            }
        }
    }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @param {?} value
     * @return {?}
     */
    setAttributeNS(element, ns, attribute, value) {
        throw 'not implemented';
    }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    removeAttribute(element, attribute) {
        if (attribute) {
            delete element.attribs[attribute];
        }
    }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @return {?}
     */
    removeAttributeNS(element, ns, name) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    templateAwareRoot(el) {
        return this.isTemplateElement(el) ? treeAdapter.getTemplateContent(el) : el;
    }
    /**
     * @return {?}
     */
    createHtmlDocument() {
        const /** @type {?} */ newDoc = treeAdapter.createDocument();
        newDoc.title = 'fakeTitle';
        const /** @type {?} */ head = treeAdapter.createElement('head', null, []);
        const /** @type {?} */ body = treeAdapter.createElement('body', 'http://www.w3.org/1999/xhtml', []);
        this.appendChild(newDoc, head);
        this.appendChild(newDoc, body);
        newDoc['head'] = head;
        newDoc['body'] = body;
        newDoc['_window'] = {};
        return newDoc;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    getBoundingClientRect(el) { return { left: 0, top: 0, width: 0, height: 0 }; }
    /**
     * @param {?} doc
     * @return {?}
     */
    getTitle(doc) { return doc.title || ''; }
    /**
     * @param {?} doc
     * @param {?} newTitle
     * @return {?}
     */
    setTitle(doc, newTitle) { doc.title = newTitle; }
    /**
     * @param {?} el
     * @return {?}
     */
    isTemplateElement(el) {
        return this.isElementNode(el) && this.tagName(el) === 'template';
    }
    /**
     * @param {?} node
     * @return {?}
     */
    isTextNode(node) { return treeAdapter.isTextNode(node); }
    /**
     * @param {?} node
     * @return {?}
     */
    isCommentNode(node) { return treeAdapter.isCommentNode(node); }
    /**
     * @param {?} node
     * @return {?}
     */
    isElementNode(node) { return node ? treeAdapter.isElementNode(node) : false; }
    /**
     * @param {?} node
     * @return {?}
     */
    hasShadowRoot(node) { return isPresent(node.shadowRoot); }
    /**
     * @param {?} node
     * @return {?}
     */
    isShadowRoot(node) { return this.getShadowRoot(node) == node; }
    /**
     * @param {?} node
     * @return {?}
     */
    importIntoDoc(node) { return this.clone(node); }
    /**
     * @param {?} node
     * @return {?}
     */
    adoptNode(node) { return node; }
    /**
     * @param {?} el
     * @return {?}
     */
    getHref(el) { return el.href; }
    /**
     * @param {?} el
     * @param {?} baseUrl
     * @param {?} href
     * @return {?}
     */
    resolveAndSetHref(el, baseUrl, href) {
        if (href == null) {
            el.href = baseUrl;
        }
        else {
            el.href = baseUrl + '/../' + href;
        }
    }
    /**
     * \@internal
     * @param {?} parsedRules
     * @param {?=} css
     * @return {?}
     */
    _buildRules(parsedRules, css) {
        const /** @type {?} */ rules = [];
        for (let /** @type {?} */ i = 0; i < parsedRules.length; i++) {
            const /** @type {?} */ parsedRule = parsedRules[i];
            const /** @type {?} */ rule = {};
            rule['cssText'] = css;
            rule['style'] = { content: '', cssText: '' };
            if (parsedRule.type == 'rule') {
                rule['type'] = 1;
                rule['selectorText'] =
                    parsedRule.selectors.join(', '.replace(/\s{2,}/g, ' ')
                        .replace(/\s*~\s*/g, ' ~ ')
                        .replace(/\s*\+\s*/g, ' + ')
                        .replace(/\s*>\s*/g, ' > ')
                        .replace(/\[(\w+)=(\w+)\]/g, '[$1="$2"]'));
                if (isBlank(parsedRule.declarations)) {
                    continue;
                }
                for (let /** @type {?} */ j = 0; j < parsedRule.declarations.length; j++) {
                    const /** @type {?} */ declaration = parsedRule.declarations[j];
                    rule['style'] = declaration.property[declaration.value];
                    rule['style'].cssText += declaration.property + ': ' + declaration.value + ';';
                }
            }
            else if (parsedRule.type == 'media') {
                rule['type'] = 4;
                rule['media'] = { mediaText: parsedRule.media };
                if (parsedRule.rules) {
                    rule['cssRules'] = this._buildRules(parsedRule.rules);
                }
            }
            rules.push(rule);
        }
        return rules;
    }
    /**
     * @return {?}
     */
    supportsDOMEvents() { return false; }
    /**
     * @return {?}
     */
    supportsNativeShadowDOM() { return false; }
    /**
     * @param {?} doc
     * @param {?} target
     * @return {?}
     */
    getGlobalEventTarget(doc, target) {
        if (target == 'window') {
            return ((doc))._window;
        }
        else if (target == 'document') {
            return doc;
        }
        else if (target == 'body') {
            return doc.body;
        }
    }
    /**
     * @param {?} doc
     * @return {?}
     */
    getBaseHref(doc) {
        const /** @type {?} */ base = this.querySelector(doc, 'base');
        let /** @type {?} */ href = '';
        if (base) {
            href = this.getHref(base);
        }
        // TODO(alxhub): Need relative path logic from BrowserDomAdapter here?
        return isBlank(href) ? null : href;
    }
    /**
     * @return {?}
     */
    resetBaseElement() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    getHistory() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    getLocation() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    getUserAgent() { return 'Fake user agent'; }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    getData(el, name) { return this.getAttribute(el, 'data-' + name); }
    /**
     * @param {?} el
     * @return {?}
     */
    getComputedStyle(el) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setData(el, name, value) { this.setAttribute(el, 'data-' + name, value); }
    /**
     * @param {?} path
     * @param {?} value
     * @return {?}
     */
    setGlobalVar(path, value) { setValueOnPath(global, path, value); }
    /**
     * @return {?}
     */
    supportsWebAnimation() { return false; }
    /**
     * @return {?}
     */
    performanceNow() { return Date.now(); }
    /**
     * @return {?}
     */
    getAnimationPrefix() { return ''; }
    /**
     * @return {?}
     */
    getTransitionEnd() { return 'transitionend'; }
    /**
     * @return {?}
     */
    supportsAnimation() { return true; }
    /**
     * @param {?} el
     * @param {?} newNode
     * @param {?} oldNode
     * @return {?}
     */
    replaceChild(el, newNode, oldNode) { throw new Error('not implemented'); }
    /**
     * @param {?} templateHtml
     * @return {?}
     */
    parse(templateHtml) { throw new Error('not implemented'); }
    /**
     * @param {?} el
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    invoke(el, methodName, args) { throw new Error('not implemented'); }
    /**
     * @param {?} event
     * @return {?}
     */
    getEventKey(event) { throw new Error('not implemented'); }
    /**
     * @return {?}
     */
    supportsCookies() { return false; }
    /**
     * @param {?} name
     * @return {?}
     */
    getCookie(name) { throw new Error('not implemented'); }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setCookie(name, value) { throw new Error('not implemented'); }
    /**
     * @param {?} element
     * @param {?} keyframes
     * @param {?} options
     * @return {?}
     */
    animate(element, keyframes, options) { throw new Error('not implemented'); }
}
// TODO: build a proper list, this one is all the keys of a HTMLInputElement
const /** @type {?} */ _HTMLElementPropertyList = [
    'webkitEntries',
    'incremental',
    'webkitdirectory',
    'selectionDirection',
    'selectionEnd',
    'selectionStart',
    'labels',
    'validationMessage',
    'validity',
    'willValidate',
    'width',
    'valueAsNumber',
    'valueAsDate',
    'value',
    'useMap',
    'defaultValue',
    'type',
    'step',
    'src',
    'size',
    'required',
    'readOnly',
    'placeholder',
    'pattern',
    'name',
    'multiple',
    'min',
    'minLength',
    'maxLength',
    'max',
    'list',
    'indeterminate',
    'height',
    'formTarget',
    'formNoValidate',
    'formMethod',
    'formEnctype',
    'formAction',
    'files',
    'form',
    'disabled',
    'dirName',
    'checked',
    'defaultChecked',
    'autofocus',
    'autocomplete',
    'alt',
    'align',
    'accept',
    'onautocompleteerror',
    'onautocomplete',
    'onwaiting',
    'onvolumechange',
    'ontoggle',
    'ontimeupdate',
    'onsuspend',
    'onsubmit',
    'onstalled',
    'onshow',
    'onselect',
    'onseeking',
    'onseeked',
    'onscroll',
    'onresize',
    'onreset',
    'onratechange',
    'onprogress',
    'onplaying',
    'onplay',
    'onpause',
    'onmousewheel',
    'onmouseup',
    'onmouseover',
    'onmouseout',
    'onmousemove',
    'onmouseleave',
    'onmouseenter',
    'onmousedown',
    'onloadstart',
    'onloadedmetadata',
    'onloadeddata',
    'onload',
    'onkeyup',
    'onkeypress',
    'onkeydown',
    'oninvalid',
    'oninput',
    'onfocus',
    'onerror',
    'onended',
    'onemptied',
    'ondurationchange',
    'ondrop',
    'ondragstart',
    'ondragover',
    'ondragleave',
    'ondragenter',
    'ondragend',
    'ondrag',
    'ondblclick',
    'oncuechange',
    'oncontextmenu',
    'onclose',
    'onclick',
    'onchange',
    'oncanplaythrough',
    'oncanplay',
    'oncancel',
    'onblur',
    'onabort',
    'spellcheck',
    'isContentEditable',
    'contentEditable',
    'outerText',
    'innerText',
    'accessKey',
    'hidden',
    'webkitdropzone',
    'draggable',
    'tabIndex',
    'dir',
    'translate',
    'lang',
    'title',
    'childElementCount',
    'lastElementChild',
    'firstElementChild',
    'children',
    'onwebkitfullscreenerror',
    'onwebkitfullscreenchange',
    'nextElementSibling',
    'previousElementSibling',
    'onwheel',
    'onselectstart',
    'onsearch',
    'onpaste',
    'oncut',
    'oncopy',
    'onbeforepaste',
    'onbeforecut',
    'onbeforecopy',
    'shadowRoot',
    'dataset',
    'classList',
    'className',
    'outerHTML',
    'innerHTML',
    'scrollHeight',
    'scrollWidth',
    'scrollTop',
    'scrollLeft',
    'clientHeight',
    'clientWidth',
    'clientTop',
    'clientLeft',
    'offsetParent',
    'offsetHeight',
    'offsetWidth',
    'offsetTop',
    'offsetLeft',
    'localName',
    'prefix',
    'namespaceURI',
    'id',
    'style',
    'attributes',
    'tagName',
    'parentElement',
    'textContent',
    'baseURI',
    'ownerDocument',
    'nextSibling',
    'previousSibling',
    'lastChild',
    'firstChild',
    'childNodes',
    'parentNode',
    'nodeType',
    'nodeValue',
    'nodeName',
    'closure_lm_714617',
    '__jsaction',
];
//# sourceMappingURL=parse5_adapter.js.map