"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post("/register/task", controller.dynamicSchedule.registerTask);
  router.post("/request/job", controller.dynamicSchedule.applyForRunTask);
  router.post("/request/job/stop", controller.dynamicSchedule.stop);
};
