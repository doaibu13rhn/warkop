const argon = require("argon2");
const jwt = require("jsonwebtoken");
const { createUsers, getPsw } = require("../Models/auth.model");
const { jwtKey } = require("../Configs/environment")

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
        if (error.code === "23505") {
            if (error.constraint.includes("username"))
                return res.status(400).json({
                    msg: "duplicate username",
                })
            return res.status(400).json({
                msg: "duplicate email",
            })
        }
        res.status(500).json({
            msg: "internal server error",
        })
    }

};

const login = async (req, res) => {
    const { body: { email, Password } } = req;
    try {
        const result = await getPsw(email);
        if (!result.rows.length) return res.status(404).json({
            msg: "email not registered"
        })
        const { password, Username } = result.rows[0];
        const isValid = await argon.verify(password, Password);
        if (!isValid)
            return res.status(401).json({
                msg: "password doesnt match"
            })
        const payload = {
            Username,
            email,
        };
        jwt.sign(payload, jwtKey, {
            expiresIn: "5m",
            issuer: "raihan"
        }, (error, token) => {
            if (error) throw error;
            res.status(200).json({
                msg: `Succesfully Login`,
                data: {
                    token,
                    userInfo: {
                        email,
                        Username,
                    }
                }
            })
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "internal server error",
        })
    }
};

module.exports = { register, login };