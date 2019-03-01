import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var User = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
})

export default mongoose.model('User', User);