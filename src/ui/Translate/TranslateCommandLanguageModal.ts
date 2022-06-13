import TranslatorPlugin from "../../application/TranslatorPlugin";
import {ButtonComponent, DropdownComponent, Editor, Modal, Notice} from "obsidian";
import BaseTranslationRequest from "../../domain/Translator/Model/BaseTranslationRequest";
import TextLimitReached from "../../domain/DeepL/Exception/TextLimitReached";

export default class TranslateCommandLanguageModal extends Modal
{
	private plugin: TranslatorPlugin;
	private editor: Editor;

	public constructor(plugin: TranslatorPlugin, editor: Editor)
	{
		super(plugin.app);
		this.editor = editor;
		this.plugin = plugin;
	}

	public onOpen()
	{
		const {contentEl} = this;

		this.titleEl.textContent = "Translate and Replace Selected Text";
		this.titleEl.style.textAlign = 'left';
		this.titleEl.style.fontSize = '1.1rem';
		const languageField = new DropdownComponent(contentEl);


		const translateButton = new ButtonComponent(contentEl)
			.setButtonText("Translate")
			.onClick(() => this.doTranslate(languageField));
		translateButton.buttonEl.className = 'translator-translate-button';

		languageField.selectEl.onkeydown = (e) =>
		{
			if (e.key === 'Enter')
			{
				e.preventDefault();
				translateButton.buttonEl.click();
			}
		}


		this.plugin.translator().getAvailableTargetLanguages().forEach((language) =>
		{
			languageField.addOption(language.code(), language.name());
		});

		const lastUsedTargetLanguageCode = this.plugin.dataPoints().lastTargetLanguageCode();
		if (lastUsedTargetLanguageCode)
		{
			languageField.setValue(lastUsedTargetLanguageCode);
		}


	}

	private async doTranslate(languageField: DropdownComponent)
	{
		const targetLanguage = languageField.getValue();
		try
		{
			const translation = await this.plugin.translator().translate(
				BaseTranslationRequest.create(null, targetLanguage, this.editor.getSelection())
			);

			this.plugin.persistModifiedPluginData((pluginData) =>
			{
				pluginData.dataPoints().setLastTargetLanguageCode(targetLanguage);
			});

			this.editor.replaceSelection(translation.text());
		} catch (e)
		{
			if (e instanceof TextLimitReached)
			{
				new Notice(e.message);
			}
		}

		this.close();
	}

	onClose()
	{
		const {contentEl} = this;
		contentEl.empty();
	}
}
