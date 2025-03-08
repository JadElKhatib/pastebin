const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.port || 3000;
const database = require("./db/database");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

app.get("/users", async (req, res) => {
    try {
        BigInt.prototype.toJSON = function () {
            return this.toString();
        };
        const sql = "Select * from users";
        const result = await database.pool.query(sql);
        res.send(result);
    } catch (err) {
        throw err;
    }
});

app.post("/users", async (req, res) => {
    let newUser = req.body;
    try {
        BigInt.prototype.toJSON = function () {
            return this.toString();
        };
        const sql =
            "Insert into users(username,password,pasteinfo,fullname,emailaddress) value(?,?,?,?,?)";
        const result = await database.pool.query(sql, [
            newUser.username,
            newUser.password,
            newUser.pasteinfo,
            newUser.fullname,
            newUser.emailaddress,
        ]);
        return res.json(result);
    } catch (err) {
        throw err;
    }
});

app.patch("/users/:userid", async (req, res) => {
    let user = req.body;
    const id = Number(req.params.userid);
    try {
        BigInt.prototype.toJSON = function () {
            return this.toString();
        };
        const sql =
            "Update users set username=?, password=?, pasteinfo=?, fullname=?, emailaddress=? where userid=?";
        const result = await database.pool.query(sql, [
            user.username,
            user.password,
            user.pasteinfo,
            user.fullname,
            user.emailaddress,
            id,
        ]);
        return res.json(result);
    } catch (err) {
        throw err;
    }
});

app.delete("/users/:userid", async (req, res) => {
    const id = Number(req.params.userid);
    try {
        BigInt.prototype.toJSON = function () {
            return this.toString();
        };
        const sql = "Delete from users where userid=?";
        const result = await database.pool.query(sql, [id]);
        return res.json(result);
    } catch (err) {
        throw err;
    }
});
