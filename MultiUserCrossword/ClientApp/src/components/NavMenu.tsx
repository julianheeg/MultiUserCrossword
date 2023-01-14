//import React, { Component } from 'react';
//import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Nav } from 'reactstrap';
//import { Link } from 'react-router-dom';
//import './NavMenu.css';



//import React from "react";
//import {
//    AppBar,
//    Toolbar,
//    CssBaseline,
//    Typography,
//} from "@mui/material";
//import { Link } from "react-router-dom";
//import './NavMenuNew.css';

////const useStyles = makeStyles((theme: any) => ({
////    navlinks: {
////        marginLeft: theme.spacing(10),
////        display: "flex",
////    },
////    logo: {
////        flexGrow: "1",
////        cursor: "pointer",
////    },
////    link: {
////        textDecoration: "none",
////        color: "white",
////        fontSize: "20px",
////        marginLeft: theme.spacing(20),
////        "&:hover": {
////            color: "yellow",
////            borderBottom: "1px solid white",
////        },
////    },
////}));

//function Navbar() {
//    //const classes = useStyles();

//    return (
//        <AppBar position="static">
//            <CssBaseline />
//            <Toolbar>
//                <Typography variant="h4" className="logo">
//                    Navbar
//                </Typography>
//                <div className="navlinks">
//                    <Link to="/" className="link">
//                        Home
//                    </Link>
//                    <Link to="/crossword" className="link">
//                        Crossword
//                    </Link>
//                </div>
//            </Toolbar>
//        </AppBar>
//    );
//}
//export default Navbar;




import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';

const pages = [
    { route: '/', displayName: 'Home' },
    { route: '/crossword', displayName: 'Crossword' }
];

// adapted from https://codesandbox.io/s/0mtxyj?file=/demo.tsx
function NavMenu() {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Link to={page.route} key={page.route} >
                                <Button sx={{ my: 2, color: 'white', display: 'block' }} >
                                    <Typography textAlign="center">
                                        {page.displayName}
                                    </Typography>
                                </Button>
                            </Link>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavMenu;
