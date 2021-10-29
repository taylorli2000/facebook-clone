# Facebook Clone

Work in progress Facebook clone.</br>
Built using MongoDB, Express.js, React, Node.js

## Initial Setup

In the server folder, install dependencies:

```shell
cd server
npm install
```

You must set up the .env file:

FACEBOOK_DB_URI=your-database-connection-string<br/>
FACEBOOK_DB_NS=your-database-name<br/>
FACEBOOK_DB_USERS_COLLECTION_NS=your-collection-name<br/>

In the client folder, install dependencies:

```shell
cd client
npm install
```

### Running the application locally

In one terminal, start the back end:

```shell
cd server
npm start
```

In another terminal, start the front end:

```shell
cd client
npm start
```
