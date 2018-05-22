import moment from "moment";

export function YMDString(d: string | null | undefined) {
  if(!d) return "";
  return moment(d).format("YYYY-MM-DD");
}