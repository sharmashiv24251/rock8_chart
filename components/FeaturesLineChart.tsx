import React from "react";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

interface FeaturesLineChartProps {
  data: Array<{ date: string; value: number }>;
  config: ChartConfig;
  selectedFeature: string;
}

export function FeaturesLineChart({
  data,
  config,
  selectedFeature,
}: FeaturesLineChartProps) {
  return (
    <ChartContainer config={config} className="min-h-[100px] max-h-[400px]">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke={config[selectedFeature as keyof typeof config].color}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
