import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import App from "./App";
import "./i18n";

// Import Mantine styles
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <MantineProvider defaultColorScheme="dark">
            <Notifications />
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </MantineProvider>
    </StrictMode>
);
