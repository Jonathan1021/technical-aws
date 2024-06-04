const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");

const ddbClient = new DynamoDBClient();

exports.handler = async (event) => {
  const tableName = process.env.TABLE_NAME;
  const params = {
    TableName: tableName,
  };

  try {
    const data = await ddbClient.send(new ScanCommand(params));
    const items = data.Items.map((item) => unmarshall(item));
    return {
      statusCode: 200,
      body: JSON.stringify(items),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};