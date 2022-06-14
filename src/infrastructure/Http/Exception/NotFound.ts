import HttpException from "./HttpException";

export default class NotFound extends HttpException
{
	public static STATUS_CODE = 404;

	public constructor(message?: string)
	{
		super(message || 'Not Found', NotFound.STATUS_CODE);
	}
}
