const { expect } = require('chai');
const Artist = require('./../../../models/artist');

describe('artist', () => {
  describe('name', () => {
    it('should be at least 2 charcters', async () => {
      try {
        let artist = new Artist({ name: 'a' });
        await artist.validate();
      } catch (error) {
        expect(error.errors[0].message).to.equal('Name must be between 2 and 10 characters');
      }
    });
    it('should be less than 10 charcters', async () => {
      try {
        let artist = new Artist({ name: 'abcdefghijklq' });
        await artist.validate();
      } catch (error) {
        expect(error.errors[0].message).to.equal('Name must be between 2 and 10 characters');
      }
    });

    it('should only contain letters', async () => {
      try {
        let artist = new Artist({ name: '2' });
        await artist.validate();
      } catch (error) {
        expect(error.errors[0].message).to.equal('Name must only contain letters');
      }
    });
  });
});
