import React,{useState,useEffect} from 'react';
import axios from 'axios';

export const PostMethod = () => {
    const [data, setData] = useState([])
    const [userInfo,setuserInfo] = useState({})

    const handleUserInfo = (e) => {
          setuserInfo({...userInfo, [e.target.name]: e.target.value})
    }

    const getData = async() => {
        const response = await axios.get(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData`)
        const filteredUser = response.data.filter((item) => item.id )
        setData(filteredUser)
    }

    useEffect(()=>{
        getData()
    },[])

    const handleSubmit = async () => {
        try{
           await axios.post(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData`, userInfo) 
        }
        catch{
            alert('requestFailed')
        }
        getData()
    }
    const onDelete = async (id) => {
        try{
        await axios.delete(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData/${id}`)
     }catch{
        alert('ID not found')
     }
        getData();
}
//     const updateAPIData = (id,e) => {
//     axios.put(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData/${id}`, {
       
//        [e.target.name]: e.target.value
// 	})
// }

    return(
        <div>
            <h1>HELLO</h1>
            <div>
                <label>FirstName:</label>
                <input onChange={handleUserInfo} name='firstName' type='text' placeholder='FIRST NAME'/>
                <label>LASTNAME:</label>
                <input onChange={handleUserInfo} name='lastName' type='text' placeholder='LAST NAME'/>
                <label>EMAIL</label>
                <input onChange={handleUserInfo} name='email' type='text' placeholder='EMAIL'/>
                <button onClick={handleSubmit}>SUBMIT</button>
            </div>
            <div style={{ width:'50px', height:'30px', backgroundColor:'balck'}}></div>
            <div style={{width:'100%', backgroundColor:'gray', display:'flex', flexWrap:'wrap'}}>
            {
                data.map((item,index) => {
                    return(
                        <div style={{width:'500px', height:'500px', backgroundColor:'slateblue', flexWrap:'wrap', margin:'5px'}} key={index}>
                            <div style={{}}></div>
                            <div>
                            <h1>FirstName:{item.firstName}</h1><br/>
                            <h1>LastName:{item.lastName}</h1><br/>
                            <h1>Email:{item.email}</h1>
                            </div>
                            {/* <button onClick={()=>updateAPIData(item.id)}>Update</button> */}
                            <button onClick={()=>onDelete(item.id)} >Delete</button>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}