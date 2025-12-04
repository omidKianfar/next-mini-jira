import { StringSlicerProps } from "./type";

export const stringSlicer = ({ string, slice }: StringSlicerProps) => {
  return string.length > slice ? string.slice(0, slice) + "..." : string;
};
