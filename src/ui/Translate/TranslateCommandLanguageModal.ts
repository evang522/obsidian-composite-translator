import TranslatorPlugin from "../../application/TranslatorPlugin";
import {ButtonComponent, DropdownComponent, Editor, Modal, Notice} from "obsidian";
import BaseTranslationRequest from "../../domain/Translator/Model/BaseTranslationRequest";

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

		const formalitySelector = new DropdownComponent(contentEl);
		formalitySelector.addOption('formal', 'Formal');
		formalitySelector.addOption('informal', 'Informal');
		formalitySelector.setValue('informal');

		const translateButton = new ButtonComponent(contentEl)
			.setButtonText("Translate")
			.setClass('translator-translate-button');
		translateButton.onClick(() => this.doTranslate(languageField, translateButton, formalitySelector));

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

	private async doTranslate(languageField: DropdownComponent, translateButton: ButtonComponent, informalSelector: DropdownComponent): Promise<void>
	{
		translateButton.setButtonText('Translating...');
		const targetLanguage = languageField.getValue();
		try
		{
			const translationRequest = BaseTranslationRequest.create(null, targetLanguage, this.editor.getSelection());
			if (informalSelector.getValue() === 'informal') {
				translationRequest.setInformal();
			}

			const translation = await this.plugin.translator().translate(translationRequest);

			this.plugin.persistModifiedPluginData((pluginData) =>
			{
				pluginData.dataPoints().setLastTargetLanguageCode(targetLanguage);
			});

			this.editor.replaceSelection(translation.text());
		} catch (e)
		{
			new Notice(e.message);
		}

		this.close();
	}

	onClose()
	{
		const {contentEl} = this;
		contentEl.empty();
	}
}
