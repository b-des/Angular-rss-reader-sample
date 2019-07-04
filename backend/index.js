const express = require("express");
const app = express();
const cors = require('cors');
let router = express.Router();


const Parser = require('rss-parser');
const parser = new Parser();

const PORT = process.env.PORT = 7583;

app.use(cors());


router.get("/get-notifications", async (req, res) => {
    let data =  await parser.parseURL(req.query.source);
    res.header("content-type","application/json");
    res.json(data);
});

app.use("/api/v1",router);

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});