import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config/index";
import Table from "../components/Table";
import "./DashBoard.css";

const getURL = config.endpoint;
const Home = () => {
    const [User, setUser] = useState([]);
    const [searchText, setsearchText] = useState("");
    const [searchedUser, setSearchedUser] = useState([]);

    // Fetch Users
    const performAPICall = async () => {
        try {
            const getRequestResponse = await axios.get(getURL);
            setUser(
                getRequestResponse.data.map((row) => ({
                    ...row,
                    isChecked: false,
                }))
            );
        } catch (error) {
            console.log(error);
            // setUser([]);
        }
    };

    useEffect(() => {
        performAPICall();
    }, []);

    // console.log(User)

    // The Delete button click
    const handleDeleteClick = (id) => {
        let allUser = [...User];
        allUser = allUser.filter((user) => user.id !== id);
        setUser(allUser);
    };

    const handleBatchDelete = () => {
        let allUser = [...User];
        allUser = allUser.filter((user) => !user.isChecked);
        setUser(allUser);
        //    console.log(allUser);
    };

    const handleSelect = (id) => {
        let allUser = [...User];
        allUser.forEach((user) => {
            if (user.id === id) {
                user.isChecked = !user.isChecked;
            }
        });
        setUser(allUser);
    };

    const handleEdit = (row) => {
        let allUser = [...User];
        allUser = allUser.map((user) => {
            if (user.id === row.id) {
                return Object.assign(user, row);
            }
            return user;
        });
        setUser(allUser);
    };

    useEffect(() => {
        if (searchText.length > 0) {
            setSearchedUser(
                User.filter((user) => {
                    if (
                        user.name
                            .toLowerCase()
                            .includes(searchText.toLowerCase()) ||
                        user.email
                            .toLowerCase()
                            .includes(searchText.toLowerCase()) ||
                        user.role
                            .toLowerCase()
                            .includes(searchText.toLowerCase())
                    )
                        return user;
                })
            );
        } else {
            setSearchedUser(User);
        }
    }, [searchText, User]);

    return (
        <div className="container">
            <div className="search-box-container">
                <input
                    className="search-box"
                    name="search"
                    value={searchText}
                    onChange={(event) => setsearchText(event.target.value)}
                    placeholder="Search by name, email or role"
                />
            </div>

            <div id="table">
                {searchedUser && (
                    <Table
                        user={searchedUser}
                        handleSelect={handleSelect}
                        handleDeleteClick={handleDeleteClick}
                        handleBatchDelete={handleBatchDelete}
                        handleEdit={handleEdit}
                    />
                )}
            </div>
        </div>
    );
};
export default Home;
