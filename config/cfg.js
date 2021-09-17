module.exports = {
  JobStatus: {
    Init: "Init", //
    Waiting: "Waiting", // 等待执行
    Finished: "Finished", // 正常结束
    Pending: "Pending", // 暂停任务
    Cancelled: "Cancelled", // 取消任务
    ExceptionExit: "ExceptionExit" // 异常退出
  }
};
