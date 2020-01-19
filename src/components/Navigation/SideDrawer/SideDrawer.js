import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxil from '../../../hoc/Auxil/Auxil';

const sideDrawer = (props) => {

    let attachClasses = [classes.SideDrawer, classes.Close];
    if(props.open) {
        attachClasses = [classes.SideDrawer, classes.Open];
    }

    return (

        <Auxil>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Auxil>
    );
};

export default sideDrawer;