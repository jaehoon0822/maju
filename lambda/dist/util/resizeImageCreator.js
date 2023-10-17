"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImageCreator = void 0;
const sharp_1 = __importDefault(require("sharp"));
const resizeImageCreator = async ({ content, width, }) => {
    try {
        return await (0, sharp_1.default)(content, { animated: true })
            .rotate()
            .resize(width)
            .webp({
            lossless: true,
            quality: 60,
            alphaQuality: 80,
            force: false,
        })
            .toBuffer();
    }
    catch (error) {
        console.log(error);
    }
};
exports.resizeImageCreator = resizeImageCreator;
