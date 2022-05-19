import React from 'react';
import {Container, Navbar} from "react-bootstrap";
import logo from "./hhhh.svg"
const Nav = () => {
    return (
        <div>
            <Navbar bg="dark">
                <Container>
                    <Navbar.Brand>
                        <div className="d-flex">

                        <img src={logo} alt="logo" style={{
                            width:"50px",
                            height:"30px"
                        }}/>
                        <h2 style={{
                            color:"white"
                        }}>emming</h2>
                        </div>

                    </Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    );
};

export default Nav;