import React from 'react';
import defaultLogo from '../../../Assets/images/default_profile_normal.png';

import classes from './UserDetails.module.css';

const userDetails = (props) => {
    return (
        <div className={classes.UserDetails}>
            <img src={props.source == null ? defaultLogo : props.source} alt="user profile" />
        </div>
    );
}

export default userDetails;