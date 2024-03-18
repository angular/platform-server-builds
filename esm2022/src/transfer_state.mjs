/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { APP_ID, TransferState } from '@angular/core';
import { BEFORE_APP_SERIALIZED } from './tokens';
export const TRANSFER_STATE_SERIALIZATION_PROVIDERS = [
    {
        provide: BEFORE_APP_SERIALIZED,
        useFactory: serializeTransferStateFactory,
        deps: [DOCUMENT, APP_ID, TransferState],
        multi: true,
    },
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXJfc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3RyYW5zZmVyX3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsTUFBTSxFQUFZLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUU5RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFFL0MsTUFBTSxDQUFDLE1BQU0sc0NBQXNDLEdBQWU7SUFDaEU7UUFDRSxPQUFPLEVBQUUscUJBQXFCO1FBQzlCLFVBQVUsRUFBRSw2QkFBNkI7UUFDekMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUM7UUFDdkMsS0FBSyxFQUFFLElBQUk7S0FDWjtDQUNGLENBQUM7QUFFRixTQUFTLDZCQUE2QixDQUFDLEdBQWEsRUFBRSxLQUFhLEVBQUUsYUFBNEI7SUFDL0YsT0FBTyxHQUFHLEVBQUU7UUFDVixzRUFBc0U7UUFDdEUsb0VBQW9FO1FBQ3BFLE1BQU0sT0FBTyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUV2QyxJQUFJLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMxQiwyQ0FBMkM7WUFDM0MsdURBQXVEO1lBQ3ZELE9BQU87UUFDVCxDQUFDO1FBRUQsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxNQUFNLENBQUMsRUFBRSxHQUFHLEtBQUssR0FBRyxRQUFRLENBQUM7UUFDN0IsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQztRQUU3QiwyRkFBMkY7UUFDM0YsMkZBQTJGO1FBQzNGLG1GQUFtRjtRQUNuRixHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0FQUF9JRCwgUHJvdmlkZXIsIFRyYW5zZmVyU3RhdGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0JFRk9SRV9BUFBfU0VSSUFMSVpFRH0gZnJvbSAnLi90b2tlbnMnO1xuXG5leHBvcnQgY29uc3QgVFJBTlNGRVJfU1RBVEVfU0VSSUFMSVpBVElPTl9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbXG4gIHtcbiAgICBwcm92aWRlOiBCRUZPUkVfQVBQX1NFUklBTElaRUQsXG4gICAgdXNlRmFjdG9yeTogc2VyaWFsaXplVHJhbnNmZXJTdGF0ZUZhY3RvcnksXG4gICAgZGVwczogW0RPQ1VNRU5ULCBBUFBfSUQsIFRyYW5zZmVyU3RhdGVdLFxuICAgIG11bHRpOiB0cnVlLFxuICB9LFxuXTtcblxuZnVuY3Rpb24gc2VyaWFsaXplVHJhbnNmZXJTdGF0ZUZhY3RvcnkoZG9jOiBEb2N1bWVudCwgYXBwSWQ6IHN0cmluZywgdHJhbnNmZXJTdG9yZTogVHJhbnNmZXJTdGF0ZSkge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIC8vIFRoZSBgLnRvSlNPTmAgaGVyZSBjYXVzZXMgdGhlIGBvblNlcmlhbGl6ZWAgY2FsbGJhY2tzIHRvIGJlIGNhbGxlZC5cbiAgICAvLyBUaGVzZSBjYWxsYmFja3MgY2FuIGJlIHVzZWQgdG8gcHJvdmlkZSB0aGUgdmFsdWUgZm9yIGEgZ2l2ZW4ga2V5LlxuICAgIGNvbnN0IGNvbnRlbnQgPSB0cmFuc2ZlclN0b3JlLnRvSnNvbigpO1xuXG4gICAgaWYgKHRyYW5zZmVyU3RvcmUuaXNFbXB0eSkge1xuICAgICAgLy8gVGhlIHN0YXRlIGlzIGVtcHR5LCBub3RoaW5nIHRvIHRyYW5zZmVyLFxuICAgICAgLy8gYXZvaWQgY3JlYXRpbmcgYW4gZXh0cmEgYDxzY3JpcHQ+YCB0YWcgaW4gdGhpcyBjYXNlLlxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBzY3JpcHQuaWQgPSBhcHBJZCArICctc3RhdGUnO1xuICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgIHNjcmlwdC50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XG5cbiAgICAvLyBJdCBpcyBpbnRlbnRpb25hbCB0aGF0IHdlIGFkZCB0aGUgc2NyaXB0IGF0IHRoZSB2ZXJ5IGJvdHRvbS4gQW5ndWxhciBDTEkgc2NyaXB0IHRhZ3MgZm9yXG4gICAgLy8gYnVuZGxlcyBhcmUgYWx3YXlzIGB0eXBlPVwibW9kdWxlXCJgLiBUaGVzZSBhcmUgZGVmZXJyZWQgYnkgZGVmYXVsdCBhbmQgY2F1c2UgdGhlIHRyYW5zZmVyXG4gICAgLy8gdHJhbnNmZXIgZGF0YSB0byBiZSBxdWVyaWVkIG9ubHkgYWZ0ZXIgdGhlIGJyb3dzZXIgaGFzIGZpbmlzaGVkIHBhcnNpbmcgdGhlIERPTS5cbiAgICBkb2MuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICB9O1xufVxuIl19