import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const data = JSON.parse(fs.readFileSync("./data.json"));

app.use(express.json()); //Used to parse JSON bodies
app.use(cors());

app.put("/highscore", (req, res) => {
    if (+req.body.score > +data.highscore) {
        data.highscore = req.body.score;
        fs.writeFileSync("./data.json", JSON.stringify(data));
        res.json({
            status: "success",
            message: "new highscore set",
            highscore: data.highscore,
        });
    } else {
        res.json({
            status: "success",
            message: "not a highscore",
            yourscore: req.body.score,
            highscore: data.highscore,
        });
    }
});

app.get("/highscore", (_req, res) => {
    res.json(data);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
