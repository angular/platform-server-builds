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
export function createScript(doc, textContent, nonce) {
    const script = doc.createElement('script');
    script.textContent = textContent;
    if (nonce) {
        script.setAttribute('nonce', nonce);
    }
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
        const script = createScript(doc, content, null /** nonce is not required for 'application/json' */);
        script.id = appId + '-state';
        script.setAttribute('type', 'application/json');
        // It is intentional that we add the script at the very bottom. Angular CLI script tags for
        // bundles are always `type="module"`. These are deferred by default and cause the transfer
        // transfer data to be queried only after the browser has finished parsing the DOM.
        doc.body.appendChild(script);
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXJfc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3RyYW5zZmVyX3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsTUFBTSxFQUFZLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUU5RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFFL0MsTUFBTSxDQUFDLE1BQU0sc0NBQXNDLEdBQWU7SUFDaEU7UUFDRSxPQUFPLEVBQUUscUJBQXFCO1FBQzlCLFVBQVUsRUFBRSw2QkFBNkI7UUFDekMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUM7UUFDdkMsS0FBSyxFQUFFLElBQUk7S0FDWjtDQUNGLENBQUM7QUFFRix1RUFBdUU7QUFDdkUsTUFBTSxVQUFVLFlBQVksQ0FDMUIsR0FBYSxFQUNiLFdBQW1CLEVBQ25CLEtBQW9CO0lBRXBCLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDakMsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUNWLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQsU0FBUyw2QkFBNkIsQ0FBQyxHQUFhLEVBQUUsS0FBYSxFQUFFLGFBQTRCO0lBQy9GLE9BQU8sR0FBRyxFQUFFO1FBQ1Ysc0VBQXNFO1FBQ3RFLG9FQUFvRTtRQUNwRSxNQUFNLE9BQU8sR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFdkMsSUFBSSxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDMUIsMkNBQTJDO1lBQzNDLHVEQUF1RDtZQUN2RCxPQUFPO1FBQ1QsQ0FBQztRQUVELE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FDekIsR0FBRyxFQUNILE9BQU8sRUFDUCxJQUFJLENBQUMsbURBQW1ELENBQ3pELENBQUM7UUFDRixNQUFNLENBQUMsRUFBRSxHQUFHLEtBQUssR0FBRyxRQUFRLENBQUM7UUFDN0IsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUVoRCwyRkFBMkY7UUFDM0YsMkZBQTJGO1FBQzNGLG1GQUFtRjtRQUNuRixHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0FQUF9JRCwgUHJvdmlkZXIsIFRyYW5zZmVyU3RhdGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0JFRk9SRV9BUFBfU0VSSUFMSVpFRH0gZnJvbSAnLi90b2tlbnMnO1xuXG5leHBvcnQgY29uc3QgVFJBTlNGRVJfU1RBVEVfU0VSSUFMSVpBVElPTl9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbXG4gIHtcbiAgICBwcm92aWRlOiBCRUZPUkVfQVBQX1NFUklBTElaRUQsXG4gICAgdXNlRmFjdG9yeTogc2VyaWFsaXplVHJhbnNmZXJTdGF0ZUZhY3RvcnksXG4gICAgZGVwczogW0RPQ1VNRU5ULCBBUFBfSUQsIFRyYW5zZmVyU3RhdGVdLFxuICAgIG11bHRpOiB0cnVlLFxuICB9LFxuXTtcblxuLyoqIFRPRE86IE1vdmUgdGhpcyB0byBhIHV0aWxzIGZvbGRlciBhbmQgY29udmVydCB0byB1c2UgU2FmZVZhbHVlcy4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTY3JpcHQoXG4gIGRvYzogRG9jdW1lbnQsXG4gIHRleHRDb250ZW50OiBzdHJpbmcsXG4gIG5vbmNlOiBzdHJpbmcgfCBudWxsLFxuKTogSFRNTFNjcmlwdEVsZW1lbnQge1xuICBjb25zdCBzY3JpcHQgPSBkb2MuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gIHNjcmlwdC50ZXh0Q29udGVudCA9IHRleHRDb250ZW50O1xuICBpZiAobm9uY2UpIHtcbiAgICBzY3JpcHQuc2V0QXR0cmlidXRlKCdub25jZScsIG5vbmNlKTtcbiAgfVxuXG4gIHJldHVybiBzY3JpcHQ7XG59XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZVRyYW5zZmVyU3RhdGVGYWN0b3J5KGRvYzogRG9jdW1lbnQsIGFwcElkOiBzdHJpbmcsIHRyYW5zZmVyU3RvcmU6IFRyYW5zZmVyU3RhdGUpIHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICAvLyBUaGUgYC50b0pTT05gIGhlcmUgY2F1c2VzIHRoZSBgb25TZXJpYWxpemVgIGNhbGxiYWNrcyB0byBiZSBjYWxsZWQuXG4gICAgLy8gVGhlc2UgY2FsbGJhY2tzIGNhbiBiZSB1c2VkIHRvIHByb3ZpZGUgdGhlIHZhbHVlIGZvciBhIGdpdmVuIGtleS5cbiAgICBjb25zdCBjb250ZW50ID0gdHJhbnNmZXJTdG9yZS50b0pzb24oKTtcblxuICAgIGlmICh0cmFuc2ZlclN0b3JlLmlzRW1wdHkpIHtcbiAgICAgIC8vIFRoZSBzdGF0ZSBpcyBlbXB0eSwgbm90aGluZyB0byB0cmFuc2ZlcixcbiAgICAgIC8vIGF2b2lkIGNyZWF0aW5nIGFuIGV4dHJhIGA8c2NyaXB0PmAgdGFnIGluIHRoaXMgY2FzZS5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzY3JpcHQgPSBjcmVhdGVTY3JpcHQoXG4gICAgICBkb2MsXG4gICAgICBjb250ZW50LFxuICAgICAgbnVsbCAvKiogbm9uY2UgaXMgbm90IHJlcXVpcmVkIGZvciAnYXBwbGljYXRpb24vanNvbicgKi8sXG4gICAgKTtcbiAgICBzY3JpcHQuaWQgPSBhcHBJZCArICctc3RhdGUnO1xuICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuXG4gICAgLy8gSXQgaXMgaW50ZW50aW9uYWwgdGhhdCB3ZSBhZGQgdGhlIHNjcmlwdCBhdCB0aGUgdmVyeSBib3R0b20uIEFuZ3VsYXIgQ0xJIHNjcmlwdCB0YWdzIGZvclxuICAgIC8vIGJ1bmRsZXMgYXJlIGFsd2F5cyBgdHlwZT1cIm1vZHVsZVwiYC4gVGhlc2UgYXJlIGRlZmVycmVkIGJ5IGRlZmF1bHQgYW5kIGNhdXNlIHRoZSB0cmFuc2ZlclxuICAgIC8vIHRyYW5zZmVyIGRhdGEgdG8gYmUgcXVlcmllZCBvbmx5IGFmdGVyIHRoZSBicm93c2VyIGhhcyBmaW5pc2hlZCBwYXJzaW5nIHRoZSBET00uXG4gICAgZG9jLmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgfTtcbn1cbiJdfQ==