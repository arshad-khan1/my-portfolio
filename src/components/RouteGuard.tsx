"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { routes, protectedRoutes } from "@/resources";
import { Flex, Spinner, Button, Heading, Column, PasswordInput } from "@once-ui-system/core";
import NotFound from "@/app/not-found";

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();

  // Helper to check if route is enabled in once-ui.config
  const checkRouteEnabled = (path: string | null) => {
    if (!path) return false;
    if (path in routes) {
      return routes[path as keyof typeof routes];
    }
    const dynamicRoutes = ["/blog", "/work"] as const;
    for (const route of dynamicRoutes) {
      if (path.startsWith(route) && routes[route]) {
        return true;
      }
    }
    return false;
  };

  const routeEnabled = checkRouteEnabled(pathname);
  const isProtected = pathname ? !!protectedRoutes[pathname as keyof typeof protectedRoutes] : false;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(isProtected);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isProtected) {
      setCheckingAuth(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const response = await fetch("/api/check-auth");
        if (response.ok) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [isProtected, pathname]);

  const handlePasswordSubmit = async () => {
    const response = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
      setError(undefined);
    } else {
      setError("Incorrect password");
    }
  };

  // 1. If checking auth for a protected route, show loader
  if (isProtected && checkingAuth) {
    return (
      <Flex fillWidth paddingY="128" horizontal="center">
        <Spinner />
      </Flex>
    );
  }

  // 2. If route is not enabled, show 404
  if (!routeEnabled) {
    return <NotFound />;
  }

  // 3. If password is required and user not authenticated, show password gate
  if (isProtected && !isAuthenticated) {
    return (
      <Column paddingY="128" maxWidth={24} gap="24" center>
        <Heading align="center" wrap="balance">
          This page is password protected
        </Heading>
        <Column fillWidth gap="8" horizontal="center">
          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage={error}
          />
          <Button onClick={handlePasswordSubmit}>Submit</Button>
        </Column>
      </Column>
    );
  }

  // 4. Otherwise, render content instantly (0 delay for home page, about, contact, etc.)
  return <>{children}</>;
};

export { RouteGuard };
