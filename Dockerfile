FROM amazonlinux:2023.3.20240131.0

# Update yum.
RUN yum update -y

# Install basic commands such as ps.
RUN yum install procps -y

# Set time zone.
RUN ln -snf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && echo Asia/Tokyo > /etc/timezone

# Install Node.js.
RUN yum install https://rpm.nodesource.com/pub_16.x/nodistro/repo/nodesource-release-nodistro-1.noarch.rpm -y
RUN yum install nodejs -y --setopt=nodesource-nodejs.module_hotfixes=1

# Install ImageMagick.
RUN yum install ImageMagick-1:6.9.12.82-1.amzn2023.0.3.x86_64 -y
# RUN yum install ImageMagick-6.9.10.68-6.amzn2.0.3.x86_64 -y

# Copy source code to Docker image.
COPY . /usr/src/app

# Install server-side module dependencies.
WORKDIR /usr/src/app/demo
RUN npm install

# Install and build front-end dependencies.
WORKDIR /usr/src/app/demo/client
RUN npm install
RUN npm run build

# Install dependencies of this package.
WORKDIR /usr/src/app
RUN npm install

# Port number to listen on.
EXPOSE 3000