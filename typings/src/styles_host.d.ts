/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ApplicationRef } from '@angular/core';
import { ɵSharedStylesHost as SharedStylesHost } from '@angular/platform-browser';
export declare class ServerStylesHost extends SharedStylesHost {
    private doc;
    private appRef;
    private root;
    private buffer;
    constructor(doc: any, appRef: ApplicationRef);
    private _addStyle(style);
    onStylesAdded(additions: Set<string>): void;
    rootComponentIsReady(): void;
}
