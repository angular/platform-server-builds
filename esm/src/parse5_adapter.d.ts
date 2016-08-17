import { DomAdapter } from '../platform_browser_private';
import { Type } from '@angular/core';
import { ResourceLoader } from '@angular/compiler';
/**
 * A `DomAdapter` powered by the `parse5` NodeJS module.
 *
 * @security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 */
export declare class Parse5DomAdapter extends DomAdapter {
    static makeCurrent(): void;
    hasProperty(element: any, name: string): boolean;
    setProperty(el: any, name: string, value: any): void;
    getProperty(el: any, name: string): any;
    logError(error: any): void;
    log(error: any): void;
    logGroup(error: any): void;
    logGroupEnd(): void;
    getResourceLoader(): Type<ResourceLoader>;
    readonly attrToPropMap: {
        [key: string]: string;
    };
    query(selector: any): void;
    querySelector(el: any, selector: string): any;
    querySelectorAll(el: any, selector: string): any[];
    elementMatches(node: any, selector: string, matcher?: any): boolean;
    on(el: any, evt: any, listener: any): void;
    onAndCancel(el: any, evt: any, listener: any): Function;
    dispatchEvent(el: any, evt: any): void;
    createMouseEvent(eventType: any): Event;
    createEvent(eventType: string): Event;
    preventDefault(evt: any): void;
    isPrevented(evt: any): boolean;
    getInnerHTML(el: any): string;
    getTemplateContent(el: any): Node;
    getOuterHTML(el: any): string;
    nodeName(node: any): string;
    nodeValue(node: any): string;
    type(node: any): string;
    content(node: any): string;
    firstChild(el: any): Node;
    nextSibling(el: any): Node;
    parentElement(el: any): Node;
    childNodes(el: any): Node[];
    childNodesAsList(el: any): any[];
    clearNodes(el: any): void;
    appendChild(el: any, node: any): void;
    removeChild(el: any, node: any): void;
    remove(el: any): HTMLElement;
    insertBefore(el: any, node: any): void;
    insertAllBefore(el: any, nodes: any): void;
    insertAfter(el: any, node: any): void;
    setInnerHTML(el: any, value: any): void;
    getText(el: any, isRecursive?: boolean): string;
    setText(el: any, value: string): void;
    getValue(el: any): string;
    setValue(el: any, value: string): void;
    getChecked(el: any): boolean;
    setChecked(el: any, value: boolean): void;
    createComment(text: string): Comment;
    createTemplate(html: any): HTMLElement;
    createElement(tagName: any): HTMLElement;
    createElementNS(ns: any, tagName: any): HTMLElement;
    createTextNode(text: string): Text;
    createScriptTag(attrName: string, attrValue: string): HTMLElement;
    createStyleElement(css: string): HTMLStyleElement;
    createShadowRoot(el: any): HTMLElement;
    getShadowRoot(el: any): Element;
    getHost(el: any): string;
    getDistributedNodes(el: any): Node[];
    clone(node: Node): Node;
    getElementsByClassName(element: any, name: string): HTMLElement[];
    getElementsByTagName(element: any, name: string): HTMLElement[];
    classList(element: any): string[];
    addClass(element: any, className: string): void;
    removeClass(element: any, className: string): void;
    hasClass(element: any, className: string): boolean;
    hasStyle(element: any, styleName: string, styleValue?: string): boolean;
    setStyle(element: any, styleName: string, styleValue: string): void;
    removeStyle(element: any, styleName: string): void;
    getStyle(element: any, styleName: string): string;
    tagName(element: any): string;
    attributeMap(element: any): Map<string, string>;
    hasAttribute(element: any, attribute: string): boolean;
    hasAttributeNS(element: any, ns: string, attribute: string): boolean;
    getAttribute(element: any, attribute: string): string;
    getAttributeNS(element: any, ns: string, attribute: string): string;
    setAttribute(element: any, attribute: string, value: string): void;
    setAttributeNS(element: any, ns: string, attribute: string, value: string): void;
    removeAttribute(element: any, attribute: string): void;
    removeAttributeNS(element: any, ns: string, name: string): void;
    templateAwareRoot(el: any): any;
    createHtmlDocument(): Document;
    defaultDoc(): Document;
    getBoundingClientRect(el: any): any;
    getTitle(): string;
    setTitle(newTitle: string): void;
    isTemplateElement(el: any): boolean;
    isTextNode(node: any): boolean;
    isCommentNode(node: any): boolean;
    isElementNode(node: any): boolean;
    hasShadowRoot(node: any): boolean;
    isShadowRoot(node: any): boolean;
    importIntoDoc(node: any): any;
    adoptNode(node: any): any;
    getHref(el: any): string;
    resolveAndSetHref(el: any, baseUrl: string, href: string): void;
    supportsDOMEvents(): boolean;
    supportsNativeShadowDOM(): boolean;
    getGlobalEventTarget(target: string): any;
    getBaseHref(): string;
    resetBaseElement(): void;
    getHistory(): History;
    getLocation(): Location;
    getUserAgent(): string;
    getData(el: any, name: string): string;
    getComputedStyle(el: any): any;
    setData(el: any, name: string, value: string): void;
    setGlobalVar(path: string, value: any): void;
    requestAnimationFrame(callback: any): number;
    cancelAnimationFrame(id: number): void;
    supportsWebAnimation(): boolean;
    performanceNow(): number;
    getAnimationPrefix(): string;
    getTransitionEnd(): string;
    supportsAnimation(): boolean;
    replaceChild(el: any, newNode: any, oldNode: any): void;
    parse(templateHtml: string): void;
    invoke(el: Element, methodName: string, args: any[]): any;
    getEventKey(event: any): string;
    supportsCookies(): boolean;
    getCookie(name: string): string;
    setCookie(name: string, value: string): void;
    animate(element: any, keyframes: any[], options: any): any;
}
