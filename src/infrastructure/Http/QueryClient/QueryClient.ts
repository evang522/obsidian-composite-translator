import HttpQuery from '../Query/HttpQuery';
import { QueryClientInterface } from './QueryClientInterface';
import fetch, {RequestInfo} from 'node-fetch';

export default class QueryClient implements QueryClientInterface
{
    public async sendRawRequest(request: Request): Promise<Response>
    {
		// @ts-ignore
        return await fetch(request as RequestInfo) as Response;
    }

    public async processQuery<TResponseData>(query: HttpQuery): Promise<TResponseData>
    {
        const response = await this.sendRawRequest(query.httpRequest());

        return await query.responseHandler().handle(response) as TResponseData;
    }
}
