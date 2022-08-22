class APIError extends Error {
    constructor(msg, status = 500){
        super(msg)
        this.status = status
    }

    static notFound(msg){
        return new this(msg || `Not Found`, 404)
    }
    static badRequest(msg= `Invalid Request`, status = 400){
        return new this(msg, status)
    }
    static unauthorized(msg, status = 401){
        const message = msg || `You don't have the right permission to access this route`
        return new this(message, status)
    }
    static unauthenticated(msg, status = 401){
        const message = msg || `You need to login first in order to have access to this route`
        return new this(message, status)
    }
    static customError(msg = 'Unknown Error', status = 500){
        return new this(msg, status)
    }

}

module.exports = {
    APIError
}