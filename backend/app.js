import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "./libs/document.js";

function getRandomInt(max = 29) {
  return Math.floor(Math.random() * max);
}

function getUuid() {
  return String(new Date().getTime());
}

const uuid = getUuid();

export async function handler() {
  const TABLE_NAME = process.env.TABLE_NAME;

  try {
    const data = await ddbDocClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          id: getUuid(),
          count: getRandomInt()
        }
      })
    );
    return {
      statusCode: 200,
      isBase64Encoded: false,
      body: { count, ...data }
    };
  } catch(err) {
      console.log(err);
      return {
        statusCode: 500
      };
  }
};
