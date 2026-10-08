"use client";

import { useSyncExternalStore } from "react";
import { Clock } from "@/components/icons";
import { hours, openWindows, phoneLines } from "@/content/site";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const subscribe = (cb: () => void) => {
  const id = window.setInterval(cb, 30_000);
  return () => window.clearInterval(id);
};
const minuteStamp = () => Math.floor(Date.now() / 60_000);

/** Day index and minutes after midnight in the clinic's own time zone. */
function clinicNow(stamp: number) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date(stamp * 60_000));
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
  return { day: DAY_NAMES.indexOf(get("weekday")), minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

const fmt = (m: number) => {
  const h = Math.floor(m / 60);
  const min = m % 60;
  return `${((h + 11) % 12) + 1}:${String(min).padStart(2, "0")}${h < 12 ? "am" : "pm"}`;
};

function status(stamp: number) {
  const { day, minutes } = clinicNow(stamp);
  const today = openWindows[day];
  if (today && minutes >= today[0] && minutes < today[1]) {
    return { day, open: true, note: `Until ${fmt(today[1])} today` };
  }
  for (let i = 0; i < 7; i++) {
    const d = (day + i) % 7;
    const w = openWindows[d];
    if (!w || (i === 0 && minutes >= w[0])) continue;
    return { day, open: false, note: `Opens ${i === 0 ? "today" : i === 1 ? "tomorrow" : DAY_NAMES[d]} at ${fmt(w[0])}` };
  }
  return { day, open: false, note: "" };
}

export function Hours() {
  const stamp = useSyncExternalStore(subscribe, minuteStamp, () => null);
  const now = stamp === null ? null : status(stamp);

  return (
    <section id="hours" aria-labelledby="hours-title" className="bg-oat py-20 lg:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="eyebrow" data-reveal>
            Hours
          </p>
          <h2 id="hours-title" className="section-title mt-3" data-reveal>
            When to find us.
          </h2>
          <div className="mt-6 min-h-[4.5rem]" aria-live="polite">
            {now ? (
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.9375rem] font-extrabold ${
                    now.open ? "bg-[#dcebdf] text-[#1f4d2c]" : "bg-[#f3dfd6] text-alert"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`size-2.5 rounded-full ${now.open ? "bg-[#2f7a45] motion-safe:animate-pulse" : "bg-alert"}`}
                  />
                  {now.open ? "Open now" : "Closed"}
                </span>
                {now.note ? <span className="text-[1rem] font-semibold text-muted">{now.note}</span> : null}
              </div>
            ) : null}
          </div>
          <p className="mt-4 flex gap-3 text-muted" data-reveal>
            <Clock size={22} className="mt-1 shrink-0 text-terracotta" />
            {phoneLines}
          </p>
          <p className="card mt-6 p-6 text-[1rem]" data-reveal>
            <strong className="block font-display text-xl font-normal text-navy">Discounts</strong>
            We offer military, senior, and multi-pet discounts. Please call for details.
          </p>
        </div>

        <div className="card overflow-hidden" data-reveal>
          <table className="w-full text-left text-[1rem]">
            <caption className="sr-only">Weekly hours. Times are Eastern.</caption>
            <thead className="bg-navy text-ivory">
              <tr>
                <th scope="col" className="px-5 py-4 font-extrabold sm:px-7">
                  Day
                </th>
                <th scope="col" className="px-5 py-4 font-extrabold sm:px-7">
                  Hours
                </th>
              </tr>
            </thead>
            <tbody>
              {hours.map((row) => {
                const isToday = now !== null && row.days.includes(now.day);
                return (
                  <tr
                    key={row.label}
                    aria-current={isToday ? "date" : undefined}
                    className={`border-t border-oat transition-colors ${isToday ? "bg-mist" : ""}`}
                  >
                    <th scope="row" className="w-[36%] px-5 py-4 align-top font-display text-lg font-normal text-navy sm:px-7">
                      {row.label}
                      {isToday ? (
                        <span className="ml-2 inline-block rounded-full bg-navy px-2 py-0.5 align-middle font-sans text-[0.75rem] font-extrabold tracking-wide text-ivory uppercase">
                          Today
                        </span>
                      ) : null}
                    </th>
                    <td className="px-5 py-4 sm:px-7">
                      {row.closed ? (
                        <span className="font-semibold text-muted">Closed</span>
                      ) : (
                        <dl className="grid gap-1">
                          {row.dropOff ? (
                            <div className="flex flex-wrap gap-x-2">
                              <dt className="font-bold text-navy">Drop-offs</dt>
                              <dd>{row.dropOff}</dd>
                            </div>
                          ) : null}
                          {row.surgery ? (
                            <div className="flex flex-wrap gap-x-2">
                              <dt className="font-bold text-navy">Surgery</dt>
                              <dd>{row.surgery}</dd>
                            </div>
                          ) : null}
                          {row.appointments ? (
                            <div className="flex flex-wrap gap-x-2">
                              <dt className="font-bold text-navy">Appointments</dt>
                              <dd>{row.appointments.join(" and ")}</dd>
                            </div>
                          ) : null}
                        </dl>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
