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
class ServerTransferStateModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.0-next.2+sha-62e76d4", ngImport: i0, type: ServerTransferStateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.1.0-next.2+sha-62e76d4", ngImport: i0, type: ServerTransferStateModule }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.1.0-next.2+sha-62e76d4", ngImport: i0, type: ServerTransferStateModule }); }
}
export { ServerTransferStateModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.0-next.2+sha-62e76d4", ngImport: i0, type: ServerTransferStateModule, decorators: [{
            type: NgModule,
            args: [{}]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXJfc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3RyYW5zZmVyX3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBWSxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFeEUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sVUFBVSxDQUFDOztBQUUvQyxNQUFNLENBQUMsTUFBTSxzQ0FBc0MsR0FBZSxDQUFDO1FBQ2pFLE9BQU8sRUFBRSxxQkFBcUI7UUFDOUIsVUFBVSxFQUFFLDZCQUE2QjtRQUN6QyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQztRQUN2QyxLQUFLLEVBQUUsSUFBSTtLQUNaLENBQUMsQ0FBQztBQUVILFNBQVMsNkJBQTZCLENBQUMsR0FBYSxFQUFFLEtBQWEsRUFBRSxhQUE0QjtJQUMvRixPQUFPLEdBQUcsRUFBRTtRQUNWLHNFQUFzRTtRQUN0RSxvRUFBb0U7UUFDcEUsTUFBTSxPQUFPLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRXZDLElBQUksYUFBYSxDQUFDLE9BQU8sRUFBRTtZQUN6QiwyQ0FBMkM7WUFDM0MsdURBQXVEO1lBQ3ZELE9BQU87U0FDUjtRQUVELE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLEVBQUUsR0FBRyxLQUFLLEdBQUcsUUFBUSxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDaEQsTUFBTSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7UUFFN0IsMkZBQTJGO1FBQzNGLDJGQUEyRjtRQUMzRixtRkFBbUY7UUFDbkYsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVEOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUNhLHlCQUF5Qjt5SEFBekIseUJBQXlCOzBIQUF6Qix5QkFBeUI7MEhBQXpCLHlCQUF5Qjs7U0FBekIseUJBQXlCO3NHQUF6Qix5QkFBeUI7a0JBRHJDLFFBQVE7bUJBQUMsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtBUFBfSUQsIE5nTW9kdWxlLCBQcm92aWRlciwgVHJhbnNmZXJTdGF0ZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QkVGT1JFX0FQUF9TRVJJQUxJWkVEfSBmcm9tICcuL3Rva2Vucyc7XG5cbmV4cG9ydCBjb25zdCBUUkFOU0ZFUl9TVEFURV9TRVJJQUxJWkFUSU9OX1BST1ZJREVSUzogUHJvdmlkZXJbXSA9IFt7XG4gIHByb3ZpZGU6IEJFRk9SRV9BUFBfU0VSSUFMSVpFRCxcbiAgdXNlRmFjdG9yeTogc2VyaWFsaXplVHJhbnNmZXJTdGF0ZUZhY3RvcnksXG4gIGRlcHM6IFtET0NVTUVOVCwgQVBQX0lELCBUcmFuc2ZlclN0YXRlXSxcbiAgbXVsdGk6IHRydWUsXG59XTtcblxuZnVuY3Rpb24gc2VyaWFsaXplVHJhbnNmZXJTdGF0ZUZhY3RvcnkoZG9jOiBEb2N1bWVudCwgYXBwSWQ6IHN0cmluZywgdHJhbnNmZXJTdG9yZTogVHJhbnNmZXJTdGF0ZSkge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIC8vIFRoZSBgLnRvSlNPTmAgaGVyZSBjYXVzZXMgdGhlIGBvblNlcmlhbGl6ZWAgY2FsbGJhY2tzIHRvIGJlIGNhbGxlZC5cbiAgICAvLyBUaGVzZSBjYWxsYmFja3MgY2FuIGJlIHVzZWQgdG8gcHJvdmlkZSB0aGUgdmFsdWUgZm9yIGEgZ2l2ZW4ga2V5LlxuICAgIGNvbnN0IGNvbnRlbnQgPSB0cmFuc2ZlclN0b3JlLnRvSnNvbigpO1xuXG4gICAgaWYgKHRyYW5zZmVyU3RvcmUuaXNFbXB0eSkge1xuICAgICAgLy8gVGhlIHN0YXRlIGlzIGVtcHR5LCBub3RoaW5nIHRvIHRyYW5zZmVyLFxuICAgICAgLy8gYXZvaWQgY3JlYXRpbmcgYW4gZXh0cmEgYDxzY3JpcHQ+YCB0YWcgaW4gdGhpcyBjYXNlLlxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBzY3JpcHQuaWQgPSBhcHBJZCArICctc3RhdGUnO1xuICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgIHNjcmlwdC50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XG5cbiAgICAvLyBJdCBpcyBpbnRlbnRpb25hbCB0aGF0IHdlIGFkZCB0aGUgc2NyaXB0IGF0IHRoZSB2ZXJ5IGJvdHRvbS4gQW5ndWxhciBDTEkgc2NyaXB0IHRhZ3MgZm9yXG4gICAgLy8gYnVuZGxlcyBhcmUgYWx3YXlzIGB0eXBlPVwibW9kdWxlXCJgLiBUaGVzZSBhcmUgZGVmZXJyZWQgYnkgZGVmYXVsdCBhbmQgY2F1c2UgdGhlIHRyYW5zZmVyXG4gICAgLy8gdHJhbnNmZXIgZGF0YSB0byBiZSBxdWVyaWVkIG9ubHkgYWZ0ZXIgdGhlIGJyb3dzZXIgaGFzIGZpbmlzaGVkIHBhcnNpbmcgdGhlIERPTS5cbiAgICBkb2MuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICB9O1xufVxuXG4vKipcbiAqIE5nTW9kdWxlIHRvIGluc3RhbGwgb24gdGhlIHNlcnZlciBzaWRlIHdoaWxlIHVzaW5nIHRoZSBgVHJhbnNmZXJTdGF0ZWAgdG8gdHJhbnNmZXIgc3RhdGUgZnJvbVxuICogc2VydmVyIHRvIGNsaWVudC5cbiAqXG4gKiBOb3RlOiB0aGlzIG1vZHVsZSBpcyBub3QgbmVlZGVkIGlmIHRoZSBgcmVuZGVyQXBwbGljYXRpb25gIGZ1bmN0aW9uIGlzIHVzZWQuXG4gKiBUaGUgYHJlbmRlckFwcGxpY2F0aW9uYCBtYWtlcyBhbGwgcHJvdmlkZXJzIGZyb20gdGhpcyBtb2R1bGUgYXZhaWxhYmxlIGluIHRoZSBhcHBsaWNhdGlvbi5cbiAqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBubyBsb25nZXIgbmVlZGVkLCB5b3UgY2FuIGluamVjdCB0aGUgYFRyYW5zZmVyU3RhdGVgIGluIGFuIGFwcCB3aXRob3V0IHByb3ZpZGluZ1xuICogICAgIHRoaXMgbW9kdWxlLlxuICovXG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgU2VydmVyVHJhbnNmZXJTdGF0ZU1vZHVsZSB7XG59XG4iXX0=