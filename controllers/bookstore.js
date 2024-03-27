const userModel = require('../models/bookstore');
const bcrypt = require('bcryptjs');


const getAllUsers = async (req, res) => {
    try {
        const allUsers = await userModel.find();
        return res.status(200).json(allUsers);
        
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if username exists
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "Username not found." });
        }

        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Incorrect password." });
        }

        // Login successful
        return res.status(200).json({ success: "Login successful." });

    } catch (error) {
        return res.status(500).json({ error: error.message });
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

const createUser = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            confirmPassword,
            phoneNumber
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        // Validation for Username
        const usernameRegex = /^[A-Za-z0-9_.]{6,25}$/;
        if (!usernameRegex.test(username)) {
            return res.status(400).json({ error: "Invalid username format. Username must contain only English letters, numbers, '_', and '.', and must be between 6 and 25 characters long." });
        }
        // Check if username is already registered
        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists. Please choose a different one." });
        }

        // Validation for Email
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format." });
        }
        // Check if email is already registered
        const existingEmail = await userModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: "Email already exists. Please use a different one." });
        }

        // Validation for Password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$]{8,16}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: "Invalid password format. Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special character '@' or '$', and be between 8 and 16 characters long." });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match." });
        }

        // Validation for Phone Number
        if (phoneNumber) {
            const phoneRegex = /^[0-9]{8}$/;
            if (!phoneNumber.startsWith('05') || !phoneRegex.test(phoneNumber.slice(2))) {
                return res.status(400).json({ error: "Invalid phone number format. Phone number must start with '05' and be 10 digits long." });
            }
        }

        // All validations passed, create new user
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
            phoneNumber
        });
        await newUser.save();
        return res.status(201).json({ success: "User created successfully", user: newUser });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


/*const createUser = async (req, res) => {
    try {
        const newUserData = req.body;
        const newUser = new userModel(newUserData);
        await newUser.save();
        return res.status(201).json({ user: newUser });
        
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
    updateUserByEmail,
    loginUser
}
