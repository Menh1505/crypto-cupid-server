import mongoose, { Schema, model, Document, Types } from 'mongoose';

export interface IBlock extends Document {
    blockerId: Types.ObjectId;
    blockedUserId: Types.ObjectId;
    blockDate: Date;
}

const BlockSchema = new Schema<IBlock>(
    {
        blockerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        blockedUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    {
        timestamps: { createdAt: 'blockDate', updatedAt: false },
    }
);

// Unique index to prevent duplicate blocks
BlockSchema.index({ blockerId: 1, blockedUserId: 1 }, { unique: true });

// Pre-save validation to prevent self-blocking
BlockSchema.pre<IBlock>('save', function (next) {
    if (this.blockerId.equals(this.blockedUserId)) {
        return next(new Error('A user cannot block themselves.'));
    }
    next();
});

const Block = mongoose.model<IBlock>('Block', BlockSchema);

export default Block;
