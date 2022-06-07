export default class TextTranslation
{
	private constructor(private _text: string, private _detectedSourceLanguage: string | null)
	{
	}

	public static create(text: string, detectedSourceLanguage: string | null): TextTranslation
	{
		return new TextTranslation(text, detectedSourceLanguage);
	}

	public detectedSourceLanguage(): string | null
	{
		return this._detectedSourceLanguage;
	}

	public text(): string
	{
		return this._text;
	}
}
