"use strict";
const { v4 } = require("uuid");

const addTodo = async (event) => {

  const { todo } = JSON.parse(event.body);
  const createdAt = new Date();
  const id = v4();

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v3.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };
};
module.exports = {
  handler:hello
}