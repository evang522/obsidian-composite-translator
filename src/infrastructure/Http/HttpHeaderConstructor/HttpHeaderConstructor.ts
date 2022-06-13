class HttpHeaderConstructor
{
    private constructor(
        private headers: Headers = new Headers()
    )
    {
    }

    public static create(): HttpHeaderConstructor
    {
        return new this();
    }

    public static buildForBlobAndAuthorizedPostRequestHeaders(
        token: string | undefined,
        apiVersion?: string
    ): Headers
    {
        return new this()
            .withAccept('application/pdf')
            .withContentTypeApplicationJson()
            .withOptionalApiVersion(apiVersion)
            .withAuthorization(token)
            .get();
    }

    public withAccept(acceptDataType: string): HttpHeaderConstructor
    {
        this.headers.set('Accept', acceptDataType);

        return this;
    }

    public withAuthorization(token: string | undefined): HttpHeaderConstructor
    {
        if (token)
        {
            this.headers.set('Authorization', `Bearer ${token}`);
        }

        return this;
    }

    public withContentType(contentType: string): HttpHeaderConstructor
    {
        this.headers.set('Content-Type', contentType);

        return this;
    }

    public withApiVersion(apiVersion: string): HttpHeaderConstructor
    {
        this.headers.set('X-Accept-Version', apiVersion);

        return this;
    }

    public withOptionalApiVersion(apiVersion?: string): HttpHeaderConstructor
    {
        if (apiVersion)
        {
            this.withApiVersion(apiVersion);
        }

        return this;
    }

    public withAcceptApplicationJson(): HttpHeaderConstructor
    {
        this.withAccept('application/json');

        return this;
    }

    public withContentTypeApplicationJson(): HttpHeaderConstructor
    {
        this.withContentType('application/json');

        return this;
    }

    public withContentTypeFormData(): HttpHeaderConstructor
    {
        this.withContentType('multipart/form-data');

        return this;
    }

    public get(): Headers
    {
        return this.headers;
    }
}

export default HttpHeaderConstructor;
