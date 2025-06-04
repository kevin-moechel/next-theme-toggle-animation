# Next.js Theme Toggle Animation Demo

This repository demonstrates how to create a beautiful, super smooth, animated theme toggle using the [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API), [shadcn/ui](https://ui.shadcn.com/), and [Next.js](https://nextjs.org/). Find a live demo [here](https://next-theme-toggle-animation.vercel.app/).

## Demo:

https://github.com/user-attachments/assets/7598e74f-f7c6-4d7b-ad3d-d3bfb5718fab

## Features

-   **Animated Theme Toggle:**
    -   Uses the View Transitions API for a smooth, circular reveal animation when switching between light and dark mode.
    -   Animation is implemented in React with TypeScript
    -   The animation is scoped to the theme-toggle and does not affect other transitions.
    -   No global CSS overrides. The animation is handled dynamically in the component.
-   **shadcn/ui Integration:**
    -   Works with shadcn/ui's out of the box.
-   **Next.js App Router:**
    -   Built with the Next.js App Router and TypeScript.

## Inspiration

This project is massively inspired by:

-   [tweakcn.com](https://tweakcn.com) ([GitHub repo](https://github.com/jnsahaj/tweakcn)) — a powerful visual theme editor for shadcn/ui components.
-   [Full-page theme toggle animation with View Transitions API](https://www.youtube.com/watch?v=Qs1EOL2ccD8&ab_channel=AkashHamirwasia) — a fantastic video by [Akash Hamirwasia](https://akashhamirwasia.com/) explaining the View Transitions API and theme toggle animation techniques.

## How It Works

The theme toggle logic is implemented in [`src/components/theme-toggle.tsx`](src/components/theme-toggle.tsx). When the button is clicked:

1. The View Transitions API is used to animate the theme change.
2. A circular reveal animation is triggered from the click position.
3. The default browser view transition is temporarily overridden using a dynamically injected `<style>` tag, so only the custom animation is shown.
4. The override is removed after the animation completes.

This approach ensures the animation is only applied to the theme toggle, and does not interfere with other view transitions in your app like navigations.

## Local development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the animated theme toggle in action.

## Reference

-   [src/components/theme-toggle.tsx](src/components/theme-toggle.tsx) — Main implementation of the animated theme toggle.
-   [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
