import axios from "axios";
import UserContext from "./UserContext";
import { useState, useEffect } from "react";

export const UserProvider = (props) => {
    const [ barber, setBarber ] = useState([]);
    //"http://localhost:3000/api/users/" the real baseUrl
    const baseUrl = "http://localhost:5048/Barber/";

useEffect(() => {
    async function getAllBarber() {
      await  refreshBarber()
    }
    getAllBarber()
  }, []);

  function refreshBarber() {
    return axios.get(baseUrl)
      .then(response => {
        setBarber(response.data)
        console.log(response.data)
      })
  }

    async function getAllBarber() {
        const response = await axios.get(baseUrl);
        console.log(response.data)
        return setBarber(response.data);
    }

    async function createBarber( Address, City, FirstName, LastName, LicenseNumber, PhoneNumber, ProfilePic, State ) {       
        let barber = {Address, City, FirstName, LastName, LicenseNumber, PhoneNumber, ProfilePic, State };
        
        const response = await axios.post(baseUrl, barber);
        return await new Promise(resolve => resolve(response.data));
    }
     
    async function LogIn(email, password) {
        let barber = { email, password };

        const response = await axios.post(`${baseUrl}/login`, barber);
        localStorage.setItem('myMessageToken', response.data.token);
        return await new Promise(resolve => resolve(response.data));
    }

    async function CreateSignIn(email, password) {       
      let user = { email, password};
      
      const response = await axios.post('http://localhost:5048/Auth/register', user);
      return await new Promise(resolve => resolve(response.data));
  }

    async function getBarber(id) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myMessageToken')}`
        };
        const response = await axios.get(baseUrl + id, { headers: myHeaders });
        return await new Promise(resolve => resolve(response.data));
    }

    async function updateBarber(signin) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myMessageToken')}`
        };

        const response = await axios.put(baseUrl + signin.BarberId, signin, { headers: myHeaders });
        return await new Promise(resolve => resolve(response.data));
    }

    function searchBarber(search) {

        return axios.get(`http://localhost:5048/Barber/?q=${search}`)
          .then(response =>
            new Promise((resolve) => resolve(response.data))
          )
          .catch((error) =>
            new Promise((_, reject) => reject(error.response.statusText))
          )
      }

    async function deleteBarber(id) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myMessageToken')}`
        };
        const response = await axios.delete(baseUrl + id, { headers: myHeaders });
        return await new Promise(resolve => resolve(response.data));
    }

    return (
        <UserContext.Provider value={{
            barber,
            getBarber,
            getAllBarber,
            createBarber,
            LogIn,
            updateBarber,
            deleteBarber,
            searchBarber,
            CreateSignIn
        }}>
            { props.children }
        </UserContext.Provider>
    )
}