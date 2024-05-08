const { search } = require('../../functions/search/handler');

jest.mock('axios', () => ({
  get: jest.fn()
}));

const axios = require('axios');

describe('search function', () => {
  it('should return data when status is 200', async () => {
    const event = {
      queryStringParameters: {
        search: 'Luke'
      }
    };

    const mockData = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77'
    };

    const mockResponse = {
      data: mockData,
      status: 200
    };

    axios.get.mockResolvedValue(mockResponse);

    const response = await search(event);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(JSON.stringify(mockData));
  });

  it('should return only status code when status is not 200', async () => {
    const event = {
      queryStringParameters: {
        search: 'invalid'
      }
    };

    const mockResponse = {
      status: 404
    };

    axios.get.mockResolvedValue(mockResponse);

    const response = await search(event);

    expect(response.statusCode).toBe(404);
  });
});