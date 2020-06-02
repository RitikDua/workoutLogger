import {ExerciseList} from './exerciseList';
import {STAT} from './stat';
export interface USER{
	username:string;
	exercisesList:ExerciseList;
	stats:STAT[];
}