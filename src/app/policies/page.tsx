import type { Metadata } from "next";
import { SimplePage } from "@/components/SimplePage";
import { clinic } from "@/content/site";

export const metadata: Metadata = {
  title: "Our Policies",
  alternates: { canonical: "/policies" },
};

export default function PoliciesPage() {
  return (
    <SimplePage eyebrow="Our policies" title="Our Policies">
      <h2>Drop-off policy</h2>
      <p>
        We accept drop-offs for exams and procedures. Drop-offs are 7:30–8:30am on weekdays. To make sure we have space
        for your pet, please arrange this in advance by calling reception at <a href={clinic.phoneHref}>{clinic.phone}</a>.
      </p>
      <h2>Food and medication orders</h2>
      <p>Call ahead with enough notice, and we’ll have your order ready when you arrive.</p>
      <h2>Emergencies</h2>
      <p>
        Family Veterinary Clinic accepts patients with emergency health issues during open hours. After hours, contact
        Anne Arundel Emergency Veterinary Clinic, 808 Bestgate Rd., Annapolis, <a href="tel:+14102240331">(410) 224-0331</a>.
      </p>
      <h2>Discounts</h2>
      <p>We offer military, senior, and multi-pet discounts. Please call for details.</p>
      <p>
        <em>[Additional clinic policies to be provided by Family Veterinary Clinic.]</em>
      </p>
    </SimplePage>
  );
}
