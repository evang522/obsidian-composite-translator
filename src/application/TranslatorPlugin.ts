import {Editor, MarkdownView, Modal, Plugin} from "obsidian";
import SettingsTab from "../ui/Settings/SettingsTab";
import TranslationWindow from "../ui/Translation/TranslationWindow";
import TranslatorInterface from "../domain/Translator/Service/TranslatorInterface";
import TranslatorFactory from "../domain/Translator/Service/TranslatorFactory";
import PluginData from "../domain/Data/Model/PluginData";
import {PluginDataShape} from "../domain/Data/Model/PluginDataShape";
import UserSettings from "../domain/Data/Model/UserSettings";
import DataPoints from "../domain/Data/Model/DataPoints";
import TranslateCommandLanguageModal from "../ui/Translate/TranslateCommandLanguageModal";

export default class TranslatorPlugin extends Plugin
{
	private pluginData: PluginData = PluginData.createDefault();
	private _translator: TranslatorInterface | null = null;

	public async onload()
	{
		await this.pluginDataAndTranslator();
		this.addSettingTab(new SettingsTab(this.app, this));
		this.registerTranslationWindowView();

		this.addCommand({
			id: 'sample-editor-command',
			name: 'Translate Command',
			editorCallback: (editor: Editor, view: MarkdownView) => {

				const modal = new TranslateCommandLanguageModal(this, editor);
				modal.open();
			}
		});

		if (this.userSettings().showIconInRibbon())
		{
			const ribbonIconEl = this.addRibbonIcon('languages', 'Composite Translator', (evt: MouseEvent) =>
			{
				this.activateTranslationWindowView();
			});
			ribbonIconEl.addClass('my-plugin-ribbon-class');
		}
	}

	private registerTranslationWindowView(): void
	{
		this.registerView(
			TranslationWindow.VIEW_TYPE,
			(leaf) => new TranslationWindow(leaf, this)
		);
	}

	public translator(): TranslatorInterface
	{
		return this._translator!;
	}

	public async activateTranslationWindowView(): Promise<void>
	{
		this.app.workspace.detachLeavesOfType(TranslationWindow.VIEW_TYPE);
		const rightLeaf = this.app.workspace.getRightLeaf(false);
		await rightLeaf.setViewState({type: TranslationWindow.VIEW_TYPE, active: true});
		this.app.workspace.revealLeaf(this.app.workspace.getLeavesOfType(TranslationWindow.VIEW_TYPE)[0]);
	}

	public async loadPluginStorageData(): Promise<void>
	{
		const loadedPluginData = await this.loadData() as Partial<PluginDataShape>;
		this.pluginData.mergePartialData(loadedPluginData);
	}

	public loadTranslator(): void
	{
		this._translator = TranslatorFactory.create(this.userSettings());
	}

	public async pluginDataAndTranslator(): Promise<void>
	{
		await this.loadPluginStorageData();
		this.loadTranslator();
	}

	public async persistPluginData(): Promise<void>
	{
		await this.saveData(this.pluginData.toObjectLiteral());
		console.log(await this.loadData(), 'hi');
	}

	public async persistModifiedPluginData(callback: (pluginData: PluginData) => void): Promise<void>
	{
		callback(this.pluginData);
		await this.persistPluginData();
	}

	public dataPoints(): DataPoints
	{
		return this.pluginData.dataPoints();
	}

	public userSettings(): UserSettings
	{
		return this.pluginData.userSettings();
	}
}
