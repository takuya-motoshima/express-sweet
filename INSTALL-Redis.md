# Install Redis
==============

## Environment for this procedure
* OS: `Amazon Linux 2`
* Redis: `v6.2.6 or later`
* see more: https://redis.io/download#installation


## Install Redis
1. Check the version of Redis that can be installed.
    ```sh
    amazon-linux-extras list|grep redis
    # Below is an example of the output.
    #  56  redis6                   available    [ =stable ]
    ```

1. Install Redis by specifying the version.
    ```sh
    sudo amazon-linux-extras install -y redis6
    ```
1. Configure and start Redis autostart.
    ```sh
    sudo systemctl status redis.service
    sudo systemctl start redis.service
    sudo systemctl enable redis.service
    sudo systemctl is-enabled redis.service
    ```
1. Check Redis process.
    ```sh
    ps -ef | grep redis | grep -v grep
    # Below is an example of the output.
    # redis     5407     1  0 11:02 ?        00:00:00 /usr/bin/redis-server 127.0.0.1:6379
    ```
1. Check Redis behavior. If "redis-cli ping" returns PONG, it is success.
    ```sh
    redis-cli ping
    # Below is an example of the output.
    # PONG
    ```
1. Test Redis read/write.
    ```sh
    redis-cli

    set myMessage "hello world"
    # OK

    get myMessage
    # "hello world"
    ```

## Commonly used Redis commands
- Start Redis CLI
    ```sh
     redis-cli
    ```
- Key List
    ```sh
    redis-cli --raw keys \*
    ```
    
    or
    ```sh
    redis-cli --scan
    ```
- Value List
    ```sh
    redis-cli --raw mget $(redis-cli --scan) 
    ```
- Key and Value List
    ```sh
    for i in $(redis-cli keys \*); do echo $i: $(redis-cli GET $i); done
    ```
- Delete key
    ```sh
    redis-cli del myMessage
    ```
