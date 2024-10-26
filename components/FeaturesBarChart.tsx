import React from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
  ChartTooltip,
} from "@/components/ui/chart";

interface FeaturesBarChartProps {
  data: Array<{ category: string; value: number }>;
  config: ChartConfig;
  onFeatureClick: (feature: string) => void;
}

export function FeaturesBarChart({
  data,
  config,
  onFeatureClick,
}: FeaturesBarChartProps) {
  return (
    <ChartContainer config={config} className="min-h-[100px] max-h-[400px]">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <YAxis
            dataKey="category"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <XAxis dataKey="value" type="number" hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="value" layout="vertical" radius={4}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={config[entry.category as keyof typeof config].color}
                style={{ cursor: "pointer" }}
                onClick={() => onFeatureClick(entry.category)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
