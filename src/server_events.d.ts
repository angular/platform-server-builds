import * as i0 from "@angular/core";
export declare class ServerEventManagerPlugin {
    private doc;
    constructor(doc: any);
    supports(eventName: string): boolean;
    addEventListener(element: HTMLElement, eventName: string, handler: Function): Function;
    addGlobalEventListener(element: string, eventName: string, handler: Function): Function;
    static ɵfac: i0.ɵɵFactoryDeclaration<ServerEventManagerPlugin, never>;
    static ɵprov: i0.ɵɵInjectableDef<ServerEventManagerPlugin>;
}
