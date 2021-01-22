let bodyParser = require('body-parser');
let mongoose = require('mongoose');
// mongodb://localhost/todolist
//mongodb+srv://aryan_08:rishu08032000%0A@todolist.kpeyb.mongodb.net/todolist?retryWrites=true&w=majority
mongoose.connect("mongodb://localhost/todolist", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));

let todoSchema = new mongoose.Schema({
    item: String
});

let Todo = mongoose.model('Todo', todoSchema);

//let data = [{ item: "To Drink Cold Drink" }, { item: "To Make Project" }, { item: "To Play Cricket" }];

let urlencodedParser = bodyParser.urlencoded({ extended: false });

//handle request handlers
module.exports = function (app) {
    app.get("/todo", (req, res) => {
        Todo.find({}, (err, data) => {
            if (err) {
                throw err;
            }
            else {
                res.render("todo", { todos: data });
            }
        });
    });

    app.post("/todo", urlencodedParser, (req, res) => {
        let newTodo = Todo(req.body).save((err, data) => {
            if (err) {
                throw err;
            }
            else {
                res.json({ todos: data });
            }
        });
    });

    app.delete("/todo/:item", (req, res) => {
        Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove((err, data) => {
            if (err) {
                throw err;
            }
            else {
                res.json({ todos: data });
            }
        });
    });
};