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
export function serializeTransferStateFactory(doc, appId, transferStore) {
    return () => {
        const store = transferStore.store;
        const isStateEmpty = Object.keys(store).length === 0;
        if (isStateEmpty) {
            // The state is empty, nothing to transfer,
            // avoid creating an extra `<script>` tag in this case.
            return;
        }
        const script = doc.createElement('script');
        script.id = appId + '-state';
        script.setAttribute('type', 'application/json');
        script.textContent = escapeHtml(transferStore.toJson());
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
 */
export class ServerTransferStateModule {
}
ServerTransferStateModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0-next.0+sha-10289f1", ngImport: i0, type: ServerTransferStateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ServerTransferStateModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.0-next.0+sha-10289f1", ngImport: i0, type: ServerTransferStateModule });
ServerTransferStateModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.0-next.0+sha-10289f1", ngImport: i0, type: ServerTransferStateModule, providers: TRANSFER_STATE_SERIALIZATION_PROVIDERS });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0-next.0+sha-10289f1", ngImport: i0, type: ServerTransferStateModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: TRANSFER_STATE_SERIALIZATION_PROVIDERS,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXJfc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3RyYW5zZmVyX3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBVyxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUMsYUFBYSxFQUFFLFdBQVcsSUFBSSxVQUFVLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUVuRixPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxVQUFVLENBQUM7O0FBRS9DLE1BQU0sQ0FBQyxNQUFNLHNDQUFzQyxHQUFlLENBQUM7UUFDakUsT0FBTyxFQUFFLHFCQUFxQjtRQUM5QixVQUFVLEVBQUUsNkJBQTZCO1FBQ3pDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDO1FBQ3ZDLEtBQUssRUFBRSxJQUFJO0tBQ1osQ0FBQyxDQUFDO0FBRUgsTUFBTSxVQUFVLDZCQUE2QixDQUN6QyxHQUFhLEVBQUUsS0FBYSxFQUFFLGFBQTRCO0lBQzVELE9BQU8sR0FBRyxFQUFFO1FBQ1YsTUFBTSxLQUFLLEdBQUksYUFBd0MsQ0FBQyxLQUFLLENBQUM7UUFDOUQsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO1FBQ3JELElBQUksWUFBWSxFQUFFO1lBQ2hCLDJDQUEyQztZQUMzQyx1REFBdUQ7WUFDdkQsT0FBTztTQUNSO1FBQ0QsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxNQUFNLENBQUMsRUFBRSxHQUFHLEtBQUssR0FBRyxRQUFRLENBQUM7UUFDN0IsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN4RCxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQ7Ozs7Ozs7O0dBUUc7QUFJSCxNQUFNLE9BQU8seUJBQXlCOztpSUFBekIseUJBQXlCO2tJQUF6Qix5QkFBeUI7a0lBQXpCLHlCQUF5QixhQUZ6QixzQ0FBc0M7c0dBRXRDLHlCQUF5QjtrQkFIckMsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUUsc0NBQXNDO2lCQUNsRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtBUFBfSUQsIE5nTW9kdWxlLCBQcm92aWRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1RyYW5zZmVyU3RhdGUsIMm1ZXNjYXBlSHRtbCBhcyBlc2NhcGVIdG1sfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHtCRUZPUkVfQVBQX1NFUklBTElaRUR9IGZyb20gJy4vdG9rZW5zJztcblxuZXhwb3J0IGNvbnN0IFRSQU5TRkVSX1NUQVRFX1NFUklBTElaQVRJT05fUFJPVklERVJTOiBQcm92aWRlcltdID0gW3tcbiAgcHJvdmlkZTogQkVGT1JFX0FQUF9TRVJJQUxJWkVELFxuICB1c2VGYWN0b3J5OiBzZXJpYWxpemVUcmFuc2ZlclN0YXRlRmFjdG9yeSxcbiAgZGVwczogW0RPQ1VNRU5ULCBBUFBfSUQsIFRyYW5zZmVyU3RhdGVdLFxuICBtdWx0aTogdHJ1ZSxcbn1dO1xuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplVHJhbnNmZXJTdGF0ZUZhY3RvcnkoXG4gICAgZG9jOiBEb2N1bWVudCwgYXBwSWQ6IHN0cmluZywgdHJhbnNmZXJTdG9yZTogVHJhbnNmZXJTdGF0ZSkge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGNvbnN0IHN0b3JlID0gKHRyYW5zZmVyU3RvcmUgYXMgdW5rbm93biBhcyB7c3RvcmU6IHt9fSkuc3RvcmU7XG4gICAgY29uc3QgaXNTdGF0ZUVtcHR5ID0gT2JqZWN0LmtleXMoc3RvcmUpLmxlbmd0aCA9PT0gMDtcbiAgICBpZiAoaXNTdGF0ZUVtcHR5KSB7XG4gICAgICAvLyBUaGUgc3RhdGUgaXMgZW1wdHksIG5vdGhpbmcgdG8gdHJhbnNmZXIsXG4gICAgICAvLyBhdm9pZCBjcmVhdGluZyBhbiBleHRyYSBgPHNjcmlwdD5gIHRhZyBpbiB0aGlzIGNhc2UuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBzY3JpcHQuaWQgPSBhcHBJZCArICctc3RhdGUnO1xuICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgIHNjcmlwdC50ZXh0Q29udGVudCA9IGVzY2FwZUh0bWwodHJhbnNmZXJTdG9yZS50b0pzb24oKSk7XG4gICAgZG9jLmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgfTtcbn1cblxuLyoqXG4gKiBOZ01vZHVsZSB0byBpbnN0YWxsIG9uIHRoZSBzZXJ2ZXIgc2lkZSB3aGlsZSB1c2luZyB0aGUgYFRyYW5zZmVyU3RhdGVgIHRvIHRyYW5zZmVyIHN0YXRlIGZyb21cbiAqIHNlcnZlciB0byBjbGllbnQuXG4gKlxuICogTm90ZTogdGhpcyBtb2R1bGUgaXMgbm90IG5lZWRlZCBpZiB0aGUgYHJlbmRlckFwcGxpY2F0aW9uYCBmdW5jdGlvbiBpcyB1c2VkLlxuICogVGhlIGByZW5kZXJBcHBsaWNhdGlvbmAgbWFrZXMgYWxsIHByb3ZpZGVycyBmcm9tIHRoaXMgbW9kdWxlIGF2YWlsYWJsZSBpbiB0aGUgYXBwbGljYXRpb24uXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFRSQU5TRkVSX1NUQVRFX1NFUklBTElaQVRJT05fUFJPVklERVJTLFxufSlcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJUcmFuc2ZlclN0YXRlTW9kdWxlIHtcbn1cbiJdfQ==