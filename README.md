# My Simple Postboard

A postboard website with a client/server model which supports [CRUD operations](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) by using HTTP GET, POST, PUT, DELETE requests. It's mobile compatible too.

- [ ] TODO: Support for emoji posts.
- [ ] TOOD: Post using AJAX instead of traditional forms for better script control?
- [ ] TOOD: Make a preview picture.
- [x] Setup to deploy on Heroku.
- [x] Quick guide to deploy on Heroku.

## Prerequisites

- [Node v8.10.0 or higher](https://nodejs.org/)
- ~~[MySQL 5.7](https://www.mysql.com/)~~
- [PostgreSQL](https://www.postgresql.org/)
- [Heroku](https://www.heroku.com/)

## Usage

If deployed with MySQL, see [this branch](https://github.com/ytjchan/my-simple-postboard/tree/master).

### ~~Installation~~

### ~~Execution~~

### ✔ Deployment

Since it's set to deploy on [Heroku](https://www.heroku.com/), installation of node modules can be done automatically.

To deploy, create a new app on Heroku. Then connect [Heroku Postgres database](https://elements.heroku.com/addons/heroku-postgresql) to the app. Connect to the database using `psql` and create a table using the line in [setup-pg.sql](./setup-pg.sql).

Lastly add the app's repository to your git remote and push there. _Voila!_ The app detects the [Procfile](./Procfile) and deploys it automatically, thanks Heroku!

## Technologies used

### Frontend - stylesheets and JavaScript libraries

There are imported in [`head.pug`](./views/includes/head.pug) and [`scripts.pug`](./views/includes/scripts.pug) from their official CDNs.

- [Boostrap 4](https://getbootstrap.com/) - a easily reusable CSS stylesheet sheet with optionally Javascript interactivity.
- [jQuery](https://jquery.com/) - a JavaScript library for DOM manipulation.
- [SweetlAlert 2](https://sweetalert2.github.io/) - a beautiful JavaScript replacement for vanilla popup boxes.

### Backend - Node dependencies

- [Express](http://expressjs.com/) - a Node framework for setting up the web server.
  - [body-parser](https://www.npmjs.com/package/body-parser) - a Express.js middleware for interpreting HTTP request bodies.
- ~~[mysqljs](https://github.com/mysqljs/mysql) - a Node module for connecting to the MySQL database.~~
- [pg](https://node-postgres.com/) - a Node module for connecting to the Postgre database on Heroku
- [Pug](https://pugjs.org/) - a template engine and language to dynamically generate HTML web pages.