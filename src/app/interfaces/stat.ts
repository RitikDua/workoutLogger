import {OneDayStats} from './todayStats';
export interface STAT{
	date:string;
	weight:number;
	height:number;
	todayStats:OneDayStats[];
}