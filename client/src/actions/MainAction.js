import axios from "axios";
import { main_api } from "../MainApi";
import { changeStateValue } from "../reduxx/MainReducer";


export const registerUser=(data)=>async dispatch=>{
    return await 
    axios({
        url:`${main_api}/register`,
        params:data,
        method: "POST"
    })
    .then(resp=>{
        console.log(resp.data)
    }).catch(err=>console.log(err))
}

export const loginUser=(data)=>async dispatch=>{
    return await axios({
        url: `${main_api}/login`,
        params:data,
        method: "POST"
    })
    .then(resp=>{
        console.log(resp.data)
        dispatch({type: 'MAIN_SLICE/changeStateValue',
        payload:{name:'user',value:resp.data.user}
    })
    localStorage.setItem('token',resp.data.token)
    return 'success'
    }).catch(err=>console.log(err.response))
}


export const getLoginUser=()=> async dispatch=>{
    return await axios.get(`${main_api}/login-user`,{
        headers:{
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
    }).then(resp=>{
        dispatch({type: 'MAIN_SLICE/changeStateValue',
        payload:{name:'user',value:resp.data}
    })
    return 'success'
}).catch(err=>{
    return 'error'
})
}

export const getAllUsers=()=> async dispatch=>{
    return await axios.get(`${main_api}/get-all-users`,{
        headers:{
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
    }).then(resp=>{
        dispatch({type: 'MAIN_SLICE/changeStateValue',
        payload:{name:'users',value:resp.data}
    })
    return 'success'
}).catch(err=>{
    return 'error'
})}

export const getUsers=(search='')=>async dispatch =>{
    return await axios.get(`${main_api}/users?search=${search}`,{
        headers:{
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(resp=>{
        dispatch(changeStateValue({
            name:'users',
            value:resp.data
        }))
        
    }).catch(err=>{
        console.log(err.response);
    })
}


export const getActiveUsers=()=>async dispatch =>{
    return await axios.get(`${main_api}/get-active-user`,{
        headers:{
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(resp=>{
        dispatch(changeStateValue({
            name:'activeUsers',
            value:resp.data
        }))
        
    }).catch(err=>{
        console.log(err.response);
    })
}


//GET USER NAME
export const getUserName=()=> async dispatch=>{
    return await axios.get(`${main_api}/get-user-name`,{
        headers:{
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
    }).then(resp=>{
        dispatch({type: 'MAIN_SLICE/changeStateValue',
        payload:{name:'users',value:resp.data}
    })
    return 'success'
}).catch(err=>{
    return 'error'
})}


export const getOneUser=()=> async dispatch=>{
    return await axios.get(`${main_api}/get-one-user`,{
        headers:{
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
    }).then(resp=>{
        dispatch({type: 'MAIN_SLICE/changeStateValue',
        payload:{name:'users',value:resp.data}
    })
    return 'success'
}).catch(err=>{
    return 'error'
})}