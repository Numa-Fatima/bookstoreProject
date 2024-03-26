const userModel = require('../models/bookstore');

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

        return res.status(200).json(userByUsername);
        
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}

const createUser = async (req, res) => {
    try {
        const newUserData = req.body;
        const newUser = new userModel(newUserData);
        await newUser.save();
        return res.status(201).json({ user: newUser });
        
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}

/*const updateUserByEmail = async (req, res) => {
    try {
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}*/

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
    createUser,
    updateUserByEmail
}
