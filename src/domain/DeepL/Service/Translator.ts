import LanguageModel from "../../Translator/LanguageModel";
import BaseTranslationRequest from "../../Translator/Model/BaseTranslationRequest";
import BaseTranslationResponse from "../../Translator/Model/BaseTranslationResponse";
import Client from "./Client";
import TranslatorInterface from "../../Translator/Service/TranslatorInterface";
import supportedLanguages from './supportedLanguages.json';

export default class Translator implements TranslatorInterface
{
	private constructor(
		private deepl: Client,
	)
	{
	}

	public static create(apiKey: string): Translator
	{
		return new Translator(Client.create(apiKey));
	}

	public getAvailableTargetLanguages(): LanguageModel[]
	{
		return supportedLanguages.map((language) => LanguageModel.create(language.language, language.name));
	}

	public async translate(translationRequest: BaseTranslationRequest): Promise<BaseTranslationResponse>
	{
		const translation = await this.deepl.translate(
			translationRequest.text(),
			translationRequest.sourceLanguage(),
			translationRequest.targetLanguage()
		);

		return BaseTranslationResponse.create(translation.text(), translation.detectedSourceLanguage());
	}
}
