const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const jsonParser = express.json();

const client = new MongoClient("mongodb://localhost:27017/");
let db;

app.use(express.static(__dirname + "/public"));

async function start() {
    try {
        await client.connect();
        db = client.db("cyberDB");
        app.locals.collection = db.collection("agents");
        app.listen(3000, () => {
            console.log("System Online: http://localhost:3000");
        });
    } catch (err) {
        console.error("Critical Failure:", err);
        process.exit(1);
    }
}

start();

app.get("/api/agents", async (req, res) => {
    const agents = await req.app.locals.collection.find({}).toArray();
    res.send(agents);
});

app.get("/api/agents/:id", async (req, res) => {
    try {
        const agent = await req.app.locals.collection.findOne({
            _id: new ObjectId(req.params.id)
        });
        res.send(agent);
    } catch { res.status(404).send(null); }
});

app.post("/api/agents", jsonParser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const agent = {
        codename: req.body.codename,
        role: req.body.role,
        level: req.body.level
    };

    const result = await req.app.locals.collection.insertOne(agent);
    agent._id = result.insertedId;
    res.send(agent);
});

app.put("/api/agents", jsonParser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    
    const id = new ObjectId(req.body.id);
    const updated = await req.app.locals.collection.findOneAndUpdate(
        { _id: id },
        { 
            $set: {
                codename: req.body.codename,
                role: req.body.role,
                level: req.body.level
            } 
        },
        { returnDocument: "after" }
    );
    res.send(updated?.value ?? null);
});

app.delete("/api/agents/:id", async (req, res) => {
    try {
        const result = await req.app.locals.collection.findOneAndDelete({
            _id: new ObjectId(req.params.id)
        });
        res.send(result?.value ?? null);
    } catch { res.status(404).send(null); }
});

process.on("SIGINT", async () => {
    await client.close();
    process.exit();
});