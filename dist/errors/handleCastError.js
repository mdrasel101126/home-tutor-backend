"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (error) => {
    const errors = [
        {
            path: error.path,
            message: 'Invalid Id',
        },
    ];
    return {
        statusCode: 400,
        message: 'Cast error',
        errorMessages: errors,
    };
};
exports.default = handleCastError;
