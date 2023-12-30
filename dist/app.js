"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const routes_1 = require("./app/routes");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
// parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Testing
app.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'Welcome to Tutoring service.',
    });
});
app.use('/api/v1', routes_1.ApplicationRouters);
app.use(globalErrorHandler_1.default);
// No routes
app.use((req, res) => {
    return res.status(404).json({
        success: false,
        message: 'Not found.',
        errorMessage: {
            path: req.originalUrl,
            message: 'Api not found!!! Wrong url, there is no route in this url.',
        },
    });
});
exports.default = app;
