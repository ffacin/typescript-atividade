"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = __importDefault(require("../controllers/UserController"));
var AuthController_1 = __importDefault(require("../controllers/AuthController"));
var CreditCardController_1 = __importDefault(require("../controllers/CreditCardController"));
var authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
var router = (0, express_1.Router)();

router.post('/users', UserController_1.default.create);

router.post('/login', AuthController_1.default.authenticate);

router.use(authMiddleware_1.default);

router.post('/cards', CreditCardController_1.default.create);

router.post('/cards/validate', CreditCardController_1.default.validate);
exports.default = router;
