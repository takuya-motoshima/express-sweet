const PORT = 3000;

module.exports = {
  apps : [
    {
      name: 'myapp',
      script: 'bin/www',
      exec_mode: 'cluster_mode',
      watch: '.',
      watch_delay: 3000,
      ignore_watch : [
        'client',
        'node_modules',
        'public',
        'sql',
        'views',
        'volumes',
        'views'
      ],
      watch_options: {
        followSymlinks: false,
        usePolling: true
      },
      env: {
        NODE_ENV: 'development',
        PORT
      },
      env_test: {
        NODE_ENV: 'test',
        PORT
      },
      env_production: {
        NODE_ENV: 'production',
        PORT
      }
    }
  ]
};