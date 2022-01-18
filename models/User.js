const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: 'Please enter a valid email address.',
      unique: true,
      match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/]
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
          type: Schema.Types.ObjectId,
          ref: 'User'
      }
  ]
},
{
  toJSON: {
      virtuals: true
  }
})

// create the User model using the UserSchema
const User = model('User', UserSchema);

// get total friendCount
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// export the user model
module.exports = User;