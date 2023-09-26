export const SET_USERNAME='SET_USERNAME';
export const SET_PASSWORD='SET_PASSWORD';
export const SET_INCREMENT='SET_INCREMENT';
export const SET_DECREMENT='SET_DECREMENT';

//START ---API CALL USING REDUX--- //

{/*      const ADD_URL='https://jsonplaceholder.typicode.com/posts/';


export const getTitle=() =>{
   try{
return async dispatch=>{
const result=await fetch(ADD_URL,{
    method:'GET',
    headers:{
        'Content-Type':'application/json'
    }
});
    const json= await result.json();
    
    if(json){
        dispatch({
            type:GET_TITLE,
            payload:json
        })

    }else{
        console.log("error")
    }
 
}
   }catch(error){
  console.log(error)
   }
   };

// ---API CALL USING REDUX--- END//
      */}


export const  setUser=user=>dispatch=>{
    dispatch({
        type:SET_USERNAME,
        payload:user,
    })

}

export const setPwd=pwd=>dispatch=>{
    dispatch({
        type:SET_PASSWORD,
        payload:pwd,
    })
}

export const setIncrement=count=>dispatch=>{
    dispatch({
        type:SET_INCREMENT,
        payload:count,
    })
}

export const setDecrement=count=>dispatch=>{
    dispatch({
        type:SET_DECREMENT,
        payload:count
    })
}
