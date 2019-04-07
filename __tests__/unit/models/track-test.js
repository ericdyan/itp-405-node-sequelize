const { expect } = require('chai');
const Track = require('./../../../models/track');


describe('track', () => {
  // Test 1: Milliseconds isn't numeric
  it('should be numeric (false)', async () => {
    try {
      let track = await Track.findByPk(5);
      if (track) {
        await track.update({
          milliseconds: "b"
        }, { where: {id: 5}});
      };
      await artist.validate();

    } catch (error) {
      expect(error.errors[0].message).to.equal('Millisconds must be numeric');
    }
  });

  // Test 2: Milliseconds is numeric
  it('should be numeric (true)', async () => {
    try {
      let track = await Track.findByPk(5);
      if (track) {
        await track.update({
          milliseconds: 1
        }, { where: {id: 5}});
      };
      await track.validate();
    } catch (error) {
      expect(error.errors[0].message).to.equal('Should never run');
    }
  });

});
