import type { Metadata } from "next";
import { SimplePage } from "@/components/SimplePage";
import { clinic } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <SimplePage eyebrow="Our policies" title="Privacy Policy">
      <p>
        <em>[Privacy policy text to be provided by Family Veterinary Clinic.]</em>
      </p>
      <p>
        Questions in the meantime? Call <a href={clinic.phoneHref}>{clinic.phone}</a> or email{" "}
        <a href={`mailto:${clinic.email}`}>{clinic.email}</a>.
      </p>
    </SimplePage>
  );
}
