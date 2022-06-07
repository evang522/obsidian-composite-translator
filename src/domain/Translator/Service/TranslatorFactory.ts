import TranslatorInterface from "./TranslatorInterface";
import Settings from "../../Settings/Model/Settings";
import Translator from "../../DeepL/Service/Translator";
import TranslationServiceNotSupported from "../Exception/TranslationServiceNotSupported";
import PluginInactiveTranslator from "./PluginInactiveTranslator";

export default class TranslatorFactory
{
	public static create(settings: Settings): TranslatorInterface
	{
		const apiKey = settings.translationServiceApiToken();
		if (!apiKey)
		{
			return new PluginInactiveTranslator(settings.chosenTranslationService());
		}


		switch (settings.chosenTranslationService())
		{
			case "deepl":
				return this.createDeeplTranslator(settings);
			default:
				throw TranslationServiceNotSupported.forTranslatorId(settings.chosenTranslationService());
		}
	}

	private static createDeeplTranslator(settings: Settings): TranslatorInterface
	{
		return Translator.create(settings.translationServiceApiToken());
	}
}
