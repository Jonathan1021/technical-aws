const { S3Client, ListObjectsV2Command } = require("@aws-sdk/client-s3");

const s3Client = new S3Client();

exports.handler = async (event) => {
  const bucketName = process.env.BUCKET_NAME;
  const params = {
    Bucket: bucketName,
  };

  try {
    const data = await s3Client.send(new ListObjectsV2Command(params));
    return {
      statusCode: 200,
      body: JSON.stringify(data.Contents)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};