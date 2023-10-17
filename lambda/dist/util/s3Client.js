"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getS3 = exports.putS3 = exports.bucket = exports.s3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
exports.s3 = new client_s3_1.S3Client({
    region: "ap-northeast-2",
});
exports.bucket = "maju-bucket";
const putS3 = async ({ Bucket, Body, Key }) => {
    try {
        const putParams = {
            Bucket,
            Body,
            Key,
        };
        await exports.s3.send(new client_s3_1.PutObjectCommand(putParams));
    }
    catch (error) {
        console.log(error);
    }
};
exports.putS3 = putS3;
const getS3 = async ({ Bucket, Key, }) => {
    try {
        const getParams = {
            Bucket,
            Key,
        };
        const image = await exports.s3.send(new client_s3_1.GetObjectCommand(getParams));
        return image;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.getS3 = getS3;
