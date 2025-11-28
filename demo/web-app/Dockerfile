FROM amazonlinux:2023.3.20240131.0

# System setup
RUN yum update -y && \
    yum install -y procps && \
    yum clean all

# Set timezone to Asia/Tokyo
RUN ln -snf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    echo Asia/Tokyo > /etc/timezone

# Install Node.js 18.x
RUN curl -fsSL https://rpm.nodesource.com/setup_18.x | bash - && \
    yum install -y nodejs && \
    yum clean all

# Install ImageMagick for image processing
RUN yum install -y ImageMagick-1:6.9.12.82-1.amzn2023.0.3.x86_64 && \
    yum clean all

# Copy application source code
COPY ./app /usr/src/app

# Build frontend assets
WORKDIR /usr/src/app/client
RUN npm ci && \
    npm run build && \
    npm cache clean --force

# Install backend dependencies
WORKDIR /usr/src/app
RUN npm ci && \
    npm cache clean --force

# Copy nodemon configuration
COPY ./nodemon.json /usr/src/app/nodemon.json

# Expose application port
EXPOSE 3000

# Container runs in interactive mode (start command executed manually)