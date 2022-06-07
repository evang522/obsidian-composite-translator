export default class BaseTranslationResponse
{
	private constructor(
		private readonly _text: string,
		private readonly _sourceLanguage: string,
	)
	{
	}

	public static create(text: string, sourceLanguage: string): BaseTranslationResponse
	{
		return new BaseTranslationResponse(text, sourceLanguage);
	}

	public sourceLanguage(): string | null
	{
		return this._sourceLanguage;
	}

	public text(): string
	{
		return this._text;
	}
}

