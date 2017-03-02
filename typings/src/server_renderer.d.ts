import { NgZone, RendererFactoryV2, RendererTypeV2, RendererV2 } from '@angular/core';
import { ɵSharedStylesHost as SharedStylesHost } from '@angular/platform-browser';
export declare class ServerRendererFactoryV2 implements RendererFactoryV2 {
    private ngZone;
    private document;
    private sharedStylesHost;
    private rendererByCompId;
    private defaultRenderer;
    private schema;
    constructor(ngZone: NgZone, document: any, sharedStylesHost: SharedStylesHost);
    createRenderer(element: any, type: RendererTypeV2): RendererV2;
}
