export default class TranslationServiceNotActivated extends Error
{
	private constructor(message: string)
	{
		super(message);
	}

	public static forTranslationServiceId(translationServiceId: string): TranslationServiceNotActivated
	{
		return new TranslationServiceNotActivated(
			`The Translation service "${translationServiceId}" is not activated. Please provide an API key.`
		);
	}
}
