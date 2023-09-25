const jwt = require("jsonwebtoken");

const { jwtKey, issuer } = require("../Configs/environment")

const isLogin = (req, res, next) => {
    const bearerToken = req.header("Authorization")
    if (!bearerToken) return res.status(401).json({
        msg: "Please login first",
    });
    const token = bearerToken.split(" ")[1];
    jwt.verify(token, jwtKey, { issuer }, (error, data) => {
        if (error) {
            switch (error.name) {
                case "TokenExpiredError": return res.status(401).json({
                    msg: "Expired to Access, Please Login again!"
                });
                case "NotBeforeError": return res.status(401).json({
                    msg: "Your access not started yet, please accen on time"
                })
            }
        }
        req.userInfo = data;
        next();
    });
};

module.exports = {
    isLogin,
}