"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { format, parse } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import analyticsData from "@/analytics.json";
import { useAnalyticsStore } from "@/store";

const chartConfig: ChartConfig = {
  A: { label: "A", color: "hsl(var(--chart-1))" },
  B: { label: "B", color: "hsl(var(--chart-2))" },
  C: { label: "C", color: "hsl(var(--chart-3))" },
  D: { label: "D", color: "hsl(var(--chart-4))" },
  E: { label: "E", color: "hsl(var(--chart-5))" },
  F: { label: "F", color: "hsl(var(--chart-6))" },
};

export function AnalyticsChart() {
  const { selectedDate, age, gender } = useAnalyticsStore();
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Change the format to match the JSON data format
    const formattedDate = format(selectedDate, "d/M/yyyy");
    let filteredData = analyticsData.analytics.filter(
      (item) => item.Day === formattedDate
    );

    if (age !== "All") {
      filteredData = filteredData.filter((item) => item.Age === age);
    }

    if (gender !== "All") {
      filteredData = filteredData.filter((item) => item.Gender === gender);
    }

    if (filteredData.length > 0) {
      const aggregatedData = filteredData.reduce((acc, curr) => {
        ["A", "B", "C", "D", "E", "F"].forEach((key) => {
          acc[key] =
            (acc[key] || 0) + (curr[key as keyof typeof curr] as number);
        });
        return acc;
      }, {} as Record<string, number>);

      const newChartData = Object.entries(aggregatedData).map(
        ([key, value]) => ({
          category: key,
          value: value,
        })
      );
      setChartData(newChartData);
    } else {
      setChartData([]);
    }
  }, [selectedDate, age, gender]);

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Overall Analytics</CardTitle>
          <CardDescription>
            {format(selectedDate, "MMMM d, yyyy")} | {gender} | {age}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>No data available for the selected filters.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="mb-5 bg-sidebar">
        <CardHeader>
          <CardTitle>Overall Analytics</CardTitle>
          <CardDescription>
            {format(selectedDate, "MMMM d, yyyy")} | {gender} | {age}
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="bg-sidebar">
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="50%" height={100}>
              <BarChart
                data={chartData}
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
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        chartConfig[entry.category as keyof typeof chartConfig]
                          .color
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}
