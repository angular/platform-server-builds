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
/** TODO: Move this to a utils folder and convert to use SafeValues. */
export function createScript(doc, textContent) {
    const script = doc.createElement('script');
    script.textContent = textContent;
    return script;
}
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
        const script = createScript(doc, content);
        script.id = appId + '-state';
        script.setAttribute('type', 'application/json');
        // It is intentional that we add the script at the very bottom. Angular CLI script tags for
        // bundles are always `type="module"`. These are deferred by default and cause the transfer
        // transfer data to be queried only after the browser has finished parsing the DOM.
        doc.body.appendChild(script);
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXJfc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3RyYW5zZmVyX3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsTUFBTSxFQUFZLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUU5RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFFL0MsTUFBTSxDQUFDLE1BQU0sc0NBQXNDLEdBQWU7SUFDaEU7UUFDRSxPQUFPLEVBQUUscUJBQXFCO1FBQzlCLFVBQVUsRUFBRSw2QkFBNkI7UUFDekMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUM7UUFDdkMsS0FBSyxFQUFFLElBQUk7S0FDWjtDQUNGLENBQUM7QUFFRix1RUFBdUU7QUFDdkUsTUFBTSxVQUFVLFlBQVksQ0FBQyxHQUFhLEVBQUUsV0FBbUI7SUFDN0QsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzQyxNQUFNLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUNqQyxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQsU0FBUyw2QkFBNkIsQ0FBQyxHQUFhLEVBQUUsS0FBYSxFQUFFLGFBQTRCO0lBQy9GLE9BQU8sR0FBRyxFQUFFO1FBQ1Ysc0VBQXNFO1FBQ3RFLG9FQUFvRTtRQUNwRSxNQUFNLE9BQU8sR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFdkMsSUFBSSxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDMUIsMkNBQTJDO1lBQzNDLHVEQUF1RDtZQUN2RCxPQUFPO1FBQ1QsQ0FBQztRQUVELE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxLQUFLLEdBQUcsUUFBUSxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFaEQsMkZBQTJGO1FBQzNGLDJGQUEyRjtRQUMzRixtRkFBbUY7UUFDbkYsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtBUFBfSUQsIFByb3ZpZGVyLCBUcmFuc2ZlclN0YXRlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtCRUZPUkVfQVBQX1NFUklBTElaRUR9IGZyb20gJy4vdG9rZW5zJztcblxuZXhwb3J0IGNvbnN0IFRSQU5TRkVSX1NUQVRFX1NFUklBTElaQVRJT05fUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xuICB7XG4gICAgcHJvdmlkZTogQkVGT1JFX0FQUF9TRVJJQUxJWkVELFxuICAgIHVzZUZhY3Rvcnk6IHNlcmlhbGl6ZVRyYW5zZmVyU3RhdGVGYWN0b3J5LFxuICAgIGRlcHM6IFtET0NVTUVOVCwgQVBQX0lELCBUcmFuc2ZlclN0YXRlXSxcbiAgICBtdWx0aTogdHJ1ZSxcbiAgfSxcbl07XG5cbi8qKiBUT0RPOiBNb3ZlIHRoaXMgdG8gYSB1dGlscyBmb2xkZXIgYW5kIGNvbnZlcnQgdG8gdXNlIFNhZmVWYWx1ZXMuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2NyaXB0KGRvYzogRG9jdW1lbnQsIHRleHRDb250ZW50OiBzdHJpbmcpIHtcbiAgY29uc3Qgc2NyaXB0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICBzY3JpcHQudGV4dENvbnRlbnQgPSB0ZXh0Q29udGVudDtcbiAgcmV0dXJuIHNjcmlwdDtcbn1cblxuZnVuY3Rpb24gc2VyaWFsaXplVHJhbnNmZXJTdGF0ZUZhY3RvcnkoZG9jOiBEb2N1bWVudCwgYXBwSWQ6IHN0cmluZywgdHJhbnNmZXJTdG9yZTogVHJhbnNmZXJTdGF0ZSkge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIC8vIFRoZSBgLnRvSlNPTmAgaGVyZSBjYXVzZXMgdGhlIGBvblNlcmlhbGl6ZWAgY2FsbGJhY2tzIHRvIGJlIGNhbGxlZC5cbiAgICAvLyBUaGVzZSBjYWxsYmFja3MgY2FuIGJlIHVzZWQgdG8gcHJvdmlkZSB0aGUgdmFsdWUgZm9yIGEgZ2l2ZW4ga2V5LlxuICAgIGNvbnN0IGNvbnRlbnQgPSB0cmFuc2ZlclN0b3JlLnRvSnNvbigpO1xuXG4gICAgaWYgKHRyYW5zZmVyU3RvcmUuaXNFbXB0eSkge1xuICAgICAgLy8gVGhlIHN0YXRlIGlzIGVtcHR5LCBub3RoaW5nIHRvIHRyYW5zZmVyLFxuICAgICAgLy8gYXZvaWQgY3JlYXRpbmcgYW4gZXh0cmEgYDxzY3JpcHQ+YCB0YWcgaW4gdGhpcyBjYXNlLlxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNjcmlwdCA9IGNyZWF0ZVNjcmlwdChkb2MsIGNvbnRlbnQpO1xuICAgIHNjcmlwdC5pZCA9IGFwcElkICsgJy1zdGF0ZSc7XG4gICAgc2NyaXB0LnNldEF0dHJpYnV0ZSgndHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG5cbiAgICAvLyBJdCBpcyBpbnRlbnRpb25hbCB0aGF0IHdlIGFkZCB0aGUgc2NyaXB0IGF0IHRoZSB2ZXJ5IGJvdHRvbS4gQW5ndWxhciBDTEkgc2NyaXB0IHRhZ3MgZm9yXG4gICAgLy8gYnVuZGxlcyBhcmUgYWx3YXlzIGB0eXBlPVwibW9kdWxlXCJgLiBUaGVzZSBhcmUgZGVmZXJyZWQgYnkgZGVmYXVsdCBhbmQgY2F1c2UgdGhlIHRyYW5zZmVyXG4gICAgLy8gdHJhbnNmZXIgZGF0YSB0byBiZSBxdWVyaWVkIG9ubHkgYWZ0ZXIgdGhlIGJyb3dzZXIgaGFzIGZpbmlzaGVkIHBhcnNpbmcgdGhlIERPTS5cbiAgICBkb2MuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICB9O1xufVxuIl19