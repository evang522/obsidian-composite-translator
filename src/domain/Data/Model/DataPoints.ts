import {DataPointsShape} from "./DataPointsShape";

export default class DataPoints
{
	private constructor(
		private _lastTargetLanguageCode: string | null,
	)
	{
	}

	public static create(lastTargetLanguageCode: string): DataPoints
	{
		return new DataPoints(lastTargetLanguageCode);
	}

	public static createDefault(): DataPoints
	{
		return new DataPoints('EN');
	}

	public lastTargetLanguageCode(): string | null
	{
		return this._lastTargetLanguageCode;
	}

	public setLastTargetLanguageCode(value: string): DataPoints
	{
		this._lastTargetLanguageCode = value;

		return this;
	}

	public mergePartialData(other: DataPointsShape): void
	{
		this.setLastTargetLanguageCode(other.lastTargetLanguageCode);
	}

	public toObjectLiteral(): DataPointsShape
	{
		return {
			'lastTargetLanguageCode': this.lastTargetLanguageCode(),
		}
	}
}
