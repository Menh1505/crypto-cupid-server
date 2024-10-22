import mongoose, { Schema, model, Document, Types } from 'mongoose';
import Match from './Match';

export interface IMessage extends Document {
    match_id: Types.ObjectId;
    sender_id: Types.ObjectId;
    receiver_id: Types.ObjectId;
    content: string;
    created_at: Date;
}

const MessageSchema = new Schema<IMessage>(
    {
        match_id: { type: Schema.Types.ObjectId, ref: 'Match', required: true },
        sender_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        receiver_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        content: { type: String, required: true },
        created_at: { type: Date, default: Date.now },
    }
);

MessageSchema.index({ match_id: 1 });
MessageSchema.index({ sender_id: 1 });
MessageSchema.index({ receiver_id: 1 });
MessageSchema.index({ created_at: -1 });

/**
 * Pre-save middleware for the Message schema.
 * This function runs before saving a new message to ensure the validity of the message.
 * 
 * @param {Function} next - The next middleware function in the chain.
 * @returns {void}
 * @throws {Error} If the match doesn't exist or if the sender and receiver are not part of the match.
 */
MessageSchema.pre<IMessage>('save', async function (next) {
    const message = this;
    const match = await Match.findById(message.match_id);
  
    if (!match) {
      return next(new Error('Match does not exist'));
    }
  
    const senderInMatch =
      match.user1_id.equals(message.sender_id) || match.user2_id.equals(message.sender_id);
    const receiverInMatch =
      match.user1_id.equals(message.receiver_id) || match.user2_id.equals(message.receiver_id);
  
    if (!senderInMatch || !receiverInMatch) {
      return next(new Error('Sender and receiver must be part of the match'));
    }
  
    next();
});

const Message = mongoose.model<IMessage>('Message', MessageSchema);

export default Message;
