/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { APP_ID, NgModule } from '@angular/core';
import { DOCUMENT, TransferState, ɵescapeHtml as escapeHtml } from '@angular/platform-browser';
import { BEFORE_APP_SERIALIZED } from './tokens';
export function serializeTransferStateFactory(doc, appId, transferStore) {
    return function () {
        var script = doc.createElement('script');
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
 * @experimental
 */
var ServerTransferStateModule = /** @class */ (function () {
    function ServerTransferStateModule() {
    }
    ServerTransferStateModule.decorators = [
        { type: NgModule, args: [{
                    providers: [
                        TransferState, {
                            provide: BEFORE_APP_SERIALIZED,
                            useFactory: serializeTransferStateFactory,
                            deps: [DOCUMENT, APP_ID, TransferState],
                            multi: true,
                        }
                    ]
                },] }
    ];
    return ServerTransferStateModule;
}());
export { ServerTransferStateModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXJfc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3RyYW5zZmVyX3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUMsUUFBUSxFQUFFLGFBQWEsRUFBRSxXQUFXLElBQUksVUFBVSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFFN0YsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBRS9DLE1BQU0sd0NBQ0YsR0FBYSxFQUFFLEtBQWEsRUFBRSxhQUE0QjtJQUM1RCxNQUFNLENBQUM7UUFDTCxJQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsS0FBSyxHQUFHLFFBQVEsQ0FBQztRQUM3QixNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3hELEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzlCLENBQUM7Q0FDSDs7Ozs7Ozs7Ozs7Z0JBUUEsUUFBUSxTQUFDO29CQUNSLFNBQVMsRUFBRTt3QkFDVCxhQUFhLEVBQUU7NEJBQ2IsT0FBTyxFQUFFLHFCQUFxQjs0QkFDOUIsVUFBVSxFQUFFLDZCQUE2Qjs0QkFDekMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUM7NEJBQ3ZDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGO2lCQUNGOztvQ0F2Q0Q7O1NBd0NhLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBUFBfSUQsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlQsIFRyYW5zZmVyU3RhdGUsIMm1ZXNjYXBlSHRtbCBhcyBlc2NhcGVIdG1sfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHtCRUZPUkVfQVBQX1NFUklBTElaRUR9IGZyb20gJy4vdG9rZW5zJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZVRyYW5zZmVyU3RhdGVGYWN0b3J5KFxuICAgIGRvYzogRG9jdW1lbnQsIGFwcElkOiBzdHJpbmcsIHRyYW5zZmVyU3RvcmU6IFRyYW5zZmVyU3RhdGUpIHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBjb25zdCBzY3JpcHQgPSBkb2MuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgc2NyaXB0LmlkID0gYXBwSWQgKyAnLXN0YXRlJztcbiAgICBzY3JpcHQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICBzY3JpcHQudGV4dENvbnRlbnQgPSBlc2NhcGVIdG1sKHRyYW5zZmVyU3RvcmUudG9Kc29uKCkpO1xuICAgIGRvYy5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gIH07XG59XG5cbi8qKlxuICogTmdNb2R1bGUgdG8gaW5zdGFsbCBvbiB0aGUgc2VydmVyIHNpZGUgd2hpbGUgdXNpbmcgdGhlIGBUcmFuc2ZlclN0YXRlYCB0byB0cmFuc2ZlciBzdGF0ZSBmcm9tXG4gKiBzZXJ2ZXIgdG8gY2xpZW50LlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgVHJhbnNmZXJTdGF0ZSwge1xuICAgICAgcHJvdmlkZTogQkVGT1JFX0FQUF9TRVJJQUxJWkVELFxuICAgICAgdXNlRmFjdG9yeTogc2VyaWFsaXplVHJhbnNmZXJTdGF0ZUZhY3RvcnksXG4gICAgICBkZXBzOiBbRE9DVU1FTlQsIEFQUF9JRCwgVHJhbnNmZXJTdGF0ZV0sXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgU2VydmVyVHJhbnNmZXJTdGF0ZU1vZHVsZSB7XG59XG4iXX0=