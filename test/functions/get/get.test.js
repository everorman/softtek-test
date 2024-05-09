const { save } = require('../../../functions/save/handler');
const { get } = require('../../../functions/get/handler');
const { PERSON_SEARCH } = require('../../fixtures/personSearch');
jest.mock('axios', () => ({
  get: jest.fn()
}));

const axios = require('axios');

describe('Get function', () => {
  it('should return a person with ID', async () => {
    const expectedData = {
      nombre: PERSON_SEARCH.results[0].name,
      genero: PERSON_SEARCH.results[0].gender,
      fecha_nacimiento: PERSON_SEARCH.results[0].birth_year,
      peso: PERSON_SEARCH.results[0].mass
    };

    const eventToSave = {
      body: JSON.stringify(expectedData)
    };

    const { data } = await save(eventToSave);

    const event = {
      pathParameters: { id: data.pk }
    };

    const { data: person } = await get(event);
    expect(JSON.parse(person).pk).toBe(data.pk);

  });
});