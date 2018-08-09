# My Simple Postboard

A postboard website with a client/server model which supports [CRUD operations](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) by using HTTP GET, POST, PUT, DELETE requests. It's mobile compatible too.

- [ ] TODO: Support for emoji posts.
- [ ] TOOD: Post using AJAX instead of traditional forms for better script control?
- [ ] TOOD: Make a preview picture.

## Prerequisites

- [Node v8.10.0 or higher](https://nodejs.org/)
- [MySQL 5.7](https://www.mysql.com/)

## Usage

### Installation

In project directory, call the following node command to install the necessary dependencies:

```sh
node install
```

Create `config.js` in the project directory with the following content:

```js
module.exports = {
    host: 'localhost',
    user: 'USERNAME HERE', // put your username here
    password: 'PASSWORD HERE', // put your password here
    database: 'my-simple-postboard'
};
```

Run the [`setup.sql`](./setup.sql) in MySQL to prepare the necessary tables.

### Execution

In project directory, call the following node command to start the server:

```sh
node index.js
# Output:
# My Simple Postboard listening on port 3000! (or another port if specified)
# Connected to database!
```

Navigate to `localhost:3000` (or a corresponding port) to visit the postboard.

## Technologies used

### Frontend - stylesheets and JavaScript libraries

There are imported in [`head.pug`](./views/includes/head.pug) and [`scripts.pug`](./views/includes/scripts.pug) from their official CDNs.

- [Boostrap 4](https://getbootstrap.com/) - a easily reusable CSS stylesheet sheet with optionally Javascript interactivity.
- [jQuery](https://jquery.com/) - a JavaScript library for DOM manipulation.
- [SweetlAlert 2](https://sweetalert2.github.io/) - a beautiful JavaScript replacement for vanilla popup boxes.

### Backend - Node dependencies

- [Express](http://expressjs.com/) - a Node framework for setting up the web server.
  - [body-parser](https://www.npmjs.com/package/body-parser) - a Express.js middleware for interpreting HTTP request bodies.
- [mysqljs](https://github.com/mysqljs/mysql) - a Node module for connecting to the MySQL database.
- [Pug](https://pugjs.org/) - a template engine and language to dynamically generate HTML web pages.