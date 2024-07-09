/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const PERFORMANCE_MARK_PREFIX = '🅰️';
let enablePerfLogging = false;
export function runAndMeasurePerf(label, method) {
    if (!enablePerfLogging) {
        return method();
    }
    const labelName = `${PERFORMANCE_MARK_PREFIX}:${label}`;
    const startLabel = `start:${labelName}`;
    const endLabel = `end:${labelName}`;
    const end = () => {
        /* tslint:disable:ban */
        performance.mark(endLabel);
        performance.measure(labelName, startLabel, endLabel);
        performance.clearMarks(startLabel);
        performance.clearMarks(endLabel);
        /* tslint:enable:ban */
    };
    /* tslint:disable:ban */
    performance.mark(startLabel);
    /* tslint:enable:ban */
    const returnValue = method();
    if (returnValue instanceof Promise) {
        return returnValue.finally(() => end());
    }
    else {
        end();
        return returnValue;
    }
}
let warningLogged = false;
/**
 * This enables an internal performance profiler for SSR apps
 *
 * It should not be imported in application code
 */
export function enableSsrProfiling() {
    if (!warningLogged &&
        (typeof performance === 'undefined' || !performance.mark || !performance.measure)) {
        warningLogged = true;
        console.warn('Performance API is not supported on this platform');
        return;
    }
    enablePerfLogging = true;
}
export function disableSsrProfiling() {
    enablePerfLogging = false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3Byb2ZpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE1BQU0sdUJBQXVCLEdBQUcsS0FBSyxDQUFDO0FBRXRDLElBQUksaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0FBRTlCLE1BQU0sVUFBVSxpQkFBaUIsQ0FBSSxLQUFhLEVBQUUsTUFBZTtJQUNqRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN2QixPQUFPLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxNQUFNLFNBQVMsR0FBRyxHQUFHLHVCQUF1QixJQUFJLEtBQUssRUFBRSxDQUFDO0lBQ3hELE1BQU0sVUFBVSxHQUFHLFNBQVMsU0FBUyxFQUFFLENBQUM7SUFDeEMsTUFBTSxRQUFRLEdBQUcsT0FBTyxTQUFTLEVBQUUsQ0FBQztJQUVwQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEVBQUU7UUFDZix3QkFBd0I7UUFDeEIsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQixXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDckQsV0FBVyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuQyxXQUFXLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pDLHVCQUF1QjtJQUN6QixDQUFDLENBQUM7SUFFRix3QkFBd0I7SUFDeEIsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM3Qix1QkFBdUI7SUFFdkIsTUFBTSxXQUFXLEdBQUcsTUFBTSxFQUFFLENBQUM7SUFDN0IsSUFBSSxXQUFXLFlBQVksT0FBTyxFQUFFLENBQUM7UUFDbkMsT0FBTyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFNLENBQUM7SUFDL0MsQ0FBQztTQUFNLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7QUFDSCxDQUFDO0FBRUQsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO0FBQzFCOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsa0JBQWtCO0lBQ2hDLElBQ0UsQ0FBQyxhQUFhO1FBQ2QsQ0FBQyxPQUFPLFdBQVcsS0FBSyxXQUFXLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUNqRixDQUFDO1FBQ0QsYUFBYSxHQUFHLElBQUksQ0FBQztRQUNyQixPQUFPLENBQUMsSUFBSSxDQUFDLG1EQUFtRCxDQUFDLENBQUM7UUFDbEUsT0FBTztJQUNULENBQUM7SUFFRCxpQkFBaUIsR0FBRyxJQUFJLENBQUM7QUFDM0IsQ0FBQztBQUNELE1BQU0sVUFBVSxtQkFBbUI7SUFDakMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0FBQzVCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuY29uc3QgUEVSRk9STUFOQ0VfTUFSS19QUkVGSVggPSAn8J+FsO+4jyc7XG5cbmxldCBlbmFibGVQZXJmTG9nZ2luZyA9IGZhbHNlO1xuXG5leHBvcnQgZnVuY3Rpb24gcnVuQW5kTWVhc3VyZVBlcmY8VD4obGFiZWw6IHN0cmluZywgbWV0aG9kOiAoKSA9PiBUKTogVCB7XG4gIGlmICghZW5hYmxlUGVyZkxvZ2dpbmcpIHtcbiAgICByZXR1cm4gbWV0aG9kKCk7XG4gIH1cblxuICBjb25zdCBsYWJlbE5hbWUgPSBgJHtQRVJGT1JNQU5DRV9NQVJLX1BSRUZJWH06JHtsYWJlbH1gO1xuICBjb25zdCBzdGFydExhYmVsID0gYHN0YXJ0OiR7bGFiZWxOYW1lfWA7XG4gIGNvbnN0IGVuZExhYmVsID0gYGVuZDoke2xhYmVsTmFtZX1gO1xuXG4gIGNvbnN0IGVuZCA9ICgpID0+IHtcbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZTpiYW4gKi9cbiAgICBwZXJmb3JtYW5jZS5tYXJrKGVuZExhYmVsKTtcbiAgICBwZXJmb3JtYW5jZS5tZWFzdXJlKGxhYmVsTmFtZSwgc3RhcnRMYWJlbCwgZW5kTGFiZWwpO1xuICAgIHBlcmZvcm1hbmNlLmNsZWFyTWFya3Moc3RhcnRMYWJlbCk7XG4gICAgcGVyZm9ybWFuY2UuY2xlYXJNYXJrcyhlbmRMYWJlbCk7XG4gICAgLyogdHNsaW50OmVuYWJsZTpiYW4gKi9cbiAgfTtcblxuICAvKiB0c2xpbnQ6ZGlzYWJsZTpiYW4gKi9cbiAgcGVyZm9ybWFuY2UubWFyayhzdGFydExhYmVsKTtcbiAgLyogdHNsaW50OmVuYWJsZTpiYW4gKi9cblxuICBjb25zdCByZXR1cm5WYWx1ZSA9IG1ldGhvZCgpO1xuICBpZiAocmV0dXJuVmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgcmV0dXJuIHJldHVyblZhbHVlLmZpbmFsbHkoKCkgPT4gZW5kKCkpIGFzIFQ7XG4gIH0gZWxzZSB7XG4gICAgZW5kKCk7XG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICB9XG59XG5cbmxldCB3YXJuaW5nTG9nZ2VkID0gZmFsc2U7XG4vKipcbiAqIFRoaXMgZW5hYmxlcyBhbiBpbnRlcm5hbCBwZXJmb3JtYW5jZSBwcm9maWxlciBmb3IgU1NSIGFwcHNcbiAqXG4gKiBJdCBzaG91bGQgbm90IGJlIGltcG9ydGVkIGluIGFwcGxpY2F0aW9uIGNvZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZVNzclByb2ZpbGluZygpIHtcbiAgaWYgKFxuICAgICF3YXJuaW5nTG9nZ2VkICYmXG4gICAgKHR5cGVvZiBwZXJmb3JtYW5jZSA9PT0gJ3VuZGVmaW5lZCcgfHwgIXBlcmZvcm1hbmNlLm1hcmsgfHwgIXBlcmZvcm1hbmNlLm1lYXN1cmUpXG4gICkge1xuICAgIHdhcm5pbmdMb2dnZWQgPSB0cnVlO1xuICAgIGNvbnNvbGUud2FybignUGVyZm9ybWFuY2UgQVBJIGlzIG5vdCBzdXBwb3J0ZWQgb24gdGhpcyBwbGF0Zm9ybScpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGVuYWJsZVBlcmZMb2dnaW5nID0gdHJ1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlU3NyUHJvZmlsaW5nKCkge1xuICBlbmFibGVQZXJmTG9nZ2luZyA9IGZhbHNlO1xufVxuIl19