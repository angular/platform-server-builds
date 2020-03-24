/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { LocationChangeListener, PlatformLocation } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * Server-side implementation of URL state. Implements `pathname`, `search`, and `hash`
 * but not the state stack.
 */
export declare class ServerPlatformLocation implements PlatformLocation {
    private _doc;
    readonly href: string;
    readonly hostname: string;
    readonly protocol: string;
    readonly port: string;
    readonly pathname: string;
    readonly search: string;
    readonly hash: string;
    private _hashUpdate;
    constructor(_doc: any, _config: any);
    getBaseHrefFromDOM(): string;
    onPopState(fn: LocationChangeListener): void;
    onHashChange(fn: LocationChangeListener): void;
    get url(): string;
    private setHash;
    replaceState(state: any, title: string, newUrl: string): void;
    pushState(state: any, title: string, newUrl: string): void;
    forward(): void;
    back(): void;
    getState(): unknown;
    static ɵfac: i0.ɵɵFactoryDef<ServerPlatformLocation, [null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDef<ServerPlatformLocation>;
}
export declare function scheduleMicroTask(fn: Function): void;
