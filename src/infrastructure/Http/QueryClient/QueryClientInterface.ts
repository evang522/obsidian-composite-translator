import HttpQuery from '../Query/HttpQuery';

export interface QueryClientInterface
{
    sendRawRequest(request: Request): Promise<Response>;
    processQuery<TResponseData>(query: HttpQuery): Promise<TResponseData>;
}
