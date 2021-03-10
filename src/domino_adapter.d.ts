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
    readonly supportsDOMEvents = false;
    private static defaultDoc;
    createHtmlDocument(): HTMLDocument;
    getDefaultDocument(): Document;
    isElementNode(node: any): boolean;
    isShadowRoot(node: any): boolean;
    getGlobalEventTarget(doc: Document, target: string): EventTarget | null;
    getBaseHref(doc: Document): string;
    dispatchEvent(el: Node, evt: any): void;
    getUserAgent(): string;
    getCookie(name: string): string;
}
