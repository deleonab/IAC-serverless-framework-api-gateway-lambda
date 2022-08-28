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