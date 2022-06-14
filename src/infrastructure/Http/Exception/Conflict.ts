import HttpException from "./HttpException";

export default class Conflict extends HttpException
{
	public static STATUS_CODE = 409;

	public constructor(message?: string)
	{
		super(message || 'Conflict', Conflict.STATUS_CODE);
	}
}
