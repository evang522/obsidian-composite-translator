export default class BaseTranslationRequest
{
	private constructor(
		private _sourceLanguage: string | null,
		private _targetLanguage: string,
		private _text: string
	)
	{
	}

	public static create(sourceLanguage: string | null, targetLanguage: string, text: string): BaseTranslationRequest
	{
		return new this(sourceLanguage, targetLanguage, text);
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
}
