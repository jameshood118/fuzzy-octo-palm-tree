import { getStoryblokApi, StoryblokStory } from "@storyblok/react/rsc";
import type { ISbStoryData } from "@storyblok/react";

// 1. Enforce cache invalidation for dynamic draft environments
export const dynamic = "force-dynamic";

async function fetchHomeStory(): Promise<ISbStoryData | null> {
  try {
    const storyblokApi = getStoryblokApi();
    
    // 2. Fetch the root "home" story, pivoting based on environment
    const { data } = await storyblokApi.get("cdn/stories/home", {
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
      resolve_relations: "", // Add relation fields here later if needed
    });
    
    return data.story;
  } catch (error) {
    console.error("Storyblok Bridge Error: Payload failed to compile.", error);
    return null;
  }
}

export default async function Home() {
  const story = await fetchHomeStory();

  // 3. Feral Grit Mandate: Improvise a safe fallback if the CMS bridge is down
  if (!story) {
    return (
      <div className="flex min-h-[50vh] w-full flex-col items-center justify-center p-8 text-center">
        <h1 className="text-2xl font-bold text-[var(--error)]" role="alert">
          CMS Connection Pending
        </h1>
        <p className="mt-4 max-w-md text-[var(--foreground)]">
          The Storyblok bridge for <strong>fuzzy-octo-palm-tree</strong> is inactive. Verify your environment variables and Space ID.
        </p>
      </div>
    );
  }

  // 4. layout.tsx already provides the <main id="main-content"> wrapper. 
  // We strictly pass the validated story payload into the Storyblok provider.
  return (
    <section aria-label="Home Page Content" className="w-full">
      <StoryblokStory story={story} />
    </section>
  );
}