import React from 'react';
import { Navbar, Container, Row, Col, Nav } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import history from '../history'


class PageFooter extends React.Component {

    constructor(props) {
      super(props);
      this.state = {

      };
    }
    render() {
        return (
            <Navbar bg="dark" expand="lg" variant='dark' id='NavBar'>
            <Navbar.Collapse id="basic-navbar-nav">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Container fluid='true'>
                    <Row>
                        <Col style={{ borderRight: '1px solid #595959', padding: '20px'}} >
                            <Navbar.Brand onClick={() => history.push('/')}>
                                <div style={{ textAlign: 'center'}}>
                                <b style={{ fontSize: '30px', color: 'white', margin: 'auto'}}>Ketan </b><br></br>
                                <b style={{ fontSize: '30px', color: 'white'}}>Vasudeva</b>
                                </div>
                                </Navbar.Brand>
                                <Image style={{ width: '100%', display: 'inline-block', verticalAlign: 'top'}}
                                    src='./images/Ketan_logo_blue1.png'
                                    alt='could not find image'
                                />
                        </Col>
                        <Col >
                            <Nav className="flex-column">
                                <Nav.Link eventKey='link-1' onClick={() => history.push('/')} style={{ fontSize: '20px', color: 'white'}}>Home</Nav.Link>
                            </Nav>
                        </Col>
                        <Col>
                            <Nav className="flex-column">
                                <Nav.Link eventKey='link-1' onClick={() => history.push('/about-me')} style={{ fontSize: '20px', color: 'white'}}>About Me</Nav.Link>
                            </Nav>
                        </Col>
                        <Col xs={2}>
                            <Nav className="flex-column">
                                <Nav.Link eventKey='link-1' style={{ fontSize: '20px', color: 'white'}}>Experience</Nav.Link>
                            </Nav>
                            <div style={{ width: '50%', display: 'inline-block' }}>
                            <Nav className='flex-column'>
                                    <Nav.Link eventKey='link-1' onClick={() => history.push('/tangerine')} style={{ fontSize: '15px'}}>Tangerine</Nav.Link>
                                    <Nav.Link eventKey='link-1' onClick={() => history.push('/manulife')} style={{ fontSize: '15px'}}>Manulife</Nav.Link>
                                    <Nav.Link eventKey='link-1' onClick={() => history.push('/utat-ss')} style={{ fontSize: '15px'}}>UTAT - Space Systems</Nav.Link>       
                            </Nav>
                            </div>
                            <div style={{ width: '50%', display: 'inline-block' }}>
                            <Nav className="flex-column">
                                    <Nav.Link eventKey='link-1' onClick={() => history.push('/hackathons')} style={{ fontSize: '15px'}}>Hackathons</Nav.Link>
                                    <Nav.Link eventKey='link-1' onClick={() => history.push('/programming')} style={{ fontSize: '15px'}}>Programming Projects</Nav.Link>        
                            </Nav>
                            </div>
                        </Col>
                        <Col>
                            <Nav className="flex-column">
                                <Nav.Link eventKey='link-1' style={{ fontSize: '20px', color: 'white'}}>Advocacy & Engagement</Nav.Link>
                                <Nav.Link eventKey='link-1' onClick={() => history.push('/mcc')} style={{ fontSize: '15px'}}>High School MCC</Nav.Link>
                                <Nav.Link eventKey='link-1' onClick={() => history.push('/ewb')} style={{ fontSize: '15px'}}>EWB Canada</Nav.Link>
                                <Nav.Link eventKey='link-1' onClick={() => history.push('/utat-inclusion')} style={{ fontSize: '15px'}}>UTAT - Inclusion</Nav.Link>
                            </Nav>
                        </Col>
                        <Col>
                            <Nav className="flex-column">
                                <Nav.Link eventKey='link-1' onClick={() => history.push('/resume')} style={{ fontSize: '20px', color: 'white'}}>Resume</Nav.Link>
                            </Nav>
                        </Col>
                        <Col>
                            <Nav className="flex-column">
                                <Nav.Link eventKey='link-1' onClick={() => history.push('/contact-me')} style={{ fontSize: '20px', color: 'white'}}>Contact Me</Nav.Link>
                            </Nav>
                        </Col>
                        <Col style={{
                           textAlign: 'center'
                        }}>
                            <p style={{ fontSize: '20px', color: 'white', padding: '10px', marginBottom: '0px'}}>Social Media</p>
                            <div style={{ textAlign: 'center'}}>
                                <Nav.Link href="https://www.github.com/natek1234" style={{ padding: '0'}}>
                                    <GitHubIcon id='githubLogo' color='action' style={{ fontSize: '40px'}}/>
                                </Nav.Link>
                                <Nav.Link href='https://www.linkedin.com/in/ketan-vasudeva-2305b7177/' >
                                    <LinkedInIcon id='linkedInLogo' color='primary' style={{ fontSize: '45px'}} /> 
                                </Nav.Link>
 
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