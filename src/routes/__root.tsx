import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useMemo, type ReactNode } from "react";

import foundationsCss from "../styles/foundations.css?url";
import glassCss from "../styles/glass.css?url";
import shellCss from "../styles/shell.css?url";
import shellUtilitiesCss from "../styles/shell-utilities.css?url";
import layoutsCss from "../styles/layouts.css?url";
import surfacesCss from "../styles/surfaces.css?url";
import todayCss from "../styles/today.css?url";
import plannerCss from "../styles/planner.css?url";
import studiesCss from "../styles/studies.css?url";
import progressCss from "../styles/progress.css?url";
import progressMobileCss from "../styles/progress-mobile.css?url";
import practiceCss from "../styles/practice.css?url";
import examsCss from "../styles/exams.css?url";
import settingsCss from "../styles/settings.css?url";
import overlaysCss from "../styles/overlays.css?url";
import studyosCss from "../styles/studyos.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { PwaUpdatePrompt } from "../components/PwaUpdatePrompt";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Sivua ei löytynyt</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Hakemaasi sivua ei ole olemassa tai se on siirretty.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Takaisin etusivulle
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  const router = useRouter();
  const normalizedError = useMemo(
    () =>
      error instanceof Error
        ? error
        : new Error(typeof error === "string" ? "NonErrorThrown" : "Tuntematon sovellusvirhe"),
    [error],
  );
  useEffect(() => {
    console.error(normalizedError);
    reportLovableError(normalizedError, { boundary: "tanstack_root_error_component" });
  }, [normalizedError]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Sivua ei voitu ladata</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Jokin meni pieleen. Yritä uudelleen tai palaa etusivulle.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Yritä uudelleen
          </button>
          <a
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Takaisin etusivulle
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#f5f4f0" },
      { name: "color-scheme", content: "light dark" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "StudyOS" },
      { name: "format-detection", content: "telephone=no" },
      { title: "StudyOS" },
      { name: "description", content: "Adaptiivinen opiskelutyötila suunnitteluun, fokukseen ja oppimisen seurantaan." },
      { property: "og:title", content: "StudyOS" },
      { property: "og:description", content: "Rauhallinen, oppimistieteeseen perustuva opiskelutyötila." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: foundationsCss },
      { rel: "stylesheet", href: glassCss },
      { rel: "stylesheet", href: shellCss },
      { rel: "stylesheet", href: shellUtilitiesCss },
      { rel: "stylesheet", href: layoutsCss },
      { rel: "stylesheet", href: surfacesCss },
      { rel: "stylesheet", href: todayCss },
      { rel: "stylesheet", href: plannerCss },
      { rel: "stylesheet", href: studiesCss },
      { rel: "stylesheet", href: progressCss },
      { rel: "stylesheet", href: progressMobileCss },
      { rel: "stylesheet", href: practiceCss },
      { rel: "stylesheet", href: examsCss },
      { rel: "stylesheet", href: settingsCss },
      { rel: "stylesheet", href: overlaysCss },
      { rel: "stylesheet", href: studyosCss },
      { rel: "icon", href: "/app-icon-180.png", type: "image/png", sizes: "180x180" },
      { rel: "shortcut icon", href: "/app-icon-180.png", type: "image/png" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/app-icon-180.png", sizes: "180x180" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fi">
      <head>
        <HeadContent />
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(() => {
              try {
                const dark = localStorage.getItem("opk.theme") === "dark";
                const root = document.documentElement;
                root.classList.toggle("dark", dark);
                root.style.colorScheme = dark ? "dark" : "light";
                root.style.backgroundColor = dark ? "#111310" : "#f5f4f0";
                const theme = document.querySelector('meta[name="theme-color"]');
                if (theme) theme.setAttribute("content", dark ? "#111310" : "#f5f4f0");
              } catch {}
            })();`,
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Siirry pääsisältöön</a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  const defaults = queryClient.getDefaultOptions();
  queryClient.setDefaultOptions({
    ...defaults,
    mutations: {
      ...defaults.mutations,
      networkMode: "always",
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <PwaUpdatePrompt />
    </QueryClientProvider>
  );
}
