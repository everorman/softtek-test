const crypto = require('crypto');
const aws = require('aws-sdk');


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

const save = async (event, context) => {
  const pk = crypto.randomBytes(20).toString('hex');
  const body = JSON.parse(event.body);
  body.pk = pk;
  var params = {
    TableName: 'indraTable',
    Item: body
  };
  const res = await dynamodb.put(params).promise();
  if (!res) {
    throw Error(`There was an error inserting ID of ${data.ID} in table ${TableName}`);
  }
  return {
    "statusCode": 200,
    "body": JSON.stringify({ data: body })
  };
};

module.exports = {
  save
};