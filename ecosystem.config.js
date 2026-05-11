module.exports = {
  apps: [{
    name: 'harley-portfolio',
    script: 'node',
    args: '.next/standalone/server.js',
    cwd: '/root/harley-portfolio',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: '/root/.pm2/logs/harley-portfolio-error.log',
    out_file: '/root/.pm2/logs/harley-portfolio-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
