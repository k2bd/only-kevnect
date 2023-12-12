export interface Group {
  level: number;
  members: string[];
}

export interface Puzzle {
  id: number;
  groups: { [key: string]: Group };
  startingGroups: string[][];
}
