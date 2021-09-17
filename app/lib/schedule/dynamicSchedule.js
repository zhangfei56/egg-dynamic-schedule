const TRIGGER_FN = Symbol("dynamic_strategy_fn");
const RUN_FN = Symbol("dynamic_run_fn");
const TRIGGER_INSTANCE = Symbol("dynamic_all_triggers");
const assert = require("assert");

class DynamicSchedule {
  constructor(agent) {
    this.agent = agent;
    this.logger = agent.getLogger("dynamicScheduleLogger");
    this.config = agent.config;
    this[TRIGGER_FN] = {};
    this[RUN_FN] = {};
    // 单线程 不会产生 读写 同时事件
    this[TRIGGER_INSTANCE] = [];
  }

  loadTrigger(type, triggerFn) {
    if (this[TRIGGER_FN][type]) {
      return;
    }
    this[TRIGGER_FN][type] = triggerFn;
  }

  loadRunFn(type, fn) {
    this[RUN_FN][type] = fn;
  }

  init() {
    // 加载由于异常而未执行的任务
  }

  // { triggerType: 'once', runType: 'localOne', triggerAt: '2021-09-15 17:05', key: 'runAway'}
  /**
   * 根据 task 创建不同类型 trigger
   *
   */
  enqueue(task) {
    //
    const triggerFn = this[TRIGGER_FN][task.triggerType];
    assert.ok(triggerFn, "trigger type not registered");
    const runFn = this[RUN_FN][task.runType];
    assert.ok(runFn, "run type not registered");
    const trigger = new triggerFn(task, this.agent, task.key);
    this[TRIGGER_INSTANCE].push(trigger);
    trigger.bindHandler(runFn);

    trigger.start();
    trigger.on("job_work", () => {
      this.agent.messenger.sendRandom("task_finish", {
        id: trigger.id
      });
    });
    // 完成任务 释放资源
    trigger.on("job_finish", () => {
      const triggerIndex = this[TRIGGER_INSTANCE].findIndex(
        item => item.id === trigger.id
      );
      this[TRIGGER_INSTANCE].splice(triggerIndex, 1);
    });
    const info = {
      id: trigger.id,
      key: trigger.key,
      triggerAt: task.triggerAt
    };
    this.agent.messenger.sendRandom("record_task", info);
  }

  //
  cancel(triggerId) {
    const trigger = this[TRIGGER_INSTANCE].find(item => item.id === triggerId);
    if (trigger && trigger.timeoutId) {
      trigger.stop();
    }
  }
}

module.exports = DynamicSchedule;
