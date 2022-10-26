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
        if (transferStore.isEmpty) {
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
 * @deprecated no longer needed, you can inject the `TransferState` in an app without providing
 *     this module.
 */
export class ServerTransferStateModule {
}
ServerTransferStateModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.0-next.0+sha-e78885e", ngImport: i0, type: ServerTransferStateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ServerTransferStateModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.1.0-next.0+sha-e78885e", ngImport: i0, type: ServerTransferStateModule });
ServerTransferStateModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.1.0-next.0+sha-e78885e", ngImport: i0, type: ServerTransferStateModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.0-next.0+sha-e78885e", ngImport: i0, type: ServerTransferStateModule, decorators: [{
            type: NgModule,
            args: [{}]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXJfc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3RyYW5zZmVyX3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBVyxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUMsYUFBYSxFQUFFLFdBQVcsSUFBSSxVQUFVLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUVuRixPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxVQUFVLENBQUM7O0FBRS9DLE1BQU0sQ0FBQyxNQUFNLHNDQUFzQyxHQUFlLENBQUM7UUFDakUsT0FBTyxFQUFFLHFCQUFxQjtRQUM5QixVQUFVLEVBQUUsNkJBQTZCO1FBQ3pDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDO1FBQ3ZDLEtBQUssRUFBRSxJQUFJO0tBQ1osQ0FBQyxDQUFDO0FBRUgsU0FBUyw2QkFBNkIsQ0FBQyxHQUFhLEVBQUUsS0FBYSxFQUFFLGFBQTRCO0lBQy9GLE9BQU8sR0FBRyxFQUFFO1FBQ1YsSUFBSSxhQUFhLENBQUMsT0FBTyxFQUFFO1lBQ3pCLDJDQUEyQztZQUMzQyx1REFBdUQ7WUFDdkQsT0FBTztTQUNSO1FBQ0QsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxNQUFNLENBQUMsRUFBRSxHQUFHLEtBQUssR0FBRyxRQUFRLENBQUM7UUFDN0IsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN4RCxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQ7Ozs7Ozs7Ozs7R0FVRztBQUVILE1BQU0sT0FBTyx5QkFBeUI7O2lJQUF6Qix5QkFBeUI7a0lBQXpCLHlCQUF5QjtrSUFBekIseUJBQXlCO3NHQUF6Qix5QkFBeUI7a0JBRHJDLFFBQVE7bUJBQUMsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtBUFBfSUQsIE5nTW9kdWxlLCBQcm92aWRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1RyYW5zZmVyU3RhdGUsIMm1ZXNjYXBlSHRtbCBhcyBlc2NhcGVIdG1sfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHtCRUZPUkVfQVBQX1NFUklBTElaRUR9IGZyb20gJy4vdG9rZW5zJztcblxuZXhwb3J0IGNvbnN0IFRSQU5TRkVSX1NUQVRFX1NFUklBTElaQVRJT05fUFJPVklERVJTOiBQcm92aWRlcltdID0gW3tcbiAgcHJvdmlkZTogQkVGT1JFX0FQUF9TRVJJQUxJWkVELFxuICB1c2VGYWN0b3J5OiBzZXJpYWxpemVUcmFuc2ZlclN0YXRlRmFjdG9yeSxcbiAgZGVwczogW0RPQ1VNRU5ULCBBUFBfSUQsIFRyYW5zZmVyU3RhdGVdLFxuICBtdWx0aTogdHJ1ZSxcbn1dO1xuXG5mdW5jdGlvbiBzZXJpYWxpemVUcmFuc2ZlclN0YXRlRmFjdG9yeShkb2M6IERvY3VtZW50LCBhcHBJZDogc3RyaW5nLCB0cmFuc2ZlclN0b3JlOiBUcmFuc2ZlclN0YXRlKSB7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgaWYgKHRyYW5zZmVyU3RvcmUuaXNFbXB0eSkge1xuICAgICAgLy8gVGhlIHN0YXRlIGlzIGVtcHR5LCBub3RoaW5nIHRvIHRyYW5zZmVyLFxuICAgICAgLy8gYXZvaWQgY3JlYXRpbmcgYW4gZXh0cmEgYDxzY3JpcHQ+YCB0YWcgaW4gdGhpcyBjYXNlLlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBzY3JpcHQgPSBkb2MuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgc2NyaXB0LmlkID0gYXBwSWQgKyAnLXN0YXRlJztcbiAgICBzY3JpcHQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICBzY3JpcHQudGV4dENvbnRlbnQgPSBlc2NhcGVIdG1sKHRyYW5zZmVyU3RvcmUudG9Kc29uKCkpO1xuICAgIGRvYy5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gIH07XG59XG5cbi8qKlxuICogTmdNb2R1bGUgdG8gaW5zdGFsbCBvbiB0aGUgc2VydmVyIHNpZGUgd2hpbGUgdXNpbmcgdGhlIGBUcmFuc2ZlclN0YXRlYCB0byB0cmFuc2ZlciBzdGF0ZSBmcm9tXG4gKiBzZXJ2ZXIgdG8gY2xpZW50LlxuICpcbiAqIE5vdGU6IHRoaXMgbW9kdWxlIGlzIG5vdCBuZWVkZWQgaWYgdGhlIGByZW5kZXJBcHBsaWNhdGlvbmAgZnVuY3Rpb24gaXMgdXNlZC5cbiAqIFRoZSBgcmVuZGVyQXBwbGljYXRpb25gIG1ha2VzIGFsbCBwcm92aWRlcnMgZnJvbSB0aGlzIG1vZHVsZSBhdmFpbGFibGUgaW4gdGhlIGFwcGxpY2F0aW9uLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIG5vIGxvbmdlciBuZWVkZWQsIHlvdSBjYW4gaW5qZWN0IHRoZSBgVHJhbnNmZXJTdGF0ZWAgaW4gYW4gYXBwIHdpdGhvdXQgcHJvdmlkaW5nXG4gKiAgICAgdGhpcyBtb2R1bGUuXG4gKi9cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJUcmFuc2ZlclN0YXRlTW9kdWxlIHtcbn1cbiJdfQ==