export type FilterFormType = {
  tag: string;
  from: string;
  to: string;
};

export interface FilterTaskProps{
  handleCloseModal?: () => void
}