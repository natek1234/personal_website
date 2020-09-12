import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import history from '../history';


class PageHeader extends React.Component {

    constructor(props) {
      super(props);
      this.state = {

      };
    }
    render() {
        return (
            <Navbar style={{ paddingTop: '15px', paddingBottom: '15px'}} bg="dark" expand="lg" variant='dark' id='NavBar'>
            <Image style={{ width: '5%', display: 'inline-block', verticalAlign: 'top'}}
                src='./images/Ketan_logo_blue1.png'
                alt='could not find image'
            />
            <Navbar.Brand onClick={() => history.push('/')}><b style={{ fontSize: '25px', paddingLeft: '5px'}}>Ketan Vasudeva</b></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto" style={{ fontSize: '17px' }}>
                <Nav.Link onClick={() => history.push('/')}>Home</Nav.Link>
                <Nav.Link onClick={() => history.push('/about-me')}>About Me</Nav.Link>
                <NavDropdown title="Experience" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={() => history.push('/tangerine')}>Tangerine</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => history.push('/manulife')}>Manulife</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => history.push('/utat-ss')}>UTAT - Space Systems</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => history.push('/hackathons')}>Hackathons</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => history.push('/programming')}>Programming Projects</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Advocacy & Engagement" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={() => history.push('/mcc')}>High School Multicultural Committee</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => history.push('/ewb')}>Engineers Without Borders Canada</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => history.push('/utat-inclusion')}>UTAT - Inclusion</NavDropdown.Item>
                </NavDropdown>    
                <Nav.Link onClick={() => history.push('/resume')}>Resume</Nav.Link>           
                <Nav.Link onClick={() => history.push('/contact-me')}>Contact Me</Nav.Link>
                </Nav>
                <Form inline >
                <Nav.Link href="https://www.github.com/natek1234" style={{ padding: '0', paddingRight: '5px'}}>
                    <GitHubIcon id='githubLogo' color='action' style={{ fontSize: '40px'}}/>
                </Nav.Link>
                <Nav.Link href="https://www.linkedin.com/in/ketan-vasudeva-2305b7177/" style={{ padding: '0', paddingRight: '5px'}}>
                    <LinkedInIcon id='linkedInLogo' color='primary' style={{ fontSize: '45px'}}/>
                </Nav.Link>

                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-primary">Search</Button>
                </Form>
            </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default PageHeader;