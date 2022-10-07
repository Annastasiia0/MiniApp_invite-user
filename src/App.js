import React, { useEffect, useState } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers]=useState([]);
  const [isLoading, setLoading]=useState(true)
  const [searchValue, setSerchValue]=useState('');
  const [invites, setInvites]=useState([]);
  const [success, setSuccess]=useState(false);



useEffect(()=>{
 fetch('https://reqres.in/api/users')
 .then(res => res.json())
 .then(json=> {
 setUsers(json.data)
 }).catch(err => {
  console.warn(err);
  alert('Error fetching users');
}).finally(()=> setLoading(false))
}, []);

const onChangeSearchValue=(event) =>{
  setSerchValue(event.target.value);
}

const onClickInvites = (id)=>{
if(invites.includes(id)) {
  setInvites(prev => prev.filter(_id => _id!==id));
} else {
  setInvites(prev => [...prev, id])
}
}

const onClickSendInvites = () =>{
  setSuccess(true)
}


  return (
    <div className="App">
      {
        success ?  (
        <Success count={invites.length}/> 
        ):(

          <Users
          onClickSendInvites = {onClickSendInvites}
          onChangeSearchValue={onChangeSearchValue} 
          searchValue={searchValue} 
          items={users} 
          isLoading={isLoading}
          invites={invites}
          onClickInvites={onClickInvites}
          />
        )
      }
    </div>
  );
}

export default App;
