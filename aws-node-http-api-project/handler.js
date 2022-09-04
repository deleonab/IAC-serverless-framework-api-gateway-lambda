"use strict";
const { v4 } = require("uuid");
const AWS = require("aws-sdk");

module.exports.hello = async (event) => {
    return {
    statusCode: 200,
    body: JSON.stringify(
        
        {
           message: " Serveless V3.0 boyyyyyyyy",
           input: event,

        },
        null,
        2
        ),
  };
};
