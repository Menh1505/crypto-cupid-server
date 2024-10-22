import mongoose, { Schema, model, Document, Types } from 'mongoose';

export interface ISwipe extends Document {
    swiper_id: Types.ObjectId;
    swipee_id: Types.ObjectId;
    direction: 'like' | 'dislike';
    created_at: Date;
}

const SwipeSchema = new Schema<ISwipe>({
    swiper_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    swipee_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    direction: { type: String, enum: ['like', 'dislike'], required: true },
    created_at: { type: Date, default: Date.now },
});

// Indexes
SwipeSchema.index({ swiper_id: 1, swipee_id: 1 }, { unique: true });

// Pre-save validation
SwipeSchema.pre<ISwipe>('save', function (next) {
    if (this.swiper_id.equals(this.swipee_id)) {
        return next(new Error('A user cannot swipe on themselves.'));
    }
    next();
});

const Swipe = mongoose.model<ISwipe>('Swipe', SwipeSchema);

export default Swipe;
