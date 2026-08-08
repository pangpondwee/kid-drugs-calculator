"use client";

import { Provider } from "jotai";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import React, { useEffect } from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
    if (!token || posthog.__loaded) return;

    posthog.init(token, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
      defaults: "2026-05-30",
    });
  }, []);

  return (
    <PostHogProvider client={posthog}>
      <Provider>{children}</Provider>
    </PostHogProvider>
  );
};
