import { create } from "zustand";
import { parse } from "date-fns";

type AnalyticsState = {
  selectedDate: Date;
  age: "All" | "15-25" | ">25";
  gender: "All" | "Male" | "Female";
  selectedFeature: string | null;
  setSelectedDate: (date: Date) => void;
  setAge: (age: "All" | "15-25" | ">25") => void;
  setGender: (gender: "All" | "Male" | "Female") => void;
  setSelectedFeature: (feature: string | null) => void;
};

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  selectedDate: parse("04/10/2022", "dd/MM/yyyy", new Date()),
  age: "All",
  gender: "All",
  selectedFeature: null,
  setSelectedDate: (date) => set({ selectedDate: date }),
  setAge: (age) => set({ age }),
  setGender: (gender) => set({ gender }),
  setSelectedFeature: (feature) => set({ selectedFeature: feature }),
}));
