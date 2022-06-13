import ResponseHandlerInterface from './ResponseHandlerInterface';

export default class ExpectTextAndThrowIfNotOk implements ResponseHandlerInterface
{
    public async handle(response: Response): Promise<string>
    {
        const [
            responseOK,
            body,
        ] = await Promise.all([
            response.ok,
            response.text(),
            response.status,
        ]);

        if (!responseOK)
        {
            throw new Error(response.statusText);
        }

        return body;
    }
}
