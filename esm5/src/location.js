import { Inject, Injectable, Optional } from '@angular/core';
import { DOCUMENT, ɵgetDOM as getDOM } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import * as url from 'url';
import { INITIAL_CONFIG } from './tokens';
import * as i0 from "@angular/core";
function parseUrl(urlStr) {
    var parsedUrl = url.parse(urlStr);
    return {
        pathname: parsedUrl.pathname || '',
        search: parsedUrl.search || '',
        hash: parsedUrl.hash || '',
    };
}
/**
 * Server-side implementation of URL state. Implements `pathname`, `search`, and `hash`
 * but not the state stack.
 */
var ServerPlatformLocation = /** @class */ (function () {
    function ServerPlatformLocation(_doc, _config) {
        this._doc = _doc;
        this.pathname = '/';
        this.search = '';
        this.hash = '';
        this._hashUpdate = new Subject();
        var config = _config;
        if (!!config && !!config.url) {
            var parsedUrl = parseUrl(config.url);
            this.pathname = parsedUrl.pathname;
            this.search = parsedUrl.search;
            this.hash = parsedUrl.hash;
        }
    }
    ServerPlatformLocation.prototype.getBaseHrefFromDOM = function () { return getDOM().getBaseHref(this._doc); };
    ServerPlatformLocation.prototype.onPopState = function (fn) {
        // No-op: a state stack is not implemented, so
        // no events will ever come.
    };
    ServerPlatformLocation.prototype.onHashChange = function (fn) { this._hashUpdate.subscribe(fn); };
    Object.defineProperty(ServerPlatformLocation.prototype, "url", {
        get: function () { return "" + this.pathname + this.search + this.hash; },
        enumerable: true,
        configurable: true
    });
    ServerPlatformLocation.prototype.setHash = function (value, oldUrl) {
        var _this = this;
        if (this.hash === value) {
            // Don't fire events if the hash has not changed.
            return;
        }
        this.hash = value;
        var newUrl = this.url;
        scheduleMicroTask(function () { return _this._hashUpdate.next({
            type: 'hashchange', state: null, oldUrl: oldUrl, newUrl: newUrl
        }); });
    };
    ServerPlatformLocation.prototype.replaceState = function (state, title, newUrl) {
        var oldUrl = this.url;
        var parsedUrl = parseUrl(newUrl);
        this.pathname = parsedUrl.pathname;
        this.search = parsedUrl.search;
        this.setHash(parsedUrl.hash, oldUrl);
    };
    ServerPlatformLocation.prototype.pushState = function (state, title, newUrl) {
        this.replaceState(state, title, newUrl);
    };
    ServerPlatformLocation.prototype.forward = function () { throw new Error('Not implemented'); };
    ServerPlatformLocation.prototype.back = function () { throw new Error('Not implemented'); };
    ServerPlatformLocation.ngInjectableDef = i0.defineInjectable({ token: ServerPlatformLocation, factory: function ServerPlatformLocation_Factory(t) { return new (t || ServerPlatformLocation)(i0.inject(DOCUMENT), i0.inject(INITIAL_CONFIG, 8)); }, providedIn: null });
    return ServerPlatformLocation;
}());
export { ServerPlatformLocation };
export function scheduleMicroTask(fn) {
    Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL2xvY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUMsUUFBUSxFQUFFLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN0RSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sS0FBSyxHQUFHLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sRUFBQyxjQUFjLEVBQWlCLE1BQU0sVUFBVSxDQUFDOztBQUd4RCxTQUFTLFFBQVEsQ0FBQyxNQUFjO0lBQzlCLElBQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsT0FBTztRQUNMLFFBQVEsRUFBRSxTQUFTLENBQUMsUUFBUSxJQUFJLEVBQUU7UUFDbEMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxNQUFNLElBQUksRUFBRTtRQUM5QixJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksSUFBSSxFQUFFO0tBQzNCLENBQUM7QUFDSixDQUFDO0FBRUQ7OztHQUdHO0FBQ0g7SUFPRSxnQ0FDOEIsSUFBUyxFQUFzQyxPQUFZO1FBQTNELFNBQUksR0FBSixJQUFJLENBQUs7UUFOdkIsYUFBUSxHQUFXLEdBQUcsQ0FBQztRQUN2QixXQUFNLEdBQVcsRUFBRSxDQUFDO1FBQ3BCLFNBQUksR0FBVyxFQUFFLENBQUM7UUFDMUIsZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBdUIsQ0FBQztRQUl2RCxJQUFNLE1BQU0sR0FBRyxPQUFnQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUM1QixJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFDL0IsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztJQUVELG1EQUFrQixHQUFsQixjQUErQixPQUFPLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFHLENBQUMsQ0FBQyxDQUFDO0lBRTFFLDJDQUFVLEdBQVYsVUFBVyxFQUEwQjtRQUNuQyw4Q0FBOEM7UUFDOUMsNEJBQTRCO0lBQzlCLENBQUM7SUFFRCw2Q0FBWSxHQUFaLFVBQWEsRUFBMEIsSUFBVSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFbEYsc0JBQUksdUNBQUc7YUFBUCxjQUFvQixPQUFPLEtBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFNLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUVsRSx3Q0FBTyxHQUFmLFVBQWdCLEtBQWEsRUFBRSxNQUFjO1FBQTdDLGlCQVVDO1FBVEMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRTtZQUN2QixpREFBaUQ7WUFDakQsT0FBTztTQUNSO1FBQ0EsSUFBc0IsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ3JDLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDeEIsaUJBQWlCLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQzVDLElBQUksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLFFBQUEsRUFBRSxNQUFNLFFBQUE7U0FDekIsQ0FBQyxFQUZELENBRUMsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCw2Q0FBWSxHQUFaLFVBQWEsS0FBVSxFQUFFLEtBQWEsRUFBRSxNQUFjO1FBQ3BELElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDeEIsSUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xDLElBQTBCLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFDekQsSUFBd0IsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUNwRCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELDBDQUFTLEdBQVQsVUFBVSxLQUFVLEVBQUUsS0FBYSxFQUFFLE1BQWM7UUFDakQsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCx3Q0FBTyxHQUFQLGNBQWtCLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFdkQscUNBQUksR0FBSixjQUFlLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7MEVBdER6QyxzQkFBc0IseUVBQXRCLHNCQUFzQixZQU9yQixRQUFRLGFBQXlDLGNBQWM7aUNBckM3RTtDQXFGQyxBQXhERCxJQXdEQztTQXZEWSxzQkFBc0I7QUF5RG5DLE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxFQUFZO0lBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDMUQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtMb2NhdGlvbkNoYW5nZUV2ZW50LCBMb2NhdGlvbkNoYW5nZUxpc3RlbmVyLCBQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlQsIMm1Z2V0RE9NIGFzIGdldERPTX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0ICogYXMgdXJsIGZyb20gJ3VybCc7XG5pbXBvcnQge0lOSVRJQUxfQ09ORklHLCBQbGF0Zm9ybUNvbmZpZ30gZnJvbSAnLi90b2tlbnMnO1xuXG5cbmZ1bmN0aW9uIHBhcnNlVXJsKHVybFN0cjogc3RyaW5nKToge3BhdGhuYW1lOiBzdHJpbmcsIHNlYXJjaDogc3RyaW5nLCBoYXNoOiBzdHJpbmd9IHtcbiAgY29uc3QgcGFyc2VkVXJsID0gdXJsLnBhcnNlKHVybFN0cik7XG4gIHJldHVybiB7XG4gICAgcGF0aG5hbWU6IHBhcnNlZFVybC5wYXRobmFtZSB8fCAnJyxcbiAgICBzZWFyY2g6IHBhcnNlZFVybC5zZWFyY2ggfHwgJycsXG4gICAgaGFzaDogcGFyc2VkVXJsLmhhc2ggfHwgJycsXG4gIH07XG59XG5cbi8qKlxuICogU2VydmVyLXNpZGUgaW1wbGVtZW50YXRpb24gb2YgVVJMIHN0YXRlLiBJbXBsZW1lbnRzIGBwYXRobmFtZWAsIGBzZWFyY2hgLCBhbmQgYGhhc2hgXG4gKiBidXQgbm90IHRoZSBzdGF0ZSBzdGFjay5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZlclBsYXRmb3JtTG9jYXRpb24gaW1wbGVtZW50cyBQbGF0Zm9ybUxvY2F0aW9uIHtcbiAgcHVibGljIHJlYWRvbmx5IHBhdGhuYW1lOiBzdHJpbmcgPSAnLyc7XG4gIHB1YmxpYyByZWFkb25seSBzZWFyY2g6IHN0cmluZyA9ICcnO1xuICBwdWJsaWMgcmVhZG9ubHkgaGFzaDogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgX2hhc2hVcGRhdGUgPSBuZXcgU3ViamVjdDxMb2NhdGlvbkNoYW5nZUV2ZW50PigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jOiBhbnksIEBPcHRpb25hbCgpIEBJbmplY3QoSU5JVElBTF9DT05GSUcpIF9jb25maWc6IGFueSkge1xuICAgIGNvbnN0IGNvbmZpZyA9IF9jb25maWcgYXMgUGxhdGZvcm1Db25maWcgfCBudWxsO1xuICAgIGlmICghIWNvbmZpZyAmJiAhIWNvbmZpZy51cmwpIHtcbiAgICAgIGNvbnN0IHBhcnNlZFVybCA9IHBhcnNlVXJsKGNvbmZpZy51cmwpO1xuICAgICAgdGhpcy5wYXRobmFtZSA9IHBhcnNlZFVybC5wYXRobmFtZTtcbiAgICAgIHRoaXMuc2VhcmNoID0gcGFyc2VkVXJsLnNlYXJjaDtcbiAgICAgIHRoaXMuaGFzaCA9IHBhcnNlZFVybC5oYXNoO1xuICAgIH1cbiAgfVxuXG4gIGdldEJhc2VIcmVmRnJvbURPTSgpOiBzdHJpbmcgeyByZXR1cm4gZ2V0RE9NKCkuZ2V0QmFzZUhyZWYodGhpcy5fZG9jKSAhOyB9XG5cbiAgb25Qb3BTdGF0ZShmbjogTG9jYXRpb25DaGFuZ2VMaXN0ZW5lcik6IHZvaWQge1xuICAgIC8vIE5vLW9wOiBhIHN0YXRlIHN0YWNrIGlzIG5vdCBpbXBsZW1lbnRlZCwgc29cbiAgICAvLyBubyBldmVudHMgd2lsbCBldmVyIGNvbWUuXG4gIH1cblxuICBvbkhhc2hDaGFuZ2UoZm46IExvY2F0aW9uQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHsgdGhpcy5faGFzaFVwZGF0ZS5zdWJzY3JpYmUoZm4pOyB9XG5cbiAgZ2V0IHVybCgpOiBzdHJpbmcgeyByZXR1cm4gYCR7dGhpcy5wYXRobmFtZX0ke3RoaXMuc2VhcmNofSR7dGhpcy5oYXNofWA7IH1cblxuICBwcml2YXRlIHNldEhhc2godmFsdWU6IHN0cmluZywgb2xkVXJsOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5oYXNoID09PSB2YWx1ZSkge1xuICAgICAgLy8gRG9uJ3QgZmlyZSBldmVudHMgaWYgdGhlIGhhc2ggaGFzIG5vdCBjaGFuZ2VkLlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAodGhpcyBhc3toYXNoOiBzdHJpbmd9KS5oYXNoID0gdmFsdWU7XG4gICAgY29uc3QgbmV3VXJsID0gdGhpcy51cmw7XG4gICAgc2NoZWR1bGVNaWNyb1Rhc2soKCkgPT4gdGhpcy5faGFzaFVwZGF0ZS5uZXh0KHtcbiAgICAgIHR5cGU6ICdoYXNoY2hhbmdlJywgc3RhdGU6IG51bGwsIG9sZFVybCwgbmV3VXJsXG4gICAgfSBhcyBMb2NhdGlvbkNoYW5nZUV2ZW50KSk7XG4gIH1cblxuICByZXBsYWNlU3RhdGUoc3RhdGU6IGFueSwgdGl0bGU6IHN0cmluZywgbmV3VXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBvbGRVcmwgPSB0aGlzLnVybDtcbiAgICBjb25zdCBwYXJzZWRVcmwgPSBwYXJzZVVybChuZXdVcmwpO1xuICAgICh0aGlzIGFze3BhdGhuYW1lOiBzdHJpbmd9KS5wYXRobmFtZSA9IHBhcnNlZFVybC5wYXRobmFtZTtcbiAgICAodGhpcyBhc3tzZWFyY2g6IHN0cmluZ30pLnNlYXJjaCA9IHBhcnNlZFVybC5zZWFyY2g7XG4gICAgdGhpcy5zZXRIYXNoKHBhcnNlZFVybC5oYXNoLCBvbGRVcmwpO1xuICB9XG5cbiAgcHVzaFN0YXRlKHN0YXRlOiBhbnksIHRpdGxlOiBzdHJpbmcsIG5ld1VybDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5yZXBsYWNlU3RhdGUoc3RhdGUsIHRpdGxlLCBuZXdVcmwpO1xuICB9XG5cbiAgZm9yd2FyZCgpOiB2b2lkIHsgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTsgfVxuXG4gIGJhY2soKTogdm9pZCB7IHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNjaGVkdWxlTWljcm9UYXNrKGZuOiBGdW5jdGlvbikge1xuICBab25lLmN1cnJlbnQuc2NoZWR1bGVNaWNyb1Rhc2soJ3NjaGVkdWxlTWljcm90YXNrJywgZm4pO1xufVxuIl19