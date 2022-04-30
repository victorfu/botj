module.exports = {
  db: process.env.DB,
  env: process.env.ENV,
  keepAlive: process.env.DB_KEEPALIVE,
  port: process.env.PORT || 8080,
  replicaSet: process.env.DB_REPLICASET,
  apiPrefix: '/api',
  retryWrites: process.env.DB_RETRYWRITES,
  ssl: process.env.DB_SSL === 'true',
  redisHost: process.env.REDIS_HOST,
  redisPassword: process.env.REDIS_PASSWORD,
  redisPort: parseInt(process.env.REDIS_PORT),
  sendgridApiKey: process.env.SENDGRID_API_KEY,
  fileStorageBucketName: process.env.FILE_STORAGE_BUCKET_NAME,
  isSendgridEnabled: process.env.SENDGRID_ENABLED === 'true',
  isRedisEnabled: process.env.REDIS_ENABLED === 'true',
  isSocketIOEnabled: process.env.SOCKET_IO_ENABLED === 'true',
  isFileStorageEnabled: process.env.FILE_STORAGE_ENABLED === 'true',
  isSwaggerEnabled: process.env.ENV !== 'production' && process.env.SWAGGER_ENABLED === 'true',
  lineNotifyClientId: process.env.LINE_NOTIFY_CLIENT_ID,
  lineNotifyClientSecret: process.env.LINE_NOTIFY_CLIENT_SECRET,
  lineNotifyRedirectUrl: process.env.LINE_NOTIFY_REDIRECT_URL,
  lineNotifyTokenUrl: 'https://notify-bot.line.me/oauth/token',
  lineLiffId: '1656049321-aR1NMZPk',
};
