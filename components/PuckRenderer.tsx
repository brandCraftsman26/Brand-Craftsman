"use client";

import { Render, Data } from "@measured/puck";
import { config } from "@/puck.config";
import "@measured/puck/puck.css";

export default function PuckRenderer({ data }: { data: Data }) {
  return <Render config={config} data={data} />;
}
