import UserSettings from "./UserSettings";
import DataPoints from "./DataPoints";
import {PluginDataShape} from "./PluginDataShape";

export default class PluginData
{
	private constructor(
		private _userSettings: UserSettings,
		private _dataPoints: DataPoints,
	)
	{
	}

	public static create(settings: UserSettings, dataPoints: DataPoints): PluginData
	{
		return new PluginData(settings, dataPoints);
	}

	public static createDefault(): PluginData
	{
		return new PluginData(UserSettings.createDefault(), DataPoints.createDefault());
	}

	public userSettings(): UserSettings
	{
		return this._userSettings;
	}

	public dataPoints(): DataPoints
	{
		return this._dataPoints;
	}

	public mergePartialData(other: Partial<PluginDataShape>): void
	{
		if (other.userSettings)
		{
			this._userSettings.mergePartialSettings(other.userSettings);
		}

		if (other.dataPoints)
		{
			this._dataPoints.mergePartialData(other.dataPoints);
		}
	}

	public toObjectLiteral(): PluginDataShape
	{
		return {
			dataPoints: this._dataPoints.toObjectLiteral(),
			userSettings: this._userSettings.toObjectLiteral(),
		}
	}
}
