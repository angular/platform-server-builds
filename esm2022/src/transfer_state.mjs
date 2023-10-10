/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { APP_ID, NgModule, TransferState } from '@angular/core';
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
        script.textContent = content;
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.0-next.7+sha-229331e", ngImport: i0, type: ServerTransferStateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.0-next.7+sha-229331e", ngImport: i0, type: ServerTransferStateModule }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.0-next.7+sha-229331e", ngImport: i0, type: ServerTransferStateModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.0-next.7+sha-229331e", ngImport: i0, type: ServerTransferStateModule, decorators: [{
            type: NgModule,
            args: [{}]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXJfc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3RyYW5zZmVyX3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBWSxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFeEUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sVUFBVSxDQUFDOztBQUUvQyxNQUFNLENBQUMsTUFBTSxzQ0FBc0MsR0FBZSxDQUFDO1FBQ2pFLE9BQU8sRUFBRSxxQkFBcUI7UUFDOUIsVUFBVSxFQUFFLDZCQUE2QjtRQUN6QyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQztRQUN2QyxLQUFLLEVBQUUsSUFBSTtLQUNaLENBQUMsQ0FBQztBQUVILFNBQVMsNkJBQTZCLENBQUMsR0FBYSxFQUFFLEtBQWEsRUFBRSxhQUE0QjtJQUMvRixPQUFPLEdBQUcsRUFBRTtRQUNWLHNFQUFzRTtRQUN0RSxvRUFBb0U7UUFDcEUsTUFBTSxPQUFPLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRXZDLElBQUksYUFBYSxDQUFDLE9BQU8sRUFBRTtZQUN6QiwyQ0FBMkM7WUFDM0MsdURBQXVEO1lBQ3ZELE9BQU87U0FDUjtRQUVELE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLEVBQUUsR0FBRyxLQUFLLEdBQUcsUUFBUSxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDaEQsTUFBTSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7UUFFN0IsMkZBQTJGO1FBQzNGLDJGQUEyRjtRQUMzRixtRkFBbUY7UUFDbkYsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVEOzs7Ozs7Ozs7O0dBVUc7QUFFSCxNQUFNLE9BQU8seUJBQXlCO3lIQUF6Qix5QkFBeUI7MEhBQXpCLHlCQUF5QjswSEFBekIseUJBQXlCOztzR0FBekIseUJBQXlCO2tCQURyQyxRQUFRO21CQUFDLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7QVBQX0lELCBOZ01vZHVsZSwgUHJvdmlkZXIsIFRyYW5zZmVyU3RhdGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0JFRk9SRV9BUFBfU0VSSUFMSVpFRH0gZnJvbSAnLi90b2tlbnMnO1xuXG5leHBvcnQgY29uc3QgVFJBTlNGRVJfU1RBVEVfU0VSSUFMSVpBVElPTl9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbe1xuICBwcm92aWRlOiBCRUZPUkVfQVBQX1NFUklBTElaRUQsXG4gIHVzZUZhY3Rvcnk6IHNlcmlhbGl6ZVRyYW5zZmVyU3RhdGVGYWN0b3J5LFxuICBkZXBzOiBbRE9DVU1FTlQsIEFQUF9JRCwgVHJhbnNmZXJTdGF0ZV0sXG4gIG11bHRpOiB0cnVlLFxufV07XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZVRyYW5zZmVyU3RhdGVGYWN0b3J5KGRvYzogRG9jdW1lbnQsIGFwcElkOiBzdHJpbmcsIHRyYW5zZmVyU3RvcmU6IFRyYW5zZmVyU3RhdGUpIHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICAvLyBUaGUgYC50b0pTT05gIGhlcmUgY2F1c2VzIHRoZSBgb25TZXJpYWxpemVgIGNhbGxiYWNrcyB0byBiZSBjYWxsZWQuXG4gICAgLy8gVGhlc2UgY2FsbGJhY2tzIGNhbiBiZSB1c2VkIHRvIHByb3ZpZGUgdGhlIHZhbHVlIGZvciBhIGdpdmVuIGtleS5cbiAgICBjb25zdCBjb250ZW50ID0gdHJhbnNmZXJTdG9yZS50b0pzb24oKTtcblxuICAgIGlmICh0cmFuc2ZlclN0b3JlLmlzRW1wdHkpIHtcbiAgICAgIC8vIFRoZSBzdGF0ZSBpcyBlbXB0eSwgbm90aGluZyB0byB0cmFuc2ZlcixcbiAgICAgIC8vIGF2b2lkIGNyZWF0aW5nIGFuIGV4dHJhIGA8c2NyaXB0PmAgdGFnIGluIHRoaXMgY2FzZS5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzY3JpcHQgPSBkb2MuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgc2NyaXB0LmlkID0gYXBwSWQgKyAnLXN0YXRlJztcbiAgICBzY3JpcHQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICBzY3JpcHQudGV4dENvbnRlbnQgPSBjb250ZW50O1xuXG4gICAgLy8gSXQgaXMgaW50ZW50aW9uYWwgdGhhdCB3ZSBhZGQgdGhlIHNjcmlwdCBhdCB0aGUgdmVyeSBib3R0b20uIEFuZ3VsYXIgQ0xJIHNjcmlwdCB0YWdzIGZvclxuICAgIC8vIGJ1bmRsZXMgYXJlIGFsd2F5cyBgdHlwZT1cIm1vZHVsZVwiYC4gVGhlc2UgYXJlIGRlZmVycmVkIGJ5IGRlZmF1bHQgYW5kIGNhdXNlIHRoZSB0cmFuc2ZlclxuICAgIC8vIHRyYW5zZmVyIGRhdGEgdG8gYmUgcXVlcmllZCBvbmx5IGFmdGVyIHRoZSBicm93c2VyIGhhcyBmaW5pc2hlZCBwYXJzaW5nIHRoZSBET00uXG4gICAgZG9jLmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgfTtcbn1cblxuLyoqXG4gKiBOZ01vZHVsZSB0byBpbnN0YWxsIG9uIHRoZSBzZXJ2ZXIgc2lkZSB3aGlsZSB1c2luZyB0aGUgYFRyYW5zZmVyU3RhdGVgIHRvIHRyYW5zZmVyIHN0YXRlIGZyb21cbiAqIHNlcnZlciB0byBjbGllbnQuXG4gKlxuICogTm90ZTogdGhpcyBtb2R1bGUgaXMgbm90IG5lZWRlZCBpZiB0aGUgYHJlbmRlckFwcGxpY2F0aW9uYCBmdW5jdGlvbiBpcyB1c2VkLlxuICogVGhlIGByZW5kZXJBcHBsaWNhdGlvbmAgbWFrZXMgYWxsIHByb3ZpZGVycyBmcm9tIHRoaXMgbW9kdWxlIGF2YWlsYWJsZSBpbiB0aGUgYXBwbGljYXRpb24uXG4gKlxuICogQHB1YmxpY0FwaVxuICogQGRlcHJlY2F0ZWQgbm8gbG9uZ2VyIG5lZWRlZCwgeW91IGNhbiBpbmplY3QgdGhlIGBUcmFuc2ZlclN0YXRlYCBpbiBhbiBhcHAgd2l0aG91dCBwcm92aWRpbmdcbiAqICAgICB0aGlzIG1vZHVsZS5cbiAqL1xuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIFNlcnZlclRyYW5zZmVyU3RhdGVNb2R1bGUge1xufVxuIl19