module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = mongoose.Schema.Types.ObjectId;
  const cfg = app.config.cfg;

  // Job
  const JobSchema = new Schema(
    {
      timeoutId: { type: String }, // timeoutId
      triggerType: { type: String }, //
      triggerAt: { type: String }, // 触发时间
      runType: { type: String }, //

      Task: { type: ObjectId, ref: "ScheduledTask" }, //

      status: {
        type: String,
        enum: Object.values(cfg.JobStatus),
        default: cfg.JobStatus.Init
      },

      isDeleted: { type: Boolean, default: false }
    },
    {
      timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
    }
  );

  return mongoose.model("Job", JobSchema);
};
