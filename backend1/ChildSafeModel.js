import mongoose from 'mongoose';

const SafeChildSchema = new mongoose.Schema({
    QRID: String,
    ChildName: String,
    ChildAge: String,
    ChildGender: String,
    ParentMobile: Number,
    AlternaveMobile: Number,
    Address: String,
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 172800 
    }
});

const Child = mongoose.model("Child", SafeChildSchema);

export default Child;
