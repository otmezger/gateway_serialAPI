# About this project
This is the serial api that runs on the gateway and parses data from the controller in the project [IoT-ITCR project description](http://green-and-energy.com/project/proyecto-iot-en-el-tec/) (Spanish only). It is still in a very early phase of development. Please make sure to read the documentation.

# Dependencies
This code has been tested on the Raspberry Pi running [DietPi](http://dietpi.com/). It depends on the following software:

1. Node.JS
1. MongoDB
1. rsync (for deployment)

## Node packages that need to be installed on the gateway
You can install all local dependencies running
```
cd projectDirectory
npm install
```
The code also needs the following npm packages installed globally on the gateway:

1. forever
1. forever-service
1. gulp
```
sudo npm install forever forever-service gulp -g
```

## Node packages that need to be installed on the developing computer
Install all dev dependencies with
```
npm install --only=dev
```

Gulp should also be installed globally on your developing computer.


# How to use this code
## Obtain the code
To clone this project, use
```
git clone git@github.com:otmezger/gateway_serialAPI.git
```

Feel free to clone this project on your own computer and not on the gateway.

## Deploy
If you clone the project on your developing computer you can use gulp to deploy the code to the gateway. Edit `gulpfile.js` to match your settings.

Recommended: use ssh authentication with keys.

## Setting up the code as a service
Once deployed you can use forever-service to create a service in the gateway operating system.

First, make a symbolic link to the gulp executable from where the code has been deployed to:
```
> which gulp
/usr/bin/gulp
> ln -s /usr/bin/gulp /home/teciot/productive/api/
> forever-service install DataAPI /home/teciot/productive/api/gulp
```
Now the api will start on boot. You can control it with
```
service DataAPI start|stop|status
```
