import React from 'react';
import { Navbar, Container, Row, Col, Nav, Form } from 'react-bootstrap';
import LinkedInIcon from '@material-ui/icons/LinkedIn';


class PageFooter extends React.Component {

    constructor(props) {
      super(props);
      this.state = {

      };
    }
    render() {
        return (
            <Navbar bg="dark" expand="lg" variant='dark' id='NavBar' fixed="bottom">
            <Navbar.Collapse id="basic-navbar-nav">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Container fluid='true'>
                    <Row>
                        <Col style={{ borderRight: '1px solid #595959', padding: '20px'}} >
                            <Navbar.Brand href="#home">
                                <p><b style={{ fontSize: '30px'}}>Ketan<br></br>Vasudeva</b></p>
                                </Navbar.Brand>
                        </Col>
                        <Col>
                            <Nav className="flex-column">
                                <Nav.Link eventKey='link-1' href="#home" style={{ fontSize: '20px', color: 'white'}}>Home</Nav.Link>
                            </Nav>
                        </Col>
                        <Col>
                            <Nav className="flex-column">
                                <Nav.Link eventKey='link-1' href="#about-me" style={{ fontSize: '20px', color: 'white'}}>About Me</Nav.Link>
                            </Nav>
                        </Col>
                        <Col>
                            <Nav className="flex-column">
                                <Nav.Link eventKey='link-1' href="#experience" style={{ fontSize: '20px', color: 'white'}}>Experience</Nav.Link>
                                <Nav.Link eventKey='link-1' href="#experience/Tangerine" style={{ fontSize: '15px'}}>Tangerine</Nav.Link>
                                <Nav.Link eventKey='link-1' href="#experience/Manulife" style={{ fontSize: '15px'}}>Manulife</Nav.Link>
                                <Nav.Link eventKey='link-1' href="#experience/UTAT-Space-Systems" style={{ fontSize: '15px'}}>UTAT - Space Systems</Nav.Link>
                            </Nav>
                        </Col>
                        <Col>
                            <Nav className="flex-column">
                                <Nav.Link eventKey='link-1' href="#advocacy" style={{ fontSize: '20px', color: 'white'}}>Advocacy & Engagement</Nav.Link>
                                <Nav.Link eventKey='link-1' href="#advocacy/MCC" style={{ fontSize: '15px'}}>High School MCC</Nav.Link>
                                <Nav.Link eventKey='link-1' href="#advocacy/EWB" style={{ fontSize: '15px'}}>EWB Canada</Nav.Link>
                                <Nav.Link eventKey='link-1' href="#advocacy/UTAT-Inclusion" style={{ fontSize: '15px'}}>UTAT - Inclusion</Nav.Link>
                            </Nav>
                        </Col>
                        <Col>
                            <Nav className="flex-column">
                                <Nav.Link eventKey='link-1' href="#resume" style={{ fontSize: '20px', color: 'white'}}>Resume</Nav.Link>
                            </Nav>
                        </Col>
                        <Col>
                            <Nav className="flex-column">
                                <Nav.Link eventKey='link-1' href="#contact-me" style={{ fontSize: '20px', color: 'white'}}>Contact Me</Nav.Link>
                            </Nav>
                        </Col>
                        <Col style={{
                            width: '400px'
                        }}>
                            <p style={{ fontSize: '20px', color: 'white', padding: '10px', marginBottom: '0px'}}>Social Media</p>
                            <div style={{ textAlign: 'center'}}>
                                <LinkedInIcon id='linkedInLogo' color='primary' fontSize='large' style={{ fontSize: '45px'}}/>  
                            </div>

                        </Col>
                    </Row>
                </Container>  
            </Navbar.Collapse> 
            </Navbar>
        );
    }
}

export default PageFooter;