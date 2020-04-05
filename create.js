//import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {

  // current timestamp in milliseconds
  let ts = Date.now();

  let date_ob = new Date(ts);
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);
  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  // current year
  let year = date_ob.getFullYear();
  let fulldate = year + "-" + month + "-" + date;

  // prints date & time in YYYY-MM-DD format
  console.log(year + "-" + month + "-" + date);

  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      EmpId: event.requestContext.identity.cognitoIdentityId,
      email: data.email,
      name: data.name,
      workday: fulldate,
      connectivity: data.connectivity,
      anycomment: data.anycomment,
      createdAt: Date.now()
    }
  };
  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    console.log(e);
    return failure({ error: e, status: false });
  }
}
