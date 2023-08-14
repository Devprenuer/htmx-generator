import express from "express";
import bodyParser from "body-parser";
import { engine } from 'express-handlebars';
import { generate } from "./services/ai/generator";
import path from "path";
import fs from "fs";

require('dotenv').config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.engine('.hbs', engine({
  extname: '.hbs',
  defaultLayout: false,
  partialsDir: path.resolve(__dirname, "./views/components/generated")
}));

app.set('view engine', '.hbs');
app.set("views", path.resolve(__dirname, "./views"));

app.get("/", (req, res) => {
  res.render("home", {
    title: "X",
    x: 1
  });
});

app.post("/generate", async (req, res) => {
  const { name, description } = req.body;
  const html = await generate(description);

  console.log(html);
  
  // store the generated html in a file
  const cpnt = name.toLowerCase().replace(/\s/g, "-");
  const viewsPath = path.resolve(__dirname, `./views`);
  const cpntPath = `components/generated/${cpnt}.hbs`;
  fs.writeFileSync(
    `${viewsPath}/${cpntPath}`,
    html
  );

  res.render(cpntPath);
});

app.listen(4000, () => {
  console.log(`app is listening to port 4000`);
});
