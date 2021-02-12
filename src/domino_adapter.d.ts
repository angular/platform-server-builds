import { ɵBrowserDomAdapter as BrowserDomAdapter } from '@angular/platform-browser';
export declare function setDomTypes(): void;
/**
 * Parses a document string to a Document object.
 */
export declare function parseDocument(html: string, url?: string): any;
/**
 * Serializes a document to string.
 */
export declare function serializeDocument(doc: Document): string;
/**
 * DOM Adapter for the server platform based on https://github.com/fgnass/domino.
 */
export declare class DominoAdapter extends BrowserDomAdapter {
    static makeCurrent(): void;
    private static defaultDoc;
    log(error: string): void;
    logGroup(error: string): void;
    logGroupEnd(): void;
    supportsDOMEvents(): boolean;
    createHtmlDocument(): HTMLDocument;
    getDefaultDocument(): Document;
    isElementNode(node: any): boolean;
    isShadowRoot(node: any): boolean;
    getProperty(el: Element, name: string): any;
    getGlobalEventTarget(doc: Document, target: string): EventTarget | null;
    getBaseHref(doc: Document): string;
    dispatchEvent(el: Node, evt: any): void;
    getHistory(): History;
    getLocation(): Location;
    getUserAgent(): string;
    performanceNow(): number;
    supportsCookies(): boolean;
    getCookie(name: string): string;
}
