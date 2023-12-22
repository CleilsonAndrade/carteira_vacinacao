module.exports = {
  apps: [
    {
      name: 'carteira_vacinacao',
      script: './src/server.js',
      instances: 1,
      exec_mode: 'cluster',
    },
  ],
};