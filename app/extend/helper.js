module.exports = {
  validate(rule) {
    const { logger } = this;
    const toValidate = {
      ...this.ctx.request.body,
      ...this.ctx.query,
      ...this.ctx.params
    };

    this.ctx.validate(rule, toValidate);

    const args = {};
    for (const key in rule) {
      if (typeof toValidate[key] === "string")
        args[key] = toValidate[key].trim();

      if (toValidate[key] !== undefined) {
        args[key] = toValidate[key];

        // 复制值
        if (rule[key].copyField) {
          args[rule[key].copyField] = toValidate[key];
        }
      } else if (
        toValidate[key] === undefined &&
        rule[key].default !== undefined
      ) {
        args[key] = rule[key].default;
      }
    }
    logger.info("请求条件: ", JSON.stringify(args));
    return args;
  },

  success(data = {}, flatten = false) {
    let res = {
      statusCode: 10000,
      serverTime: new Date()
    };
    if (flatten && this.isExist(data)) {
      // 处理 getList 时，对 rows 进行置换
      if (data.rows) {
        data.data = data.rows;
        delete data.rows;
      }
      res = { ...data, ...res };
    } else res.data = data;

    if (data === undefined || data === null) {
      res.statusCode = 10004;
    }
    this.ctx.body = res;
  },
  fail(error) {
    const { logger, ctx, config } = this;

    const message = error.message;
    const statusCode = 10001;

    logger.error(error);

    ctx.body = {
      statusCode,
      errorMsg: message,
      serverTime: new Date()
    };
  },
  isExist(value) {
    return ![null, undefined].includes(value);
  }
};
