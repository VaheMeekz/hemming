import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from "./Components/Nav";
import {Button, Container} from "react-bootstrap";
import Code from "./Components/HemmingComponent";
import Info from "./Components/info";

function App() {
    const [open, setOpen] = useState(false)
    return (
        <div className="App">
            <Nav/>
            <div className="boxx">

            <Container>
                {
                    open ? <Code/> : <Info/>
                }
                <Container>
                <Button onClick={() => setOpen(!open)}  style={{
                    margin:"10px"
                }} variant="success">
                    {
                        open ?
                            "Վերադառնալ" :
                            "Անցնել առաջ"
                    }
                </Button>
                </Container>
            </Container>
            </div>

        </div>
    );
}

export default App;
