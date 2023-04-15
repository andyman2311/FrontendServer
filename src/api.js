let baseURL = "http://5.182.33.178";
let port =":2223"
let credentials=""


 const  setCredentials = async (pUsername, pPasswort)=>{
  credentials=pUsername+":"+pPasswort;
  console.log(credentials)
}

const sendData = async (endpoint, data) => {
  console.log(data);
  try {
    console.log(baseURL+port);
    const response = await fetch(baseURL+port+"/"+endpoint, {
      method: 'POST',
      body:JSON.stringify(data), 
      headers: {
        'Authorization': 'Basic ' + btoa(credentials),
        'Content-Type': 'application/json',
      },
      //body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(response.status+" "+response.statusText);
    }

    const result = await response.json();
    console.log(result);

    return result;
  } catch (error) {
    console.error('Error sending data to server:', error);
    return {htmlError:error};
  }
};

export default {setCredentials, sendData};