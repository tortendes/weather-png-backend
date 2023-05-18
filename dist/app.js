"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const functions_1 = require("./functions");
const app = (0, express_1.default)();
app.get('/api/v1/query', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.location.toString();
    const result = yield (0, functions_1.searchData)(query);
    if (result.status == 0) {
        res.status(404);
        return res.send(result);
    }
    else
        return res.send(result);
}));
app.get('/api/v1/generate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.location.toString();
    const result = yield (0, functions_1.searchData)(query);
    if (result.status == 0) {
        res.status(404);
        return res.send(result);
    }
    const image = yield (0, functions_1.generateImage)(`a birds eye view over ${query} with ${result.weatherData.current.weather[0].main} and ${result.weatherData.current.weather[0].description} in ${(0, functions_1.getPartOfDay)()}`);
    res.send({
        result,
        image
    });
}));
app.listen(3000, () => {
    console.log('🚀 Listening at port 3000');
});
//# sourceMappingURL=app.js.map