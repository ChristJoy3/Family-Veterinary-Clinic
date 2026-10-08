import type { Metadata } from "next";
import { SimplePage } from "@/components/SimplePage";
import { clinic } from "@/content/site";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <SimplePage eyebrow="Our policies" title="Accessibility Statement">
      <p>
        Family Veterinary Clinic wants everyone to be able to use this website. We aim to meet the Web Content
        Accessibility Guidelines (WCAG) 2.1 at level AA.
      </p>
      <h2>What we’ve done</h2>
      <ul className="list-none">
        {[
          "Text and buttons are designed to meet WCAG AA colour contrast.",
          "Every page can be used with a keyboard, including the team cards, tabs, toggle and FAQ.",
          "Photos have text alternatives.",
          "Animations and smooth scrolling switch off when your device is set to reduce motion.",
          "A “Skip to main content” link appears as the first item when you press Tab.",
        ].map((item) => (
          <li key={item} className="relative pl-6 before:absolute before:left-0 before:top-[0.7em] before:size-2 before:rounded-full before:bg-clay">
            {item}
          </li>
        ))}
      </ul>
      <h2>Need help or found a problem?</h2>
      <p>
        If something on this site doesn’t work for you, please call us at{" "}
        <a href={clinic.phoneHref}>{clinic.phone}</a> or email <a href={`mailto:${clinic.email}`}>{clinic.email}</a>.
        We’ll help you get what you need and work to fix the issue.
      </p>
    </SimplePage>
  );
}
