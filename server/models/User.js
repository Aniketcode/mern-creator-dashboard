
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a valid password'],

    },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user'
     },
    credits: { type: Number, default: 0 },
    savedPosts: [{ postId: String, source: String }],
    lastLogin: Date,
    profileCompleted: { type: Boolean, default: false },
    recentActivities: [{ type: { type: String }, timestamp: Date }]
}, { timestamps: true })



UserSchema.methods.matchPassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password)
}

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;