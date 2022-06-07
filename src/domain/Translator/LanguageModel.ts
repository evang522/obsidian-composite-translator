export default class LanguageModel
{
	private constructor(
		private readonly _code: string,
		private readonly _name: string
	)
	{
	}

	public static create(code: string, name: string)
	{
		return new LanguageModel(code, name);
	}

	public code(): string
	{
		return this._code;
	}

	public name(): string
	{
		return this._name;
	}
}
