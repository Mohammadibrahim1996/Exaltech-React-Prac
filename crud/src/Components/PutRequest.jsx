import React,{useState,useEffect} from 'react';
import axios from 'axios';

export const PutRequest = () => {
    const [data,setData] = useState([]);
    const [hide,setHide] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    const handleUserInfo = (e) => {
        setUserInfo({...userInfo, [e.target.name]: e.target.value})
  };

    const getApiData = async() =>{
        const response = await axios.get(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData`)
        setData(response.data)
};

    const onDelete = async (id) => {
        try{
        await axios.delete(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData/${id}`)
     }catch{
        alert('ID not found')
     }
        getApiData();
};

    const handleEditUser = async(id) => {
        try{
            await axios.put(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData/${id}`,
            userInfo
            )
            getApiData();
        }catch{
            alert('Error in Edit')
        }
};

    useEffect(() => {
        getApiData()
    })

    console.log('check', data)
  return (
    <div>
    <div>PutRequest</div>
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
                            <button onClick={() =>setHide(!hide)}  >Edit</button>
                            {hide && <form>
                                <div>
                                    <input onChange={handleUserInfo} type="text" placeholder='Edit First Name' name="firstName" id="" />
                                    <input onChange={handleUserInfo} type="text" placeholder='Edit Last Name' name="lastName" id="" />
                                    <input onChange={handleUserInfo} type="text" placeholder='Edit Email' name="email" id="" />
                                    <button onClick={() => handleEditUser(item.id) && setHide(false)} >Save</button>
                                </div>
                            </form>}
                        </div>
                    )
                })
            }
            </div>
            </div>
  )
}
