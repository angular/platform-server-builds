/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { APP_ID, NgModule } from '@angular/core';
import { TransferState, ɵescapeHtml as escapeHtml } from '@angular/platform-browser';
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
        script.textContent = escapeHtml(content);
        const existingScript = doc.body.querySelector('script');
        if (existingScript) {
            // Insert the state script before any script so that the the script is available
            // before Angular is bootstrapped as otherwise this can causes the state not to be present.
            existingScript.before(script);
        }
        else {
            doc.body.appendChild(script);
        }
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
ServerTransferStateModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.0-next.4+sha-816e76a", ngImport: i0, type: ServerTransferStateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ServerTransferStateModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.0-next.4+sha-816e76a", ngImport: i0, type: ServerTransferStateModule });
ServerTransferStateModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.0-next.4+sha-816e76a", ngImport: i0, type: ServerTransferStateModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.0-next.4+sha-816e76a", ngImport: i0, type: ServerTransferStateModule, decorators: [{
            type: NgModule,
            args: [{}]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXJfc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3RyYW5zZmVyX3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBVyxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUMsYUFBYSxFQUFFLFdBQVcsSUFBSSxVQUFVLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUVuRixPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxVQUFVLENBQUM7O0FBRS9DLE1BQU0sQ0FBQyxNQUFNLHNDQUFzQyxHQUFlLENBQUM7UUFDakUsT0FBTyxFQUFFLHFCQUFxQjtRQUM5QixVQUFVLEVBQUUsNkJBQTZCO1FBQ3pDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDO1FBQ3ZDLEtBQUssRUFBRSxJQUFJO0tBQ1osQ0FBQyxDQUFDO0FBRUgsU0FBUyw2QkFBNkIsQ0FBQyxHQUFhLEVBQUUsS0FBYSxFQUFFLGFBQTRCO0lBQy9GLE9BQU8sR0FBRyxFQUFFO1FBQ1Ysc0VBQXNFO1FBQ3RFLG9FQUFvRTtRQUNwRSxNQUFNLE9BQU8sR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFdkMsSUFBSSxhQUFhLENBQUMsT0FBTyxFQUFFO1lBQ3pCLDJDQUEyQztZQUMzQyx1REFBdUQ7WUFDdkQsT0FBTztTQUNSO1FBRUQsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxNQUFNLENBQUMsRUFBRSxHQUFHLEtBQUssR0FBRyxRQUFRLENBQUM7UUFDN0IsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QyxNQUFNLGNBQWMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4RCxJQUFJLGNBQWMsRUFBRTtZQUNsQixnRkFBZ0Y7WUFDaEYsMkZBQTJGO1lBQzNGLGNBQWMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDL0I7YUFBTTtZQUNMLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzlCO0lBQ0gsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVEOzs7Ozs7Ozs7O0dBVUc7QUFFSCxNQUFNLE9BQU8seUJBQXlCOztpSUFBekIseUJBQXlCO2tJQUF6Qix5QkFBeUI7a0lBQXpCLHlCQUF5QjtzR0FBekIseUJBQXlCO2tCQURyQyxRQUFRO21CQUFDLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7QVBQX0lELCBOZ01vZHVsZSwgUHJvdmlkZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtUcmFuc2ZlclN0YXRlLCDJtWVzY2FwZUh0bWwgYXMgZXNjYXBlSHRtbH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7QkVGT1JFX0FQUF9TRVJJQUxJWkVEfSBmcm9tICcuL3Rva2Vucyc7XG5cbmV4cG9ydCBjb25zdCBUUkFOU0ZFUl9TVEFURV9TRVJJQUxJWkFUSU9OX1BST1ZJREVSUzogUHJvdmlkZXJbXSA9IFt7XG4gIHByb3ZpZGU6IEJFRk9SRV9BUFBfU0VSSUFMSVpFRCxcbiAgdXNlRmFjdG9yeTogc2VyaWFsaXplVHJhbnNmZXJTdGF0ZUZhY3RvcnksXG4gIGRlcHM6IFtET0NVTUVOVCwgQVBQX0lELCBUcmFuc2ZlclN0YXRlXSxcbiAgbXVsdGk6IHRydWUsXG59XTtcblxuZnVuY3Rpb24gc2VyaWFsaXplVHJhbnNmZXJTdGF0ZUZhY3RvcnkoZG9jOiBEb2N1bWVudCwgYXBwSWQ6IHN0cmluZywgdHJhbnNmZXJTdG9yZTogVHJhbnNmZXJTdGF0ZSkge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIC8vIFRoZSBgLnRvSlNPTmAgaGVyZSBjYXVzZXMgdGhlIGBvblNlcmlhbGl6ZWAgY2FsbGJhY2tzIHRvIGJlIGNhbGxlZC5cbiAgICAvLyBUaGVzZSBjYWxsYmFja3MgY2FuIGJlIHVzZWQgdG8gcHJvdmlkZSB0aGUgdmFsdWUgZm9yIGEgZ2l2ZW4ga2V5LlxuICAgIGNvbnN0IGNvbnRlbnQgPSB0cmFuc2ZlclN0b3JlLnRvSnNvbigpO1xuXG4gICAgaWYgKHRyYW5zZmVyU3RvcmUuaXNFbXB0eSkge1xuICAgICAgLy8gVGhlIHN0YXRlIGlzIGVtcHR5LCBub3RoaW5nIHRvIHRyYW5zZmVyLFxuICAgICAgLy8gYXZvaWQgY3JlYXRpbmcgYW4gZXh0cmEgYDxzY3JpcHQ+YCB0YWcgaW4gdGhpcyBjYXNlLlxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBzY3JpcHQuaWQgPSBhcHBJZCArICctc3RhdGUnO1xuICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgIHNjcmlwdC50ZXh0Q29udGVudCA9IGVzY2FwZUh0bWwoY29udGVudCk7XG4gICAgY29uc3QgZXhpc3RpbmdTY3JpcHQgPSBkb2MuYm9keS5xdWVyeVNlbGVjdG9yKCdzY3JpcHQnKTtcbiAgICBpZiAoZXhpc3RpbmdTY3JpcHQpIHtcbiAgICAgIC8vIEluc2VydCB0aGUgc3RhdGUgc2NyaXB0IGJlZm9yZSBhbnkgc2NyaXB0IHNvIHRoYXQgdGhlIHRoZSBzY3JpcHQgaXMgYXZhaWxhYmxlXG4gICAgICAvLyBiZWZvcmUgQW5ndWxhciBpcyBib290c3RyYXBwZWQgYXMgb3RoZXJ3aXNlIHRoaXMgY2FuIGNhdXNlcyB0aGUgc3RhdGUgbm90IHRvIGJlIHByZXNlbnQuXG4gICAgICBleGlzdGluZ1NjcmlwdC5iZWZvcmUoc2NyaXB0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jLmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogTmdNb2R1bGUgdG8gaW5zdGFsbCBvbiB0aGUgc2VydmVyIHNpZGUgd2hpbGUgdXNpbmcgdGhlIGBUcmFuc2ZlclN0YXRlYCB0byB0cmFuc2ZlciBzdGF0ZSBmcm9tXG4gKiBzZXJ2ZXIgdG8gY2xpZW50LlxuICpcbiAqIE5vdGU6IHRoaXMgbW9kdWxlIGlzIG5vdCBuZWVkZWQgaWYgdGhlIGByZW5kZXJBcHBsaWNhdGlvbmAgZnVuY3Rpb24gaXMgdXNlZC5cbiAqIFRoZSBgcmVuZGVyQXBwbGljYXRpb25gIG1ha2VzIGFsbCBwcm92aWRlcnMgZnJvbSB0aGlzIG1vZHVsZSBhdmFpbGFibGUgaW4gdGhlIGFwcGxpY2F0aW9uLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIG5vIGxvbmdlciBuZWVkZWQsIHlvdSBjYW4gaW5qZWN0IHRoZSBgVHJhbnNmZXJTdGF0ZWAgaW4gYW4gYXBwIHdpdGhvdXQgcHJvdmlkaW5nXG4gKiAgICAgdGhpcyBtb2R1bGUuXG4gKi9cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJUcmFuc2ZlclN0YXRlTW9kdWxlIHtcbn1cbiJdfQ==