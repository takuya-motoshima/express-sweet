import * as IORedis from 'ioredis';
/**
 * Redis client.
 * Supports Redis >= 2.6.12 and (Node.js >= 6). Completely compatible with Redis 6.x.
 */
export default class extends IORedis.Redis {
    /**
     * Constructs a Redis client object.
     *
     * @param {IORedis.IRedisOptions} options
     * @param {number}   options.port=6379                          Port of the Redis server.
     * @param {string}   options.host=localhost                     Host of the Redis server.
     * @param {string}   options.family=4                           Version of IP stack. Defaults to 4.
     * @param {string}   options.path=null                          Local domain socket path. If set the `port`, `host` and `family` will be ignored.
     * @param {number}   options.keepAlive=0                        TCP KeepAlive on the socket with a X ms delay before start.
     *                                                              Set to a non-number value to disable keepAlive.
     * @param {boolean}  options.noDelay=true                       Whether to disable the Nagle's Algorithm. By default we disable it to reduce the latency.
     * @param {string}   options.connectionName=null                Connection name.
     * @param {number}   options.db=0                               Database index to use.
     * @param {string}   options.password=null                      If set, client will send AUTH command with the value of this option when connected.
     * @param {string}   options.username=null                -     Similar to `password`, Provide this for Redis ACL support.
     * @param {boolean}  options.dropBufferSupport=false            Drop the buffer support for better performance.
     *                                                              This option is recommended to be enabled when handling large array response and you don't need the buffer support.
     * @param {boolean}  options.enableReadyCheck=true              When a connection is established to
     *                                                              the Redis server, the server might still be loading the database from disk.
     *                                                              While loading, the server not respond to any commands.
     *                                                              To work around this, when this option is `true`,
     *                                                              ioredis will check the status of the Redis server,
     *                                                              and when the Redis server is able to process commands,
     *                                                              a `ready` event will be emitted.
     * @param {boolean}  options.enableOfflineQueue=true            By default, if there is no active connection to the Redis server,
     *                                                              commands are added to a queue and are executed once the connection is "ready"
     *                                                              (when `enableReadyCheck` is `true`,
     *                                                               "ready" means the Redis server has loaded the database from disk, otherwise means the connection
     *                                                              to the Redis server has been established). If this option is false,
     *                                                              when execute the command when the connection isn't ready, an error will be returned.
     * @param {number}   options.connectTimeout=10000               The milliseconds before a timeout occurs during the initial connection to the Redis server.
     * @param {boolean}  options.autoResubscribe=true               After reconnected, if the previous connection was in the subscriber mode, client will auto re-subscribe these channels.
     * @param {boolean}  options.autoResendUnfulfilledCommands=true If true, client will resend unfulfilled
     *                                                              commands(e.g. block commands) in the previous connection when reconnected.
     * @param {boolean}  options.lazyConnect=false                  By default,
     *                                                              When a new `Redis` instance is created, it will connect to Redis server automatically.
     *                                                              If you want to keep the instance disconnected until a command is called, you can pass the `lazyConnect` option to the constructor:
     *                                                              ```javascript
     *                                                              const redis = new RedisClient({lazyConnect: true});
     *                                                              // No attempting to connect to the Redis server here.
     *                                                              // Now let's connect to the Redis server
     *                                                              redis.get('foo', function () {});
     *                                                             ```
     * @param {Object}   options.tls                                TLS connection support. See https://github.com/luin/ioredis#tls-options
     * @param {string}   options.keyPrefix=''                       The prefix to prepend to all keys in a command.
     * @param {function} options.retryStrategy                      See "Quick Start" section
     * @param {number}   options.maxRetriesPerRequest               See "Quick Start" section
     * @param {number}   options.maxLoadingRetryTime=10000          when redis server is not ready, we will wait for `loading_eta_seconds` from `info` command or maxLoadingRetryTime (milliseconds), whichever is smaller.
     * @param {function} options.reconnectOnError                   See "Quick Start" section
     * @param {boolean}  options.readOnly=false                     Enable READONLY mode for the connection. Only available for cluster mode.
     * @param {boolean}  options.stringNumbers=false                Force numbers to be always returned as JavaScript strings. This option is necessary when dealing with big numbers (exceed the [-2^53, +2^53] range).
     * @param {boolean}  options.enableTLSForSentinelMode=false     Whether to support the `tls` option when connecting to Redis via sentinel mode.
     * @param {NatMap}   options.natMap=null                        NAT map for sentinel connector.
     * @param {boolean}  options.updateSentinels=true               Update the given `sentinels` list with new IP addresses when communicating with existing sentinels.
     * @param {boolean}  options.failoverDetector=false             Detect failover actively by subscribing to the
     *                                                              related channels. With this option disabled, ioredis is still able to detect failovers because Redis
     *                                                              Sentinel will disconnect all clients whenever a failover happens, so ioredis will reconnect to the new
     *                                                              master. This option is useful when you want to detect failover quicker, but it will create more TCP
     *                                                              connections to Redis servers in order to subscribe to related channels.
    * @param {boolean}   options.enableAutoPipelining=false         When enabled, all commands issued during an event loop
     *                                                              iteration are automatically wrapped in a pipeline and sent to the server at the same time.
     *                                                              This can dramatically improve performance.
     * @param {string[]} options.autoPipeliningIgnoredCommands=[]   The list of commands which must not be automatically wrapped in pipelines.
     * @param {number}   options.maxScriptsCachingTime=60000        Default script definition caching time.
     *
     * @example
     * const RedisClient = require('express-sweet').services.RedisClient;
     *
     * // Instantiate Redis client.
     *  const unixSocketRedis = new RedisClient({path: "/tmp/echo.sock"});
     *  const redis = new RedisClient({host: 'localhost', port: 6379});
     */
    constructor(opts: IORedis.IRedisOptions);
}
