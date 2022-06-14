import HttpException from "./HttpException";

export default class NotAuthorized extends HttpException
{
	public static STATUS_CODE = 403;

	public constructor(message?: string)
	{
		super(message || 'Not Authorized', NotAuthorized.STATUS_CODE);
	}
}
