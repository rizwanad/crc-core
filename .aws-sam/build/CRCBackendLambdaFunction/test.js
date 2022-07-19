// Import required AWS SDK clients and commands for Node.js
import { UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "./libs/client.js";

function getRandomInt(max = 29) {
    return Math.floor(Math.random() * max);
}  

const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
        "id": {S: "pk-004" },
    },
    UpdateExpression: "set itemCount = :c",
    ExpressionAttributeValues: {
        ":c": { N: String(getRandomInt()) },
    },
    ReturnValues: "ALL_NEW"
};

export const run = async () => {
    try {
        const data = await ddbClient.send(new UpdateItemCommand(params));
        return {
            statusCode: 200,
            isBase64Encoded: false,
            body: JSON.stringify({ data: data.Attributes.itemCount })
        };
    } catch (err) {
        console.error('error');
        console.log(err);
    }
};