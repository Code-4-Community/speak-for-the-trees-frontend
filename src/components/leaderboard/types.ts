export interface TabItem {
  rank?: number;
  id: number;
  name: string;
  rightSide: React.ReactNode;
  collapseContent?: React.ReactNode;
}
