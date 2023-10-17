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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const path = __importStar(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const s3Client_1 = require("./util/s3Client");
const resizers_1 = require("./util/resizers");
const handler = async (event) => {
    try {
        const key = event.Records[0].s3.object.key;
        const prefix = key.split("/")[0];
        const keyName = path.parse(key.split("/")[2]).name;
        const { Body } = await (0, s3Client_1.getS3)({ Bucket: s3Client_1.bucket, Key: key });
        const content = await Body?.transformToByteArray();
        const imageInfo = await (0, sharp_1.default)(content).metadata();
        if (prefix === "post") {
            await (0, resizers_1.postResizer)({ bucket: s3Client_1.bucket, content, imageInfo, keyName, prefix });
        }
        if (prefix === "avatar") {
            await (0, resizers_1.avatarResizer)({ imageInfo, bucket: s3Client_1.bucket, content, keyName, prefix });
        }
        if (prefix === "coverImage") {
            await (0, resizers_1.coverImageResizer)({ imageInfo, bucket: s3Client_1.bucket, content, keyName, prefix });
        }
        return {
            statusCode: 200,
            body: event,
        };
    }
    catch (error) {
        console.log(error);
    }
};
exports.handler = handler;
