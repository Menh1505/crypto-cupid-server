// src/models/Report.ts
import mongoose, { Schema, model, Document, Types } from 'mongoose';

export interface IReport extends Document {
  reporterId: Types.ObjectId;
  reportedUserId: Types.ObjectId;
  reason: string;
  reportDate: Date;
}

const validReasons = ['Harassment', 'Spam', 'Inappropriate Content', 'Other'];

const ReportSchema = new Schema<IReport>(
  {
    reporterId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reportedUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reason: { type: String, enum: validReasons, required: true },
    reportDate: { type: Date, default: Date.now },
  }
);

// Indexes
ReportSchema.index({ reporterId: 1 });
ReportSchema.index({ reportedUserId: 1 });
ReportSchema.index({ reportDate: -1 });

// Pre-save validation
ReportSchema.pre<IReport>('save', function (next) {
  if (this.reporterId.equals(this.reportedUserId)) {
    return next(new Error('A user cannot report themselves.'));
  }
  next();
});

const Report = mongoose.model<IReport>('Report', ReportSchema);

export default Report;
