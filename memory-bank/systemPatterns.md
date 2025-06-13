# System Patterns

## Component-Based Architecture

The application follows a component-based architecture, with UI elements encapsulated in React components (e.g., `InteractiveAvatar`, `BackgroundImage`).

## Dynamic Imports

The `InteractiveAvatar` component is loaded dynamically with Server-Side Rendering (SSR) disabled (`{ ssr: false }`). This is a common pattern for components that rely heavily on browser-specific APIs that are not available on the server.

## API Route for Authentication

An API route (`/api/get-access-token`) is used to fetch an access token. This pattern encapsulates sensitive operations on the server-side, preventing exposure of credentials to the client.

## CSS Grid for Layout

The main application layout is structured using CSS Grid. A 3-row structure (`grid-rows-[auto_1fr_auto]`) defines the header, main content (hero), and footer areas.

## Responsive Design (Mobile-First)

The layout is implemented with a mobile-first approach using Tailwind CSS responsive prefixes (`lg:`). The default styles target mobile viewports, and styles for larger screens are applied using these prefixes. This ensures the application is usable on a wide range of devices.
