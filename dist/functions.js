"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPartOfDay = exports.generateImage = exports.searchData = void 0;
const openai_1 = require("openai");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const Config = new openai_1.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new openai_1.OpenAIApi(Config);
function searchData(location) {
    return __awaiter(this, void 0, void 0, function* () {
        const locationDataRequest = yield fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${process.env.OPENWEATHER_KEY}`);
        let locationData = yield locationDataRequest.json();
        if (!locationData[0]) {
            return {
                status: 0,
                message: 'We could not find the weather information in your area, check for mispellings, typos, and other gramatical mistakes and try again, maybe try to use other ways of the location as well.'
            };
        }
        const weatherDataRequest = yield fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${locationData[0].lat}&lon=${locationData[0].lon}&exclude=hourly,minutely&appid=${process.env.OPENWEATHER_KEY}&units=metric`);
        let weatherData = yield weatherDataRequest.json();
        return {
            status: 1,
            message: 'Weather data fetched successfully',
            weatherData,
            locationData
        };
    });
}
exports.searchData = searchData;
function generateImage(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        const img = yield openai.createImage({
            prompt,
            n: 1,
            size: '512x512'
        });
        console.log(prompt);
        console.log(img.data.data[0]);
        return img.data.data[0].url;
    });
}
exports.generateImage = generateImage;
function getPartOfDay() {
    const hours = new Date().getHours();
    if (hours >= 0 && hours < 6) {
        return "Midnight";
    }
    else if (hours >= 6 && hours < 9) {
        return "Dawn";
    }
    else if (hours >= 9 && hours < 12) {
        return "Noon";
    }
    else if (hours >= 12 && hours < 15) {
        return "Afternoon";
    }
    else if (hours >= 15 && hours < 18) {
        return "Dusk";
    }
    else {
        return "Night";
    }
}
exports.getPartOfDay = getPartOfDay;
//# sourceMappingURL=functions.js.map