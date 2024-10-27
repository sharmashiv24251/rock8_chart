import { parse } from "date-fns";

export function parseUrlParams() {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const feature = params.get("feature");
  const gender = params.get("gender");
  const age = params.get("age");
  const date = params.get("date");

  return {
    feature: feature ? feature.toUpperCase() : null,
    gender:
      gender === "male" || gender === "female"
        ? gender.charAt(0).toUpperCase() + gender.slice(1)
        : "All",
    age: age === "15-25" || age === ">25" ? age : "All",
    date: date ? parse(date, "dd-MM-yyyy", new Date()) : null,
  };
}
