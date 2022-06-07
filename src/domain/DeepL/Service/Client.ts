import electron from 'electron';
import StringManipulator from "../../../infrastructure/Common/String/StringManipulator";
import TextTranslation from "../Model/TextTranslation";
import TextLimitReached from "../Exception/TextLimitReached";

export default class Client
{
	private static PAID_API_URL = 'https://api.deepl.com/v2/translate';
	private static FREE_API_URL = 'https://api-free.deepl.com/v2/translate';

	private constructor(
		private readonly apiKey: string,
	)
	{
	}

	public static create(apiKey: string): Client
	{
		return new Client(apiKey);
	}

	private isFreeApiKey(): boolean
	{
		return this.apiKey.includes(':fx');
	}

	private getApiUrl(): string
	{
		if (this.isFreeApiKey())
		{
			return Client.FREE_API_URL;
		}

		return Client.PAID_API_URL;
	}

	public translate(sourceText: string, sourceLanguage: string, targetLanguage: string): Promise<TextTranslation>
	{
		if (this.isFreeApiKey() && sourceText.length > 5000)
		{
			throw TextLimitReached.forCharacterCount(sourceText.length);
		}

		const requestUrl = StringManipulator.create(this.getApiUrl())
			.append('?text=' + sourceText)
			.append('&target_lang=' + targetLanguage)
			.append('&auth_key=' + this.apiKey)
			.get();

		const request = electron.remote.net.request({
			url: requestUrl,
			method: 'POST'
		});

		return new Promise((resolve, reject) =>
		{
			request.on("response", (response: any) =>
			{
				console.log(response.statusCode);
				response.on("error", () =>
				{
					reject('bad');
				});
				response.on("data", (chunk: any) =>
				{
					const responseBody = JSON.parse(chunk);
					console.log(responseBody);
					if (!responseBody || !responseBody.translations || !responseBody.translations.length)
					{
						reject('Translation Failed');
					}
					const firstTranslation = responseBody.translations[0];
					resolve(
						TextTranslation.create(firstTranslation.text, firstTranslation.detected_source_language)
					);
				});
			});
			request.end();
		});

	}
}
