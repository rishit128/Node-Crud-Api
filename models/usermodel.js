import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    Name: String,
    Email: String,
    Hobbies: [String],
    Address :String,
    
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var UserMessage = mongoose.model('PostMessage', userSchema);

export default UserMessage;