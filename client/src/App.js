import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [itemText, setItemText] = useState('');
  const [itemAssignee, setItemAssignee] = useState('');
  const [listItems, setListItems] = useState([]);

  //add new todo item to database
  const addItem = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/item`, {item: e.target.item?.value, assignee:e.target.assignee?.value})
      setListItems(prev => [...prev, res.data]);
      setItemText('');
      setItemAssignee('');
    }catch(err){
      
    }
  }

  //Create function to fetch all todo items from database
  useEffect(()=>{
    const getItemsList = async () => {
      try{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/items`)
        setListItems(res.data);
      }catch(err){
       
      }
    }
    getItemsList()
  },[]);

  // Delete item when click on delete
  const deleteItem = async (id) => {
    try{
      const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/item/${id}`)
      const newListItems = listItems.filter(item=> item._id !== id);
      setListItems(newListItems);
    }catch(err){
    }
  }
  const logoutClicked = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div className="App">
      <div className="todo-heading">
        <div className="heading">Sprint Board</div>
        <div className="logout" onClick={logoutClicked}>Logout</div>
        </div>
      
      <form className="form" onSubmit={e => addItem(e)}>
        <input type="text" id="item" name="item" placeholder='Enter Ticket Description' aria-label="ticket description" onChange={e => {setItemText(e.target.value)} } value={itemText} />
        <input type="text" id="assignee" name="assignee" placeholder=' Enter Assignee' aria-label="assignee" onChange={e => {setItemAssignee(e.target.value)} } value={itemAssignee} />
        <button type="submit">Add To Board</button>
      </form>
      <div className="todo-listItems">
        {
          listItems.map(item => (
          <div className="todo-item">
               <>
                  <p className="item-content">{item.item}</p>
                  <span>Assignee: {item.assignee}</span>
                  <button className="delete-item" onClick={()=>{deleteItem(item._id)}}>Delete</button>
                </>
          </div>
          ))
        }
        
      </div>
    </div>
  );
}

export default App;