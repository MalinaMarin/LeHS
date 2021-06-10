function status(response)
{
    
    if(response.status===201)
    {
      console.log("status 201");
        return Promise.resolve(response);
        
    }
    else
     if(response.status===404)
        {
            console.log(response);
            return Promise.reject(new Error("Ooops."));
        }
    else
        if(response.status === 500){
            console.log(response);
            return Promise.reject(new Error ("ERROR.."))
        }
        else
        return Promise.reject(new Error("Unexpected error"));
}


 function logout() {

   // window.localStorage.clear();
    // localStorage.removeItem("user_id");
    //     localStorage.removeItem("username");
    //     localStorage.removeItem("user_coins");
    //     localStorage.removeItem("user_level");
    //     localStorage.removeItem("user_practice");
    //     localStorage.removeItem("access_token");
   
   
       // window.localStorage.clear();
        //goToPage();
       
        localStorage.removeItem("user_id");
        localStorage.removeItem("username");
        localStorage.removeItem("user_coins");
        localStorage.removeItem("user_level");
        localStorage.removeItem("user_practice");
        localStorage.removeItem("access_token");

    }