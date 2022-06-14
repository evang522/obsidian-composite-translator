import ResponseHandlerInterface from "./ResponseHandlerInterface";
import NotAuthorized from "../Exception/NotAuthorized";
import NotAuthenticated from "../Exception/NotAuthenticated";
import Conflict from "../Exception/Conflict";
import ServerError from "../Exception/ServerError";
import HttpException from "../Exception/HttpException";
import NotFound from "../Exception/NotFound";

export default abstract class BaseResponseHandler implements ResponseHandlerInterface
{
	abstract handle(response: Response): Promise<unknown>

	public resolveHttpExceptionFromResponse(response: Response): HttpException
	{
		switch (response.status)
		{
			case 403:
				return new NotAuthorized(response.statusText);
			case 401:
				return new NotAuthenticated(response.statusText);
			case 404:
				return new NotFound(response.statusText);
			case 409:
				return new Conflict(response.statusText);
			case 500:
				return new ServerError(response.statusText);
			default:
				return new HttpException(response.statusText, response.status);
		}
	}
}
