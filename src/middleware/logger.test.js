"use strict";

const logger = require('./LOGGER.JS');



describe("Testing logger", () => {
  test("Checking a response from logger", () => {
    const req = {
      query: {},
    };
    const res = {};
    const next = jest.fn();
    logger(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
