const Service = require("egg").Service;
const assert = require("assert");

class DynamicScheduleService extends Service {
  async registerTask(args) {
    const { model } = this.ctx;
    const exist = await model.ScheduleTask.findOne({ key: args.key });
    assert.ok(!exist, "已存在");

    return await model.ScheduleTask.create(args);
  }

  //
  async applyForRunTask(args) {
    const { model } = this.ctx;

    const task = await model.ScheduleTask.findOne({ key: args.key });
    assert.ok(task, "task key 不存在");
    const job = await model.Job.create({
      ...args,
      Task: task._id
    });
    this.app.messenger.sendToAgent("request_job", {
      triggerType: args.triggerType,
      runType: args.runType,
      immediate: args.immediate,
      serverName: args.serverName,
      triggerAt: args.triggerAt,
      cron: args.cron,
      interval: args.interval,
      key: args.key,
      id: job._id.toString(),
      args: args.args
    });
    return job;
  }

  async stop(id) {
    const { model } = this.ctx;
    this.app.messenger.sendToAgent("stop_job", {
      id
    });
    return "success";
  }
}

module.exports = DynamicScheduleService;
