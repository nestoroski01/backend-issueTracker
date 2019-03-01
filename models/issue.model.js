import mongoose from 'mongoose';
import User from '../models/user.model';

const Schema = mongoose.Schema;
var UserSchema = new User();

var Issue = new Schema({
    title: {
        type: String
    },
    reporter: {
        type: mongoose.Schema.Types.ObjectId
    },
    responsible: {
        type: mongoose.Schema.Types.ObjectId
    },
    severity: {
        type: Number
    },
    status: {
        type: Number,
        default: 0
    }
})

export default mongoose.model('Issue', Issue);