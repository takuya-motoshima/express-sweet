# Install Redis
==============

* OS: `Amazon Linux 2`
* Redis: `v6.2.6 or later`
* see more: https://redis.io/download#installation

Check the version of Redis that can be installed.
```sh
amazon-linux-extras list|grep redis
# Below is an example of the output.
#  56  redis6                   available    [ =stable ]
```

Install Redis by specifying the version.
```sh
sudo amazon-linux-extras install -y redis6
```

Configure and start Redis autostart.
```sh
sudo systemctl status redis.service
sudo systemctl start redis.service
sudo systemctl enable redis.service
sudo systemctl is-enabled redis.service
```

Check Redis process.
```sh
ps -ef | grep redis | grep -v grep
# Below is an example of the output.
# redis     5407     1  0 11:02 ?        00:00:00 /usr/bin/redis-server 127.0.0.1:6379
```

Check Redis behavior. If "redis-cli ping" returns PONG, it is success.
```sh
redis-cli ping
# Below is an example of the output.
# PONG
```

Test Redis read/write.
```sh
redis-cli

set myMessage "hello world"
# OK

get myMessage
# "hello world"
```