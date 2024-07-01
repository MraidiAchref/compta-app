import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom'

export default function Header() {
    return(
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
            <Navbar.Brand href="#home">Easy Compta</Navbar.Brand>
                <Nav className="me-auto nav-bar-wrapper">
                    <Link to='/ManualReconsiliationPage'>Rapprochement manuel</Link>
                    <Link >Rapprochement semi auto</Link>

  
                </Nav>
            </Container>
      </Navbar>
    )
    
}