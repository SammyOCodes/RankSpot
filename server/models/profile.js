import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

//create a schema for storing in MongoDB
const profileSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    pic: {
        type: String,
        required: true,
        default: 
            'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
    lolSummonerName: {
        type: String,
        default: '',
    },
    lolRegionTag: {
        type: String,
        default: '',
    },
    apexUsername: {
        type: String,
        default: '',
    },
    apexPlatform: {
        type: String,
        default: '',
    },
    overwatchBattletag: {
        type: String,
        default: '',
    },
    overwatchPlatform: {
        type: String,
        default: 'pc',
    },
    overwatchRegion: {
        type: String,
        default: 'us',
    },
    friends: [String],
    },
    {
        timestamps: true,
    }
);

profileSchema.pre('save', async function(next) {
    if(!this.isModified('password')){ next(); }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

profileSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Profile = mongoose.model('profile', profileSchema);

export default Profile;