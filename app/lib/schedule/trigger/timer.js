"use strict";

const Strategy = require("./base");
const parser = require("cron-parser");
const ms = require("humanize-ms");
const assert = require("assert");
const is = require("is-type-of");
const CRON_INSTANCE = Symbol("cron_instance");

module.exports = class TimerStrategy extends Strategy {
  constructor(...args) {
    super(...args);

    const { interval, cron, cronOptions, immediate } = this.schedule;
    assert(
      interval || cron || immediate,
      `[egg-schedule] ${this.key} schedule.interval or schedule.cron or schedule.immediate must be present`
    );

    // init cron parser
    if (cron) {
      try {
        this[CRON_INSTANCE] = parser.parseExpression(cron, cronOptions);
      } catch (err) {
        err.message = `[egg-schedule] ${this.key} parse cron instruction(${cron}) error: ${err.message}`;
        throw err;
      }
    }
  }

  start() {
    let delay = 0;
    if (!this.schedule.immediate) {
      delay = this.getNextTick();
    }

    this.setTimeout(delay);
  }

  _scheduleNext() {
    // get next tick
    const nextTick = this.getNextTick();

    this.setTimeout(nextTick);
  }

  next() {
    // Next execution will trigger task at a fix rate, regardless of its execution time.
    this._scheduleNext();
  }

  /**
   * calculate next tick
   *
   * @return {Number} time interval, if out of range then return `undefined`
   */
  getNextTick() {
    // interval-style
    if (this.schedule.interval) return ms(this.schedule.interval);

    // cron-style
    if (this[CRON_INSTANCE]) {
      // calculate next cron tick
      const now = Date.now();
      let nextTick;
      let nextInterval;

      // loop to find next feature time
      do {
        try {
          nextInterval = this[CRON_INSTANCE].next();
          nextTick = nextInterval.getTime();
        } catch (err) {
          // Error: Out of the timespan range
          return;
        }
      } while (now >= nextTick);

      return nextTick - now;
    }
  }
};
