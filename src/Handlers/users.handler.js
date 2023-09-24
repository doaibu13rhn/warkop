const { addUsers, update, deleteUsers, readUsers } = require("../Models/users.model");

const getUsersInfo = async (req, res) => {
    try {
        const { query } = req;
        const result = await readUsers(query);
        res.status(201).json({
            msg: "success",
            result: result.rows
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "error cuy",
            error: error,
        })
    }
};

const insertNewUsers = (req, res) => {
    const { body } = req;
    addUsers(body.Username, body.email, body.password, body.address, body.created_at)
        .then((data) => {
            res.status(201).json({
                msg: "successfully added new users data",
                result: data.rows,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                msg: "internal server error",
            });
        });
};

const updateAddress = async (req, res) => {
    try {
        const { body, params } = req;
        await update(body.address, params.id);
        res.status(200).json({
            msg: `update address for user id ${params.id} has changed to ${body.address}`,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "internal server error",
        })
    }
};

const usersDelete = async (req, res) => {
    try {
        const { params } = req;
        const data = await deleteUsers(params.id);
        res.status(200).json({
            msg: `user id ${params.id} has been deleted`,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "internal server error",
        })
    }
};

module.exports = {
    getUsersInfo,
    insertNewUsers,
    updateAddress,
    usersDelete,
};