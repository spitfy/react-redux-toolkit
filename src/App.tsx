import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {fetchUsers} from "./store/reducers/ActionCreators";
import PostContainer from "./components/PostContainer";
import './App.css';

function App() {
    const {users, isLoading, error} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsers())
    }, []);
    return (
        <div className="App">
            {/*{isLoading ? <h1>Loading</h1> : ''}*/}
            {/*{error ? <h1>{error}</h1> : ''}*/}
            {/*{JSON.stringify(users, null, 4)}*/}
            <PostContainer />
        </div>
    );
}

export default App;
