const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


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
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
 
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);


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
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      trim: true
    },
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
    id: false
  }
);

const Thought = model('Thought', ReactionSchema);

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});



module.exports = Thought;
