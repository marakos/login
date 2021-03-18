import React from 'react';
import {  Button } from '@material-ui/core/';

export const TYPE = {
    LOGIN : "login",
    REGISTER : "register",
}

const ActionButton = ({type, onUpdate, color}) => {


    const renderIcon = (t,l) => {
        if (t === TYPE.LOGIN){
            return <>  Sign In </>
        }
        else if (t === TYPE.REGISTER){
            return <> Register </>
        }
    }

    return (
        <Button variant="contained"  color={color} onClick={onUpdate}> {renderIcon(type)}

        </Button>

    )

}

export default ActionButton;