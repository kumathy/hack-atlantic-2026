import Link from "next/link";
import { TbArrowRight } from "react-icons/tb";
import { daysBetween } from "@/lib/dates";
import { INCIDENTS, RECORDED_STRIKES, type Incident } from "@/lib/incidents";

export default function IncidentDetails({
  incidents,
}: {
  incidents: Incident[];
}) {
  const [latest, previous] = incidents;
  const year = latest.date.slice(0, 4);

  const stats = [
    {
      label: `Strikes in ${year}`,
      value: incidents.filter((i) => i.date.startsWith(year)).length,
    },
    {
      label: "Days since the previous strike",
      value: previous ? daysBetween(previous.date, latest.date) : "—",
    },
    {
      label: `Recorded since ${RECORDED_STRIKES.sinceYear}`,
      value: RECORDED_STRIKES.total + incidents.length - INCIDENTS.length,
    },
  ];

  const steps = latest.time
    ? [
        { time: latest.time, text: "Strike detected by the bridge's vibration sensor" },
        { time: latest.time, text: "Email alerts sent to subscribers" },
        { time: "Now", text: "Roads around the underpass are closed" },
      ]
    : [];

  return (
    <div
      className={`mx-auto mt-12 grid w-full max-w-3xl gap-6 px-4 ${
        steps.length > 0 ? "sm:grid-cols-2" : ""
      }`}
    >
      {steps.length > 0 && (
        <section aria-labelledby="today-heading">
          <h2
            id="today-heading"
            className="font-display text-xl font-bold text-ink mb-3"
          >
            Today&rsquo;s incident
          </h2>
          <ol className="space-y-3 border-l-2 border-line pl-4">
            {steps.map((step, i) => (
              <li key={step.text} className="relative flex gap-4 text-sm">
                <span
                  aria-hidden
                  className={`absolute -left-[21px] top-1.5 h-2 w-2 rounded-full ${
                    i === steps.length - 1 ? "bg-alert" : "bg-line-strong"
                  }`}
                />
                <span className="w-16 shrink-0 font-semibold text-subtle">
                  {step.time}
                </span>
                <span className="text-ink">{step.text}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section aria-labelledby="stats-heading">
        <h2
          id="stats-heading"
          className="font-display text-xl font-bold text-ink mb-3"
        >
          Statistics
        </h2>
        <dl className="grid grid-cols-3 gap-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col-reverse justify-end gap-1 rounded-xl border border-line bg-white p-3"
            >
              <dt className="text-xs text-muted">{stat.label}</dt>
              <dd className="font-display text-2xl font-semibold text-ink">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
        <Link
          href="/timeline"
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-hover hover:underline"
        >
          See the full timeline
          <TbArrowRight aria-hidden />
        </Link>
      </section>
    </div>
  );
}
