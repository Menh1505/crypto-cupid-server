import mongoose, { Schema, model, Document, Types } from 'mongoose';

export interface IMatch extends Document {
    user1_id: Types.ObjectId;
    user2_id: Types.ObjectId;
    is_mutual: boolean;
    created_at: Date;
}

const MatchSchema = new Schema<IMatch>({
    user1_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    user2_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    is_mutual: { type: Boolean, required: true },
    created_at: { type: Date, required: true, default: Date.now },
});

// Optional: Add indexes
MatchSchema.index({ user1_id: 1 });
MatchSchema.index({ user2_id: 1 });
// To prevent duplicate matches between the same users
MatchSchema.index({ user1_id: 1, user2_id: 1 }, { unique: true });

const Match = mongoose.model<IMatch>('Match', MatchSchema);

export default Match;
