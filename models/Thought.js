const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: [1, 'Between 1 and 128 characters please!'],
      max: [128, 'Between 1 and 128 characters please!']

    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
      type: String,
      required: true,
      trim: true
    },
    reactions: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      max: [280, '280 characters maximum']
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    // use ReplySchema to validate data for a reply
    replies: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

ReactionSchema.virtual('replyCount').get(function() {
  return this.replies.length;
});

const Thought = model('Thought', ReactionSchema);

module.exports = Thought;
