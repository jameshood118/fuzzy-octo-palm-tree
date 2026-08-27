"use client";

import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import { ReactNode } from "react";

// 1. Import your strict WCAG 2.2 AA primitives wrapped for Storyblok
import Page from "@/app/page";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

// 2. The Component Registry: Maps the CMS block string to the React function
const components = {
  page: Page,
  button: Button,
  input: Input,
};

// 3. Initialize the bridge. 
// The accessToken is exposed to the client ONLY for the visual editor draft mode.
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components,
});

interface StoryblokProviderProps {
  children: ReactNode;
}

export default function StoryblokProvider({ children }: StoryblokProviderProps) {
  // The provider acts as a client-side wrapper to instantiate the Visual Editor bridge
  return <>{children}</>;
}