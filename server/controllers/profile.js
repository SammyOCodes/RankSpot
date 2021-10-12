import ProfileData from '../models/profile.js';

//register a user
export const createProfile = async (req, res) => {
    const { email, password, pic } = req.body;
    const profileExists = await ProfileData.findOne({ email });

    if(profileExists) {
        res.status(400)
        throw new Error('User Already Exists');
    }

    const profile = await ProfileData.create({
        email,
        password,
        pic,
    });

    if(profile) {
        res.status(201).json({
            _id: profile._id,
            email: profile.email,
            pic: profile.pic,
        });
    } else {
        res.status(400)
        throw new Error('Creation Error Occured!');
    }
}

export const authProfile = async (req, res) => {
    const { email, password } = req.body;
    const profile = await ProfileData.findOne({email});

    if(profile && (await profile.matchPassword(password))){
        res.json({
            _id: profile._id,
            email: profile.email,
            pic: profile.pic,
        });
    } else {
        res.status(400)
        throw new Error('Auth Error! Invalid Email or Password!');
    }
}

export const getProfiles = async (req, res) => {
    try {
        const allProfiles = await ProfileData.find();
        res.status(200).json(allProfiles);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUser = async (req, res) => {
    const email = req.body.email;
    try {
        const currentProfile = await ProfileData.findOne({email: email}).exec();
        res.status(200).json(currentProfile);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteProfile = async (req, res) => {
    const id = req.params.id;
    try {
        await profileData.findByIdAndRemove(id).exec();
        res.send('Successfully Deleted!');
    } catch (error) {
        console.log(error);
    }
}

export const updateLolAccount = async (req, res) => {
    console.log(req.body);
    const filter = { email: req.body.email };
    const update = { lolSummonerName: req.body.summonerName };

    try {
        let updatedProfile = await ProfileData.findOneAndUpdate(filter, update, {
            new: true,
        });
        console.log(updatedProfile.email);
        console.log(updatedProfile.lolSummonerName);
    } catch (error) {
        console.log(error);
    }
}

export const updateApexAccount = async (req, res) => {
    const filter = { email: req.body.email };
    const update = {
        apexUsername: req.body.apexUsername,
        apexPlatform: req.body.apexPlatform,
    };

    try {
        let updatedProfile = await ProfileData.findOneAndUpdate(filter, update, {
            new: true,
        });
        console.log(updatedProfile.email);
        console.log(updatedProfile.apexUsername);
        console.log(updatedProfile.apexPlatform);
    } catch (error) {
        console.log(error);
    }
}

export const updateOverwatchAccount = async (req, res) => {
    const filter = { email: req.body.email };
    const update = {
        overwatchBattletag: req.body.overwatchBattletag,
        overwatchPlatform: 'pc',
        overwatchRegion: 'us',
    };

    try {
        let updatedProfile = await ProfileData.findOneAndUpdate(filter, update, {
            new: true,
        });
        console.log(updatedProfile.email);
        console.log(updatedProfile.overwatchBattletag);
    } catch (error) {
        console.log(error);
    }
}