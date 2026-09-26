"use client";

import "leaflet/dist/leaflet.css";
import { CircleMarker, MapContainer, Polyline, TileLayer, Tooltip } from "react-leaflet";
import { CLOSED_ROADS, UNDERPASS } from "@/lib/closure";
import { BRIDGE } from "@/lib/incidents";

const CLOSED_COLOR = "#c94a1a";

/* Browser-only: Leaflet touches `window`, so this is loaded via next/dynamic. */
export default function ClosureMapLeaflet() {
  return (
    <MapContainer
      center={UNDERPASS}
      zoom={17}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline
        positions={CLOSED_ROADS}
        pathOptions={{ color: CLOSED_COLOR, weight: 8, opacity: 0.85 }}
      >
        <Tooltip sticky>Road closed</Tooltip>
      </Polyline>
      <CircleMarker
        center={UNDERPASS}
        radius={9}
        pathOptions={{
          color: "#ffffff",
          weight: 3,
          fillColor: CLOSED_COLOR,
          fillOpacity: 1,
        }}
      >
        <Tooltip direction="right" offset={[10, 0]} permanent>
          <strong>Incident location</strong>
          <br />
          {BRIDGE.name} overpass
        </Tooltip>
      </CircleMarker>
    </MapContainer>
  );
}
