# Demo Overview
It describes the configuration of the demo and how to start the demo with Docker.

## Directory structure
Demo (./demo) directory structure.
```
demo
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
├── .env                Environment variable file
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

    Notes: In rare cases, an empty `node_modules` directory in the host will cause a build error.  
            In that case, delete the `node_modules` directory of the host.
    ```sh
    rm -rf node_modules/ \
        demo/node_modules/ \
        demo/client/node_modules/ \
        docs/node_modules/ 
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
1. Launch demo.
    ```sh
    npm start
    ```
1. Open [http://localhost:3000/](http://localhost:3000/) in your browser.