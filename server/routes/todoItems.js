const router = require('express').Router();
//import todo model 
const todoItemsModel = require('../models/todoItems');


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

//create second route -- get data from database
router.get('/items', async (req, res)=>{
  try{
    console.log("Inside router")
    const allTodoItems = await todoItemsModel.find({});
    console.log('allTodoItems',allTodoItems)
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
router.delete('/api/item/:id', async (req, res)=>{
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