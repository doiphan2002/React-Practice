
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import {fetchAllUser} from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModallAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import ModalConfirm from './ModalConfirm';
import _ from "lodash"
import './TableUser.scss';


const TableUsers = (props) => {

  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPgaes, setTotalPages] = useState(0);
  const [isShowModalAddNew, setIsShowModalAddNew] =  useState(false);
  const [isShowModalEdit, setIsShowModalEdit] =  useState(false);
  const [dataUserEdit, setDtaUserEdit] = useState({})
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataUserDetele, setDtaUserDelete] = useState({});
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] =useState("id");


  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
  }

  const handleUpdateTable = (user) => {
    setListUsers([user,...listUsers])
  }

  const handleEditUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers)
    let index = listUsers.findIndex(item => item.id === user.id);
    cloneListUsers[index].first_name= user.first_name;

  }

  const handleDeleteUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers)
    cloneListUsers = cloneListUsers.filter(item => item.id !== user.id )
    setListUsers(cloneListUsers);
  }

  const handleEditUser = (user) => {
    setDtaUserEdit(user);
    setIsShowModalEdit(true);
  }

  const handleDeleteUser = (user) => {
    setIsShowModalDelete(true);
    setDtaUserDelete(user)
  }
 
  useEffect(() => {
    // call API 
    // dry
    getUsers(1);

  }, [])
  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
   
    if ( res &&res.data) {
      console.log(res)
      setTotalUsers(res.total)
      setListUsers(res.data)
      setTotalPages(res.total_pages)
    }
  }

  const handlePageClick = (event) => {
    console.log("event lib:", event)
    getUsers(+event.selected + 1);
  }

  const hanleSort = (sortBy, sortField) => {
    setSortBy(sortBy); 
    setSortField(sortField);

    let cloneListUsers =  _.cloneDeep(listUsers);
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
    setListUsers(cloneListUsers);
  
  }

  
    return ( 
    <>
    <div className='my-3 add-new'>
          <span><b>List Users:</b></span>
          <button className='btn btn-success' 
          onClick={() => setIsShowModalAddNew(true)} 
          >Add new user</button>
        </div>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>
            <div className='sort-header'>
            <span>ID</span>
            <span>
            <i 
            className='fa-solid fa-arrow-down-long'
            onClick={() => hanleSort("desc", "id")}
            ></i>
            <i 
            className='fa-solid fa-arrow-up-long'
            onClick={() => hanleSort("asc", "id")}></i>
            </span>
            </div>
            
          </th>
          <th>Email</th>
          <th>
          <div  className='sort-header'>
          <span>First_name</span>
            <span>
            <i 
            className='fa-solid fa-arrow-down-long'
            onClick={() => hanleSort("desc", "first_name")}
            ></i>
            <i 
            className='fa-solid fa-arrow-up-long'
            onClick={() => hanleSort("asc", "first_name")}
            ></i>
            </span>
            </div>
            </th>
          <th >Last_name</th>
          <th >Action</th>
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
            <td>
              <button className='btn btn-warning mx-3'
              onClick={() => handleEditUser(item)}
              >Edit</button>
              <button className='btn btn-danger'
              onClick={() => handleDeleteUser(item)}
              >Delete</button>
            </td>
          </tr>

          )
        })
        
        }
       
      </tbody>
    </Table>
     <ReactPaginate
     breakLabel="..."
     nextLabel="next >"
     onPageChange={handlePageClick}
     pageRangeDisplayed={5}
     pageCount={totalPgaes}
     previousLabel="< previous"
     pageClassName='page-item'
     pageLinkClassName='page-link'
     previousClassName='page-item'
     previousLinkClassName='page-link'
     nextClassName='page-item'
     nextLinkClassName='page-link'
     breakClassName='page-item'
     breakLinkClassName='page-link'
     containerClassName='pagination'
     activeClassName='active'
   />
   <ModallAddNew
      show={isShowModalAddNew}
      handleClose={handleClose}
      handleUpdateTable={handleUpdateTable}
      />

      <ModalEditUser 
      show={isShowModalEdit}
      dataUserEdit={dataUserEdit}
      handleClose={handleClose}
      handleEditUserFromModal={handleEditUserFromModal}
      />

    <ModalConfirm
    show={isShowModalDelete}
    handleClose={handleClose}
    dataUserDetele={dataUserDetele}
    handleDeleteUserFromModal={handleDeleteUserFromModal}
    />
   </>
    )

}

export default TableUsers;