import {OneDayStats} from './todayStats';
export interface STAT{
	date:Date;
	weight:number;
	height:number;
	todayStats:OneDayStats[];
}