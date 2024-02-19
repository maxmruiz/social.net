const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+\@.+\..+/, 'Please fill a valid email address']
        },
        thoughts: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User'
            }
        ]
    }, {
        toJSON: {
            virtuals: true
        },
        id: false
    
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;