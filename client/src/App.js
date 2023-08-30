import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from "react";

function App() {

  const [info ,setInfo]=useState([{'users':[]}])
  const [input,setData]=useState('')
  const[name,setTitle]=useState('')
  
 
    useEffect(() => {
      const getName = async () => {
        const response = await fetch("/api");
        
        const data = await response.json();
        
        setInfo(data)
      };

      getName();
    }, []);

  const setInput=(e)=>{
   setData(e.target.value)

   } 

  const submitData=async()=>{
    if (input==='') {
      alert('Please enter a valid name');
      return;
    }

   else if (!/^\d{10}$/.test(name)) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }
   else{
    const userDetails = {  input,name };
    const url = "/submit/";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);

    const data = await response.json();
    console.log(data.status,'...../');
     setData('')
    setTitle('')
    alert('thanks for voting')

   }
    

  } 

 

  const setName=(e)=>{
    setTitle(e.target.value)
  }

  return (<>
   <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:5,backgroundColor:'skyblue',height:'100vh'}}>
   
    <img src='https://1.bp.blogspot.com/-CdYKOJwlOOo/Xk_t84aQvhI/AAAAAAAABZY/rO9I5_gh-XAOJacv1EgxzKlEIjhUWBLzACLcBGAsYHQ/s1600/Mehaboob%2BShaik.jpg' style={{height:'150px',width:'150px',borderRadius:'75px'}}/>
    <p>please vote for Mehboob</p>
    <div  style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'flex-start',gap:5}}>
    <label>Name</label>
    <input type='text' onChange={setInput} style={{borderRadius:'5px',border:'none',height:'25px'}}/>
    <label>Phone number</label>
    <input type='text' onChange={ setName} style={{borderRadius:'5px',border:'none',height:'25px'}}/>
    <button onClick={submitData} style={{borderRadius:'5px',border:'none',height:'25px',backgroundColor:'orange'}}>Submit Vote</button>
    </div>
    </div>
    
    
    </>);
}

export default App;
