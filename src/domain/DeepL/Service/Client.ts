import StringManipulator from "../../../infrastructure/Common/String/StringManipulator";
import TextTranslation from "../Model/TextTranslation";
import {QueryClientInterface} from "../../../infrastructure/Http/QueryClient/QueryClientInterface";
import QueryClient from "../../../infrastructure/Http/QueryClient/QueryClient";
import ExpectJsonAndThrowIfNotOk from "../../../infrastructure/Http/ResponseHandler/ExpectJsonAndThrowIfNotOk";
import HttpQueryBuilder from "../../../infrastructure/Http/Builder/HttpQueryBuilder";

export default class Client
{
	private static PAID_API_URL = 'https://api.deepl.com/v2/translate';
	private static FREE_API_URL = 'https://api-free.deepl.com/v2/translate';

	private constructor(
		private readonly apiKey: string,
		private readonly httpQueryClient: QueryClientInterface = new QueryClient(),
	)
	{
	}

	public static create(apiKey: string): Client
	{
		return new Client(apiKey);
	}

	public async translate(sourceText: string, sourceLanguage: string, targetLanguage: string, informal: boolean): Promise<TextTranslation>
	{
		const requestUrl = StringManipulator.create(this.getApiUrl()).get();

		const formBody = new FormData();
		formBody.append('text', sourceText)
		formBody.append('target_lang', targetLanguage)
		formBody.append('auth_key', this.apiKey)
		if (informal) {
			formBody.append('formality', 'less')
		}

		const httpQuery = HttpQueryBuilder.new(requestUrl)
			.withResponseHandler(new ExpectJsonAndThrowIfNotOk())
			.withMethod('POST')
			.withFormBody(formBody)
			.get();

		const response = await this.httpQueryClient.processQuery<{
			translations: Array<{ detected_source_language: string, text: string }>
		}>(httpQuery);

		const firstTranslation = response.translations[0];


		return TextTranslation.create(firstTranslation.text, firstTranslation.detected_source_language);
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
}
