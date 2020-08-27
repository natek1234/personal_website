import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import LinkedInIcon from '@material-ui/icons/LinkedIn';


class PageHeader extends React.Component {

    constructor(props) {
      super(props);
      this.state = {

      };
    }
    render() {
        return (
            <Navbar bg="dark" expand="lg" variant='dark' id='NavBar'>
            <Navbar.Brand href="#home"><b style={{ fontSize: '30px'}}>Ketan Vasudeva</b></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#about-me">About Me</Nav.Link>
                <NavDropdown title="Experience" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#experience/Tangerine">Tangerine</NavDropdown.Item>
                    <NavDropdown.Item href="#experience/Manulife">Manulife</NavDropdown.Item>
                    <NavDropdown.Item href="#experience/UTAT-Space-Systems">UTAT - Space Systems</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Advocacy & Engagement" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#advocacy/MCC">High School Multicultural Committee</NavDropdown.Item>
                    <NavDropdown.Item href="#advocacy/EWB">Engineers Without Borders Canada</NavDropdown.Item>
                    <NavDropdown.Item href="#advocacy/UTAT-Inclusion">UTAT - Inclusion</NavDropdown.Item>
                </NavDropdown>    
                <Nav.Link href="#resume">Resume</Nav.Link>           
                <Nav.Link href="#contact-me">Contact Me</Nav.Link>
                </Nav>
                <Form inline>
                <LinkedInIcon id='linkedInLogo' color='primary' fontSize='large' style={{ paddingRight: '10px', fontSize: '45px'}}/>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-primary">Search</Button>
                </Form>
            </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default PageHeader;