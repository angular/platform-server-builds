import { TransferState } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare function serializeTransferStateFactory(doc: Document, appId: string, transferStore: TransferState): () => void;
/**
 * NgModule to install on the server side while using the `TransferState` to transfer state from
 * server to client.
 *
 * @publicApi
 */
export declare class ServerTransferStateModule {
    static ngModuleDef: i0.ɵɵNgModuleDefWithMeta<ServerTransferStateModule, never, never, never>;
    static ngInjectorDef: i0.ɵɵInjectorDef<ServerTransferStateModule>;
}
