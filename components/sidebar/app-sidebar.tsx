"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAnalyticsStore } from "@/store";
import { parse } from "date-fns";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {
    selectedDate,
    age,
    gender,
    selectedFeature,
    setSelectedDate,
    setAge,
    setGender,
  } = useAnalyticsStore();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <h2 className="text-lg font-semibold p-4">Analytics Dashboard</h2>
      </SidebarHeader>
      <SidebarContent>
        <div className="p-4 space-y-4">
          <div className="">
            <label className="block text-sm font-medium mb-1">Date</label>
            <SidebarGroup className="px-0 sm:translate-x-[-20px]">
              <SidebarGroupContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="[&_[role=gridcell].bg-accent]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[33px]"
                  initialFocus
                  defaultMonth={new Date(2022, 9)}
                  fromDate={parse("04/10/2022", "dd/MM/yyyy", new Date())}
                  toDate={parse("29/10/2022", "dd/MM/yyyy", new Date())}
                  disabled={selectedFeature !== null}
                />
              </SidebarGroupContent>
            </SidebarGroup>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <Select value={age} onValueChange={setAge}>
              <SelectTrigger>
                <SelectValue placeholder="Select age range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="15-25">15-25</SelectItem>
                <SelectItem value=">25">&gt;25</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
