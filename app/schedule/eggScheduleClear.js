const Subscription = require("egg").Subscription;

class ClearSubscription extends Subscription {
  static get schedule() {
    return {
      // cron: "0 0 8 * * *", // 每天8 点
      // immediate: true,
      interval: "1m",
      type: "worker" // 指定一个 worker 执行 / all
    };
  }

  async subscribe(args) {
    const { ctx, logger, config, service } = this;
    console.log("enter egg schedule clear", args);
  }
}

module.exports = ClearSubscription;
