const { Storage } = require('@google-cloud/storage');
const { nanoid } = require('nanoid');
const { fileStorageBucketName } = require('../config');

const bucketName = fileStorageBucketName;
const storage = new Storage();

function getUploadFileName(originalname) {
  const ext = originalname.split('.').pop();
  return `${nanoid()}.${ext}`;
}

async function upload(filePath, destFileName) {
  await storage.bucket(bucketName).upload(filePath, {
    destination: destFileName,
  });
}

async function setFileMetadata(fileName, originalname, contentEncoding, contentType) {
  await storage.bucket(bucketName).file(fileName).setMetadata({
    contentEncoding,
    contentType,
    metadata: {
      originalname,
    },
  });
}

function getUrl(fileName) {
  return storage.bucket(bucketName).file(fileName).publicUrl();
}

async function uploadFile(file) {
  const destFileName = getUploadFileName(file.originalname);
  await upload(file.path, destFileName);
  await setFileMetadata(destFileName, file.originalname, file.encoding, file.mimetype);
  return getUrl(destFileName);
}

module.exports = {
  uploadFile,
};
