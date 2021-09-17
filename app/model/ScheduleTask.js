module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = mongoose.Schema.Types.ObjectId;
  const cfg = app.config.cfg;

  // Task
  const ScheduleTaskSchema = new Schema(
    {
      serverName: { type: String }, // 服务名
      key: { type: String }, // egg-schedule key

      isDeleted: { type: Boolean, default: false }
    },
    {
      timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
    }
  );

  return mongoose.model("ScheduleTask", ScheduleTaskSchema);
};
