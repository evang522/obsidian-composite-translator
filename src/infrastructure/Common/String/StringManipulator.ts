class StringManipulator
{
	private str: string;

	public constructor(optionalStartingString?: string)
	{
		this.str = optionalStartingString || '';
	}

	public static create(optionalStartingString?: string): StringManipulator
	{
		return new StringManipulator(optionalStartingString);
	}

	public append(stringToAppend: string): StringManipulator
	{
		this.str += stringToAppend;

		return this;
	}

	public appendWithEndingSpace(stringToAppend: string): StringManipulator
	{
		this.str += stringToAppend;
		this.str += ' ';

		return this;
	}

	public appendWithEndingNewLine(value: string): StringManipulator
	{
		this.str += value;
		this.str += '\n';

		return this;
	}

	public appendBefore(stringToAppend: string): StringManipulator
	{
		this.str = stringToAppend + this.str;

		return this;
	}

	public reset(): StringManipulator
	{
		this.str = '';

		return this;
	}

	public hasText(): boolean
	{
		return Boolean(this.str.length);
	}

	public recursivelyReplaceAllOccurrencesOfPattern(pattern: string, replaceValue: string): StringManipulator
	{
		while (this.str.includes(pattern))
		{
			this.str = this.str.split(pattern).join(replaceValue);
		}

		return this;
	}

	public trim(maxLength: number): StringManipulator
	{
		if (this.str.length > maxLength)
		{
			this.str = this.str.substring(0, maxLength);
		}

		return this;
	}

	/**
	 * @description If the string has any set of repeated trailing characters, such as "test...", they will be removed.
	 */
	public removeTrailingCharacterSet(searchCharacter: string): StringManipulator
	{
		let tempStr = this.str;
		while (tempStr[tempStr.length - 1] === searchCharacter)
		{
			tempStr = tempStr.slice(0, tempStr.length - 1);
		}

		this.str = tempStr;

		return this;
	}

	/**
	 * @description If the string has any set of repeated leading characters, such as "test...", they will be removed.
	 */
	public removeLeadingCharacterSet(searchCharacter: string): StringManipulator
	{
		let tempStr = this.str;
		while (tempStr[0] === searchCharacter)
		{
			tempStr = tempStr.slice(1, tempStr.length);
		}

		this.str = tempStr;

		return this;
	}

	public setValueIfEmpty(value: string): StringManipulator
	{
		if (!this.str)
		{
			this.str = value;
		}

		return this;
	}

	public manuallyManipulate(stringManipulator: (internalString: string) => string): StringManipulator
	{
		this.str = stringManipulator(this.str);

		return this;
	}

	public get(): string
	{
		return this.str;
	}
}

export default StringManipulator;
