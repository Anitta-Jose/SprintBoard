const jwt = require("jsonwebtoken");
const router = require('express').Router();
//import todo model 
const todoItemsModel = require('../models/todoItems');
require("dotenv").config();

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;


//create first route --add Todo Item to database
router.post('/item', async (req, res)=>{
  try{
    const newItem = new todoItemsModel({
      item: req.body.item,
      assignee: req.body.assignee
    })
    //save this item in database
    const saveItem = await newItem.save()
    res.status(200).json(saveItem);
  }catch(err){
    res.json(err);
  }
})

router.post('/login', async (req, res)=>{
 const { email, password } = req.body;
 if (email === EMAIL && password === PASSWORD) {
  /* Creating a token. */
  const token = jwt.sign({ email }, process.env.TOKEN_KEY, {
    expiresIn: "2h",
  });
  return res.status(200).json({
    statusCode: 200,
    msg: "Login successful",
    token,
  });
}
return res.status(401).json({
  statusCode: 401,
  msg: "Invalid Credentials",
});
 
})

//create second route -- get data from database
router.get('/items', async (req, res)=>{
  try{
    const allTodoItems = await todoItemsModel.find({});
    res.status(200).json(allTodoItems)
  }catch(err){
    res.json(err);
  }
})


//update item
router.put('/item/:id', async (req, res)=>{
  try{
    //find the item by its id and update it
    const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {$set: req.body});
    res.status(200).json(updateItem);
  }catch(err){
    res.json(err);
  }
})


//Delete item from database
router.delete('/item/:id', async (req, res)=>{
  try{
    //find the item by its id and delete it
    const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
    res.status(200).json('Item Deleted');
  }catch(err){
    res.json(err);
  }
})


//export router
module.exports = router;