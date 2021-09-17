"use strict";
const EventEmitter = require("events").EventEmitter;

module.exports = class BaseTrigger extends EventEmitter {
  constructor(schedule, agent, key) {
    super();
    this.schedule = schedule;
    this.agent = agent;
    this.key = key;
    this.serverName = schedule.serverName;
    this.logger = agent.getLogger("dynamicScheduleLogger");
    this.id = schedule.id || `${Date.now()}${process.hrtime().join("")}`;
    this.timeoutId = null;
  }

  bindHandler(runFn) {
    this.handler = () => {
      runFn.call(this);
      // 处理完成通知 work 记录下来
      this.emit("job_work");
      this.next();
    };
  }

  next() {
    this.emit("job_finish");
  }

  start() {}

  stop() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.emit("job_finish");
  }

  setTimeout(delay) {
    if (delay === 0) {
      setImmediate(() => {
        this.handler();
      });
    } else {
      this.timeoutId = setTimeout(() => {
        this.handler();
      }, delay);
    }
  }
};
