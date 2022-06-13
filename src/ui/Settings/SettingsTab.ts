import {App, PluginSettingTab, Setting} from "obsidian";
import TranslatorPlugin from "../../application/TranslatorPlugin";
import {TranslationServiceType} from "../../domain/Data/Model/UserSettings";

export default class SettingsTab extends PluginSettingTab
{
	plugin: TranslatorPlugin;

	public constructor(app: App, plugin: TranslatorPlugin)
	{
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void
	{
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});

		new Setting(containerEl)
			.setName('Show Translate Icon in Ribbon')
			.setDesc('Show up')
			.addToggle(component => component
				.setValue(this.plugin.userSettings().showIconInRibbon())
				.onChange(async (value) =>
				{
					this.plugin.userSettings().setShowIconInRibbon(value);
					await this.plugin.persistPluginData();
					await this.plugin.pluginDataAndTranslator();
				})
			)

		new Setting(containerEl)
			.setName('Translation Service')
			.setDesc('Choose your translation service.')
			.addDropdown(component => component
				.addOption('deepl', 'DeepL')
				.addOption('google-translate', 'Google Translate')
				.setValue('deepl')
				.onChange(async (value) =>
				{
					this.plugin.userSettings().setChosenTranslationService(value as TranslationServiceType);
					await this.plugin.persistPluginData();
					await this.plugin.pluginDataAndTranslator();
				})
			)

		new Setting(containerEl)
			.setName('API Key')
			.setDesc('Using a translation service requires an API key.')
			.addText(component => component
				.setValue(this.plugin.userSettings().translationServiceApiToken() || '')
				.onChange(async (value) =>
				{
					this.plugin.userSettings().setTranslationServiceApiToken(value);
					await this.plugin.persistPluginData();
					await this.plugin.pluginDataAndTranslator();
				})
			)
	}


}
