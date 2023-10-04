/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformLocation, XhrFactory } from '@angular/common';
import { HttpBackend, HttpHandler, ɵHttpInterceptorHandler as HttpInterceptorHandler } from '@angular/common/http';
import { EnvironmentInjector, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as xhr2 from 'xhr2';
import { INITIAL_CONFIG } from './tokens';
import * as i0 from "@angular/core";
// @see https://www.w3.org/Protocols/HTTP/1.1/draft-ietf-http-v11-spec-01#URI-syntax
const isAbsoluteUrl = /^[a-zA-Z\-\+.]+:\/\//;
export class ServerXhr {
    build() {
        return new xhr2.XMLHttpRequest();
    }
}
ServerXhr.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10+sha-035aee0", ngImport: i0, type: ServerXhr, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ServerXhr.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10+sha-035aee0", ngImport: i0, type: ServerXhr });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10+sha-035aee0", ngImport: i0, type: ServerXhr, decorators: [{
            type: Injectable
        }] });
export class ZoneMacroTaskWrapper {
    wrap(request) {
        return new Observable((observer) => {
            let task = null;
            let scheduled = false;
            let sub = null;
            let savedResult = null;
            let savedError = null;
            const scheduleTask = (_task) => {
                task = _task;
                scheduled = true;
                const delegate = this.delegate(request);
                sub = delegate.subscribe(res => savedResult = res, err => {
                    if (!scheduled) {
                        throw new Error('An http observable was completed twice. This shouldn\'t happen, please file a bug.');
                    }
                    savedError = err;
                    scheduled = false;
                    task.invoke();
                }, () => {
                    if (!scheduled) {
                        throw new Error('An http observable was completed twice. This shouldn\'t happen, please file a bug.');
                    }
                    scheduled = false;
                    task.invoke();
                });
            };
            const cancelTask = (_task) => {
                if (!scheduled) {
                    return;
                }
                scheduled = false;
                if (sub) {
                    sub.unsubscribe();
                    sub = null;
                }
            };
            const onComplete = () => {
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
            const _task = Zone.current.scheduleMacroTask('ZoneMacroTaskWrapper.subscribe', onComplete, {}, () => null, cancelTask);
            scheduleTask(_task);
            return () => {
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
    }
}
export class ZoneClientBackend extends ZoneMacroTaskWrapper {
    constructor(backend, platformLocation, config) {
        super();
        this.backend = backend;
        this.platformLocation = platformLocation;
        this.config = config;
    }
    handle(request) {
        const { href, protocol, hostname, port } = this.platformLocation;
        if (this.config.useAbsoluteUrl && !isAbsoluteUrl.test(request.url) &&
            isAbsoluteUrl.test(href)) {
            const baseHref = this.platformLocation.getBaseHrefFromDOM() || href;
            const urlPrefix = `${protocol}//${hostname}` + (port ? `:${port}` : '');
            const baseUrl = new URL(baseHref, urlPrefix);
            const url = new URL(request.url, baseUrl);
            return this.wrap(request.clone({ url: url.toString() }));
        }
        return this.wrap(request);
    }
    delegate(request) {
        return this.backend.handle(request);
    }
}
export function zoneWrappedInterceptorHandler(platformLocation, config) {
    return new ZoneClientBackend(new HttpInterceptorHandler(inject(HttpBackend), inject(EnvironmentInjector)), platformLocation, config);
}
export const SERVER_HTTP_PROVIDERS = [
    { provide: XhrFactory, useClass: ServerXhr }, {
        provide: HttpHandler,
        useFactory: zoneWrappedInterceptorHandler,
        deps: [PlatformLocation, INITIAL_CONFIG]
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXNlcnZlci9zcmMvaHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsVUFBVSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0QsT0FBTyxFQUFDLFdBQVcsRUFBYSxXQUFXLEVBQWUsdUJBQXVCLElBQUksc0JBQXNCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN6SSxPQUFPLEVBQUMsbUJBQW1CLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBVyxNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUMsVUFBVSxFQUF5QixNQUFNLE1BQU0sQ0FBQztBQUN4RCxPQUFPLEtBQUssSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUU3QixPQUFPLEVBQUMsY0FBYyxFQUFpQixNQUFNLFVBQVUsQ0FBQzs7QUFFeEQsb0ZBQW9GO0FBQ3BGLE1BQU0sYUFBYSxHQUFHLHNCQUFzQixDQUFDO0FBRzdDLE1BQU0sT0FBTyxTQUFTO0lBQ3BCLEtBQUs7UUFDSCxPQUFPLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ25DLENBQUM7O2lIQUhVLFNBQVM7cUhBQVQsU0FBUztzR0FBVCxTQUFTO2tCQURyQixVQUFVOztBQU9YLE1BQU0sT0FBZ0Isb0JBQW9CO0lBQ3hDLElBQUksQ0FBQyxPQUFVO1FBQ2IsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFDLFFBQXFCLEVBQUUsRUFBRTtZQUM5QyxJQUFJLElBQUksR0FBUyxJQUFLLENBQUM7WUFDdkIsSUFBSSxTQUFTLEdBQVksS0FBSyxDQUFDO1lBQy9CLElBQUksR0FBRyxHQUFzQixJQUFJLENBQUM7WUFDbEMsSUFBSSxXQUFXLEdBQVEsSUFBSSxDQUFDO1lBQzVCLElBQUksVUFBVSxHQUFRLElBQUksQ0FBQztZQUUzQixNQUFN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cUJBQXFCLEdBQWU7SUFDL0MsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUMsRUFBRTtRQUMxQyxPQUFPLEVBQUUsV0FBVztRQUNwQixVQUFVLEVBQUUsNkJBQTZCO1FBQ3pDLElBQUksRUFBRSxDQUFDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQztLQUN6QztDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtQbGF0Zm9ybUxvY2F0aW9uLCBYaHJGYWN0b3J5fSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtIdHRwQmFja2VuZCwgSHR0cEV2ZW50LCBIdHRwSGFuZGxlciwgSHR0cFJlcXVlc3QsIMm1SHR0cEludGVyY2VwdG9ySGFuZGxlciBhcyBIdHRwSW50ZXJjZXB0b3JIYW5kbGVyfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge0Vudmlyb25tZW50SW5qZWN0b3IsIGluamVjdCwgSW5qZWN0YWJsZSwgUHJvdmlkZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBPYnNlcnZlciwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCAqIGFzIHhocjIgZnJvbSAneGhyMic7XG5cbmltcG9ydCB7SU5JVElBTF9DT05GSUcsIFBsYXRmb3JtQ29uZmlnfSBmcm9tICcuL3Rva2Vucyc7XG5cbi8vIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1Byb3RvY29scy9IVFRQLzEuMS9kcmFmdC1pZXRmLWh0dHAtdjExLXNwZWMtMDEjVVJJLXN5bnRheFxuY29uc3QgaXNBYnNvbHV0ZVVybCA9IC9eW2EtekEtWlxcLVxcKy5dKzpcXC9cXC8vO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VydmVyWGhyIGltcGxlbWVudHMgWGhyRmFjdG9yeSB7XG4gIGJ1aWxkKCk6IFhNTEh0dHBSZXF1ZXN0IHtcbiAgICByZXR1cm4gbmV3IHhocjIuWE1MSHR0cFJlcXVlc3QoKTtcbiAgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgWm9uZU1hY3JvVGFza1dyYXBwZXI8UywgUj4ge1xuICB3cmFwKHJlcXVlc3Q6IFMpOiBPYnNlcnZhYmxlPFI+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxSPikgPT4ge1xuICAgICAgbGV0IHRhc2s6IFRhc2sgPSBudWxsITtcbiAgICAgIGxldCBzY2hlZHVsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgIGxldCBzdWI6IFN1YnNjcmlwdGlvbnxudWxsID0gbnVsbDtcbiAgICAgIGxldCBzYXZlZFJlc3VsdDogYW55ID0gbnVsbDtcbiAgICAgIGxldCBzYXZlZEVycm9yOiBhbnkgPSBudWxsO1xuXG4gICAgICBjb25zdCBzY2hlZHVsZVRhc2sgPSAoX3Rhc2s6IFRhc2spID0+IHtcbiAgICAgICAgdGFzayA9IF90YXNrO1xuICAgICAgICBzY2hlZHVsZWQgPSB0cnVlO1xuXG4gICAgICAgIGNvbnN0IGRlbGVnYXRlID0gdGhpcy5kZWxlZ2F0ZShyZXF1ZXN0KTtcbiAgICAgICAgc3ViID0gZGVsZWdhdGUuc3Vic2NyaWJlKFxuICAgICAgICAgICAgcmVzID0+IHNhdmVkUmVzdWx0ID0gcmVzLFxuICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFzY2hlZHVsZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICdBbiBodHRwIG9ic2VydmFibGUgd2FzIGNvbXBsZXRlZCB0d2ljZS4gVGhpcyBzaG91bGRuXFwndCBoYXBwZW4sIHBsZWFzZSBmaWxlIGEgYnVnLicpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNhdmVkRXJyb3IgPSBlcnI7XG4gICAgICAgICAgICAgIHNjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICB0YXNrLmludm9rZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFzY2hlZHVsZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICdBbiBodHRwIG9ic2VydmFibGUgd2FzIGNvbXBsZXRlZCB0d2ljZS4gVGhpcyBzaG91bGRuXFwndCBoYXBwZW4sIHBsZWFzZSBmaWxlIGEgYnVnLicpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICB0YXNrLmludm9rZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBjYW5jZWxUYXNrID0gKF90YXNrOiBUYXNrKSA9PiB7XG4gICAgICAgIGlmICghc2NoZWR1bGVkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICBpZiAoc3ViKSB7XG4gICAgICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgc3ViID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgY29uc3Qgb25Db21wbGV0ZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKHNhdmVkRXJyb3IgIT09IG51bGwpIHtcbiAgICAgICAgICBvYnNlcnZlci5lcnJvcihzYXZlZEVycm9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvYnNlcnZlci5uZXh0KHNhdmVkUmVzdWx0KTtcbiAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyBNb2NrQmFja2VuZCBmb3IgSHR0cCBpcyBzeW5jaHJvbm91cywgd2hpY2ggbWVhbnMgdGhhdCBpZiBzY2hlZHVsZVRhc2sgaXMgYnlcbiAgICAgIC8vIHNjaGVkdWxlTWFjcm9UYXNrLCB0aGUgcmVxdWVzdCB3aWxsIGhpdCBNb2NrQmFja2VuZCBhbmQgdGhlIHJlc3BvbnNlIHdpbGwgYmVcbiAgICAgIC8vIHNlbnQsIGNhdXNpbmcgdGFzay5pbnZva2UoKSB0byBiZSBjYWxsZWQuXG4gICAgICBjb25zdCBfdGFzayA9IFpvbmUuY3VycmVudC5zY2hlZHVsZU1hY3JvVGFzayhcbiAgICAgICAgICAnWm9uZU1hY3JvVGFza1dyYXBwZXIuc3Vic2NyaWJlJywgb25Db21wbGV0ZSwge30sICgpID0+IG51bGwsIGNhbmNlbFRhc2spO1xuICAgICAgc2NoZWR1bGVUYXNrKF90YXNrKTtcblxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKHNjaGVkdWxlZCAmJiB0YXNrKSB7XG4gICAgICAgICAgdGFzay56b25lLmNhbmNlbFRhc2sodGFzayk7XG4gICAgICAgICAgc2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN1Yikge1xuICAgICAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIHN1YiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgZGVsZWdhdGUocmVxdWVzdDogUyk6IE9ic2VydmFibGU8Uj47XG59XG5cbmV4cG9ydCBjbGFzcyBab25lQ2xpZW50QmFja2VuZCBleHRlbmRzXG4gICAgWm9uZU1hY3JvVGFza1dyYXBwZXI8SHR0cFJlcXVlc3Q8YW55PiwgSHR0cEV2ZW50PGFueT4+IGltcGxlbWVudHMgSHR0cEJhY2tlbmQge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgYmFja2VuZDogSHR0cEJhY2tlbmQsIHByaXZhdGUgcGxhdGZvcm1Mb2NhdGlvbjogUGxhdGZvcm1Mb2NhdGlvbixcbiAgICAgIHByaXZhdGUgY29uZmlnOiBQbGF0Zm9ybUNvbmZpZykge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBoYW5kbGUocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55Pik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICBjb25zdCB7aHJlZiwgcHJvdG9jb2wsIGhvc3RuYW1lLCBwb3J0fSA9IHRoaXMucGxhdGZvcm1Mb2NhdGlvbjtcbiAgICBpZiAodGhpcy5jb25maWcudXNlQWJzb2x1dGVVcmwgJiYgIWlzQWJzb2x1dGVVcmwudGVzdChyZXF1ZXN0LnVybCkgJiZcbiAgICAgICAgaXNBYnNvbHV0ZVVybC50ZXN0KGhyZWYpKSB7XG4gICAgICBjb25zdCBiYXNlSHJlZiA9IHRoaXMucGxhdGZvcm1Mb2NhdGlvbi5nZXRCYXNlSHJlZkZyb21ET00oKSB8fCBocmVmO1xuICAgICAgY29uc3QgdXJsUHJlZml4ID0gYCR7cHJvdG9jb2x9Ly8ke2hvc3RuYW1lfWAgKyAocG9ydCA/IGA6JHtwb3J0fWAgOiAnJyk7XG4gICAgICBjb25zdCBiYXNlVXJsID0gbmV3IFVSTChiYXNlSHJlZiwgdXJsUHJlZml4KTtcbiAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocmVxdWVzdC51cmwsIGJhc2VVcmwpO1xuICAgICAgcmV0dXJuIHRoaXMud3JhcChyZXF1ZXN0LmNsb25lKHt1cmw6IHVybC50b1N0cmluZygpfSkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy53cmFwKHJlcXVlc3QpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGRlbGVnYXRlKHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4pOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgcmV0dXJuIHRoaXMuYmFja2VuZC5oYW5kbGUocmVxdWVzdCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHpvbmVXcmFwcGVkSW50ZXJjZXB0b3JIYW5kbGVyKFxuICAgIHBsYXRmb3JtTG9jYXRpb246IFBsYXRmb3JtTG9jYXRpb24sIGNvbmZpZzogUGxhdGZvcm1Db25maWcpIHtcbiAgcmV0dXJuIG5ldyBab25lQ2xpZW50QmFja2VuZChcbiAgICAgIG5ldyBIdHRwSW50ZXJjZXB0b3JIYW5kbGVyKGluamVjdChIdHRwQmFja2VuZCksIGluamVjdChFbnZpcm9ubWVudEluamVjdG9yKSksXG4gICAgICBwbGF0Zm9ybUxvY2F0aW9uLCBjb25maWcpO1xufVxuXG5leHBvcnQgY29uc3QgU0VSVkVSX0hUVFBfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xuICB7cHJvdmlkZTogWGhyRmFjdG9yeSwgdXNlQ2xhc3M6IFNlcnZlclhocn0sIHtcbiAgICBwcm92aWRlOiBIdHRwSGFuZGxlcixcbiAgICB1c2VGYWN0b3J5OiB6b25lV3JhcHBlZEludGVyY2VwdG9ySGFuZGxlcixcbiAgICBkZXBzOiBbUGxhdGZvcm1Mb2NhdGlvbiwgSU5JVElBTF9DT05GSUddXG4gIH1cbl07XG4iXX0=