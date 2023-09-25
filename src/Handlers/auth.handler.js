const argon = require("argon2");
const { createUsers } = require("../Models/auth.model");

const register = async (req, res) => {
    const { body: { Username, email, password, address } } = req;
    try {
        const hashedPassword = await argon.hash(password);
        await createUsers(Username, email, hashedPassword, address);
        res.status(201).json({
            msg: "Succesfully register!!",
            data: {
                Username,
                email,
            }
        })
    } catch (error) {
        console.log(error);
        if (error.code === "23505") return res.status(400).json({
            msg: "duplicate username or email"
        })
        res.status(500).json({
            msg: "internal server error",
        })
    }

};

module.exports = { register };