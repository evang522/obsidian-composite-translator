import HttpException from "./HttpException";

export default class NotAuthenticated extends HttpException
{
	public static STATUS_CODE = 401;

	public constructor(message?: string)
	{
		super(message || 'Not authenticated', NotAuthenticated.STATUS_CODE);
	}
}
