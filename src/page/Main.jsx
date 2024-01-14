import Footer from "../component/Footer.jsx";
import Container from "@mui/material/Container";
import * as React from "react";
import Header from "../component/Header.jsx";
import Body from "../component/Body.jsx";

const Main = () => {
    return (
        <Container component="main" maxWidth="sm">
            <Header/>
            <Body/>
            <Footer/>
        </Container>
    )
}

export default Main;
