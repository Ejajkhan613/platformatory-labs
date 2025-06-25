import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    sub: { type: String, required: true, unique: true }, // Auth0 user ID
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String },
    city: { type: String },
    pincode: { type: String },
}, { timestamps: true });

export default mongoose.model('User', userSchema);