import {UserSettingsShape} from "./UserSettingsShape";
import {DataPointsShape} from "./DataPointsShape";

export interface PluginDataShape
{
	userSettings: UserSettingsShape;
	dataPoints: DataPointsShape;
}
