import React, {useCallback, useState} from 'react';
import {useDispatch} from "react-redux";
import {contactList} from "../store/actions/users";

function UsersSearch() {
    const [value, setValue] = useState('');
    const dispatch = useDispatch();

    const handleChange = useCallback((e) => {
        setValue(e.target.value);
        dispatch(contactList({search: e.target.value}));
    }, [setValue]);

    const handleSearch = useCallback(() => {
        dispatch(contactList({search: value}));
    }, [value]);

    return (
        <div className="card-header">
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Search..."
                    value={value}
                    className="form-control search"
                    onChange={handleChange}
                />
                <div className="input-group-prepend" onClick={handleSearch}>
                    <span className="input-group-text search_btn"><i className="fas fa-search"></i></span>
                </div>
            </div>
        </div>
    );
}

export default UsersSearch;
