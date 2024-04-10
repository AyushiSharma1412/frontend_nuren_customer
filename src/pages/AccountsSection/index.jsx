import "./accountsSection.css";
import { Header } from "../../components/Header/index.jsx";
import { Sidebar } from "../../components/Sidebar/index.jsx";
import AccountsTable1 from "../../components/AccountsTableContent/Table.jsx";
import { AccountTableContent } from "../../components/AccountsTableContent/index.jsx";
import React, { useState, useEffect } from 'react';
import './AccountForm.jsx';
import { NavLink } from 'react-router-dom';

export const AccountsTable = () => {
  const handleAllCalls1 = (event) => {
    console.log("Filter by: ", event.target.value);
  };

  const handleAction = () => {
    console.log("Action required");
  };

  const handlePlusClick1 = () => {
    console.log("Plus clicked");
  };

  const handleRecords1 = (event) => {
    console.log("Records per page: ", event.target.value);
  };

  return (
    <div className="all_students">
      {/* <div className="container">
        <div className="all_students_inner">
          <div className="all_students_left_box">
            <Sidebar />
          </div>
          <div className="all_students_right_box">
            <Header name="Accounts"/>
            <div className="all_students_right_box_inner">
              <AccountsTable1 />
            </div>
          </div>
        </div>
      </div> */}
      <div className='calls1'>
        <div className="home_left_box1">
          <Sidebar />
        </div>
        <div className="contain1" style={{width:"100%"}}>
          <div className="meet1" >
            <div className="Addcalls1">
              <select className="view-mode-select" onChange={handleAllCalls1}>
                <option value="">All Accounts</option>
                <option value="1">Log in</option>
                <option value="2">Log out</option>
              </select>  
            </div>
            <div className="handle1 ">
              <select onChange={handlePlusClick1} className="view-mode-select">
                <option value="">!!!</option>
                <option value="1">Log in</option>
                <option value="2">Log out</option>
              </select>
              
              <select className="view-mode-select" onChange={handleAction}>
                <option value="">Action</option>
                <option value="1">Log in</option>
                <option value="2">Log out</option>
              </select> 
              <div className="create1">
                <NavLink to="/addaccount" id="btn1"> Create Account</NavLink>
              </div>
            </div>
          </div>
          {/* <div className="records2"style={{width:"100%"}}>
            <select className="pages1" onChange={handleRecords1}>
              <option value="">50 Records per page</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </select>
          </div> */}
          {/* <div className="bugs">
            <div className="filter-container">
              <h2>Filter Accounts by</h2>
              <div className="search-bar">
                <input type="text" placeholder="Search..." />
              </div>
              <div className="dropdown-container">
                <button className="dropdown-button">System Defined Filters</button>
                <div className="dropdown-content">
                  <a href="#">Contacts</a>
                  <a href="#">Deals</a>
                  <a href="#">Deal Amount</a>
                  <a href="#">Deal Stage</a>
                  <a href="#">Deal Owner</a>
                  <a href="#">Deal Closing Date</a>
                  <a href="#">Locked</a>
                </div>
                <button className="dropdown-button">Filter By Fields</button>
                <div className="dropdown-content">
                  <a href="#">Account Name</a>
                  <a href="#">Account Number</a>
                </div>
              </div>
            </div>
            <div className="table1">
              
              <table>
                <thead>
                  <tr>
                    <th>Account Name</th>
                    <th>Phone</th>
                    <th>Website</th>
                    <th>Account Owner</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Creative Business Systems</td>
                    <td>555-555-5555</td>
                    <td><a href="#">www.bentonjohnbjr.com</a></td>
                    <td>Adarsh+Sharma</td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
          </div> */}
          <AccountsTable1/>
        </div>
      </div>
    </div>
  );
};
