export default class TextLimitReached extends Error
{
	private constructor(message: string)
	{
		super(message);
	}

	public static forCharacterCount(characterCount: number): TextLimitReached
	{
		return new this(`Text limit reached: ${characterCount} characters submitted, but 5000 characters is the highest permitted with DeepL Free Api.`);
	}
}
