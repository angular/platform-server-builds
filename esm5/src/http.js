/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
var xhr2 = require('xhr2');
import { Injectable, Optional } from '@angular/core';
import { BrowserXhr, Http, ReadyState, RequestOptions, XHRBackend, XSRFStrategy } from '@angular/http';
import { HttpHandler, HTTP_INTERCEPTORS, HttpBackend, XhrFactory, ɵinterceptingHandler as interceptingHandler } from '@angular/common/http';
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
export function zoneWrappedInterceptingHandler(backend, interceptors) {
    var realBackend = interceptingHandler(backend, interceptors);
    return new ZoneClientBackend(realBackend);
}
export var SERVER_HTTP_PROVIDERS = [
    { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions] },
    { provide: BrowserXhr, useClass: ServerXhr }, { provide: XSRFStrategy, useClass: ServerXsrfStrategy },
    { provide: XhrFactory, useClass: ServerXhr }, {
        provide: HttpHandler,
        useFactory: zoneWrappedInterceptingHandler,
        deps: [HttpBackend, [new Optional(), HTTP_INTERCEPTORS]]
    }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXNlcnZlci9zcmMvaHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQVFBLElBQU0sSUFBSSxHQUFRLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUVsQyxPQUFPLEVBQUMsVUFBVSxFQUFFLFFBQVEsRUFBVyxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUMsVUFBVSxFQUFpQyxJQUFJLEVBQUUsVUFBVSxFQUFXLGNBQWMsRUFBWSxVQUFVLEVBQUUsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXZKLE9BQU8sRUFBeUIsV0FBVyxFQUFtQixpQkFBaUIsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLG9CQUFvQixJQUFJLG1CQUFtQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFbkwsT0FBTyxFQUFDLFVBQVUsRUFBeUIsTUFBTSxNQUFNLENBQUM7QUFFeEQsSUFBTSxhQUFhLEdBQUcsc0JBQXNCLENBQUM7QUFFN0MsNEJBQTRCLEdBQVc7SUFDckMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrRUFBZ0UsR0FBSyxDQUFDLENBQUM7S0FDeEY7Q0FDRjs7OztJQUlDLHlCQUFLLEdBQUwsY0FBMEIsT0FBTyxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxFQUFFOztnQkFGOUQsVUFBVTs7b0JBekJYOztTQTBCYSxTQUFTOzs7O0lBTXBCLDZDQUFnQixHQUFoQixVQUFpQixHQUFZLEtBQVU7O2dCQUZ4QyxVQUFVOzs2QkE5Qlg7O1NBK0JhLGtCQUFrQjtBQUkvQixJQUFBOzs7SUFDRSxtQ0FBSSxHQUFKLFVBQUssT0FBVTtRQUFmLGlCQXdFQztRQXZFQyxPQUFPLElBQUksVUFBVSxDQUFDLFVBQUMs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QUFHLElBQUksb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUQsT0FBTyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7Q0FDeEM7QUFFRCxNQUFNLHlDQUNGLE9BQW9CLEVBQUUsWUFBc0M7SUFDOUQsSUFBTSxXQUFXLEdBQWdCLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztJQUM1RSxPQUFPLElBQUksaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7Q0FDM0M7QUFFRCxNQUFNLENBQUMsSUFBTSxxQkFBcUIsR0FBZTtJQUMvQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLEVBQUM7SUFDNUUsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFDO0lBQ2pHLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFDLEVBQUU7UUFDMUMsT0FBTyxFQUFFLFdBQVc7UUFDcEIsVUFBVSxFQUFFLDhCQUE4QjtRQUMxQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLFFBQVEsRUFBRSxFQUFFLGlCQUFpQixDQUFDLENBQUM7S0FDekQ7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5jb25zdCB4aHIyOiBhbnkgPSByZXF1aXJlKCd4aHIyJyk7XG5cbmltcG9ydCB7SW5qZWN0YWJsZSwgT3B0aW9uYWwsIFByb3ZpZGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QnJvd3NlclhociwgQ29ubmVjdGlvbiwgQ29ubmVjdGlvbkJhY2tlbmQsIEh0dHAsIFJlYWR5U3RhdGUsIFJlcXVlc3QsIFJlcXVlc3RPcHRpb25zLCBSZXNwb25zZSwgWEhSQmFja2VuZCwgWFNSRlN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9odHRwJztcblxuaW1wb3J0IHtIdHRwRXZlbnQsIEh0dHBSZXF1ZXN0LCBIdHRwSGFuZGxlciwgSHR0cEludGVyY2VwdG9yLCBIVFRQX0lOVEVSQ0VQVE9SUywgSHR0cEJhY2tlbmQsIFhockZhY3RvcnksIMm1aW50ZXJjZXB0aW5nSGFuZGxlciBhcyBpbnRlcmNlcHRpbmdIYW5kbGVyfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7T2JzZXJ2YWJsZSwgT2JzZXJ2ZXIsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmNvbnN0IGlzQWJzb2x1dGVVcmwgPSAvXlthLXpBLVpcXC1cXCsuXSs6XFwvXFwvLztcblxuZnVuY3Rpb24gdmFsaWRhdGVSZXF1ZXN0VXJsKHVybDogc3RyaW5nKTogdm9pZCB7XG4gIGlmICghaXNBYnNvbHV0ZVVybC50ZXN0KHVybCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVSTHMgcmVxdWVzdGVkIHZpYSBIdHRwIG9uIHRoZSBzZXJ2ZXIgbXVzdCBiZSBhYnNvbHV0ZS4gVVJMOiAke3VybH1gKTtcbiAgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VydmVyWGhyIGltcGxlbWVudHMgQnJvd3NlclhociB7XG4gIGJ1aWxkKCk6IFhNTEh0dHBSZXF1ZXN0IHsgcmV0dXJuIG5ldyB4aHIyLlhNTEh0dHBSZXF1ZXN0KCk7IH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZlclhzcmZTdHJhdGVneSBpbXBsZW1lbnRzIFhTUkZTdHJhdGVneSB7XG4gIGNvbmZpZ3VyZVJlcXVlc3QocmVxOiBSZXF1ZXN0KTogdm9pZCB7fVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgWm9uZU1hY3JvVGFza1dyYXBwZXI8UywgUj4ge1xuICB3cmFwKHJlcXVlc3Q6IFMpOiBPYnNlcnZhYmxlPFI+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxSPikgPT4ge1xuICAgICAgbGV0IHRhc2s6IFRhc2sgPSBudWxsICE7XG4gICAgICBsZXQgc2NoZWR1bGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgICBsZXQgc3ViOiBTdWJzY3JpcHRpb258bnVsbCA9IG51bGw7XG4gICAgICBsZXQgc2F2ZWRSZXN1bHQ6IGFueSA9IG51bGw7XG4gICAgICBsZXQgc2F2ZWRFcnJvcjogYW55ID0gbnVsbDtcblxuICAgICAgY29uc3Qgc2NoZWR1bGVUYXNrID0gKF90YXNrOiBUYXNrKSA9PiB7XG4gICAgICAgIHRhc2sgPSBfdGFzaztcbiAgICAgICAgc2NoZWR1bGVkID0gdHJ1ZTtcblxuICAgICAgICBjb25zdCBkZWxlZ2F0ZSA9IHRoaXMuZGVsZWdhdGUocmVxdWVzdCk7XG4gICAgICAgIHN1YiA9IGRlbGVnYXRlLnN1YnNjcmliZShcbiAgICAgICAgICAgIHJlcyA9PiBzYXZlZFJlc3VsdCA9IHJlcyxcbiAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgIGlmICghc2NoZWR1bGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICAgICAnQW4gaHR0cCBvYnNlcnZhYmxlIHdhcyBjb21wbGV0ZWQgdHdpY2UuIFRoaXMgc2hvdWxkblxcJ3QgaGFwcGVuLCBwbGVhc2UgZmlsZSBhIGJ1Zy4nKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzYXZlZEVycm9yID0gZXJyO1xuICAgICAgICAgICAgICBzY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGFzay5pbnZva2UoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghc2NoZWR1bGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICAgICAnQW4gaHR0cCBvYnNlcnZhYmxlIHdhcyBjb21wbGV0ZWQgdHdpY2UuIFRoaXMgc2hvdWxkblxcJ3QgaGFwcGVuLCBwbGVhc2UgZmlsZSBhIGJ1Zy4nKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGFzay5pbnZva2UoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgY2FuY2VsVGFzayA9IChfdGFzazogVGFzaykgPT4ge1xuICAgICAgICBpZiAoIXNjaGVkdWxlZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHN1Yikge1xuICAgICAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIHN1YiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IG9uQ29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgIGlmIChzYXZlZEVycm9yICE9PSBudWxsKSB7XG4gICAgICAgICAgb2JzZXJ2ZXIuZXJyb3Ioc2F2ZWRFcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChzYXZlZFJlc3VsdCk7XG4gICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8gTW9ja0JhY2tlbmQgZm9yIEh0dHAgaXMgc3luY2hyb25vdXMsIHdoaWNoIG1lYW5zIHRoYXQgaWYgc2NoZWR1bGVUYXNrIGlzIGJ5XG4gICAgICAvLyBzY2hlZHVsZU1hY3JvVGFzaywgdGhlIHJlcXVlc3Qgd2lsbCBoaXQgTW9ja0JhY2tlbmQgYW5kIHRoZSByZXNwb25zZSB3aWxsIGJlXG4gICAgICAvLyBzZW50LCBjYXVzaW5nIHRhc2suaW52b2tlKCkgdG8gYmUgY2FsbGVkLlxuICAgICAgY29uc3QgX3Rhc2sgPSBab25lLmN1cnJlbnQuc2NoZWR1bGVNYWNyb1Rhc2soXG4gICAgICAgICAgJ1pvbmVNYWNyb1Rhc2tXcmFwcGVyLnN1YnNjcmliZScsIG9uQ29tcGxldGUsIHt9LCAoKSA9PiBudWxsLCBjYW5jZWxUYXNrKTtcbiAgICAgIHNjaGVkdWxlVGFzayhfdGFzayk7XG5cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmIChzY2hlZHVsZWQgJiYgdGFzaykge1xuICAgICAgICAgIHRhc2suem9uZS5jYW5jZWxUYXNrKHRhc2spO1xuICAgICAgICAgIHNjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdWIpIHtcbiAgICAgICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICBzdWIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGRlbGVnYXRlKHJlcXVlc3Q6IFMpOiBPYnNlcnZhYmxlPFI+O1xufVxuXG5leHBvcnQgY2xhc3MgWm9uZU1hY3JvVGFza0Nvbm5lY3Rpb24gZXh0ZW5kcyBab25lTWFjcm9UYXNrV3JhcHBlcjxSZXF1ZXN0LCBSZXNwb25zZT4gaW1wbGVtZW50c1xuICAgIENvbm5lY3Rpb24ge1xuICByZXNwb25zZTogT2JzZXJ2YWJsZTxSZXNwb25zZT47XG4gIGxhc3RDb25uZWN0aW9uOiBDb25uZWN0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZXF1ZXN0OiBSZXF1ZXN0LCBwcml2YXRlIGJhY2tlbmQ6IFhIUkJhY2tlbmQpIHtcbiAgICBzdXBlcigpO1xuICAgIHZhbGlkYXRlUmVxdWVzdFVybChyZXF1ZXN0LnVybCk7XG4gICAgdGhpcy5yZXNwb25zZSA9IHRoaXMud3JhcChyZXF1ZXN0KTtcbiAgfVxuXG4gIGRlbGVnYXRlKHJlcXVlc3Q6IFJlcXVlc3QpOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XG4gICAgdGhpcy5sYXN0Q29ubmVjdGlvbiA9IHRoaXMuYmFja2VuZC5jcmVhdGVDb25uZWN0aW9uKHJlcXVlc3QpO1xuICAgIHJldHVybiB0aGlzLmxhc3RDb25uZWN0aW9uLnJlc3BvbnNlIGFzIE9ic2VydmFibGU8UmVzcG9uc2U+O1xuICB9XG5cbiAgZ2V0IHJlYWR5U3RhdGUoKTogUmVhZHlTdGF0ZSB7XG4gICAgcmV0dXJuICEhdGhpcy5sYXN0Q29ubmVjdGlvbiA/IHRoaXMubGFzdENvbm5lY3Rpb24ucmVhZHlTdGF0ZSA6IFJlYWR5U3RhdGUuVW5zZW50O1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBab25lTWFjcm9UYXNrQmFja2VuZCBpbXBsZW1lbnRzIENvbm5lY3Rpb25CYWNrZW5kIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBiYWNrZW5kOiBYSFJCYWNrZW5kKSB7fVxuXG4gIGNyZWF0ZUNvbm5lY3Rpb24ocmVxdWVzdDogYW55KTogWm9uZU1hY3JvVGFza0Nvbm5lY3Rpb24ge1xuICAgIHJldHVybiBuZXcgWm9uZU1hY3JvVGFza0Nvbm5lY3Rpb24ocmVxdWVzdCwgdGhpcy5iYWNrZW5kKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgWm9uZUNsaWVudEJhY2tlbmQgZXh0ZW5kc1xuICAgIFpvbmVNYWNyb1Rhc2tXcmFwcGVyPEh0dHBSZXF1ZXN0PGFueT4sIEh0dHBFdmVudDxhbnk+PiBpbXBsZW1lbnRzIEh0dHBCYWNrZW5kIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBiYWNrZW5kOiBIdHRwQmFja2VuZCkgeyBzdXBlcigpOyB9XG5cbiAgaGFuZGxlKHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4pOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7IHJldHVybiB0aGlzLndyYXAocmVxdWVzdCk7IH1cblxuICBwcm90ZWN0ZWQgZGVsZWdhdGUocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55Pik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICByZXR1cm4gdGhpcy5iYWNrZW5kLmhhbmRsZShyZXF1ZXN0KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaHR0cEZhY3RvcnkoeGhyQmFja2VuZDogWEhSQmFja2VuZCwgb3B0aW9uczogUmVxdWVzdE9wdGlvbnMpIHtcbiAgY29uc3QgbWFjcm9CYWNrZW5kID0gbmV3IFpvbmVNYWNyb1Rhc2tCYWNrZW5kKHhockJhY2tlbmQpO1xuICByZXR1cm4gbmV3IEh0dHAobWFjcm9CYWNrZW5kLCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHpvbmVXcmFwcGVkSW50ZXJjZXB0aW5nSGFuZGxlcihcbiAgICBiYWNrZW5kOiBIdHRwQmFja2VuZCwgaW50ZXJjZXB0b3JzOiBIdHRwSW50ZXJjZXB0b3JbXSB8IG51bGwpIHtcbiAgY29uc3QgcmVhbEJhY2tlbmQ6IEh0dHBCYWNrZW5kID0gaW50ZXJjZXB0aW5nSGFuZGxlcihiYWNrZW5kLCBpbnRlcmNlcHRvcnMpO1xuICByZXR1cm4gbmV3IFpvbmVDbGllbnRCYWNrZW5kKHJlYWxCYWNrZW5kKTtcbn1cblxuZXhwb3J0IGNvbnN0IFNFUlZFUl9IVFRQX1BST1ZJREVSUzogUHJvdmlkZXJbXSA9IFtcbiAge3Byb3ZpZGU6IEh0dHAsIHVzZUZhY3Rvcnk6IGh0dHBGYWN0b3J5LCBkZXBzOiBbWEhSQmFja2VuZCwgUmVxdWVzdE9wdGlvbnNdfSxcbiAge3Byb3ZpZGU6IEJyb3dzZXJYaHIsIHVzZUNsYXNzOiBTZXJ2ZXJYaHJ9LCB7cHJvdmlkZTogWFNSRlN0cmF0ZWd5LCB1c2VDbGFzczogU2VydmVyWHNyZlN0cmF0ZWd5fSxcbiAge3Byb3ZpZGU6IFhockZhY3RvcnksIHVzZUNsYXNzOiBTZXJ2ZXJYaHJ9LCB7XG4gICAgcHJvdmlkZTogSHR0cEhhbmRsZXIsXG4gICAgdXNlRmFjdG9yeTogem9uZVdyYXBwZWRJbnRlcmNlcHRpbmdIYW5kbGVyLFxuICAgIGRlcHM6IFtIdHRwQmFja2VuZCwgW25ldyBPcHRpb25hbCgpLCBIVFRQX0lOVEVSQ0VQVE9SU11dXG4gIH1cbl07XG4iXX0=