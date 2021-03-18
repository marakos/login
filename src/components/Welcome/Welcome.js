import React from 'react';
import {useSelector} from "react-redux";


const Welcome = ({ message }) => {
    const test = useSelector((state) => state.message);

    return (
       <h2>{test}</h2>

    );
}

export default Welcome;