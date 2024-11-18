FROM amazonlinux:2023.3.20240131.0

# Update yum.
RUN yum update -y

# Install basic commands such as ps.
RUN yum install procps -y

# Set time zone.
RUN ln -snf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && echo Asia/Tokyo > /etc/timezone

# Install Node.js.
RUN curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
RUN yum install -y nodejs

# Install ImageMagick.
RUN yum install ImageMagick-1:6.9.12.82-1.amzn2023.0.3.x86_64 -y

# Copy source code to Docker image.
COPY ./app /usr/src/app

# Install and build front-end dependencies.
WORKDIR /usr/src/app/client
RUN npm install
RUN npm run build

# Install server-side module dependencies.
WORKDIR /usr/src/app
RUN npm install

# Copy nodemon.json to the same named file in the destination directory.
COPY ./nodemon.json nodemon.json

# Port number to listen on.
EXPOSE 3000