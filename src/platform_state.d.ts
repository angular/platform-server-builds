import * as i0 from "@angular/core";
/**
 * Representation of the current platform state.
 *
 * @publicApi
 */
export declare class PlatformState {
    private _doc;
    constructor(_doc: any);
    /**
     * Renders the current state of the platform to string.
     */
    renderToString(): string;
    /**
     * Returns the current DOM state.
     */
    getDocument(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<PlatformState, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PlatformState>;
}
