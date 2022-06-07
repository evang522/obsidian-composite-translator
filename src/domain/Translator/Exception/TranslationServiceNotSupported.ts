export default class TranslationServiceNotSupported extends Error
{
	private constructor(serviceId: string)
	{
		super(`Translation service ${serviceId} not supported`);
	}

	public static forTranslatorId(translatorId: string): TranslationServiceNotSupported
	{
		return new TranslationServiceNotSupported(translatorId);
	}
}
