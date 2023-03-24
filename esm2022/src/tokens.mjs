/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectionToken } from '@angular/core';
/**
 * The DI token for setting the initial config for the platform.
 *
 * @publicApi
 */
export const INITIAL_CONFIG = new InjectionToken('Server.INITIAL_CONFIG');
/**
 * A function that will be executed when calling `renderApplication` or
 * `renderModule` just before current platform state is rendered to string.
 *
 * @publicApi
 */
export const BEFORE_APP_SERIALIZED = new InjectionToken('Server.RENDER_MODULE_HOOK');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tc2VydmVyL3NyYy90b2tlbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQW9DN0M7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxJQUFJLGNBQWMsQ0FBaUIsdUJBQXVCLENBQUMsQ0FBQztBQUUxRjs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUM5QixJQUFJLGNBQWMsQ0FBb0MsMkJBQTJCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGlvblRva2VufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBDb25maWcgb2JqZWN0IHBhc3NlZCB0byBpbml0aWFsaXplIHRoZSBwbGF0Zm9ybS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGxhdGZvcm1Db25maWcge1xuICAvKipcbiAgICogVGhlIGluaXRpYWwgRE9NIHRvIHVzZSB0byBib290c3RyYXAgdGhlIHNlcnZlciBhcHBsaWNhdGlvbi5cbiAgICogQGRlZmF1bHQgY3JlYXRlIGEgbmV3IERPTSB1c2luZyBEb21pbm9cbiAgICovXG4gIGRvY3VtZW50Pzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIFVSTCBmb3IgdGhlIGN1cnJlbnQgYXBwbGljYXRpb24gc3RhdGUuIFRoaXMgaXMgdXNlZCBmb3IgaW5pdGlhbGl6aW5nXG4gICAqIHRoZSBwbGF0Zm9ybSdzIGxvY2F0aW9uLiBgcHJvdG9jb2xgLCBgaG9zdG5hbWVgLCBhbmQgYHBvcnRgIHdpbGwgYmVcbiAgICogb3ZlcnJpZGRlbiBpZiBgYmFzZVVybGAgaXMgc2V0LlxuICAgKiBAZGVmYXVsdCBub25lXG4gICAqL1xuICB1cmw/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGFwcGVuZCB0aGUgYWJzb2x1dGUgVVJMIHRvIGFueSByZWxhdGl2ZSBIVFRQIHJlcXVlc3RzLiBJZiBzZXQgdG9cbiAgICogdHJ1ZSwgdGhpcyBsb2dpYyBleGVjdXRlcyBwcmlvciB0byBhbnkgSFRUUCBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgcnVuIGxhdGVyXG4gICAqIG9uIGluIHRoZSByZXF1ZXN0LiBgYmFzZVVybGAgbXVzdCBiZSBzdXBwbGllZCBpZiB0aGlzIGZsYWcgaXMgZW5hYmxlZC5cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIHVzZUFic29sdXRlVXJsPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFRoZSBiYXNlIFVSTCBmb3IgcmVzb2x2aW5nIGFic29sdXRlIFVSTCBmb3IgSFRUUCByZXF1ZXN0cy4gSXQgbXVzdCBiZSBzZXRcbiAgICogaWYgYHVzZUFic29sdXRlVXJsYCBpcyB0cnVlLCBhbmQgbXVzdCBjb25zaXN0IG9mIHByb3RvY29sLCBob3N0bmFtZSxcbiAgICogYW5kIG9wdGlvbmFsIHBvcnQuIFRoaXMgb3B0aW9uIGhhcyBubyBlZmZlY3QgaWYgYHVzZUFic29sdXRlVXJsYCBpcyBub3RcbiAgICogZW5hYmxlZC5cbiAgICovXG4gIGJhc2VVcmw/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogVGhlIERJIHRva2VuIGZvciBzZXR0aW5nIHRoZSBpbml0aWFsIGNvbmZpZyBmb3IgdGhlIHBsYXRmb3JtLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IElOSVRJQUxfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPFBsYXRmb3JtQ29uZmlnPignU2VydmVyLklOSVRJQUxfQ09ORklHJyk7XG5cbi8qKlxuICogQSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgd2hlbiBjYWxsaW5nIGByZW5kZXJBcHBsaWNhdGlvbmAgb3JcbiAqIGByZW5kZXJNb2R1bGVgIGp1c3QgYmVmb3JlIGN1cnJlbnQgcGxhdGZvcm0gc3RhdGUgaXMgcmVuZGVyZWQgdG8gc3RyaW5nLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IEJFRk9SRV9BUFBfU0VSSUFMSVpFRCA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPEFycmF5PCgpID0+IHZvaWQgfCBQcm9taXNlPHZvaWQ+Pj4oJ1NlcnZlci5SRU5ERVJfTU9EVUxFX0hPT0snKTtcbiJdfQ==