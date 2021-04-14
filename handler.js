'use strict';

const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',
});

const tableName = 'Artist';
const ddb = new AWS.DynamoDB({
  apiVersion: '2012-08-10',
});

module.exports.importArtist = async (event) => {
  if (!event.name || !event.id) {
    throw new Error("Invalid request");
  }

  try {
    const params = {
      TableName: tableName,
      Item: {
        Id: {
          "S": event.id,
        },
        Name: {
          "S": event.name,
        },
      }
    }

    await ddb.putItem(params).promise();
    return event;
  } catch (error) {
    console.log("🚀 ~ file: handler.js ~ line 35 ~ module.exports.importArtist= ~ error", error)
  }

  return null;
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
