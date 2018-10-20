const { expect } = require('chai');

const assertMatch = (payload, resBody) => {
  Object.keys(payload).forEach((prop) => {
    expect(resBody).to.have.deep.property(prop, payload[prop]);
  });
};

module.exports = { assertMatch };
