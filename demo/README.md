# Setting up a Demonstration Docker Environment

## Directory Structure
```bash
.
├── app             # Express Application
├── sql             # DB schema and initial data
├── volumes         # Docker container volume
├── docker-compose.yaml
├── Dockerfile
└── nodemon.json
```

## Steps
1. **Create the Express application:**

   ```bash
   npm install -g express-sweet-generator
   express-sweet app
   ```
1. **Configure the database connection:**

   Modify app/config/database.js to use the database container name as the host when running in Docker.
   
   Since this example database doesn't require a password, the password field is commented out:

   ```javascript
   /**
    * Database configuration.
    */
   const host = process.env.IS_DOCKER ? 'express_sweet_db' : 'localhost';

   module.exports = {
     development: {
       username: 'root',
       // password: 'password',
       database: 'sample_db',
       host,
       port: undefined,
       dialect: 'mariadb',
       timezone: '+09:00',
       logging: false
     },
     // ... other environments
   };
   ```
1. **Start the containers:**

   ```bash
   docker-compose up -d
   ```

   **Note:** In rare cases, an empty `node_modules` directory on the host machine can cause a build error. If this happens, delete the `node_modules` directory:

   ```bash
   rm -rf app/node_modules/ app/client/node_modules/
   ```
1. **Launch the demo application:**

   ```bash
   docker exec -it express_sweet_app bash
   npm start
   ```
1. **Access the application:**
   Open [http://localhost:3000/](http://localhost:3000/) in your browser.


## Additional Notes

* **Rebuilding the image:** To rebuild the image after modifying the Dockerfile, use the `--build` option:

   ```bash
   docker-compose up -d --build
   ```

* **Disabling the build cache:** To disable the cache during the build process, use the `--no-cache` option.  When using `--no-cache`, build the image and start the containers separately:

   ```bash
   docker-compose build --no-cache
   docker-compose up -d
   ```

* **Connecting to the database:**

   ```bash
   docker exec -it express_sweet_db bash -c "mysql -uroot -D sample_db"
   ```