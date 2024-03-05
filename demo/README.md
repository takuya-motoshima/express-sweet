# Demo Overview
It describes the configuration of the demo and how to start the demo with Docker.

## Directory structure
Demo (. /demo) directory structure.
```
.
├── bin
│   └── www             Application startup script
├── client              Front-end module
├── config              Application Configuration
├── exceptions          Exception Class
├── models              Model Class
├── public              Public Directory
├── routes              Application Routers
├── sql                 DB schema and initial input data creation SQL
├── views               Application view
├── volumes             Docker container volume
├── .env.sample         Sample environment variables. Copy and create `.env`.
├── app.js              Application Entry Point
├── package-lock.json
└── package.json
```

## How to start the demo with Docker
1. Start the container.
    ```sh
    docker-compose up -d
    ```

    Add the `--build` option to reflect Dockerfile updates.
    ```sh
    docker-compose up -d --build
    ```

    Use the `--no-cache` option to disable the cache at build time.  
    When using the `--no-cache` option, it is necessary to execute the image build and container startup separately.
    ```sh
    docker-compose build --no-cache
    docker-compose up -d
    ```
1. Connect to container.
    ```sh
    docker exec -it express_sweet_app bash
    ```
1. Create a link so that locally located packages can be referenced from the demo.
    ```sh
    cd /usr/src/app
    npm link
    ```
1. The express-sweet package on which the demo depends refers to a local package.
    ```sh
    cd /usr/src/app/demo
    npm link express-sweet
    ```
1. Create environment variables.
    ```sh
    cp .env.sample .env
    ```
1. Launch demo.
    ```sh
    npm start
    ```
1. Open [http://localhost:3000/](http://localhost:3000/) in your browser.