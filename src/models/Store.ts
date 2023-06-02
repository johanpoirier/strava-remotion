import { Athlete } from './Athlete';
import { MyActivity } from './MyActivity';

export interface Store {
  athlete: Athlete;
  activities: MyActivity[];
}
