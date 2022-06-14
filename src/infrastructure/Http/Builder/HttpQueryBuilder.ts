import ResponseHandlerInterface from '../ResponseHandler/ResponseHandlerInterface';
import HttpQuery from '../Query/HttpQuery';
import HttpHeaderConstructor from '../HttpHeaderConstructor/HttpHeaderConstructor';

export default class HttpQueryBuilder
{
	private uri: string;
	private requestInfo: RequestInit = {};
	private responseHandler: ResponseHandlerInterface | null = null;

	public constructor(uri: string)
	{
		this.uri = uri;
	}

	public static new(uri: string): HttpQueryBuilder
	{
		return new this(uri);
	}

	public withResponseHandler(handler: ResponseHandlerInterface): HttpQueryBuilder
	{
		this.responseHandler = handler;

		return this;
	}

	public withUri(uri: string): HttpQueryBuilder
	{
		this.uri = uri;

		return this;
	}

	public withBearerToken(token: string): HttpQueryBuilder
	{
		this.withHeader('Authorization', `Bearer ${token}`);

		return this;
	}

	public withMutation(mutationFunction: (builder: HttpQueryBuilder) => void): HttpQueryBuilder
	{
		mutationFunction(this);

		return this;
	}

	public withMethod(method: HTTP_METHOD): HttpQueryBuilder
	{
		this.requestInfo.method = method;

		return this;
	}

	public withPostBody(body: BodyInit): HttpQueryBuilder
	{
		this.requestInfo.body = body;

		return this;
	}

	public withJsonBody(body: Record<string, unknown>): HttpQueryBuilder
	{
		this.requestInfo.body = JSON.stringify(body);

		return this;
	}

	public withFormBody(formBody: FormData): HttpQueryBuilder
	{
		this.requestInfo.body = formBody;

		return this;
	}

	public get(): HttpQuery
	{
		if (!this.responseHandler)
		{
			throw new Error(`Response handler for http query [${this.uri}] must be defined.`);
		}

		const request = new Request(this.uri, this.requestInfo);

		return HttpQuery.create(
			request,
			this.responseHandler
		);
	}

	public withHeaders(headers: Headers): HttpQueryBuilder
	{
		this.requestInfo.headers = headers;

		return this;
	}

	public withHeader(key: string, value: string): HttpQueryBuilder
	{
		if (!this.requestInfo.headers)
		{
			this.requestInfo.headers = new Headers();
		}

		(this.requestInfo.headers as Headers).append(key, value);

		return this;
	}

	public withHeadersCallback(
		headerCallback: (headersConstructor: HttpHeaderConstructor) => Headers
	): HttpQueryBuilder
	{
		const headers = headerCallback(HttpHeaderConstructor.create());
		this.requestInfo.headers = headers;

		return this;
	}
}

export type HTTP_METHOD = 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE';
