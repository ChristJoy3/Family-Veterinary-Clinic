import { Paw } from "@/components/icons";
import { trustItems } from "@/content/site";

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {trustItems.map((item) => (
        <li key={item} className="flex items-center gap-6 px-6 font-display text-xl whitespace-nowrap text-ivory sm:text-2xl">
          {item}
          <Paw size={16} className="text-periwinkle/70" />
        </li>
      ))}
    </ul>
  );
}

export function TrustMarquee() {
  return (
    <section aria-label="Why families choose us" className="marquee relative overflow-hidden bg-navy py-5">
      <div className="marquee-track flex w-max motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
        <Row />
        <div className="contents motion-reduce:hidden">
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
