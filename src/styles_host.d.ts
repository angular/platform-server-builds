import { ɵSharedStylesHost as SharedStylesHost } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare class ServerStylesHost extends SharedStylesHost {
    private doc;
    private transitionId;
    private head;
    private _styleNodes;
    constructor(doc: any, transitionId: string);
    private _addStyle;
    onStylesAdded(additions: Set<string>): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ServerStylesHost, [null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ServerStylesHost>;
}
