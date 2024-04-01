export interface Node {
  id: string;
  title: string;
  abstract: string;
  parents: string[];
  children: string[];
  evaluation: number;
}
