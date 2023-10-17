"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coverImageResizer = exports.avatarResizer = exports.postResizer = void 0;
const resizeImageCreator_1 = require("./resizeImageCreator");
const s3Client_1 = require("./s3Client");
const transformationOptions_1 = require("./transformationOptions");
const putImages = ({ transformationOptions, imageInfo, bucket, content, keyName, prefix, }) => {
    // postTransformationOptions 의 크기에 맞도록
    // 모든 image resize
    return Promise.all(transformationOptions.map(async ({ name, width }) => {
        try {
            const newKey = `${prefix}/${name}/${keyName}.webp`;
            // imageInfo 의 width 값이 postTransformationOptions 의
            // widht 보다 크면, width 값 resize 이후 s3 저장
            if (imageInfo.width > width) {
                console.log(`newKey: ${newKey}`);
                const resizedImage = await (0, resizeImageCreator_1.resizeImageCreator)({
                    content,
                    width,
                });
                // S3 저장
                await (0, s3Client_1.putS3)({ Bucket: bucket, Key: newKey, Body: resizedImage });
            }
            else {
                // imageInfo 의 width 값이 postTransformationOptions 의
                // width 값보다 작으면 그대로 s3 저장
                await (0, s3Client_1.putS3)({ Bucket: bucket, Key: newKey, Body: content });
            }
        }
        catch (error) {
            console.log(error);
        }
    }));
};
const postResizer = async ({ bucket, keyName, prefix, content, imageInfo, }) => {
    // newKey
    const newKey = `${prefix}/raw/${keyName}.webp`;
    // imageInfo 의 width 값이 최대값 1200 보다 크면
    // 원본 사이즈 1200 으로 resize
    if (imageInfo.width > 1200) {
        const resizedImage = await (0, resizeImageCreator_1.resizeImageCreator)({ content, width: 1200 });
        await (0, s3Client_1.putS3)({ Bucket: bucket, Body: resizedImage, Key: newKey });
    }
    await putImages({
        transformationOptions: transformationOptions_1.postTransformationOptions,
        bucket,
        content,
        imageInfo,
        keyName,
        prefix,
    });
};
exports.postResizer = postResizer;
const avatarResizer = async ({ bucket, prefix, keyName, content, imageInfo, }) => {
    try {
        await putImages({
            transformationOptions: transformationOptions_1.avatarTransformationOptions,
            bucket,
            content,
            imageInfo,
            keyName,
            prefix,
        });
    }
    catch (error) {
        if (error) {
            console.log(error);
        }
    }
};
exports.avatarResizer = avatarResizer;
const coverImageResizer = async ({ bucket, prefix, keyName, content, imageInfo, }) => {
    try {
        await putImages({
            transformationOptions: transformationOptions_1.coverImageTransformationOptions,
            bucket,
            content,
            imageInfo,
            keyName,
            prefix,
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.coverImageResizer = coverImageResizer;
