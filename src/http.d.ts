import { Injector, Provider } from '@angular/core';
import { HttpEvent, HttpRequest, HttpBackend, XhrFactory } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ServerXhr implements XhrFactory {
    build(): XMLHttpRequest;
    static ɵfac: i0.ɵɵFactoryDef<ServerXhr, never>;
    static ɵprov: i0.ɵɵInjectableDef<ServerXhr>;
}
export declare abstract class ZoneMacroTaskWrapper<S, R> {
    wrap(request: S): Observable<R>;
    protected abstract delegate(request: S): Observable<R>;
}
export declare class ZoneClientBackend extends ZoneMacroTaskWrapper<HttpRequest<any>, HttpEvent<any>> implements HttpBackend {
    private backend;
    constructor(backend: HttpBackend);
    handle(request: HttpRequest<any>): Observable<HttpEvent<any>>;
    protected delegate(request: HttpRequest<any>): Observable<HttpEvent<any>>;
}
export declare function zoneWrappedInterceptingHandler(backend: HttpBackend, injector: Injector): ZoneClientBackend;
export declare const SERVER_HTTP_PROVIDERS: Provider[];
