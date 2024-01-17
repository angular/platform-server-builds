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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0-rc.0+sha-b07c549", ngImport: i0, type: ServerTransferStateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.1.0-rc.0+sha-b07c549", ngImport: i0, type: ServerTransferStateModule }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.1.0-rc.0+sha-b07c549", ngImport: i0, type: ServerTransferStateModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0-rc.0+sha-b07c549", ngImport: i0, type: ServerTransferStateModule, decorators: [{
            type: NgModule,
            args: [{}]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXJfc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3RyYW5zZmVyX3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBWSxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFeEUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sVUFBVSxDQUFDOztBQUUvQyxNQUFNLENBQUMsTUFBTSxzQ0FBc0MsR0FBZSxDQUFDO1FBQ2pFLE9BQU8sRUFBRSxxQkFBcUI7UUFDOUIsVUFBVSxFQUFFLDZCQUE2QjtRQUN6QyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQztRQUN2QyxLQUFLLEVBQUUsSUFBSTtLQUNaLENBQUMsQ0FBQztBQUVILFNBQVMsNkJBQTZCLENBQUMsR0FBYSxFQUFFLEtBQWEsRUFBRSxhQUE0QjtJQUMvRixPQUFPLEdBQUcsRUFBRTtRQUNWLHNFQUFzRTtRQUN0RSxvRUFBb0U7UUFDcEUsTUFBTSxPQUFPLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRXZDLElBQUksYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzFCLDJDQUEyQztZQUMzQyx1REFBdUQ7WUFDdkQsT0FBTztRQUNULENBQUM7UUFFRCxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsS0FBSyxHQUFHLFFBQVEsQ0FBQztRQUM3QixNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDO1FBRTdCLDJGQUEyRjtRQUMzRiwyRkFBMkY7UUFDM0YsbUZBQW1GO1FBQ25GLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRDs7Ozs7Ozs7OztHQVVHO0FBRUgsTUFBTSxPQUFPLHlCQUF5Qjt5SEFBekIseUJBQXlCOzBIQUF6Qix5QkFBeUI7MEhBQXpCLHlCQUF5Qjs7c0dBQXpCLHlCQUF5QjtrQkFEckMsUUFBUTttQkFBQyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0FQUF9JRCwgTmdNb2R1bGUsIFByb3ZpZGVyLCBUcmFuc2ZlclN0YXRlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtCRUZPUkVfQVBQX1NFUklBTElaRUR9IGZyb20gJy4vdG9rZW5zJztcblxuZXhwb3J0IGNvbnN0IFRSQU5TRkVSX1NUQVRFX1NFUklBTElaQVRJT05fUFJPVklERVJTOiBQcm92aWRlcltdID0gW3tcbiAgcHJvdmlkZTogQkVGT1JFX0FQUF9TRVJJQUxJWkVELFxuICB1c2VGYWN0b3J5OiBzZXJpYWxpemVUcmFuc2ZlclN0YXRlRmFjdG9yeSxcbiAgZGVwczogW0RPQ1VNRU5ULCBBUFBfSUQsIFRyYW5zZmVyU3RhdGVdLFxuICBtdWx0aTogdHJ1ZSxcbn1dO1xuXG5mdW5jdGlvbiBzZXJpYWxpemVUcmFuc2ZlclN0YXRlRmFjdG9yeShkb2M6IERvY3VtZW50LCBhcHBJZDogc3RyaW5nLCB0cmFuc2ZlclN0b3JlOiBUcmFuc2ZlclN0YXRlKSB7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgLy8gVGhlIGAudG9KU09OYCBoZXJlIGNhdXNlcyB0aGUgYG9uU2VyaWFsaXplYCBjYWxsYmFja3MgdG8gYmUgY2FsbGVkLlxuICAgIC8vIFRoZXNlIGNhbGxiYWNrcyBjYW4gYmUgdXNlZCB0byBwcm92aWRlIHRoZSB2YWx1ZSBmb3IgYSBnaXZlbiBrZXkuXG4gICAgY29uc3QgY29udGVudCA9IHRyYW5zZmVyU3RvcmUudG9Kc29uKCk7XG5cbiAgICBpZiAodHJhbnNmZXJTdG9yZS5pc0VtcHR5KSB7XG4gICAgICAvLyBUaGUgc3RhdGUgaXMgZW1wdHksIG5vdGhpbmcgdG8gdHJhbnNmZXIsXG4gICAgICAvLyBhdm9pZCBjcmVhdGluZyBhbiBleHRyYSBgPHNjcmlwdD5gIHRhZyBpbiB0aGlzIGNhc2UuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2NyaXB0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHNjcmlwdC5pZCA9IGFwcElkICsgJy1zdGF0ZSc7XG4gICAgc2NyaXB0LnNldEF0dHJpYnV0ZSgndHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgc2NyaXB0LnRleHRDb250ZW50ID0gY29udGVudDtcblxuICAgIC8vIEl0IGlzIGludGVudGlvbmFsIHRoYXQgd2UgYWRkIHRoZSBzY3JpcHQgYXQgdGhlIHZlcnkgYm90dG9tLiBBbmd1bGFyIENMSSBzY3JpcHQgdGFncyBmb3JcbiAgICAvLyBidW5kbGVzIGFyZSBhbHdheXMgYHR5cGU9XCJtb2R1bGVcImAuIFRoZXNlIGFyZSBkZWZlcnJlZCBieSBkZWZhdWx0IGFuZCBjYXVzZSB0aGUgdHJhbnNmZXJcbiAgICAvLyB0cmFuc2ZlciBkYXRhIHRvIGJlIHF1ZXJpZWQgb25seSBhZnRlciB0aGUgYnJvd3NlciBoYXMgZmluaXNoZWQgcGFyc2luZyB0aGUgRE9NLlxuICAgIGRvYy5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gIH07XG59XG5cbi8qKlxuICogTmdNb2R1bGUgdG8gaW5zdGFsbCBvbiB0aGUgc2VydmVyIHNpZGUgd2hpbGUgdXNpbmcgdGhlIGBUcmFuc2ZlclN0YXRlYCB0byB0cmFuc2ZlciBzdGF0ZSBmcm9tXG4gKiBzZXJ2ZXIgdG8gY2xpZW50LlxuICpcbiAqIE5vdGU6IHRoaXMgbW9kdWxlIGlzIG5vdCBuZWVkZWQgaWYgdGhlIGByZW5kZXJBcHBsaWNhdGlvbmAgZnVuY3Rpb24gaXMgdXNlZC5cbiAqIFRoZSBgcmVuZGVyQXBwbGljYXRpb25gIG1ha2VzIGFsbCBwcm92aWRlcnMgZnJvbSB0aGlzIG1vZHVsZSBhdmFpbGFibGUgaW4gdGhlIGFwcGxpY2F0aW9uLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIG5vIGxvbmdlciBuZWVkZWQsIHlvdSBjYW4gaW5qZWN0IHRoZSBgVHJhbnNmZXJTdGF0ZWAgaW4gYW4gYXBwIHdpdGhvdXQgcHJvdmlkaW5nXG4gKiAgICAgdGhpcyBtb2R1bGUuXG4gKi9cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJUcmFuc2ZlclN0YXRlTW9kdWxlIHtcbn1cbiJdfQ==