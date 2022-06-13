export default interface ResponseHandlerInterface
{
    handle(response: Response): Promise<unknown>;
}
