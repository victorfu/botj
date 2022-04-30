# Botj
J is a bot.

## Development
```sh
cd server
npm install
npm run dev
```

## Google Cloud Storage of Files
The file uploading function is supported by Google Cloud Storage (GCS). First, make sure a 
GCS bucket ready to store files and put the bucket name in the environment variable `FILE_STORAGE_BUCKET_NAME`. 
Second, the Google credentials is used to access the GCS bucket. Please name the Google credentials 
(i.e., the json file downloaded from Google cloud console) as `file-storage.json` and put it in the root folder.
The two environment variables `GOOGLE_APPLICATION_CREDENTIALS` and `FILE_STORAGE_BUCKET_NAME` are necessary. 
The `FILE_STORAGE_ENABLED` environment variable is used to turn on/off the file uploading function.
By default, file uploading is disabled. The corresponding api will return http error code 404.

## Socket.io
[Socket.io](https://socket.io/) is the signaling mechanism between frontend and backend. The `SOCKET_IO_ENABLED`
environment variable is used to turn on/off the signaling server. By default, the signaling server is enabled.

## Redis
The memory cache Redis speeds up data fetching and reduces workload of database. The `REDIS_ENABLED` 
environment variable is used to enable/disable Redis. By default, Redis is disabled.

## Swagger
The api documentation is shown by Swagger. Please check `/api-docs` for more information.
