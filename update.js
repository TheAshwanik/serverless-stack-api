import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      EmpId: event.requestContext.identity.cognitoIdentityId,
      //workday: event.pathParameters.workday
      workday: data.workday
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    //UpdateExpression: "SET  workday = :workday, connectivity = :connectivity, anycomment = :anycomment",
    UpdateExpression: "SET connectivity = :connectivity, anycomment = :anycomment",
    ExpressionAttributeValues: {
      //":workday": data.workday || null,
      ":connectivity": data.connectivity || null,
      ":anycomment": data.anycomment || null
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  try {
    await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false , error: e});
  }
}
