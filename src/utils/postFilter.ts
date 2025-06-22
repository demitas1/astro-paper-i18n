import type { CollectionEntry } from "astro:content";
import { SITE } from "@/config";

const postFilter = ({ data }: CollectionEntry<"blog">) => {
  const isPublishTimePassed =
    Date.now() >
    new Date(data.pubDatetime).getTime() - SITE.scheduledPostMargin;

  // Show drafts in development mode for preview (unless HIDE_DRAFTS is set)
  if (import.meta.env.DEV && data.draft && !process.env.HIDE_DRAFTS) {
    return true;
  }

  return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
};

export default postFilter;
