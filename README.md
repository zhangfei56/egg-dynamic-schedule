# egg-dynamic-schedule
## 实现 egg 动态添加 定时任务、定点任务，移除任务。

`使用`：每个需要执行的脚本都是一个 Task，
Task 指定不同的`触发器`（Trigger），比如 定点触发器、每天定时触发器，
指定不同执行单元（比如本地执行、 或者通过redis 消息，让远程服务器抢占资源进行执行）形成一个`Job`。

## 原理
通过 HTTP 接受任务消息，worker 处理消息后传给 agent, agent 计算出下个执行时间点之后，调用setTimeout 函数等待消息触发，回调执行之后，调用指定的执行单元，可以 直接调用本地egg-schedule的执行函数

### 这个直接使用Node.js setTimeout 来进行触发的，不能堆积太多消息，暂时只适合小型消息处理。
### 如需要同学比较多 可以考虑抽查插件。
