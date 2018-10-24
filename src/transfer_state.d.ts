import * as i0 from '@angular/core';
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { TransferState } from '@angular/platform-browser';
export declare function serializeTransferStateFactory(doc: Document, appId: string, transferStore: TransferState): () => void;
/**
 * NgModule to install on the server side while using the `TransferState` to transfer state from
 * server to client.
 *
 * @publicApi
 */
export declare class ServerTransferStateModule {
    static ngModuleDef: i0.ɵNgModuleDefWithMeta<ServerTransferStateModule, never, never, never>;
    static ngInjectorDef: i0.ɵInjectorDef<ServerTransferStateModule>;
}
