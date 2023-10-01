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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
var path = require("path");
var client_s3_1 = require("@aws-sdk/client-s3");
var sharp = require("sharp");
// import sharp from "sharp";
var transfromationOptions = [
    { name: "w140", width: 140 },
    { name: "w348", width: 300 },
    { name: "w576", width: 576 },
    { name: "w960", width: 960 },
];
var s3 = new client_s3_1.S3Client({
    region: "ap-northeast-2",
});
var handler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var key, prefix_1, keyName_1, getparams, image, content_1, imageInfo_1, resizedImage, putParams, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 8, , 9]);
                key = event.Records[0].s3.object.key;
                prefix_1 = key.split("/")[0];
                keyName_1 = path.parse(key.split("/")[2]).name;
                getparams = {
                    Bucket: "maju-bucket",
                    Key: key,
                };
                return [4 /*yield*/, s3.send(new client_s3_1.GetObjectCommand(getparams))];
            case 1:
                image = _b.sent();
                return [4 /*yield*/, ((_a = image.Body) === null || _a === void 0 ? void 0 : _a.transformToByteArray())];
            case 2:
                content_1 = _b.sent();
                return [4 /*yield*/, sharp(content_1).metadata()];
            case 3:
                imageInfo_1 = _b.sent();
                if (!(imageInfo_1.width > 1200)) return [3 /*break*/, 6];
                return [4 /*yield*/, sharp(content_1, { animated: true })
                        .rotate()
                        .resize(1200)
                        .webp({
                        lossless: true,
                        quality: 60,
                        alphaQuality: 80,
                        force: false,
                    })
                        .toBuffer()];
            case 4:
                resizedImage = _b.sent();
                putParams = {
                    Bucket: "maju-bucket",
                    Body: resizedImage,
                    Key: "".concat(prefix_1, "/raw/").concat(keyName_1, ".webp"),
                };
                return [4 /*yield*/, s3.send(new client_s3_1.PutObjectCommand(putParams))];
            case 5: return [2 /*return*/, _b.sent()];
            case 6: return [4 /*yield*/, Promise.all(transfromationOptions.map(function (_a) {
                    var name = _a.name, width = _a.width;
                    return __awaiter(void 0, void 0, void 0, function () {
                        var newKey, resizedImage, putParams, putParams, error_2;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 6, , 7]);
                                    newKey = "".concat(prefix_1, "/").concat(name, "/").concat(keyName_1, ".webp");
                                    if (!(imageInfo_1.width > width)) return [3 /*break*/, 3];
                                    console.log("newKey: ".concat(newKey));
                                    return [4 /*yield*/, sharp(content_1, { animated: true })
                                            .rotate()
                                            .resize(width)
                                            .webp({
                                            lossless: true,
                                            quality: 60,
                                            alphaQuality: 80,
                                            force: false,
                                        })
                                            .toBuffer()];
                                case 1:
                                    resizedImage = _b.sent();
                                    putParams = {
                                        Bucket: "maju-bucket",
                                        Body: resizedImage,
                                        Key: newKey,
                                    };
                                    return [4 /*yield*/, s3.send(new client_s3_1.PutObjectCommand(putParams))];
                                case 2:
                                    _b.sent();
                                    return [3 /*break*/, 5];
                                case 3:
                                    putParams = {
                                        Bucket: "maju-bucket",
                                        Body: content_1,
                                        Key: newKey,
                                    };
                                    return [4 /*yield*/, s3.send(new client_s3_1.PutObjectCommand(putParams))];
                                case 4:
                                    _b.sent();
                                    _b.label = 5;
                                case 5: return [3 /*break*/, 7];
                                case 6:
                                    error_2 = _b.sent();
                                    console.log(error_2);
                                    return [3 /*break*/, 7];
                                case 7: return [2 /*return*/];
                            }
                        });
                    });
                }))];
            case 7:
                _b.sent();
                return [2 /*return*/, {
                        statusCode: 200,
                        body: event,
                    }];
            case 8:
                error_1 = _b.sent();
                console.log(error_1);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.handler = handler;
