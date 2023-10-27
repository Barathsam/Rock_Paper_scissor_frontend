import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './index.css'
import Axios from 'axios';
const api_url="https://rock-paper-scissor-89z8.onrender.com/users"
function User() {
    const [name,setName] = useState("");
    const [error,setError] = useState(false);
    const [datas, setDatas]=useState ([])
    let navig = useNavigate();
    let handleclick = ()=> {
        if(name === "")
        {

        }else navig("/game",{state:{name}});
    }

    let handleChange = ({target: {value}})=>{                  
        setName(value);
        if(value === "")  
        {
            setError(!error)
        }else{
            setError(false)
        }     
    }
    useEffect(async()=>{
        const {data} = await Axios.get(api_url)
        setDatas([...data]);
    },[])
    return(
        <>
            <div style={{textAlign: "center",margin:"70px auto"}}>
                <h1  >Welcome to the Famous Rock Paper Scissor Game</h1><br />
                <h2 >Please Enter Your Name</h2><br />
                <p><input  type="text" name="name" value={name} onChange={(e)=>handleChange(e)} autoComplete="off"/></p>
                {error && <p >Please enter Name</p>}<br />
                <button onClick={handleclick}>Submit</button>
            </div>
            <div style={{textAlign: "center", width: "500px", margin: "30px auto", }}>
                <table id= "customers" >
                <thead>
                    <tr>
                    <th>name</th>
                    <th>status</th>
                    </tr>
                </thead>
                <tbody>
                    {datas.map((data,index)=>{
                    return (<tr key={index} >
                        <td>{data.name}</td>
                        <td>{data.status}</td>
                    </tr>)
                    })
                    }
                </tbody>
                
                
            </table>
            </div>
        </>
    )
}
export default User;