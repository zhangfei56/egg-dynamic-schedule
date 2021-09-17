const DynamicSchedule = require("./app/lib/schedule/dynamicSchedule");

const OnceTrigger = require("./app/lib/schedule/trigger/once");
const TimerTrigger = require("./app/lib/schedule/trigger/timer");

const SendOneFn = require("./app/lib/schedule/run/sendLocalOne");
const redis = require("./app/lib/schedule/run/redis");

// redis 监听
//
class AppBootHook {
  constructor(agent) {
    this.agent = agent;

    this.agent.dynamicSchedule = new DynamicSchedule(agent);
    this.agent.dynamicSchedule.loadRunFn("sendLocalOne", SendOneFn);
    this.agent.dynamicSchedule.loadRunFn("redis", redis);

    this.agent.dynamicSchedule.loadTrigger("once", OnceTrigger);
    this.agent.dynamicSchedule.loadTrigger("timer", TimerTrigger);
  }

  async serverDidReady() {
    this.agent.messenger.on("request_job", info => {
      this.agent.dynamicSchedule.enqueue(info);
    });

    this.agent.messenger.on("stop_job", info => {
      this.agent.dynamicSchedule.cancel(info.id);
    });
    // this.agent.dynamicSchedule.enqueue({
    //   triggerType: "once",
    //   runType: "sendOne",
    //   immediate: true,
    //   serverName: "account",
    //   triggerAt: "2021-09-15 16:47",
    //   key: "runAway"
    // });
  }
}

module.exports = AppBootHook;
