import HttpException from "./HttpException";

export default class BadRequest extends HttpException
{
	public static STATUS_CODE = 400;

	public constructor(message?: string)
	{
		super(message || 'Bad Request', BadRequest.STATUS_CODE);
	}
}
