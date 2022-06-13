import ResponseHandlerInterface from './ResponseHandlerInterface';

export default class ExpectJsonAndThrowIfNotOk implements ResponseHandlerInterface
{
    public async handle(response: Response): Promise<Record<string, string>>
    {
        const [
            responseOK,
            body,
        ] = await Promise.all([
            response.ok,
            response.json(),
            response.status,
        ]);

        if (!responseOK)
        {
            throw new Error(body.message);
        }

        return body;
    }
}
