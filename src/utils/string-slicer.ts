interface StringSlicerProps {
  string: string;
  slice: number;
}
export const stringSlicer = ({ string, slice }: StringSlicerProps) => {
  return string?.length > slice ? string.slice(0, slice) + '...' : string;
};
