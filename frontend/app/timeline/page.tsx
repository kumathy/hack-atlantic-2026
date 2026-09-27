import type { Metadata } from "next";
import IncidentTimeline from "@/components/incident-timeline";
import { BRIDGE, RECORDED_STRIKES } from "@/lib/incidents";

export const metadata: Metadata = {
  description: `${RECORDED_STRIKES.total} strikes recorded at the ${BRIDGE.name} since ${RECORDED_STRIKES.sinceYear}.`,
};

export default function TimelinePage() {
  return <IncidentTimeline />;
}
