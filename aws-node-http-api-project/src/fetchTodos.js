"use strict";
const AWS = require("aws-sdk");

const fetchTodo = async (event) => {
  const dynamodb = AWS.DynamoDB.DocumentClient();
  
  
  return {
    statusCode: 200,
    body: JSON.stringify(newTodo),
  };
};
module.exports = {
  handler:fetchTodos
}