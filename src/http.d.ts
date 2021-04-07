/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformConfig } from './tokens';
import { Injector, Provider } from '@angular/core';
import { PlatformLocation, XhrFactory } from '@angular/common';
import { HttpEvent, HttpRequest, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ServerXhr implements XhrFactory {
    build(): XMLHttpRequest;
    static ɵfac: i0.ɵɵFactoryDeclaration<ServerXhr, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ServerXhr>;
}
export declare abstract class ZoneMacroTaskWrapper<S, R> {
    wrap(request: S): Observable<R>;
    protected abstract delegate(request: S): Observable<R>;
}
export declare class ZoneClientBackend extends ZoneMacroTaskWrapper<HttpRequest<any>, HttpEvent<any>> implements HttpBackend {
    private backend;
    private platformLocation;
    private config;
    constructor(backend: HttpBackend, platformLocation: PlatformLocation, config: PlatformConfig);
    handle(request: HttpRequest<any>): Observable<HttpEvent<any>>;
    protected delegate(request: HttpRequest<any>): Observable<HttpEvent<any>>;
}
export declare function zoneWrappedInterceptingHandler(backend: HttpBackend, injector: Injector, platformLocation: PlatformLocation, config: PlatformConfig): ZoneClientBackend;
export declare const SERVER_HTTP_PROVIDERS: Provider[];
