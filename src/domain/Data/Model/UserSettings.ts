import {UserSettingsShape} from "./UserSettingsShape";

export type TranslationServiceType = 'deepl' | 'google-translate';

export default class UserSettings
{
	private _showIconInRibbon: boolean;
	private _chosenTranslationService: TranslationServiceType;
	private _translationServiceApiToken: string | null;

	private constructor()
	{
		this._showIconInRibbon = true;
		this._chosenTranslationService = 'deepl';
		this._translationServiceApiToken = null;
	}

	public translationServiceApiToken(): string | null
	{
		return this._translationServiceApiToken;
	}

	public setTranslationServiceApiToken(value: string | null)
	{
		this._translationServiceApiToken = value;
	}

	public chosenTranslationService(): TranslationServiceType
	{
		return this._chosenTranslationService;
	}

	public setChosenTranslationService(value: TranslationServiceType)
	{
		this._chosenTranslationService = value;
	}

	public static createDefault(): UserSettings
	{
		return new UserSettings();
	}

	public showIconInRibbon(): boolean
	{
		return this._showIconInRibbon;
	}

	public setShowIconInRibbon(value: boolean): UserSettings
	{
		this._showIconInRibbon = value;

		return this;
	}

	public toObjectLiteral(): UserSettingsShape
	{
		return {
			showIconInRibbon: this.showIconInRibbon(),
			chosenTranslationService: this.chosenTranslationService(),
			translationServiceApiToken: this.translationServiceApiToken(),
		}
	}

	public static fromObjectLiteral(settings: UserSettingsShape): UserSettings
	{
		const self = this.createDefault();

		self.setShowIconInRibbon(settings.showIconInRibbon);
		self.setChosenTranslationService(settings.chosenTranslationService);

		return self;
	}

	public mergePartialSettings(settings: Partial<UserSettingsShape>): void
	{
		this.setTranslationServiceApiToken(settings.translationServiceApiToken)
		this.setShowIconInRibbon(settings.showIconInRibbon ?? this._showIconInRibbon);
		this.setChosenTranslationService(settings.chosenTranslationService ?? this._chosenTranslationService);
	}
}
