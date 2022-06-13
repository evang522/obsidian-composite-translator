import {DropdownComponent, ItemView, TextAreaComponent, WorkspaceLeaf} from "obsidian";
import Translator from "../../domain/DeepL/Service/Translator";
import BaseTranslationRequest from "../../domain/Translator/Model/BaseTranslationRequest";
import TranslatorPlugin from "../../application/TranslatorPlugin";

export default class TranslationWindow extends ItemView
{
	public static VIEW_TYPE = 'composite-translator-window';

	private static KEYDOWN_TIMEOUT = 700;

	public constructor(leaf: WorkspaceLeaf, private plugin: TranslatorPlugin)
	{
		super(leaf);
	}

	public getIcon(): string
	{
		return 'languages';
	}

	public getDisplayText(): string
	{
		return "Composite Translator";
	}

	public getViewType(): string
	{
		return TranslationWindow.VIEW_TYPE;
	}

	public async onOpen(): Promise<void>
	{
		const {contentEl} = this;
		const translator = this.plugin.translator();

		contentEl.empty();
		contentEl.createEl("h4", {cls: 'translation-window-title', text: "Composite Translator"});

		const inputTextAreaComponent = new TextAreaComponent(contentEl)
			.setPlaceholder('Text to Translate');
		inputTextAreaComponent.inputEl.className = 'translator-input';


		const targetlanguageSelector = new DropdownComponent(contentEl);
		targetlanguageSelector.selectEl.style.marginLeft = '.5rem';

		const supportedLanguages = translator.getAvailableTargetLanguages();

		supportedLanguages.forEach((language) =>
		{
			targetlanguageSelector.addOption(language.code(), language.name());
		});

		targetlanguageSelector.onChange(async (value) =>
		{
			if (!value.trim())
			{
				return;
			}

			const inputAreaComponentValue = inputTextAreaComponent.getValue();

			if (!inputAreaComponentValue.trim())
			{
				return;
			}

			const translation = await translator.translate(
				BaseTranslationRequest.create(null, value.trim(), inputAreaComponentValue.trim())
			);
			outputTextAreaComponent.setValue(translation.text());

			this.plugin.persistModifiedPluginData((pluginData) =>
			{
				pluginData.dataPoints().setLastTargetLanguageCode(value);
			})
		});

		if (this.plugin.dataPoints().lastTargetLanguageCode())
		{
			targetlanguageSelector.setValue(this.plugin.dataPoints().lastTargetLanguageCode());
		}

		const outputTextAreaComponent = new TextAreaComponent(contentEl)
			.setPlaceholder('Translated Text');
		outputTextAreaComponent.inputEl.className = 'translator-output';


		let timer = null;
		inputTextAreaComponent.onChange((value) =>
			{
				const trimmedValue = value.trim();
				if (trimmedValue === '')
				{
					outputTextAreaComponent.setValue('');
					return;
				}

				if (timer)
				{
					clearTimeout(timer);
					timer = null;
				}

				timer = setTimeout(async () =>
				{

					const translation = await translator.translate(
						BaseTranslationRequest.create(null, targetlanguageSelector.getValue(), trimmedValue)
					);
					outputTextAreaComponent.setValue(translation.text());
				}, TranslationWindow.KEYDOWN_TIMEOUT);
			}
		)
	}

	public async onClose(): Promise<void>
	{
		this.unload();
	}
}
