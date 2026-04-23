export enum Status {
  Completed,
  Current,
  Upcoming
};

export interface IStep {
  id: number,
  step: string,
  name: string,
  status: Status,
  text: string,
};