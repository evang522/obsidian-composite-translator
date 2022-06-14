import HttpException from "./HttpException";

export default class ServerError extends HttpException
{
	public static STATUS_CODE = 500;

	public constructor(message?: string)
	{
		super(message || 'Internal Server Error', ServerError.STATUS_CODE);
	}
}
