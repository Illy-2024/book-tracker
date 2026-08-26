import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const books = [
    {
        id: 1,
        title: "Atomic Habits",
        author: "James Clear", 
        description: "Atomic Habits by James Clear is a practical guide to building good habits and breaking bad ones through small, consistent changes. The book explains how tiny improvements can compound over time to produce remarkable results. It focuses on creating effective systems, shaping your environment, and understanding how habits form, offering simple strategies that can be applied to everyday life."
    },
    {
        id: 2,
        title: "Clean Code",
        author: "Robert C. Martin", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
];

let nextBookId = 3;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("index.ejs", {
        data: books
    });
});

app.post("/books", (req, res) => {
    let bookTitle = req.body["title"].trim();
    let bookAuthor = req.body["author"].trim();
    let bookDescription = req.body["description"].trim();

    if (bookTitle !== "" && bookAuthor !== "" && bookDescription !== "") {
        let newBook = {
            id: nextBookId, 
            title: bookTitle, 
            author: bookAuthor, 
            description: bookDescription
        };

        books.push(newBook);
        nextBookId++;
    };

     res.redirect("/");
});

app.post("/books/:id/delete", (req, res) => {
    const bookId = Number(req.params.id);
    
    const index = books.findIndex((book) => {
        return book.id === bookId
    });

    if (index !== -1) {
        books.splice(index, 1);
    }

    res.redirect("/");
});

app.get("/books/:id/edit", (req, res) => {
    const bookId = Number(req.params.id);
    
    const bookToUpdate = books.find((book) => {
        return book.id === bookId
    });

    res.render("edit.ejs", { book: bookToUpdate})
});

app.post("/books/:id/edit", (req, res) => {
    const bookId = Number(req.params.id);
    let bookTitle = req.body["title"].trim();
    let bookAuthor = req.body["author"].trim();
    let bookDescription = req.body["description"].trim();

    if (bookTitle !== "" && bookAuthor !== "" && bookDescription !== "") {
        
        const updateBook = books.find((book) => {
            return book.id === bookId
        });

        updateBook.title = bookTitle;
        updateBook.author = bookAuthor;
        updateBook.description = bookDescription
    };

    res.redirect(`/books/${bookId}`);
});

app.get("/books/:id", (req, res) => {
    const bookId = Number(req.params.id);

    const book = books.find((book) => {
        return book.id === bookId
    });

    res.render("book.ejs", { data: book})
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

