import {TranslationServiceType} from "./UserSettings";

export interface UserSettingsShape
{
	showIconInRibbon: boolean;
	chosenTranslationService: TranslationServiceType;
	translationServiceApiToken: string | null;
}
