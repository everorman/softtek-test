const crypto = require('crypto');
const aws = require('aws-sdk');
const { formatResponse } = require('../../../utils/formatResponse');


const isTest = process.env.JEST_WORKER_ID;
const config = {
  convertEmptyValues: true,
  ...(isTest && {
    endpoint: 'http://localhost:8000',
    sslEnabled: false,
    region: 'local-env',
  }),
};
const dynamodb = new aws.DynamoDB.DocumentClient(config);

const get = async (event) => {
  let personId = event.pathParameters.id;
  const params = {
    TableName: 'SofttekTable',
    Key: {
      pk: personId,
    },
  };

  const { Item: item } = await dynamodb.get(params).promise();
  if (!item) return formatResponse(403, { error: "Person not found" });
  return formatResponse(200, item);

};

module.exports = {
  get
};