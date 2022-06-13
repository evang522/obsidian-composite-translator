import ResponseHandlerInterface from '../ResponseHandler/ResponseHandlerInterface';

export default class HttpQuery
{
	private constructor(
		private _httpRequest: Request,
		private _responseHandler: ResponseHandlerInterface
	)
	{
	}

	public static create(request: Request, responseHandler: ResponseHandlerInterface): HttpQuery
	{
		return new HttpQuery(request, responseHandler);
	}

	public httpRequest(): Request
	{
		return this._httpRequest;
	}

	public responseHandler(): ResponseHandlerInterface
	{
		return this._responseHandler;
	}
}
