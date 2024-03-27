const userModel = require('../models/userModel');



const getAllUsers = async (req, res) => {
    try {
        const allUsers = await userModel.find();
        return res.status(200).json(allUsers);
        
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}


const getUserByUsername = async (req, res) => {
    try {
        const userByUsername = await userModel.findOne({ username: req.params.username });
        if(!userByUsername){
            return res.status(404).send("User not found, worng username")
        }
        return res.status(200).json(userByUsername);
        
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}


const updateUserByEmail = async (req, res) => {
    try {
        const email = req.params.email; 
        const newPassword = req.body.password; 


        const updatedUser = await userModel.findOneAndUpdate({ email }, { password: newPassword }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}



module.exports = {
    getAllUsers,
    getUserByUsername,
    updateUserByEmail
}
