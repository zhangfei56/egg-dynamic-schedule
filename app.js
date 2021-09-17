const BaseStrategy = require("egg-schedule/lib/strategy/base");

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async willReady() {
    this.app.messenger.on("record_task", task => {
      console.log(task);
    });

    this.app.messenger.on("task_finish", task => {
      console.log(task);
    });
  }
}

module.exports = AppBootHook;
