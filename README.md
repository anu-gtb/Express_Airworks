`src` -> Inside src folder, all the actual source code regarding the project will reside, this does not include any kind of tests.

Take a look inside the `src` folder

- `config` -> Any configurations concern this folder regarding libraries or modules to be done. One example is the `dotenv` setup for us to use environment variables globally and cleanly; this is done in `server-config.js.` Other examples could be the configuration of some other logging library that helps produce useful logs, so its configuration should be done here also; this is done in `logging-config.json.`

- `routes` -> In the routes folder, routes and corresponding middlewares and controllers are registered.

- `middlewares` -> These middlewares are to intercept the incoming requests where validators and authenticators can be written.

- `controllers` -> These commprise business layer to execute business logic. In controllers, incoming requests and data are recieved and then pass it to the business layer. Once business layer returns an output, we structure API response in controllers and send the output.

- `repositories` -> This folder contains all the logic using which we interact the Database by writing queries, all the raw queries or ORM queries are here.

- `services` -> This contains the business logic and interacts with repositories for data from the database.

- `utils` -> contains helper functions, error classes, etc.

## Project Setup

- Download tis template from github and open it in a text editor.
- Go inside the folder path and execute the following command:
  ```
    npm install

  ```
- In root directory, create a `.env` file and add following env variables
  ```
    PORT = <Port number of your choice>

  ```
- Inside the `src/config` folder, create a file named as `config.json` and write the following code:
  ```
  {
    "development": {
      "username": "root",
      "password": "DBpassword",
      "database": "database_development",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": "root",
      "password": null,
      "database": "database_production",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
  }
  
  ```
- go inside the `src` folder and execute following command:
  ```
    npx sequelize init
  
  ```
- By executing the above command, migrations and seeders folders along with a config.json inside the config folder will be obtained.
- If setting up development environment, then write the username of your database, password of database and in dialect mention whatever database you are using , e.g. : mysql, mongodb, etc.
- If setting up test or production environment, make sure you also replace the host with hosted database url.

- To run the server, execute:
  ```
    npm run dev
 
  ```