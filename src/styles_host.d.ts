/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ApplicationRef } from '@angular/core';
import { SharedStylesHost } from './private_import_platform-browser';
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
