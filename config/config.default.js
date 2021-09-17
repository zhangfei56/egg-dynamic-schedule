/* eslint valid-jsdoc: "off" */

"use strict";
const cfg = require("./cfg");

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1630898544904_479";

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mongoose = {
    client: {
      url: "mongodb://localhost:27017/cooperation_product",
      options: {
        useNewUrlParser: true,
        user: "",
        pass: "",
        dbName: "cooperation_product",
        poolSize: 10,
        useCreateIndex: true
      }
    }
  };

  config.redis = {
    clients: {
      default: {
        port: 6379,
        host: "127.0.0.1",
        // host: '119.28.212.222',
        password: null,
        // password: 'Loncus2005',
        db: 0
      },
      subscribe: {
        port: 6379,
        host: "127.0.0.1",
        // host: '119.28.212.222',
        password: null,
        // password: 'Loncus2005',
        db: 0
      }
    },
    agent: true
  };

  config.customLogger = {
    dynamicScheduleLogger: {
      consoleLevel: "NONE",
      file: "egg-dynamic-schedule.log"
    }
  };
  config.cfg = cfg;
  // config.dynamicSchedule = {
  //   replaceEggSchedule: true,
  // }
  config.security = {
    domainWhiteList: [],
    csrf: {
      enable: false
    }
  };

  return {
    ...config,
    ...userConfig
  };
};
