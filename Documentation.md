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
## severless.yml
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