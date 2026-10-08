import { Alert, Phone } from "@/components/icons";
import { emergencyClinic } from "@/content/site";

export function Emergency() {
  return (
    <section id="emergency" aria-labelledby="emergency-title" className="bg-oat pb-20 lg:pb-28">
      <div className="container-x">
        <div
          className="on-dark relative overflow-hidden rounded-[var(--radius-card)] bg-alert p-8 text-ivory shadow-[var(--shadow-lift)] sm:p-12"
          data-reveal
        >
          <div aria-hidden="true" className="absolute -right-16 -top-16 size-64 rounded-full border-[28px] border-white/5" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div className="flex gap-5">
              <span className="hidden size-14 shrink-0 place-items-center rounded-full bg-white/10 sm:grid">
                <Alert size={28} />
              </span>
              <div>
                <h2 id="emergency-title" className="text-3xl text-white sm:text-4xl">
                  Pet emergency?
                </h2>
                <p className="mt-4 max-w-2xl text-ivory/90">
                  Family Veterinary Clinic accepts patients with emergency health issues during open hours. After hours,
                  contact <strong className="text-white">{emergencyClinic.name}</strong>, {emergencyClinic.address},{" "}
                  <a href={emergencyClinic.phoneHref} className="font-bold text-white underline underline-offset-4">
                    {emergencyClinic.phone}
                  </a>
                  .
                </p>
              </div>
            </div>
            <a href={emergencyClinic.phoneHref} className="btn btn-light whitespace-nowrap">
              <Phone size={18} /> Call Emergency Clinic
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
