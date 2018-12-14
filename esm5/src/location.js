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
/*@__PURE__*/ i0.ɵsetClassMetadata(ServerPlatformLocation, [{
        type: Injectable
    }], function () { return [{
        type: undefined,
        decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }]
    }, {
        type: undefined,
        decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [INITIAL_CONFIG]
            }]
    }]; }, null);
export function scheduleMicroTask(fn) {
    Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiLi4vLi4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL2xvY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUMsUUFBUSxFQUFFLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN0RSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sS0FBSyxHQUFHLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sRUFBQyxjQUFjLEVBQWlCLE1BQU0sVUFBVSxDQUFDOztBQUd4RCxTQUFTLFFBQVEsQ0FBQyxNQUFjO0lBQzlCLElBQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsT0FBTztRQUNMLFFBQVEsRUFBRSxTQUFTLENBQUMsUUFBUSxJQUFJLEVBQUU7UUFDbEMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxNQUFNLElBQUksRUFBRTtRQUM5QixJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksSUFBSSxFQUFFO0tBQzNCLENBQUM7QUFDSixDQUFDO0FBRUQ7OztHQUdHO0FBQ0g7SUFPRSxnQ0FDOEIsSUFBUyxFQUFzQyxPQUFZO1FBQTNELFNBQUksR0FBSixJQUFJLENBQUs7UUFOdkIsYUFBUSxHQUFXLEdBQUcsQ0FBQztRQUN2QixXQUFNLEdBQVcsRUFBRSxDQUFDO1FBQ3BCLFNBQUksR0FBVyxFQUFFLENBQUM7UUFDMUIsZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBdUIsQ0FBQztRQUl2RCxJQUFNLE1BQU0sR0FBRyxPQUFnQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUM1QixJ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IEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TG9jYXRpb25DaGFuZ2VFdmVudCwgTG9jYXRpb25DaGFuZ2VMaXN0ZW5lciwgUGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5ULCDJtWdldERPTSBhcyBnZXRET019IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCAqIGFzIHVybCBmcm9tICd1cmwnO1xuaW1wb3J0IHtJTklUSUFMX0NPTkZJRywgUGxhdGZvcm1Db25maWd9IGZyb20gJy4vdG9rZW5zJztcblxuXG5mdW5jdGlvbiBwYXJzZVVybCh1cmxTdHI6IHN0cmluZyk6IHtwYXRobmFtZTogc3RyaW5nLCBzZWFyY2g6IHN0cmluZywgaGFzaDogc3RyaW5nfSB7XG4gIGNvbnN0IHBhcnNlZFVybCA9IHVybC5wYXJzZSh1cmxTdHIpO1xuICByZXR1cm4ge1xuICAgIHBhdGhuYW1lOiBwYXJzZWRVcmwucGF0aG5hbWUgfHwgJycsXG4gICAgc2VhcmNoOiBwYXJzZWRVcmwuc2VhcmNoIHx8ICcnLFxuICAgIGhhc2g6IHBhcnNlZFVybC5oYXNoIHx8ICcnLFxuICB9O1xufVxuXG4vKipcbiAqIFNlcnZlci1zaWRlIGltcGxlbWVudGF0aW9uIG9mIFVSTCBzdGF0ZS4gSW1wbGVtZW50cyBgcGF0aG5hbWVgLCBgc2VhcmNoYCwgYW5kIGBoYXNoYFxuICogYnV0IG5vdCB0aGUgc3RhdGUgc3RhY2suXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJQbGF0Zm9ybUxvY2F0aW9uIGltcGxlbWVudHMgUGxhdGZvcm1Mb2NhdGlvbiB7XG4gIHB1YmxpYyByZWFkb25seSBwYXRobmFtZTogc3RyaW5nID0gJy8nO1xuICBwdWJsaWMgcmVhZG9ubHkgc2VhcmNoOiBzdHJpbmcgPSAnJztcbiAgcHVibGljIHJlYWRvbmx5IGhhc2g6IHN0cmluZyA9ICcnO1xuICBwcml2YXRlIF9oYXNoVXBkYXRlID0gbmV3IFN1YmplY3Q8TG9jYXRpb25DaGFuZ2VFdmVudD4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvYzogYW55LCBAT3B0aW9uYWwoKSBASW5qZWN0KElOSVRJQUxfQ09ORklHKSBfY29uZmlnOiBhbnkpIHtcbiAgICBjb25zdCBjb25maWcgPSBfY29uZmlnIGFzIFBsYXRmb3JtQ29uZmlnIHwgbnVsbDtcbiAgICBpZiAoISFjb25maWcgJiYgISFjb25maWcudXJsKSB7XG4gICAgICBjb25zdCBwYXJzZWRVcmwgPSBwYXJzZVVybChjb25maWcudXJsKTtcbiAgICAgIHRoaXMucGF0aG5hbWUgPSBwYXJzZWRVcmwucGF0aG5hbWU7XG4gICAgICB0aGlzLnNlYXJjaCA9IHBhcnNlZFVybC5zZWFyY2g7XG4gICAgICB0aGlzLmhhc2ggPSBwYXJzZWRVcmwuaGFzaDtcbiAgICB9XG4gIH1cblxuICBnZXRCYXNlSHJlZkZyb21ET00oKTogc3RyaW5nIHsgcmV0dXJuIGdldERPTSgpLmdldEJhc2VIcmVmKHRoaXMuX2RvYykgITsgfVxuXG4gIG9uUG9wU3RhdGUoZm46IExvY2F0aW9uQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICAvLyBOby1vcDogYSBzdGF0ZSBzdGFjayBpcyBub3QgaW1wbGVtZW50ZWQsIHNvXG4gICAgLy8gbm8gZXZlbnRzIHdpbGwgZXZlciBjb21lLlxuICB9XG5cbiAgb25IYXNoQ2hhbmdlKGZuOiBMb2NhdGlvbkNoYW5nZUxpc3RlbmVyKTogdm9pZCB7IHRoaXMuX2hhc2hVcGRhdGUuc3Vic2NyaWJlKGZuKTsgfVxuXG4gIGdldCB1cmwoKTogc3RyaW5nIHsgcmV0dXJuIGAke3RoaXMucGF0aG5hbWV9JHt0aGlzLnNlYXJjaH0ke3RoaXMuaGFzaH1gOyB9XG5cbiAgcHJpdmF0ZSBzZXRIYXNoKHZhbHVlOiBzdHJpbmcsIG9sZFVybDogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuaGFzaCA9PT0gdmFsdWUpIHtcbiAgICAgIC8vIERvbid0IGZpcmUgZXZlbnRzIGlmIHRoZSBoYXNoIGhhcyBub3QgY2hhbmdlZC5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgKHRoaXMgYXN7aGFzaDogc3RyaW5nfSkuaGFzaCA9IHZhbHVlO1xuICAgIGNvbnN0IG5ld1VybCA9IHRoaXMudXJsO1xuICAgIHNjaGVkdWxlTWljcm9UYXNrKCgpID0+IHRoaXMuX2hhc2hVcGRhdGUubmV4dCh7XG4gICAgICB0eXBlOiAnaGFzaGNoYW5nZScsIHN0YXRlOiBudWxsLCBvbGRVcmwsIG5ld1VybFxuICAgIH0gYXMgTG9jYXRpb25DaGFuZ2VFdmVudCkpO1xuICB9XG5cbiAgcmVwbGFjZVN0YXRlKHN0YXRlOiBhbnksIHRpdGxlOiBzdHJpbmcsIG5ld1VybDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qgb2xkVXJsID0gdGhpcy51cmw7XG4gICAgY29uc3QgcGFyc2VkVXJsID0gcGFyc2VVcmwobmV3VXJsKTtcbiAgICAodGhpcyBhc3twYXRobmFtZTogc3RyaW5nfSkucGF0aG5hbWUgPSBwYXJzZWRVcmwucGF0aG5hbWU7XG4gICAgKHRoaXMgYXN7c2VhcmNoOiBzdHJpbmd9KS5zZWFyY2ggPSBwYXJzZWRVcmwuc2VhcmNoO1xuICAgIHRoaXMuc2V0SGFzaChwYXJzZWRVcmwuaGFzaCwgb2xkVXJsKTtcbiAgfVxuXG4gIHB1c2hTdGF0ZShzdGF0ZTogYW55LCB0aXRsZTogc3RyaW5nLCBuZXdVcmw6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMucmVwbGFjZVN0YXRlKHN0YXRlLCB0aXRsZSwgbmV3VXJsKTtcbiAgfVxuXG4gIGZvcndhcmQoKTogdm9pZCB7IHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7IH1cblxuICBiYWNrKCk6IHZvaWQgeyB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzY2hlZHVsZU1pY3JvVGFzayhmbjogRnVuY3Rpb24pIHtcbiAgWm9uZS5jdXJyZW50LnNjaGVkdWxlTWljcm9UYXNrKCdzY2hlZHVsZU1pY3JvdGFzaycsIGZuKTtcbn1cbiJdfQ==