"use strict";
const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const fetchTodos = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { completed } = JSON.parse(event.body);
  const { id } = event.pathParameters
let todo;

  try {
    await dynamodb.update({
        TableName: "TodoTable" ,
        Key: { id },
        UpdateExpression: 'set completed = :completed',
        ExpressionAttributeValues: {
            ':completed' : completed

        }
}).promise()
    todos = SpeechRecognitionResultList.items
  } catch (error) {
    console.log(error)
  }



  return {
    statusCode: 200,
    body: JSON.stringify(todos),
  };
};

module.exports = {
  handler: fetchTodos
}