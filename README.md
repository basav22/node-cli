# node-cli
CLI for Deploying UI code to remote servers

We build the code on local and push dist/ (public) folder to remote server

It asks series of questions 
1. Select Deployment Server
2. Branch to build and publish
3. Select API server to route api request to

We need agdeploy.json file - where configuration reside. Look for the same in Repo.

NOTE: Put the file in root directory.

# How to run
npm install -g node-cli


Future - 
- Put it on npm
- Schedule deploymenent for PROD(e.g.)
- Auto deploy on git push
- Push deploy logs(branch, apiserver, user, dateTime, deploystatus) to mongo

Have an idea /want to contribute, create a pull request. I will be happy to co-ordinate.


