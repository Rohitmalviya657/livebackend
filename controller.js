import { User } from "./model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const Create = async (req, res) => {
    console.log("hitting or not===========");

    const { name, email, password } = req.body;
    const image = req.file?.filename;


    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            image
        });

        await newUser.save();

        res.status(200).json({ msg: "Registered successfully", user: newUser });

    } catch (error) {
        console.error("Something went wrong:", error);
        res.status(500).json({ msg: "Server error" });
    }
};



export const login = async (req, res) => {
    let { email, password } = req.body;
    console.log("Received body:", req.body);

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            "Rohit123",
            { expiresIn: '1h' }
        );

        console.log("JWT Token:", token);


        const { password: pwd, ...userWithoutPassword } = user._doc;

        res.status(200).json({ msg: "Login successful", token, user: userWithoutPassword });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ msg: "Server error" });
    }
};




// export const updateImage = async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const image = req.file?.filename;

//         const user = await User.findByIdAndUpdate(
//             userId,
//             { image },
//             { new: true }
//         );

//         if (!user) {
//             return res.status(404).json({ msg: "User not found" });
//         }

//         res.status(200).json({
//             msg: "Image updated successfully",
//             imageUrl: `http://localhost:5000/uploads/${user.image}`,
//             user,
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ msg: "Something went wrong" });
//     }
// };





export const updateImageByEmail = async (req, res) => {
    console.log("hitnjkgrjktrehtjrht=============");

    try {
        const email = req.body.email;
        const image = req.file?.filename;

        if (!email || !image) {
            return res.status(400).json({ msg: "Email and image are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Update image
        user.image = image;
        await user.save();

        res.status(200).json({
            msg: "Image updated successfully",
            imageUrl: `http://localhost:5000/uploads/${image}`,
            user,
        });

    } catch (err) {
        console.error("Image update error:", err);
        res.status(500).json({ msg: "Server error" });
    }
};



export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error("Fetch users error:", err);
        res.status(500).json({ msg: "Server error" });
    }
};

export const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json({ msg: "User deleted successfully", user });
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ msg: "Server error" });
    }
};
