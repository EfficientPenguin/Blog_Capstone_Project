/**
 * The goal of this project is to create a Blog web application using Node.js, Express.js, and EJS. 
 * The application will allow users to create and view blog posts. 
 * Posts will not persist between sessions as no database. 
 * Styling will be an important aspect of this project to ensure a good user experience.
 */

import express from "express";

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const port = 3000;
const app = express();

var posts = [];

class Post {
    constructor(title, author, content){
        this.title = title;
        this.author = author;
        this.content = content;
    }
}

// Middleware for static files and form support
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    if (posts.length) {
        res.render("index.ejs", {posts});
    } else {
        res.render("index.ejs");
    }
});

app.get('/create-post', (req,res) => {
    res.render("create-post.ejs")
});

app.get('/edit-post-:id', (req,res) => {
    const postId = req.params.id;

    res.render("edit-post.ejs", {post: posts[postId], id: postId});
});

app.get('/delete-post-:id', (req,res) => {
    const postId = req.params.id;

    posts = posts.toSpliced(postId, 1);
    res.redirect('/');
});

app.post('/submit-edit-:id', (req, res) => {
    const postId = req.params.id;
    const editedPost = req.body;

    posts[postId] = editedPost;
    res.redirect('/');
});

app.post('/submit-post', (req, res) => {
    // Read post content and create a new post
    let post = new Post(req.body.title, 
                        req.body.author,
                        req.body.content);
    // Add it to the list of posts
    posts.push(post);
    for(let i = 0; i < posts.length; i++){
        console.log(posts[i]);
    }
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});