
const axios = require('axios');
const search = async (event, context) => {
  const { search } = event.queryStringParameters;
  console.log(`https://swapi.py4e.com/api/people/?search=${search}`);
  const { data, status } = await axios.get(`https://swapi.py4e.com/api/people/?search=${search}`);
  if (status !== 200) return {
    "statusCode": status
  };
  return {
    "statusCode": 200,
    "body": JSON.stringify(data)
  };
};

module.exports = {
  search
};