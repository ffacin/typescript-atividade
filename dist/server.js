"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes/routes"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(routes_1.default);
var PORT = process.env.PORT || 3333;
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
