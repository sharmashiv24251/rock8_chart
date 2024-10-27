"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartConfig } from "@/components/ui/chart";
import analyticsData from "@/analytics.json";
import { useAnalyticsStore } from "@/store";
import { FeaturesBarChart } from "./FeaturesBarChart";
import { FeaturesLineChart } from "./FeaturesLineChart";
import { ChevronLeft } from "lucide-react";
import { parseUrlParams } from "@/utils/urlParams";

const chartConfig: ChartConfig = {
  A: { label: "A", color: "hsl(var(--chart-1))" },
  B: { label: "B", color: "hsl(var(--chart-2))" },
  C: { label: "C", color: "hsl(var(--chart-3))" },
  D: { label: "D", color: "hsl(var(--chart-4))" },
  E: { label: "E", color: "hsl(var(--chart-5))" },
  F: { label: "F", color: "hsl(92, 100%, 100%)" },
};

export function AnalyticsChart() {
  const {
    selectedDate,
    age,
    gender,
    selectedFeature,
    setMultipleValues,
    resetToDefault,
  } = useAnalyticsStore();
  const [barChartData, setBarChartData] = useState<any[]>([]);
  const [lineChartData, setLineChartData] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const urlParams = parseUrlParams();
    if (urlParams) {
      setMultipleValues({
        selectedFeature: urlParams.feature,
        gender: urlParams.gender as "All" | "Male" | "Female",
        age: urlParams.age as "All" | "15-25" | ">25",
        selectedDate: urlParams.date || selectedDate,
      });
    }
  }, []);

  useEffect(() => {
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

      const newBarChartData = Object.entries(aggregatedData).map(
        ([key, value]) => ({
          category: key,
          value: value,
        })
      );
      setBarChartData(newBarChartData);
    } else {
      setBarChartData([]);
    }
  }, [selectedDate, age, gender]);

  useEffect(() => {
    if (selectedFeature) {
      let filteredData = analyticsData.analytics;

      if (age !== "All") {
        filteredData = filteredData.filter((item) => item.Age === age);
      }

      if (gender !== "All") {
        filteredData = filteredData.filter((item) => item.Gender === gender);
      }

      const newLineChartData = filteredData.map((item) => ({
        date: item.Day,
        value: item[selectedFeature as keyof typeof item] as number,
      }));

      setLineChartData(newLineChartData);
    }
  }, [selectedFeature, age, gender]);

  const handleFeatureClick = (feature: string) => {
    setMultipleValues({ selectedFeature: feature });
    updateUrl({ feature });
  };

  const handleBackClick = () => {
    setMultipleValues({ selectedFeature: null });
    updateUrl({ feature: null });
  };

  const handleResetFilters = () => {
    resetToDefault();
    router.push("/", { scroll: false });
  };

  const updateUrl = (params: { [key: string]: string | null }) => {
    const searchParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        searchParams.delete(key);
      } else {
        searchParams.set(key, value);
      }
    });
    router.push(`?${searchParams.toString()}`, { scroll: false });
  };

  if (barChartData.length === 0 && !selectedFeature) {
    return (
      <Card className="mb-5 bg-sidebar rounded-none">
        <CardHeader>
          <CardTitle className="text-2xl">Overall Analytics</CardTitle>
          <CardDescription className="text-xl">
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
      <Card className="mb-5 bg-sidebar rounded-none">
        <CardHeader className="flex flex-row items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-2">
          <div>
            <CardTitle className="text-2xl">Overall Analytics</CardTitle>
            <CardDescription className="text-xl">
              {selectedFeature
                ? `Trend for Feature ${selectedFeature}`
                : `${format(
                    selectedDate,
                    "MMMM d, yyyy"
                  )} | ${gender} | ${age}`}
            </CardDescription>
          </div>
          <Button size="lg" onClick={handleResetFilters}>
            Reset filters
          </Button>
        </CardHeader>
      </Card>
      <Card className="bg-sidebar py-5 rounded-none">
        <CardHeader className="">
          <CardTitle className="text-2xl">
            {selectedFeature ? (
              <div className="flex justify-start">
                <button onClick={handleBackClick}>
                  <ChevronLeft />
                </button>
                Trend for Feature {selectedFeature}
              </div>
            ) : (
              <div>Overall Analytics</div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedFeature ? (
            <FeaturesLineChart
              data={lineChartData}
              config={chartConfig}
              selectedFeature={selectedFeature}
            />
          ) : (
            <FeaturesBarChart
              data={barChartData}
              config={chartConfig}
              onFeatureClick={handleFeatureClick}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
}
