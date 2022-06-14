import TranslatorInterface from "./TranslatorInterface";
import LanguageModel from "../LanguageModel";
import BaseTranslationRequest from "../Model/BaseTranslationRequest";
import BaseTranslationResponse from "../Model/BaseTranslationResponse";
import TranslationServiceNotActivated from "../Exception/TranslationServiceNotActivated";

export default class PluginInactiveTranslator implements TranslatorInterface
{
	private constructor(
		private _chosenTranslationServiceId: string,
	)
	{
	}
	public static create(chosenTranslationServiceId: string): TranslatorInterface
	{
		return new PluginInactiveTranslator(chosenTranslationServiceId);
	}

	public getAvailableTargetLanguages(): LanguageModel[]
	{
		throw TranslationServiceNotActivated.forTranslationServiceId(this._chosenTranslationServiceId)
	}

	getAvailableSourceLanguages(): LanguageModel[]
	{
		throw TranslationServiceNotActivated.forTranslationServiceId(this._chosenTranslationServiceId)
	}

	public translate(translationRequest: BaseTranslationRequest): Promise<BaseTranslationResponse>
	{
		throw TranslationServiceNotActivated.forTranslationServiceId(this._chosenTranslationServiceId)
	}

}
