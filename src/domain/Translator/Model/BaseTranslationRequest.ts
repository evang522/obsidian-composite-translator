export default class BaseTranslationRequest
{
	private constructor(
		private _sourceLanguage: string | null,
		private _targetLanguage: string,
		private _text: string,
		private _informal: boolean = false,
	)
	{
	}

	public static create(sourceLanguage: string | null, targetLanguage: string, text: string): BaseTranslationRequest
	{
		return new this(sourceLanguage, targetLanguage, text);
	}

	public setInformal(): BaseTranslationRequest
	{
		this._informal = true;
		return this;
	}

	public sourceLanguage(): string | null
	{
		return this._sourceLanguage;
	}

	public targetLanguage(): string
	{
		return this._targetLanguage;
	}

	public text(): string
	{
		return this._text;
	}

	public informal(): boolean
	{
		return this._informal;
	}
}
