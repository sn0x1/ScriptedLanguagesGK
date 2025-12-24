const express = require("express");
const mongoose = require("mongoose");

const app = express();
const jsonParser = express.json();

app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://127.0.0.1:27017/cyberDB")
    .then(() => {
        app.listen(3000, () => {
            console.log("Сервер запущено на http://localhost:3000");
        });
    })
    .catch(err => {
        console.error("Помилка підключення до MongoDB:", err);
    });

const agentSchema = new mongoose.Schema({
    codename: { type: String, required: true },
    role: String,
    level: Number
}, { versionKey: false });

const Agent = mongoose.model("Agent", agentSchema);

app.get("/api/agents", async (req, res) => {
    const agents = await Agent.find({});
    res.send(agents);
});

app.get("/api/agents/:id", async (req, res) => {
    const agent = await Agent.findById(req.params.id);
    res.send(agent);
});

app.post("/api/agents", jsonParser, async (req, res) => {
    const agent = await Agent.create({
        codename: req.body.codename,
        role: req.body.role,
        level: req.body.level
    });
    res.send(agent);
});

app.delete("/api/agents/:id", async (req, res) => {
    const agent = await Agent.findByIdAndDelete(req.params.id);
    res.send(agent);
});

app.put("/api/agents", jsonParser, async (req, res) => {
    const updated = await Agent.findByIdAndUpdate(
        req.body.id,
        {
            codename: req.body.codename,
            role: req.body.role,
            level: req.body.level
        },
        { new: true }
    );
    res.send(updated);
});