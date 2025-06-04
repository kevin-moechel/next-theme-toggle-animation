"use client";

import { Loader2, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { prefersReducedMotion } from "@/lib/reduced-motion";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Ensure the component is mounted before rendering to avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Render a placeholder while the component is not mounted to avoid
        // layout shift
        return <ThemeToggleSkeleton />;
    }

    const isDark = theme === "dark";
    const toggleTheme = async (e: React.MouseEvent) => {
        const skipAnimation =
            !document.startViewTransition || // No support for view transitions
            prefersReducedMotion(); // User has reduced motion preference

        if (skipAnimation) {
            setTheme(isDark ? "light" : "dark");
            return;
        }

        // This is a hack to prevent the default view transition animation
        // I hate to do it, but it's the only way to prevent the default animation
        // from being triggered.
        injectViewTransitionOverride();

        await document.startViewTransition(() => {
            console.log("startViewTransition");
            setTheme(isDark ? "light" : "dark");
        }).ready;

        const { clientX, clientY } = e;

        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0% at ${clientX}px ${clientY}px)`,
                    `circle(200% at ${clientX}px ${clientY}px)`,
                ],
            },
            {
                duration: themeToggleTransitionDuration,
                easing: "ease-in-out",
                pseudoElement: "::view-transition-new(root)",
            }
        );

        // Remove the view transition override after the transition is complete
        // We add a small delay to ensure the transition is complete.
        // Otherwise you'll get a funky UI behaviour
        setTimeout(() => {
            removeViewTransitionOverride();
        }, themeToggleTransitionDuration + 100);
    };

    return (
        <Button
            className="rounded-full"
            variant="outline"
            size="icon"
            onClick={toggleTheme}
        >
            <Sun className={`${!isDark && "hidden"}`} />
            <Moon className={`${isDark && "hidden"}`} />
            <span className="sr-only">
                {isDark ? "Switch to light mode" : "Switch to dark mode"}
            </span>
        </Button>
    );
}

function ThemeToggleSkeleton() {
    return (
        <Button className="rounded-full" variant="outline" size="icon">
            <Loader2 className="animate-spin" />
            <span className="sr-only">Theme toggle placeholder</span>
        </Button>
    );
}

const themeToggleTransitionDuration = 1000;
const viewTransitionOverrideId = "theme-toggle-view-transition-override";

function injectViewTransitionOverride() {
    const style = document.createElement("style");
    style.id = viewTransitionOverrideId;
    style.textContent = `
        ::view-transition-old(root),
        ::view-transition-new(root) {
            animation: none !important;
            mix-blend-mode: normal !important;
        }
    `;
    document.head.appendChild(style);
}

function removeViewTransitionOverride() {
    const style = document.getElementById(viewTransitionOverrideId);
    if (style) style.remove();
}
