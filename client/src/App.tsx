// Sonoran Monolith app shell: a light editorial system with basalt contrast and Level Copper signals.
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Team from "./pages/Team";

function RouteScrollManager() {
  const [location] = useLocation();

  useEffect(() => {
    let cancelled = false;
    const frames = new Set<number>();

    const restoreHashPosition = () => {
      if (cancelled) return;
      const targetId = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      if (!targetId) return;
      document.getElementById(targetId)?.scrollIntoView({ block: "start", behavior: "auto" });
    };

    const restoreAfterLayout = () => {
      restoreHashPosition();
      const firstFrame = window.requestAnimationFrame(() => {
        frames.delete(firstFrame);
        const secondFrame = window.requestAnimationFrame(() => {
          frames.delete(secondFrame);
          restoreHashPosition();
        });
        frames.add(secondFrame);
      });
      frames.add(firstFrame);
    };

    const waitForImages = Promise.all(
      Array.from(document.images).map((image) => {
        if (image.complete) return Promise.resolve();
        return new Promise<void>((resolve) => {
          image.addEventListener("load", () => resolve(), { once: true });
          image.addEventListener("error", () => resolve(), { once: true });
        });
      }),
    );

    restoreAfterLayout();
    document.fonts.ready.then(restoreAfterLayout).catch(() => undefined);
    waitForImages.then(restoreAfterLayout).catch(() => undefined);
    window.addEventListener("load", restoreAfterLayout, { once: true });
    window.addEventListener("hashchange", restoreAfterLayout);

    return () => {
      cancelled = true;
      frames.forEach((frame) => window.cancelAnimationFrame(frame));
      window.removeEventListener("load", restoreAfterLayout);
      window.removeEventListener("hashchange", restoreAfterLayout);
    };
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <RouteScrollManager />
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/team"} component={Team} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
