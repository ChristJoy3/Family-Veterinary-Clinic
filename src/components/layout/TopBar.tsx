import { clinic } from "@/content/site";
import { Mail, MapPin, Phone } from "@/components/icons";

export function TopBar() {
  return (
    <div className="bg-navy text-[0.875rem] text-ivory/90">
      <div className="container-x flex flex-wrap items-center justify-center gap-x-6 gap-y-1 py-2 sm:justify-between">
        <p className="hidden items-center gap-2 sm:flex">
          <MapPin size={16} className="text-periwinkle" />
          {clinic.street}, {clinic.city}, {clinic.region} {clinic.postalCode}
        </p>
        <div className="flex items-center gap-5">
          <a href={clinic.phoneHref} className="flex items-center gap-2 hover:text-white">
            <Phone size={16} className="text-periwinkle" />
            410-721-4545
          </a>
          <a href={`mailto:${clinic.email}`} className="hidden items-center gap-2 hover:text-white md:flex">
            <Mail size={16} className="text-periwinkle" />
            {clinic.email}
          </a>
        </div>
      </div>
    </div>
  );
}
