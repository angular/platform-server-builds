/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
var xhr2 = require('xhr2');
import { Injectable, Injector } from '@angular/core';
import { BrowserXhr, Http, ReadyState, RequestOptions, XHRBackend, XSRFStrategy } from '@angular/http';
import { HttpHandler, HttpBackend, XhrFactory, ɵHttpInterceptingHandler as HttpInterceptingHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
var isAbsoluteUrl = /^[a-zA-Z\-\+.]+:\/\//;
function validateRequestUrl(url) {
    if (!isAbsoluteUrl.test(url)) {
        throw new Error("URLs requested via Http on the server must be absolute. URL: " + url);
    }
}
var ServerXhr = /** @class */ (function () {
    function ServerXhr() {
    }
    ServerXhr.prototype.build = function () { return new xhr2.XMLHttpRequest(); };
    ServerXhr.decorators = [
        { type: Injectable }
    ];
    return ServerXhr;
}());
export { ServerXhr };
var ServerXsrfStrategy = /** @class */ (function () {
    function ServerXsrfStrategy() {
    }
    ServerXsrfStrategy.prototype.configureRequest = function (req) { };
    ServerXsrfStrategy.decorators = [
        { type: Injectable }
    ];
    return ServerXsrfStrategy;
}());
export { ServerXsrfStrategy };
var ZoneMacroTaskWrapper = /** @class */ (function () {
    function ZoneMacroTaskWrapper() {
    }
    ZoneMacroTaskWrapper.prototype.wrap = function (request) {
        var _this = this;
        return new Observable(function (observer) {
            var task = (null);
            var scheduled = false;
            var sub = null;
            var savedResult = null;
            var savedError = null;
            var scheduleTask = function (_task) {
                task = _task;
                scheduled = true;
                var delegate = _this.delegate(request);
                sub = delegate.subscribe(function (res) { return savedResult = res; }, function (err) {
                    if (!scheduled) {
                        throw new Error('An http observable was completed twice. This shouldn\'t happen, please file a bug.');
                    }
                    savedError = err;
                    scheduled = false;
                    task.invoke();
                }, function () {
                    if (!scheduled) {
                        throw new Error('An http observable was completed twice. This shouldn\'t happen, please file a bug.');
                    }
                    scheduled = false;
                    task.invoke();
                });
            };
            var cancelTask = function (_task) {
                if (!scheduled) {
                    return;
                }
                scheduled = false;
                if (sub) {
                    sub.unsubscribe();
                    sub = null;
                }
            };
            var onComplete = function () {
                if (savedError !== null) {
                    observer.error(savedError);
                }
                else {
                    observer.next(savedResult);
                    observer.complete();
                }
            };
            // MockBackend for Http is synchronous, which means that if scheduleTask is by
            // scheduleMacroTask, the request will hit MockBackend and the response will be
            // sent, causing task.invoke() to be called.
            var _task = Zone.current.scheduleMacroTask('ZoneMacroTaskWrapper.subscribe', onComplete, {}, function () { return null; }, cancelTask);
            scheduleTask(_task);
            return function () {
                if (scheduled && task) {
                    task.zone.cancelTask(task);
                    scheduled = false;
                }
                if (sub) {
                    sub.unsubscribe();
                    sub = null;
                }
            };
        });
    };
    return ZoneMacroTaskWrapper;
}());
export { ZoneMacroTaskWrapper };
var ZoneMacroTaskConnection = /** @class */ (function (_super) {
    tslib_1.__extends(ZoneMacroTaskConnection, _super);
    function ZoneMacroTaskConnection(request, backend) {
        var _this = _super.call(this) || this;
        _this.request = request;
        _this.backend = backend;
        validateRequestUrl(request.url);
        _this.response = _this.wrap(request);
        return _this;
    }
    ZoneMacroTaskConnection.prototype.delegate = function (request) {
        this.lastConnection = this.backend.createConnection(request);
        return this.lastConnection.response;
    };
    Object.defineProperty(ZoneMacroTaskConnection.prototype, "readyState", {
        get: function () {
            return !!this.lastConnection ? this.lastConnection.readyState : ReadyState.Unsent;
        },
        enumerable: true,
        configurable: true
    });
    return ZoneMacroTaskConnection;
}(ZoneMacroTaskWrapper));
export { ZoneMacroTaskConnection };
var ZoneMacroTaskBackend = /** @class */ (function () {
    function ZoneMacroTaskBackend(backend) {
        this.backend = backend;
    }
    ZoneMacroTaskBackend.prototype.createConnection = function (request) {
        return new ZoneMacroTaskConnection(request, this.backend);
    };
    return ZoneMacroTaskBackend;
}());
export { ZoneMacroTaskBackend };
var ZoneClientBackend = /** @class */ (function (_super) {
    tslib_1.__extends(ZoneClientBackend, _super);
    function ZoneClientBackend(backend) {
        var _this = _super.call(this) || this;
        _this.backend = backend;
        return _this;
    }
    ZoneClientBackend.prototype.handle = function (request) { return this.wrap(request); };
    ZoneClientBackend.prototype.delegate = function (request) {
        return this.backend.handle(request);
    };
    return ZoneClientBackend;
}(ZoneMacroTaskWrapper));
export { ZoneClientBackend };
export function httpFactory(xhrBackend, options) {
    var macroBackend = new ZoneMacroTaskBackend(xhrBackend);
    return new Http(macroBackend, options);
}
export function zoneWrappedInterceptingHandler(backend, injector) {
    var realBackend = new HttpInterceptingHandler(backend, injector);
    return new ZoneClientBackend(realBackend);
}
export var SERVER_HTTP_PROVIDERS = [
    { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions] },
    { provide: BrowserXhr, useClass: ServerXhr }, { provide: XSRFStrategy, useClass: ServerXsrfStrategy },
    { provide: XhrFactory, useClass: ServerXhr }, {
        provide: HttpHandler,
        useFactory: zoneWrappedInterceptingHandler,
        deps: [HttpBackend, Injector]
    }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXNlcnZlci9zcmMvaHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQVFBLElBQU0sSUFBSSxHQUFRLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUVsQyxPQUFPLEVBQUMsVUFBVSxFQUFFLFFBQVEsRUFBa0MsTUFBTSxlQUFlLENBQUM7QUFDcEYsT0FBTyxFQUFDLFVBQVUsRUFBaUMsSUFBSSxFQUFFLFVBQVUsRUFBVyxjQUFjLEVBQVksVUFBVSxFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV2SixPQUFPLEVBQXlCLFdBQVcsRUFBc0MsV0FBVyxFQUFFLFVBQVUsRUFBRSx3QkFBd0IsSUFBSSx1QkFBdUIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRTNMLE9BQU8sRUFBQyxVQUFVLEVBQXlCLE1BQU0sTUFBTSxDQUFDO0FBRXhELElBQU0sYUFBYSxHQUFHLHNCQUFzQixDQUFDO0FBRTdDLDRCQUE0QixHQUFXO0lBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0VBQWdFLEdBQUssQ0FBQyxDQUFDO0tBQ3hGO0NBQ0Y7Ozs7SUFJQyx5QkFBSyxHQUFMLGNBQTBCLE9BQU8sSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsRUFBRTs7Z0JBRjlELFVBQVU7O29CQXpCWDs7U0EwQmEsU0FBUzs7OztJQU1wQiw2Q0FBZ0IsR0FBaEIsVUFBaUIsR0FBWSxLQUFVOztnQkFGeEMsVUFBVTs7NkJBOUJYOztTQStCYSxrQkFBa0I7QUFJL0IsSUFBQTs7O0lBQ0UsbUNBQUksR0FBSixVQUFLLE9BQVU7UUFBZixpQkF3RUM7UUF2RUMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxVQUFDLFFBQXFCO1lBQzFD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QUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzFELE9BQU8sSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0NBQ3hDO0FBRUQsTUFBTSx5Q0FBeUMsT0FBb0IsRUFBRSxRQUFrQjtJQUNyRixJQUFNLFdBQVcsR0FBZ0IsSUFBSSx1QkFBdUIsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEYsT0FBTyxJQUFJLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0NBQzNDO0FBRUQsTUFBTSxDQUFDLElBQU0scUJBQXFCLEdBQWU7SUFDL0MsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxFQUFDO0lBQzVFLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBQztJQUNqRyxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQyxFQUFFO1FBQzFDLE9BQU8sRUFBRSxXQUFXO1FBQ3BCLFVBQVUsRUFBRSw4QkFBOEI7UUFDMUMsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQztLQUM5QjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmNvbnN0IHhocjI6IGFueSA9IHJlcXVpcmUoJ3hocjInKTtcblxuaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3RvciwgT3B0aW9uYWwsIFByb3ZpZGVyLCBJbmplY3RGbGFnc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Jyb3dzZXJYaHIsIENvbm5lY3Rpb24sIENvbm5lY3Rpb25CYWNrZW5kLCBIdHRwLCBSZWFkeVN0YXRlLCBSZXF1ZXN0LCBSZXF1ZXN0T3B0aW9ucywgUmVzcG9uc2UsIFhIUkJhY2tlbmQsIFhTUkZTdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5cbmltcG9ydCB7SHR0cEV2ZW50LCBIdHRwUmVxdWVzdCwgSHR0cEhhbmRsZXIsIEh0dHBJbnRlcmNlcHRvciwgSFRUUF9JTlRFUkNFUFRPUlMsIEh0dHBCYWNrZW5kLCBYaHJGYWN0b3J5LCDJtUh0dHBJbnRlcmNlcHRpbmdIYW5kbGVyIGFzIEh0dHBJbnRlcmNlcHRpbmdIYW5kbGVyfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7T2JzZXJ2YWJsZSwgT2JzZXJ2ZXIsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmNvbnN0IGlzQWJzb2x1dGVVcmwgPSAvXlthLXpBLVpcXC1cXCsuXSs6XFwvXFwvLztcblxuZnVuY3Rpb24gdmFsaWRhdGVSZXF1ZXN0VXJsKHVybDogc3RyaW5nKTogdm9pZCB7XG4gIGlmICghaXNBYnNvbHV0ZVVybC50ZXN0KHVybCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVSTHMgcmVxdWVzdGVkIHZpYSBIdHRwIG9uIHRoZSBzZXJ2ZXIgbXVzdCBiZSBhYnNvbHV0ZS4gVVJMOiAke3VybH1gKTtcbiAgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VydmVyWGhyIGltcGxlbWVudHMgQnJvd3NlclhociB7XG4gIGJ1aWxkKCk6IFhNTEh0dHBSZXF1ZXN0IHsgcmV0dXJuIG5ldyB4aHIyLlhNTEh0dHBSZXF1ZXN0KCk7IH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZlclhzcmZTdHJhdGVneSBpbXBsZW1lbnRzIFhTUkZTdHJhdGVneSB7XG4gIGNvbmZpZ3VyZVJlcXVlc3QocmVxOiBSZXF1ZXN0KTogdm9pZCB7fVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgWm9uZU1hY3JvVGFza1dyYXBwZXI8UywgUj4ge1xuICB3cmFwKHJlcXVlc3Q6IFMpOiBPYnNlcnZhYmxlPFI+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxSPikgPT4ge1xuICAgICAgbGV0IHRhc2s6IFRhc2sgPSBudWxsICE7XG4gICAgICBsZXQgc2NoZWR1bGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgICBsZXQgc3ViOiBTdWJzY3JpcHRpb258bnVsbCA9IG51bGw7XG4gICAgICBsZXQgc2F2ZWRSZXN1bHQ6IGFueSA9IG51bGw7XG4gICAgICBsZXQgc2F2ZWRFcnJvcjogYW55ID0gbnVsbDtcblxuICAgICAgY29uc3Qgc2NoZWR1bGVUYXNrID0gKF90YXNrOiBUYXNrKSA9PiB7XG4gICAgICAgIHRhc2sgPSBfdGFzaztcbiAgICAgICAgc2NoZWR1bGVkID0gdHJ1ZTtcblxuICAgICAgICBjb25zdCBkZWxlZ2F0ZSA9IHRoaXMuZGVsZWdhdGUocmVxdWVzdCk7XG4gICAgICAgIHN1YiA9IGRlbGVnYXRlLnN1YnNjcmliZShcbiAgICAgICAgICAgIHJlcyA9PiBzYXZlZFJlc3VsdCA9IHJlcyxcbiAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgIGlmICghc2NoZWR1bGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICAgICAnQW4gaHR0cCBvYnNlcnZhYmxlIHdhcyBjb21wbGV0ZWQgdHdpY2UuIFRoaXMgc2hvdWxkblxcJ3QgaGFwcGVuLCBwbGVhc2UgZmlsZSBhIGJ1Zy4nKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzYXZlZEVycm9yID0gZXJyO1xuICAgICAgICAgICAgICBzY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGFzay5pbnZva2UoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghc2NoZWR1bGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICAgICAnQW4gaHR0cCBvYnNlcnZhYmxlIHdhcyBjb21wbGV0ZWQgdHdpY2UuIFRoaXMgc2hvdWxkblxcJ3QgaGFwcGVuLCBwbGVhc2UgZmlsZSBhIGJ1Zy4nKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGFzay5pbnZva2UoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgY2FuY2VsVGFzayA9IChfdGFzazogVGFzaykgPT4ge1xuICAgICAgICBpZiAoIXNjaGVkdWxlZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHN1Yikge1xuICAgICAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIHN1YiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IG9uQ29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgIGlmIChzYXZlZEVycm9yICE9PSBudWxsKSB7XG4gICAgICAgICAgb2JzZXJ2ZXIuZXJyb3Ioc2F2ZWRFcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChzYXZlZFJlc3VsdCk7XG4gICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8gTW9ja0JhY2tlbmQgZm9yIEh0dHAgaXMgc3luY2hyb25vdXMsIHdoaWNoIG1lYW5zIHRoYXQgaWYgc2NoZWR1bGVUYXNrIGlzIGJ5XG4gICAgICAvLyBzY2hlZHVsZU1hY3JvVGFzaywgdGhlIHJlcXVlc3Qgd2lsbCBoaXQgTW9ja0JhY2tlbmQgYW5kIHRoZSByZXNwb25zZSB3aWxsIGJlXG4gICAgICAvLyBzZW50LCBjYXVzaW5nIHRhc2suaW52b2tlKCkgdG8gYmUgY2FsbGVkLlxuICAgICAgY29uc3QgX3Rhc2sgPSBab25lLmN1cnJlbnQuc2NoZWR1bGVNYWNyb1Rhc2soXG4gICAgICAgICAgJ1pvbmVNYWNyb1Rhc2tXcmFwcGVyLnN1YnNjcmliZScsIG9uQ29tcGxldGUsIHt9LCAoKSA9PiBudWxsLCBjYW5jZWxUYXNrKTtcbiAgICAgIHNjaGVkdWxlVGFzayhfdGFzayk7XG5cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmIChzY2hlZHVsZWQgJiYgdGFzaykge1xuICAgICAgICAgIHRhc2suem9uZS5jYW5jZWxUYXNrKHRhc2spO1xuICAgICAgICAgIHNjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdWIpIHtcbiAgICAgICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICBzdWIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGRlbGVnYXRlKHJlcXVlc3Q6IFMpOiBPYnNlcnZhYmxlPFI+O1xufVxuXG5leHBvcnQgY2xhc3MgWm9uZU1hY3JvVGFza0Nvbm5lY3Rpb24gZXh0ZW5kcyBab25lTWFjcm9UYXNrV3JhcHBlcjxSZXF1ZXN0LCBSZXNwb25zZT4gaW1wbGVtZW50c1xuICAgIENvbm5lY3Rpb24ge1xuICByZXNwb25zZTogT2JzZXJ2YWJsZTxSZXNwb25zZT47XG4gIGxhc3RDb25uZWN0aW9uOiBDb25uZWN0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZXF1ZXN0OiBSZXF1ZXN0LCBwcml2YXRlIGJhY2tlbmQ6IFhIUkJhY2tlbmQpIHtcbiAgICBzdXBlcigpO1xuICAgIHZhbGlkYXRlUmVxdWVzdFVybChyZXF1ZXN0LnVybCk7XG4gICAgdGhpcy5yZXNwb25zZSA9IHRoaXMud3JhcChyZXF1ZXN0KTtcbiAgfVxuXG4gIGRlbGVnYXRlKHJlcXVlc3Q6IFJlcXVlc3QpOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XG4gICAgdGhpcy5sYXN0Q29ubmVjdGlvbiA9IHRoaXMuYmFja2VuZC5jcmVhdGVDb25uZWN0aW9uKHJlcXVlc3QpO1xuICAgIHJldHVybiB0aGlzLmxhc3RDb25uZWN0aW9uLnJlc3BvbnNlIGFzIE9ic2VydmFibGU8UmVzcG9uc2U+O1xuICB9XG5cbiAgZ2V0IHJlYWR5U3RhdGUoKTogUmVhZHlTdGF0ZSB7XG4gICAgcmV0dXJuICEhdGhpcy5sYXN0Q29ubmVjdGlvbiA/IHRoaXMubGFzdENvbm5lY3Rpb24ucmVhZHlTdGF0ZSA6IFJlYWR5U3RhdGUuVW5zZW50O1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBab25lTWFjcm9UYXNrQmFja2VuZCBpbXBsZW1lbnRzIENvbm5lY3Rpb25CYWNrZW5kIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBiYWNrZW5kOiBYSFJCYWNrZW5kKSB7fVxuXG4gIGNyZWF0ZUNvbm5lY3Rpb24ocmVxdWVzdDogYW55KTogWm9uZU1hY3JvVGFza0Nvbm5lY3Rpb24ge1xuICAgIHJldHVybiBuZXcgWm9uZU1hY3JvVGFza0Nvbm5lY3Rpb24ocmVxdWVzdCwgdGhpcy5iYWNrZW5kKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgWm9uZUNsaWVudEJhY2tlbmQgZXh0ZW5kc1xuICAgIFpvbmVNYWNyb1Rhc2tXcmFwcGVyPEh0dHBSZXF1ZXN0PGFueT4sIEh0dHBFdmVudDxhbnk+PiBpbXBsZW1lbnRzIEh0dHBCYWNrZW5kIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBiYWNrZW5kOiBIdHRwQmFja2VuZCkgeyBzdXBlcigpOyB9XG5cbiAgaGFuZGxlKHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4pOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7IHJldHVybiB0aGlzLndyYXAocmVxdWVzdCk7IH1cblxuICBwcm90ZWN0ZWQgZGVsZWdhdGUocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55Pik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICByZXR1cm4gdGhpcy5iYWNrZW5kLmhhbmRsZShyZXF1ZXN0KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaHR0cEZhY3RvcnkoeGhyQmFja2VuZDogWEhSQmFja2VuZCwgb3B0aW9uczogUmVxdWVzdE9wdGlvbnMpIHtcbiAgY29uc3QgbWFjcm9CYWNrZW5kID0gbmV3IFpvbmVNYWNyb1Rhc2tCYWNrZW5kKHhockJhY2tlbmQpO1xuICByZXR1cm4gbmV3IEh0dHAobWFjcm9CYWNrZW5kLCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHpvbmVXcmFwcGVkSW50ZXJjZXB0aW5nSGFuZGxlcihiYWNrZW5kOiBIdHRwQmFja2VuZCwgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gIGNvbnN0IHJlYWxCYWNrZW5kOiBIdHRwQmFja2VuZCA9IG5ldyBIdHRwSW50ZXJjZXB0aW5nSGFuZGxlcihiYWNrZW5kLCBpbmplY3Rvcik7XG4gIHJldHVybiBuZXcgWm9uZUNsaWVudEJhY2tlbmQocmVhbEJhY2tlbmQpO1xufVxuXG5leHBvcnQgY29uc3QgU0VSVkVSX0hUVFBfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xuICB7cHJvdmlkZTogSHR0cCwgdXNlRmFjdG9yeTogaHR0cEZhY3RvcnksIGRlcHM6IFtYSFJCYWNrZW5kLCBSZXF1ZXN0T3B0aW9uc119LFxuICB7cHJvdmlkZTogQnJvd3NlclhociwgdXNlQ2xhc3M6IFNlcnZlclhocn0sIHtwcm92aWRlOiBYU1JGU3RyYXRlZ3ksIHVzZUNsYXNzOiBTZXJ2ZXJYc3JmU3RyYXRlZ3l9LFxuICB7cHJvdmlkZTogWGhyRmFjdG9yeSwgdXNlQ2xhc3M6IFNlcnZlclhocn0sIHtcbiAgICBwcm92aWRlOiBIdHRwSGFuZGxlcixcbiAgICB1c2VGYWN0b3J5OiB6b25lV3JhcHBlZEludGVyY2VwdGluZ0hhbmRsZXIsXG4gICAgZGVwczogW0h0dHBCYWNrZW5kLCBJbmplY3Rvcl1cbiAgfVxuXTtcbiJdfQ==