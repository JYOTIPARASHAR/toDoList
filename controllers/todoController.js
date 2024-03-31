const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const urlEncodedParser = bodyParser.urlencoded({ extended: false });

// connect to db 
mongoose.connect('mongodb+srv://Jyoti:q7bMXmcuTsngr6Jm@node-react-shop.baucg.mongodb.net/toDo');

// create schema
const toDoSchema = new mongoose.Schema({
    item: String
});

// create model
const ToDo = mongoose.model('ToDo', toDoSchema);

// save fucntion 
// async function saveItem() {
//     const itemOne = new ToDo({item:'cake'});
//     await itemOne.save();
//     console.log('Item saved');
// }
// saveItem();
// let data = [{item:'Chocolate'},{item:'Ice-Cream'},{item:'Sweets'}];

module.exports = function (app) {
    app.get('/todo', async function (req, res) {
        const data = await ToDo.find() ;
            res.render('todo', { data });

       
    });

    app.post('/todo', urlEncodedParser, async function (req, res) {
        const newTodo = new ToDo(req.body);
        await newTodo.save();
        const data = await ToDo.find();
        res.json(data);
        // data.push(req.body);
        // res.json(data);
    });

    app.delete('/todo/:item', async function (req, res) {
        await ToDo.deleteOne({ item: req.params.item.replace(/\-/g, " ") });
        const data = await ToDo.find();
        res.json(data);
        // data = data.filter(function (todo) {
        //     return todo.item.replace(/ /g, '-') !== req.params.item;
        // });
        // res.json(data);
    });
}