
 const register = async (e) => {
    e.preventDefault();
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let confirmPassword = document.querySelector("#confirmPassword").value;
    let username = document.querySelector("#username").value;


    const result = await (await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
        confirmPassword : confirmPassword
      }),
    })).json();
    if (!result.error) {
      console.log(result.message);
      //navigate('/');
    } else {
      console.log(result.error);
    }
  }