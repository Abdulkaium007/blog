import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];

app.get("/", (req, res) => {
  res.render("index", { posts });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/posts/:postName", (req, res) => {
  const requestedTitle = req.params.postName.toLowerCase();
  const post = posts.find(p => p.title.toLowerCase() === requestedTitle);
  if (post) {
    res.render("post", { title: post.title, content: post.content });
  } else {
    res.status(404).send("Post not found");
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
