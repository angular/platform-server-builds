/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3Byb2ZpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE1BQU0sdUJBQXVCLEdBQUcsS0FBSyxDQUFDO0FBRXRDLElBQUksaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0FBRTlCLE1BQU0sVUFBVSxpQkFBaUIsQ0FBSSxLQUFhLEVBQUUsTUFBZTtJQUNqRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN2QixPQUFPLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxNQUFNLFNBQVMsR0FBRyxHQUFHLHVCQUF1QixJQUFJLEtBQUssRUFBRSxDQUFDO0lBQ3hELE1BQU0sVUFBVSxHQUFHLFNBQVMsU0FBUyxFQUFFLENBQUM7SUFDeEMsTUFBTSxRQUFRLEdBQUcsT0FBTyxTQUFTLEVBQUUsQ0FBQztJQUVwQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEVBQUU7UUFDZix3QkFBd0I7UUFDeEIsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQixXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDckQsV0FBVyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuQyxXQUFXLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pDLHVCQUF1QjtJQUN6QixDQUFDLENBQUM7SUFFRix3QkFBd0I7SUFDeEIsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM3Qix1QkFBdUI7SUFFdkIsTUFBTSxXQUFXLEdBQUcsTUFBTSxFQUFFLENBQUM7SUFDN0IsSUFBSSxXQUFXLFlBQVksT0FBTyxFQUFFLENBQUM7UUFDbkMsT0FBTyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFNLENBQUM7SUFDL0MsQ0FBQztTQUFNLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7QUFDSCxDQUFDO0FBRUQsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO0FBQzFCOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsa0JBQWtCO0lBQ2hDLElBQ0UsQ0FBQyxhQUFhO1FBQ2QsQ0FBQyxPQUFPLFdBQVcsS0FBSyxXQUFXLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUNqRixDQUFDO1FBQ0QsYUFBYSxHQUFHLElBQUksQ0FBQztRQUNyQixPQUFPLENBQUMsSUFBSSxDQUFDLG1EQUFtRCxDQUFDLENBQUM7UUFDbEUsT0FBTztJQUNULENBQUM7SUFFRCxpQkFBaUIsR0FBRyxJQUFJLENBQUM7QUFDM0IsQ0FBQztBQUNELE1BQU0sVUFBVSxtQkFBbUI7SUFDakMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0FBQzVCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmNvbnN0IFBFUkZPUk1BTkNFX01BUktfUFJFRklYID0gJ/CfhbDvuI8nO1xuXG5sZXQgZW5hYmxlUGVyZkxvZ2dpbmcgPSBmYWxzZTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJ1bkFuZE1lYXN1cmVQZXJmPFQ+KGxhYmVsOiBzdHJpbmcsIG1ldGhvZDogKCkgPT4gVCk6IFQge1xuICBpZiAoIWVuYWJsZVBlcmZMb2dnaW5nKSB7XG4gICAgcmV0dXJuIG1ldGhvZCgpO1xuICB9XG5cbiAgY29uc3QgbGFiZWxOYW1lID0gYCR7UEVSRk9STUFOQ0VfTUFSS19QUkVGSVh9OiR7bGFiZWx9YDtcbiAgY29uc3Qgc3RhcnRMYWJlbCA9IGBzdGFydDoke2xhYmVsTmFtZX1gO1xuICBjb25zdCBlbmRMYWJlbCA9IGBlbmQ6JHtsYWJlbE5hbWV9YDtcblxuICBjb25zdCBlbmQgPSAoKSA9PiB7XG4gICAgLyogdHNsaW50OmRpc2FibGU6YmFuICovXG4gICAgcGVyZm9ybWFuY2UubWFyayhlbmRMYWJlbCk7XG4gICAgcGVyZm9ybWFuY2UubWVhc3VyZShsYWJlbE5hbWUsIHN0YXJ0TGFiZWwsIGVuZExhYmVsKTtcbiAgICBwZXJmb3JtYW5jZS5jbGVhck1hcmtzKHN0YXJ0TGFiZWwpO1xuICAgIHBlcmZvcm1hbmNlLmNsZWFyTWFya3MoZW5kTGFiZWwpO1xuICAgIC8qIHRzbGludDplbmFibGU6YmFuICovXG4gIH07XG5cbiAgLyogdHNsaW50OmRpc2FibGU6YmFuICovXG4gIHBlcmZvcm1hbmNlLm1hcmsoc3RhcnRMYWJlbCk7XG4gIC8qIHRzbGludDplbmFibGU6YmFuICovXG5cbiAgY29uc3QgcmV0dXJuVmFsdWUgPSBtZXRob2QoKTtcbiAgaWYgKHJldHVyblZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgIHJldHVybiByZXR1cm5WYWx1ZS5maW5hbGx5KCgpID0+IGVuZCgpKSBhcyBUO1xuICB9IGVsc2Uge1xuICAgIGVuZCgpO1xuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgfVxufVxuXG5sZXQgd2FybmluZ0xvZ2dlZCA9IGZhbHNlO1xuLyoqXG4gKiBUaGlzIGVuYWJsZXMgYW4gaW50ZXJuYWwgcGVyZm9ybWFuY2UgcHJvZmlsZXIgZm9yIFNTUiBhcHBzXG4gKlxuICogSXQgc2hvdWxkIG5vdCBiZSBpbXBvcnRlZCBpbiBhcHBsaWNhdGlvbiBjb2RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVTc3JQcm9maWxpbmcoKSB7XG4gIGlmIChcbiAgICAhd2FybmluZ0xvZ2dlZCAmJlxuICAgICh0eXBlb2YgcGVyZm9ybWFuY2UgPT09ICd1bmRlZmluZWQnIHx8ICFwZXJmb3JtYW5jZS5tYXJrIHx8ICFwZXJmb3JtYW5jZS5tZWFzdXJlKVxuICApIHtcbiAgICB3YXJuaW5nTG9nZ2VkID0gdHJ1ZTtcbiAgICBjb25zb2xlLndhcm4oJ1BlcmZvcm1hbmNlIEFQSSBpcyBub3Qgc3VwcG9ydGVkIG9uIHRoaXMgcGxhdGZvcm0nKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBlbmFibGVQZXJmTG9nZ2luZyA9IHRydWU7XG59XG5leHBvcnQgZnVuY3Rpb24gZGlzYWJsZVNzclByb2ZpbGluZygpIHtcbiAgZW5hYmxlUGVyZkxvZ2dpbmcgPSBmYWxzZTtcbn1cbiJdfQ==