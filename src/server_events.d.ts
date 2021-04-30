import * as i0 from "@angular/core";
export declare class ServerEventManagerPlugin {
    private doc;
    constructor(doc: any);
    supports(eventName: string): boolean;
    addEventListener(element: HTMLElement, eventName: string, handler: Function): Function;
    /** @deprecated No longer being used in Ivy code. To be removed in version 14. */
    addGlobalEventListener(element: string, eventName: string, handler: Function): Function;
    static ɵfac: i0.ɵɵFactoryDeclaration<ServerEventManagerPlugin, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ServerEventManagerPlugin>;
}
