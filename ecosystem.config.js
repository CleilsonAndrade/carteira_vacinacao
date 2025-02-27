module.exports = {
  apps: [
    {
      name: 'carteira_vacinacao',
      script: './src/server.js',
      watch: true,
      ignore_watch: ['node_modules'],
      instances: 1,
      exec_mode: 'cluster',
    },
  ],
};