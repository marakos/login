import * as React from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Container
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import {Link} from "react-router-dom";


const useStyles = makeStyles({
    navbarDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
    },
    navDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
    },
    linkText: {
        textDecoration: `none`,
        textTransform: `uppercase`,
        color: `gray`
    }
});

const navLinks = [

    { title: `Register`, path: `/register` },


];

const Header = () => {
    const classes = useStyles();

    return (
        <Container maxWidth={"lg"}>
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Toolbar>
                <Container  maxWidth="md" className={classes.navbarDisplayFlex}>
                    <IconButton  edge="start" size={"medium"} aria-label="home">

                        <Link to="/">
                            Home
                        </Link>
                    </IconButton>

                    <List component="nav" aria-labelledby="main navigation" className={classes.navDisplayFlex}>
                        {navLinks.map(({ title, path }) => (
                            <a href={path} key={title} className={classes.linkText}>
                                <ListItem color={"default"} button>
                                    <ListItemText  primary={title} />
                                </ListItem>
                            </a>
                        ))}
                    </List>
                </Container>
            </Toolbar>
        </AppBar>
        </Container>
    );
};
export default Header;
