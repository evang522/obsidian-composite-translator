import BaseResponseHandler from "./BaseResponseHandler";

export default class ExpectJsonAndThrowIfNotOk extends BaseResponseHandler
{
	public async handle(response: Response): Promise<Record<string, string>>
	{
		if (!response.ok)
		{
			throw this.resolveHttpExceptionFromResponse(response);
		}

		return await response.json();
	}
}
