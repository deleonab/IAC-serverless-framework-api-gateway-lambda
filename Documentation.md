### We need to install the serveless framework and give it access to our AWS account
### Install AWS CLI if not already installed for command line access to our AWS account.
### We shall create a new user called Sereverless in the AWS console and grant that user programattic access.

### For simplicity, we shall grant adminaccess to this user. This shouldn't be done in a production enviroment.We must give no more than the access required.
```
aws configure
```
### Enter your access key ID and secret key ID when prompted

### Configured successfully
### Install serveless framwork

```
npm install -g serverless
```

### create a new serverless project
```
serverless
```
```
What do you want to make? AWS - Node.Js - HTTP API
```
### This creates a handler.js file and a serverless.yml file in our directory
## handler.js

```
"use strict";

module.exports.hello = async (event) => {
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
```
## .
### severless.yml
```
service: aws-node-http-api-project
frameworkVersion: '3'

provider:
  name: aws
  runtime: nodejs14.x

functions:
  hello:
    handler: handler.hello
    events:
      - httpApi:
          path: /
          method: get
```

### I added a region us-west-2

### deploy to the cloud - Our AWS account
```
serverless deploy 
```

### Lambda function and API Gateway deployed and viewed in console

### Endpoint generated in console
API endpoint: https://cp6agsj0s6.execute-api.us-east-1.amazonaws.com/

### Let's refactor our code by creating a folder src to hold all the functions

```
mkdir src
```
```
mv handler.js src/handler.js
```
### handler.js successfully moved to src folder

### next, I will edit the handler.js file
```
"use strict";

module.exports.hello = async (event) => {
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
```
### It will now look like this
```
"use strict";

const hello = async (event) => {
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
    handler: hello
}
```

### I will also rename handler.js to hello.js 
```
 mv aws-node-http-api-project/src/handler.js aws-node-http-api-project/src/hello.js

```
 ### In the serverless.yml file, change handler: handler.hello   handler: src/hello.handler as below

### severless.yml
```
service: aws-node-http-api-project
frameworkVersion: '3'

provider:
  name: aws
  runtime: nodejs14.x

functions:
  hello:
    handler: src/hello.handler
    events:
      - httpApi:
          path: /
          method: get
```

### I will deploy to make sure nothing is broken

```
serverless deploy -v
```

### Visiting the gateway endpoint in the browser

```

{
  "message": "Go Serverless v3.0! Your function executed successfully!",
  "input": {
    "version": "2.0",
    "routeKey": "GET /",
    "rawPath": "/",
    "rawQueryString": "",
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      "cache-control": "max-age=0",
      "content-length": "0",
      "host": "cp6agsj0s6.execute-api.us-east-1.amazonaws.com",
      "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "cross-site",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
      "x-amzn-trace-id": "Root=1-630d228d-2280faab11ba32761a8dd846",
      "x-forwarded-for": "90.222.128.88",
      "x-forwarded-port": "443",
      "x-forwarded-proto": "https"
    },
    "requestContext": {
      "accountId": "185439933271",
      "apiId": "cp6agsj0s6",
      "domainName": "cp6agsj0s6.execute-api.us-east-1.amazonaws.com",
      "domainPrefix": "cp6agsj0s6",
      "http": {
        "method": "GET",
        "path": "/",
        "protocol": "HTTP/1.1",
        "sourceIp": "90.222.128.88",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
      },
      "requestId": "XpJWNibboAMEPkA=",
      "routeKey": "GET /",
      "stage": "$default",
      "time": "29/Aug/2022:20:33:17 +0000",
      "timeEpoch": 1661805197960
    },
    "isBase64Encoded": false
  }
}
```

### Now let's start creating the todo lambda functions
- addTodo
- fetchTod
- fetchTodos
- updateTodo

### We would need a database ans will be using AWS NoSQL database DynamoDB for our backend

### We shall add the code necessary to spin up the database to serverless.yaml

This code will create the dynamoDB table using cloudformation

```
service: aws-node-http-api-project
frameworkVersion: '3'

provider:
  name: aws
  runtime: nodejs14.x
  region: us-east-1

functions:
  hello:
    handler: src/hello.handler
    events:
      - httpApi:
          path: /
          method: get
resources:
  Resources:
    TodoTable:
      Type: AWS::DynamoDB::Table
      Properties: 
        TableName: TodoTable
        BillingMode: PAY_PER_REQUEST
        AttributeDefinitions:
          - AttributeName: id
            AttributeType: S
        KeySchema: 
          - AttributeName: id
            KeyType: HASH


```
### Next we need to install some packages that we shall be using - uuid and aws-sdk
```
npm install uuid aws-sdk
```


### Let's create the addTodo function. We shall rename hello.js to addTodo.js
### 3 items will be sent to the database through event.body
- id
- todo
- CreatedAt

### We only need the todo from the user. id and created At will be generated.
```
const { todo } = JSON.parse(event.body)
```

