// Import required AWS SDK clients and commands for Node.js
import { UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "./libs/client.js";

function getRandomInt(max = 29) {
    return Math.floor(Math.random() * max);
}

export const run = async () => {
  try {
    const data = await ddbClient.send(
      new UpdateItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: { "id": {S: "pk-001"} },
        UpdateExpression: "set itemCount = :c",
        ExpressionAttributeValues: {
            ":c": { N: String(getRandomInt()) },
        },
        ReturnValues: "UPDATED_NEW"
      })
    );
    return {
        statusCode: 200,
        isBase64Encoded: false,
        body: JSON.stringify({ data: data })
    };
  } catch (err) {
    console.error('error', err);
    return JSON.stringify({ error: err });
  }
};