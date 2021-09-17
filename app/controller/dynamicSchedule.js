"use strict";

const Controller = require("egg").Controller;

class DynamicScheduleController extends Controller {
  async index() {
    const { ctx, service } = this;

    const run = async () => {
      const rules = {};
      const args = ctx.helper.validate(rules);

      return await service.activityChannel.getEmployeeStatics(args);
    };

    return run()
      .then(data => ctx.helper.success(data))
      .catch(error => ctx.helper.fail(error));
  }

  async registerTask() {
    const { ctx, service } = this;

    const run = async () => {
      const rules = {
        serverName: { type: "string", required: true },
        key: { type: "string", required: true }
      };
      const args = ctx.helper.validate(rules);

      return await service.dynamicSchedule.registerTask(args);
    };

    return run()
      .then(data => ctx.helper.success(data))
      .catch(error => ctx.helper.fail(error));
  }

  async applyForRunTask() {
    const { ctx, service } = this;

    const run = async () => {
      const rules = {
        triggerAt: { type: "string", required: false }, // 触发时间
        key: { type: "string", required: false },
        triggerType: { type: "string", required: false }, // trigger 类型
        runType: { type: "string", required: false },
        serverName: { type: "string", required: false },
        interval: { type: "string", required: false },
        args: { type: "array", required: false }
      };
      const args = ctx.helper.validate(rules);

      return await service.dynamicSchedule.applyForRunTask(args);
    };

    return run()
      .then(data => ctx.helper.success(data))
      .catch(error => ctx.helper.fail(error));
  }

  async stop() {
    const { ctx, service } = this;

    const run = async () => {
      const rules = {
        id: { type: "string", required: true }
      };
      const args = ctx.helper.validate(rules);

      return await service.dynamicSchedule.stop(args.id);
    };

    return run()
      .then(data => ctx.helper.success(data))
      .catch(error => ctx.helper.fail(error));
  }
}

module.exports = DynamicScheduleController;
