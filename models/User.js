const { Schema, model } = require('mongoose');

const userSchema = new Schema(
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
            validate: {
                validator: function (value) {
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
                },
                message: 'Invalid email address'
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ]
    }

);

const User = model('user', userSchema);

module.exports = User;