import Footer from "../component/Footer.jsx";
import Container from "@mui/material/Container";
import * as React from "react";
import Header from "../component/Header.jsx";

const Main = () => {
    return (
        <Container component="main" maxWidth="md">
            <Header/>
            <Footer/>
        </Container>
    )
}

export default Main;
