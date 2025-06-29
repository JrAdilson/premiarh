class ApiResponse {
    static success(res, data = null, message = 'Success', statusCode = 200) {
        return res.status(statusCode).json({
            message,    
            ...(data || {}),
        });
    }

    static error(res, message = 'Internal Server Error', statusCode = 500, details = null) {
        return res.status(statusCode).json({
            message,
            error: details,
        });
    }

    static created(res, data, message = 'Created successfully') {
        return this.success(res, data, message, 201);
    }

    static noContent(res, message = 'Operation completed successfully') {
        return res.status(204).json({ message });
    }

    static notFound(res, message = 'Resource not found') {
        return this.error(res, message, 404);
    }

    static badRequest(res, message = 'Bad request', details = null) {
        return this.error(res, message, 400, details);
    }
}

module.exports = ApiResponse;