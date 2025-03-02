export default class HttpException extends Error
{
	public readonly status: number;

	public constructor(message: string, status: number)
	{
		super(message);
		this.status = status;
	}
}
