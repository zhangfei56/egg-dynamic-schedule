"use strict";

const BaseTrigger = require("./base");
const assert = require("assert");
const moment = require("moment");

module.exports = class OnceTimerTrigger extends BaseTrigger {
  // constructor(...args) {
  //   super(...args);
  // }

  start() {
    /* istanbul ignore next */
    // if (this.agent.schedule.closed) return;
    const { triggerAt } = this.schedule;

    assert(triggerAt, `[dynamic-schedule] schedule.triggerAt must be present`);

    let delay = 0;
    if (!this.schedule.immediate) {
      const triggerTime = moment(triggerAt);

      if (triggerTime.isBefore(moment())) {
        this.logger.warn("trigger time has expired");
        return;
      }
      delay = triggerTime.diff(moment());
    }

    this.setTimeout(delay);
  }
};
