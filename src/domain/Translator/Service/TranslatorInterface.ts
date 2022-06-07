import LanguageModel from "../LanguageModel";
import BaseTranslationResponse from "../Model/BaseTranslationResponse";
import BaseTranslationRequest from "../Model/BaseTranslationRequest";

export default interface TranslatorInterface
{
	translate(translationRequest: BaseTranslationRequest): Promise<BaseTranslationResponse>;

	getAvailableTargetLanguages(): LanguageModel[];
}
