export interface Event {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endingDate: Date;
  isFinished: boolean;
  places: string[];
}
