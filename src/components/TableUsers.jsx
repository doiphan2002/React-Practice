
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import {fetchAllUser} from '../services/UserService';

const TableUsers = (props) => {

  const [listUsers, setListUsers] = useState([]);
  useEffect(() => {
    // call API 
    // dry
    getUsers();

  }, [])
  const getUsers = async () => {
    let res = await fetchAllUser();
    if ( res && res.data && res.data.data) {
      setListUsers(res.data.data)
    }
  }
   console.log(listUsers);
    return (
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>email</th>
          <th>first_name</th>
          <th>last_name</th>
        </tr>
      </thead>
      <tbody>
        {listUsers &&listUsers.length > 0 &&

        listUsers.map((item, index) => {
          return (
            <tr key={`users-${index}`}>
            <td>{item.id}</td>
            <td>{item.email}</td>
            <td>{item.first_name}</td>
            <td>{item.last_name}</td>
          </tr>

          )
        })
        
        }
       
      </tbody>
    </Table>
    )

}

export default TableUsers;