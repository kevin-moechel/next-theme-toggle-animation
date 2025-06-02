/**
 * Check if the user has reduced motion preference. You can fight me,
 * but I'm not going to add a hook or context for this.
 * User don't just change this setting during their session..
 * And even if, it's not a big deal to add a hook or context for this.
 * No need for any reactivity.
 * @returns {boolean} True if the user has reduced motion preference, false otherwise
 */
export function prefersReducedMotion() {
    if (typeof window === "undefined" || !window.matchMedia) {
        return false;
    }
    const mediaQueryList = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );
    return mediaQueryList.matches;
}
