const express = require("express");
const cors = require("cors");

const ApiError = require("./app/api-error");

const app = express();

// *
const contactsRouter = require("./app/routes/contact.route");
const usersRouter = require("./app/routes/user.route");
const booksRouter = require("./app/routes/book.route");
const borrowsRouter = require("./app/routes/borrow.route");
const publishsRouter = require("./app/routes/publish.route");

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
    res.json({message: "Welcome to contact book applocation,"});
});

// *
app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);
app.use("/api/books", booksRouter);
app.use("/api/borrows", borrowsRouter);
app.use("/api/publishs", publishsRouter);

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;