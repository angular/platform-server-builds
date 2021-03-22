import { NgZone, Renderer2, RendererFactory2, RendererType2 } from '@angular/core';
import { EventManager, ɵSharedStylesHost as SharedStylesHost } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare class ServerRendererFactory2 implements RendererFactory2 {
    private eventManager;
    private ngZone;
    private document;
    private sharedStylesHost;
    private rendererByCompId;
    private defaultRenderer;
    private schema;
    constructor(eventManager: EventManager, ngZone: NgZone, document: any, sharedStylesHost: SharedStylesHost);
    createRenderer(element: any, type: RendererType2 | null): Renderer2;
    begin(): void;
    end(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ServerRendererFactory2, never>;
    static ɵprov: i0.ɵɵInjectableDef<ServerRendererFactory2>;
}
