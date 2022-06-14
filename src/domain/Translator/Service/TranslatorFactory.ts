import TranslatorInterface from "./TranslatorInterface";
import Translator from "../../DeepL/Service/Translator";
import TranslationServiceNotSupported from "../Exception/TranslationServiceNotSupported";
import PluginInactiveTranslator from "./PluginInactiveTranslator";
import UserSettings from "../../Data/Model/UserSettings";

export default class TranslatorFactory
{
	public static create(settings: UserSettings): TranslatorInterface
	{
		const apiKey = settings.translationServiceApiToken();
		if (!apiKey)
		{
			return PluginInactiveTranslator.create(settings.chosenTranslationService());
		}


		switch (settings.chosenTranslationService())
		{
			case "deepl":
				return this.createDeeplTranslator(settings);
			default:
				throw TranslationServiceNotSupported.forTranslatorId(settings.chosenTranslationService());
		}
	}

	private static createDeeplTranslator(settings: UserSettings): TranslatorInterface
	{
		return Translator.create(settings.translationServiceApiToken());
	}
}
