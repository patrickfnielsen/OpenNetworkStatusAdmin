# OpenNetworkStatus Admin
Status: **BETA**

A basic frontend for the API's exposed by [OpenNetworkStatus](https://github.com/patrickfnielsen/OpenNetworkStatus/).

The frondend was developed using Vue3, by a backend developer so it might contain bugs - Please report any bugs you find!

## Testing
```
npm install
npm run serve
```

## Config
For the frontend to work, the API URL needs to be specified in cfg/config.js
You can do this before building the docker image, or if you are using the docker hub image with k8s you can replace the file with a config map.