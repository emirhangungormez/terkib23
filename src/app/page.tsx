import { HomeExperience } from "@/components/site-frame";
import { content } from "@/lib/content";

export default function RootPage() {
  return <HomeExperience locale="tr" content={content.tr} />;
}
