// router.post('/verify', async

const User = require('../models/user.model');

    const otpverify= async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        if (user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'OTP has expired' });
        }

        // OTP verified, update user status
        user.verifiedStatus = true; // Set verified status to true
        user.otp = undefined; // Clear OTP
        user.otpExpires = undefined; // Clear expiry
        await user.save();

        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports= otpverify;