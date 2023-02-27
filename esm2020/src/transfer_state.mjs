/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { APP_ID, NgModule, ɵescapeTransferStateContent as escapeTransferStateContent } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { BEFORE_APP_SERIALIZED } from './tokens';
import * as i0 from "@angular/core";
export const TRANSFER_STATE_SERIALIZATION_PROVIDERS = [{
        provide: BEFORE_APP_SERIALIZED,
        useFactory: serializeTransferStateFactory,
        deps: [DOCUMENT, APP_ID, TransferState],
        multi: true,
    }];
function serializeTransferStateFactory(doc, appId, transferStore) {
    return () => {
        // The `.toJSON` here causes the `onSerialize` callbacks to be called.
        // These callbacks can be used to provide the value for a given key.
        const content = transferStore.toJson();
        if (transferStore.isEmpty) {
            // The state is empty, nothing to transfer,
            // avoid creating an extra `<script>` tag in this case.
            return;
        }
        const script = doc.createElement('script');
        script.id = appId + '-state';
        script.setAttribute('type', 'application/json');
        script.textContent = escapeTransferStateContent(content);
        // It is intentional that we add the script at the very bottom. Angular CLI script tags for
        // bundles are always `type="module"`. These are deferred by default and cause the transfer
        // transfer data to be queried only after the browser has finished parsing the DOM.
        doc.body.appendChild(script);
    };
}
/**
 * NgModule to install on the server side while using the `TransferState` to transfer state from
 * server to client.
 *
 * Note: this module is not needed if the `renderApplication` function is used.
 * The `renderApplication` makes all providers from this module available in the application.
 *
 * @publicApi
 * @deprecated no longer needed, you can inject the `TransferState` in an app without providing
 *     this module.
 */
export class ServerTransferStateModule {
}
ServerTransferStateModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.0+sha-ca6ea0d", ngImport: i0, type: ServerTransferStateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ServerTransferStateModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.0-next.0+sha-ca6ea0d", ngImport: i0, type: ServerTransferStateModule });
ServerTransferStateModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.0-next.0+sha-ca6ea0d", ngImport: i0, type: ServerTransferStateModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.0+sha-ca6ea0d", ngImport: i0, type: ServerTransferStateModule, decorators: [{
            type: NgModule,
            args: [{}]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXJfc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3RyYW5zZmVyX3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBWSwyQkFBMkIsSUFBSSwwQkFBMEIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNwSCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFFeEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sVUFBVSxDQUFDOztBQUUvQyxNQUFNLENBQUMsTUFBTSxzQ0FBc0MsR0FBZSxDQUFDO1FBQ2pFLE9BQU8sRUFBRSxxQkFBcUI7UUFDOUIsVUFBVSxFQUFFLDZCQUE2QjtRQUN6QyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQztRQUN2QyxLQUFLLEVBQUUsSUFBSTtLQUNaLENBQUMsQ0FBQztBQUVILFNBQVMsNkJBQTZCLENBQUMsR0FBYSxFQUFFLEtBQWEsRUFBRSxhQUE0QjtJQUMvRixPQUFPLEdBQUcsRUFBRTtRQUNWLHNFQUFzRTtRQUN0RSxvRUFBb0U7UUFDcEUsTUFBTSxPQUFPLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRXZDLElBQUksYUFBYSxDQUFDLE9BQU8sRUFBRTtZQUN6QiwyQ0FBMkM7WUFDM0MsdURBQXVEO1lBQ3ZELE9BQU87U0FDUjtRQUVELE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLEVBQUUsR0FBRyxLQUFLLEdBQUcsUUFBUSxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDaEQsTUFBTSxDQUFDLFdBQVcsR0FBRywwQkFBMEIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV6RCwyRkFBMkY7UUFDM0YsMkZBQTJGO1FBQzNGLG1GQUFtRjtRQUNuRixHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQ7Ozs7Ozs7Ozs7R0FVRztBQUVILE1BQU0sT0FBTyx5QkFBeUI7O2lJQUF6Qix5QkFBeUI7a0lBQXpCLHlCQUF5QjtrSUFBekIseUJBQXlCO3NHQUF6Qix5QkFBeUI7a0JBRHJDLFFBQVE7bUJBQUMsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtBUFBfSUQsIE5nTW9kdWxlLCBQcm92aWRlciwgybVlc2NhcGVUcmFuc2ZlclN0YXRlQ29udGVudCBhcyBlc2NhcGVUcmFuc2ZlclN0YXRlQ29udGVudH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1RyYW5zZmVyU3RhdGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQge0JFRk9SRV9BUFBfU0VSSUFMSVpFRH0gZnJvbSAnLi90b2tlbnMnO1xuXG5leHBvcnQgY29uc3QgVFJBTlNGRVJfU1RBVEVfU0VSSUFMSVpBVElPTl9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbe1xuICBwcm92aWRlOiBCRUZPUkVfQVBQX1NFUklBTElaRUQsXG4gIHVzZUZhY3Rvcnk6IHNlcmlhbGl6ZVRyYW5zZmVyU3RhdGVGYWN0b3J5LFxuICBkZXBzOiBbRE9DVU1FTlQsIEFQUF9JRCwgVHJhbnNmZXJTdGF0ZV0sXG4gIG11bHRpOiB0cnVlLFxufV07XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZVRyYW5zZmVyU3RhdGVGYWN0b3J5KGRvYzogRG9jdW1lbnQsIGFwcElkOiBzdHJpbmcsIHRyYW5zZmVyU3RvcmU6IFRyYW5zZmVyU3RhdGUpIHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICAvLyBUaGUgYC50b0pTT05gIGhlcmUgY2F1c2VzIHRoZSBgb25TZXJpYWxpemVgIGNhbGxiYWNrcyB0byBiZSBjYWxsZWQuXG4gICAgLy8gVGhlc2UgY2FsbGJhY2tzIGNhbiBiZSB1c2VkIHRvIHByb3ZpZGUgdGhlIHZhbHVlIGZvciBhIGdpdmVuIGtleS5cbiAgICBjb25zdCBjb250ZW50ID0gdHJhbnNmZXJTdG9yZS50b0pzb24oKTtcblxuICAgIGlmICh0cmFuc2ZlclN0b3JlLmlzRW1wdHkpIHtcbiAgICAgIC8vIFRoZSBzdGF0ZSBpcyBlbXB0eSwgbm90aGluZyB0byB0cmFuc2ZlcixcbiAgICAgIC8vIGF2b2lkIGNyZWF0aW5nIGFuIGV4dHJhIGA8c2NyaXB0PmAgdGFnIGluIHRoaXMgY2FzZS5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzY3JpcHQgPSBkb2MuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgc2NyaXB0LmlkID0gYXBwSWQgKyAnLXN0YXRlJztcbiAgICBzY3JpcHQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICBzY3JpcHQudGV4dENvbnRlbnQgPSBlc2NhcGVUcmFuc2ZlclN0YXRlQ29udGVudChjb250ZW50KTtcblxuICAgIC8vIEl0IGlzIGludGVudGlvbmFsIHRoYXQgd2UgYWRkIHRoZSBzY3JpcHQgYXQgdGhlIHZlcnkgYm90dG9tLiBBbmd1bGFyIENMSSBzY3JpcHQgdGFncyBmb3JcbiAgICAvLyBidW5kbGVzIGFyZSBhbHdheXMgYHR5cGU9XCJtb2R1bGVcImAuIFRoZXNlIGFyZSBkZWZlcnJlZCBieSBkZWZhdWx0IGFuZCBjYXVzZSB0aGUgdHJhbnNmZXJcbiAgICAvLyB0cmFuc2ZlciBkYXRhIHRvIGJlIHF1ZXJpZWQgb25seSBhZnRlciB0aGUgYnJvd3NlciBoYXMgZmluaXNoZWQgcGFyc2luZyB0aGUgRE9NLlxuICAgIGRvYy5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gIH07XG59XG5cbi8qKlxuICogTmdNb2R1bGUgdG8gaW5zdGFsbCBvbiB0aGUgc2VydmVyIHNpZGUgd2hpbGUgdXNpbmcgdGhlIGBUcmFuc2ZlclN0YXRlYCB0byB0cmFuc2ZlciBzdGF0ZSBmcm9tXG4gKiBzZXJ2ZXIgdG8gY2xpZW50LlxuICpcbiAqIE5vdGU6IHRoaXMgbW9kdWxlIGlzIG5vdCBuZWVkZWQgaWYgdGhlIGByZW5kZXJBcHBsaWNhdGlvbmAgZnVuY3Rpb24gaXMgdXNlZC5cbiAqIFRoZSBgcmVuZGVyQXBwbGljYXRpb25gIG1ha2VzIGFsbCBwcm92aWRlcnMgZnJvbSB0aGlzIG1vZHVsZSBhdmFpbGFibGUgaW4gdGhlIGFwcGxpY2F0aW9uLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIG5vIGxvbmdlciBuZWVkZWQsIHlvdSBjYW4gaW5qZWN0IHRoZSBgVHJhbnNmZXJTdGF0ZWAgaW4gYW4gYXBwIHdpdGhvdXQgcHJvdmlkaW5nXG4gKiAgICAgdGhpcyBtb2R1bGUuXG4gKi9cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJUcmFuc2ZlclN0YXRlTW9kdWxlIHtcbn1cbiJdfQ==