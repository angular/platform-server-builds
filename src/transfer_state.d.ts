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
    static ɵfac: i0.ɵɵFactoryDef<ServerTransferStateModule, never>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<ServerTransferStateModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDef<ServerTransferStateModule>;
}
