/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { APP_ID, NgModule, TransferState, ɵescapeTransferStateContent as escapeTransferStateContent } from '@angular/core';
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
class ServerTransferStateModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.0-next.0+sha-2180a69", ngImport: i0, type: ServerTransferStateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.1.0-next.0+sha-2180a69", ngImport: i0, type: ServerTransferStateModule }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.1.0-next.0+sha-2180a69", ngImport: i0, type: ServerTransferStateModule }); }
}
export { ServerTransferStateModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.0-next.0+sha-2180a69", ngImport: i0, type: ServerTransferStateModule, decorators: [{
            type: NgModule,
            args: [{}]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXJfc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3RyYW5zZmVyX3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBWSxhQUFhLEVBQUUsMkJBQTJCLElBQUksMEJBQTBCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFbkksT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sVUFBVSxDQUFDOztBQUUvQyxNQUFNLENBQUMsTUFBTSxzQ0FBc0MsR0FBZSxDQUFDO1FBQ2pFLE9BQU8sRUFBRSxxQkFBcUI7UUFDOUIsVUFBVSxFQUFFLDZCQUE2QjtRQUN6QyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQztRQUN2QyxLQUFLLEVBQUUsSUFBSTtLQUNaLENBQUMsQ0FBQztBQUVILFNBQVMsNkJBQTZCLENBQUMsR0FBYSxFQUFFLEtBQWEsRUFBRSxhQUE0QjtJQUMvRixPQUFPLEdBQUcsRUFBRTtRQUNWLHNFQUFzRTtRQUN0RSxvRUFBb0U7UUFDcEUsTUFBTSxPQUFPLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRXZDLElBQUksYUFBYSxDQUFDLE9BQU8sRUFBRTtZQUN6QiwyQ0FBMkM7WUFDM0MsdURBQXVEO1lBQ3ZELE9BQU87U0FDUjtRQUVELE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLEVBQUUsR0FBRyxLQUFLLEdBQUcsUUFBUSxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDaEQsTUFBTSxDQUFDLFdBQVcsR0FBRywwQkFBMEIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV6RCwyRkFBMkY7UUFDM0YsMkZBQTJGO1FBQzNGLG1GQUFtRjtRQUNuRixHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQ7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQ2EseUJBQXlCO3lIQUF6Qix5QkFBeUI7MEhBQXpCLHlCQUF5QjswSEFBekIseUJBQXlCOztTQUF6Qix5QkFBeUI7c0dBQXpCLHlCQUF5QjtrQkFEckMsUUFBUTttQkFBQyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0FQUF9JRCwgTmdNb2R1bGUsIFByb3ZpZGVyLCBUcmFuc2ZlclN0YXRlLCDJtWVzY2FwZVRyYW5zZmVyU3RhdGVDb250ZW50IGFzIGVzY2FwZVRyYW5zZmVyU3RhdGVDb250ZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtCRUZPUkVfQVBQX1NFUklBTElaRUR9IGZyb20gJy4vdG9rZW5zJztcblxuZXhwb3J0IGNvbnN0IFRSQU5TRkVSX1NUQVRFX1NFUklBTElaQVRJT05fUFJPVklERVJTOiBQcm92aWRlcltdID0gW3tcbiAgcHJvdmlkZTogQkVGT1JFX0FQUF9TRVJJQUxJWkVELFxuICB1c2VGYWN0b3J5OiBzZXJpYWxpemVUcmFuc2ZlclN0YXRlRmFjdG9yeSxcbiAgZGVwczogW0RPQ1VNRU5ULCBBUFBfSUQsIFRyYW5zZmVyU3RhdGVdLFxuICBtdWx0aTogdHJ1ZSxcbn1dO1xuXG5mdW5jdGlvbiBzZXJpYWxpemVUcmFuc2ZlclN0YXRlRmFjdG9yeShkb2M6IERvY3VtZW50LCBhcHBJZDogc3RyaW5nLCB0cmFuc2ZlclN0b3JlOiBUcmFuc2ZlclN0YXRlKSB7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgLy8gVGhlIGAudG9KU09OYCBoZXJlIGNhdXNlcyB0aGUgYG9uU2VyaWFsaXplYCBjYWxsYmFja3MgdG8gYmUgY2FsbGVkLlxuICAgIC8vIFRoZXNlIGNhbGxiYWNrcyBjYW4gYmUgdXNlZCB0byBwcm92aWRlIHRoZSB2YWx1ZSBmb3IgYSBnaXZlbiBrZXkuXG4gICAgY29uc3QgY29udGVudCA9IHRyYW5zZmVyU3RvcmUudG9Kc29uKCk7XG5cbiAgICBpZiAodHJhbnNmZXJTdG9yZS5pc0VtcHR5KSB7XG4gICAgICAvLyBUaGUgc3RhdGUgaXMgZW1wdHksIG5vdGhpbmcgdG8gdHJhbnNmZXIsXG4gICAgICAvLyBhdm9pZCBjcmVhdGluZyBhbiBleHRyYSBgPHNjcmlwdD5gIHRhZyBpbiB0aGlzIGNhc2UuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2NyaXB0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHNjcmlwdC5pZCA9IGFwcElkICsgJy1zdGF0ZSc7XG4gICAgc2NyaXB0LnNldEF0dHJpYnV0ZSgndHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgc2NyaXB0LnRleHRDb250ZW50ID0gZXNjYXBlVHJhbnNmZXJTdGF0ZUNvbnRlbnQoY29udGVudCk7XG5cbiAgICAvLyBJdCBpcyBpbnRlbnRpb25hbCB0aGF0IHdlIGFkZCB0aGUgc2NyaXB0IGF0IHRoZSB2ZXJ5IGJvdHRvbS4gQW5ndWxhciBDTEkgc2NyaXB0IHRhZ3MgZm9yXG4gICAgLy8gYnVuZGxlcyBhcmUgYWx3YXlzIGB0eXBlPVwibW9kdWxlXCJgLiBUaGVzZSBhcmUgZGVmZXJyZWQgYnkgZGVmYXVsdCBhbmQgY2F1c2UgdGhlIHRyYW5zZmVyXG4gICAgLy8gdHJhbnNmZXIgZGF0YSB0byBiZSBxdWVyaWVkIG9ubHkgYWZ0ZXIgdGhlIGJyb3dzZXIgaGFzIGZpbmlzaGVkIHBhcnNpbmcgdGhlIERPTS5cbiAgICBkb2MuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICB9O1xufVxuXG4vKipcbiAqIE5nTW9kdWxlIHRvIGluc3RhbGwgb24gdGhlIHNlcnZlciBzaWRlIHdoaWxlIHVzaW5nIHRoZSBgVHJhbnNmZXJTdGF0ZWAgdG8gdHJhbnNmZXIgc3RhdGUgZnJvbVxuICogc2VydmVyIHRvIGNsaWVudC5cbiAqXG4gKiBOb3RlOiB0aGlzIG1vZHVsZSBpcyBub3QgbmVlZGVkIGlmIHRoZSBgcmVuZGVyQXBwbGljYXRpb25gIGZ1bmN0aW9uIGlzIHVzZWQuXG4gKiBUaGUgYHJlbmRlckFwcGxpY2F0aW9uYCBtYWtlcyBhbGwgcHJvdmlkZXJzIGZyb20gdGhpcyBtb2R1bGUgYXZhaWxhYmxlIGluIHRoZSBhcHBsaWNhdGlvbi5cbiAqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBubyBsb25nZXIgbmVlZGVkLCB5b3UgY2FuIGluamVjdCB0aGUgYFRyYW5zZmVyU3RhdGVgIGluIGFuIGFwcCB3aXRob3V0IHByb3ZpZGluZ1xuICogICAgIHRoaXMgbW9kdWxlLlxuICovXG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgU2VydmVyVHJhbnNmZXJTdGF0ZU1vZHVsZSB7XG59XG4iXX0=