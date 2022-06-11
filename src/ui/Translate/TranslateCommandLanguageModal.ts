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
		const languageField = new DropdownComponent(contentEl);


		this.plugin.translator().getAvailableTargetLanguages().forEach((language) =>
		{
			languageField.addOption(language.code(), language.name());
		});

		const lastUsedTargetLanguageCode = this.plugin.dataPoints().lastTargetLanguageCode();
		if (lastUsedTargetLanguageCode)
		{
			languageField.setValue(lastUsedTargetLanguageCode);
		}


		const doTranslate = async () =>
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
		};

		const translateButton = new ButtonComponent(contentEl)
			.setButtonText("Translate")
			.onClick(doTranslate);
		translateButton.buttonEl.className = 'translator-translate-button';
	}

	onClose()
	{
		const {contentEl} = this;
		contentEl.empty();
	}
}
