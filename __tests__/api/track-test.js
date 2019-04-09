const frisby = require('frisby');

const { Joi } = frisby;

it('should return a status of 200 when the track is found', () => {
  return frisby
    .get('http://localhost:8000/api/tracks/5')
    .expect('status', 200);
});

it('should return a status of 404 when the track is not found', () => {
  return frisby
    .get('http://localhost:8000/api/tracks/-1')
    .expect('status', 404);
});

// it('should return the track name and its playlist', () => {
//   return frisby
//     .get('http://localhost:8000/api/tracks/5')
//     .expect('json', 'name', 'Princess of the Dawn')
//     .expect('jsonTypes', 'playlists.*', {
//       id: Joi.number().required(),
//       name: Joi.string().required()
//     });
// });

// Assignment 5
// Test 1: Track does not exists
it('should return status of 404 when track does not exist', () => {
  return frisby
    .post('http://localhost:8000/api/tracks/-1')
    .expect('status', 404);
});

// Test 2: Updating a track successfully
it('should return status of 200 when updating track succeeds', () => {
  return frisby
    .patch('http://localhost:8000/api/tracks/5', {
      name: 'ITP',
      milliseconds: 1,
      unitPrice: 0.99
    })
    .expect('status', 200)
    .expect('json', 'updated', 1)
    .expect('json','name', 'ITP')
    .expect('json', 'milliseconds', 1)
    .expect('json', 'unitPrice', 0.99);
});

// Test 3: Validation errors
it('should return a status code of 422', () => {
  return frisby
    .patch('http://localhost:8000/api/tracks/5', {
      name: '',
      milliseconds: 'a',
      unitPrice: 'b'
    })
    .expect('status', 422)
    .expect('json', 'errors[0].message', 'Name is required')
    .expect('json', 'errors[1].message', 'Millisconds must be numeric')
    .expect('json', 'errors[2].message', 'Unit Price must be numeric');
});
