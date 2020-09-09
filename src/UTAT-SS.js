import React from 'react';
import PageHeader from './Components/PageHeader';
import PageFooter from './Components/PageFooter';
import { Image } from 'react-bootstrap';


class UTATSS extends React.Component {

    constructor(props) {
      super(props);
      this.state = {

      };
    }

    render() {

        return (
            <div id='UTATSSPageContent'>

                <PageHeader id='PageHeader'/>

                <div id='PageBody'>
                    <div id='UTATSSPageText' style={{ padding: '40px'}}>
                            <h1 style={{ paddingBottom: '20px', fontSize: '2.5vw'}}>
                                <b>University of Toronto Aerospace Team (UTAT) Space Systems Division</b>
                            </h1>
                            <div style={{ width: '70%', display: 'inline-block', paddingRight: '15px'}}>
                            <p>
                                I have been working with the University of Toronto Aerospace Team (UTAT) Space Systems division since the Spring
                                of 2019. It has been a great educational and overall experience, working with the team towards a tangible goal: putting
                                satellites in space. Upon my arrival to the team, the mission HERON Mk2 was being completed and is slated to be launched
                                in the Spring of 2021. Aboard, it contains a biological payload. It is meant to test the effects of space on a type of 
                                yeast that resides within the human body. With HERON Mk2, UTAT hopes to be the first student team to launch a fully
                                student funded satellite.
                            </p>
                            <p>
                                The new satellite project, FINCH, has been the project I have been more heavily involved with. FINCH's goal is to perform
                                hyperspectral imaging of the Greater Toronto Area (GTA) from orbit. More specifically, the team hopes to capture the concentrations of anthropogenic
                                CO2 in the atmosphere above the GTA. This can hopefully help inform on the locations of high carbon concentrations (carbon sinks), leading
                                to environmental action. Furthermore, UTAT is committed to keeping this mission open source, so that anyone can use and access
                                the acquired data to further their scientific endeavours. 
                            </p>
                            <p>
                                Below you can find the details of my involvement on the team. More details on my advocacy work within UTAT can be found 
                                on the "UTAT-Inclusion" page under Advocacy & Engagement.
                            </p>
                        </div>
                        <Image fluid style={{ width: '28%', display: 'inline-block', verticalAlign: 'top'}}
                        src='./images/UTAT_White_on_Blue_1000x1000.png'
                        alt='could not find image'
                        />
                        <Image fluid style={{ width: '13%', display: 'inline-block', verticalAlign: 'top', paddingBottom: '15px'}}
                        src='./images/MFG_NUCLEO-H7A3ZI-Q.webp'
                        alt='could not find image'
                        />
                        <div style={{ width: '85%', display: 'inline-block', paddingLeft: '15px'}}>
                            <p>
                            <b>Team: </b> Payload-Electronics
                            </p>
                            <p>
                            <b>Description: </b> I am working with the Payload-Electronics team at UTAT SS to select, create, and integrate electronic Components
                            for the mission payload. This includes selecting and researching sensor technologies, microcontrollers (MCUs), memory devices,
                            communication protocols, and other related technologies. Furthermore, I am also involved in the creation/design of printed circuit boards
                            using Altium. These circuit boards will eventually used in the satellite we send to space! In all, working with Pay-Elec has been a great
                            experience which has helped me get a closer look at lower level hardware engineering.
                            </p>
                        </div>
                        <div style={{ width: '75%', display: 'inline-block', paddingRight: '15px'}}>
                            <p>
                            <b>Team: </b> Firmware
                            </p>
                            <p>
                            <b>Description: </b> I am working with the Firmware team at UTAT SS to build the codebase for the satellite. Firmware is an often
                            misunderstood area. It involves the programming of the hardware and drivers that enable the higher level functions of the satellite.
                            As a team, we are working with STM32 model MCUs in order to enable communications via various methods (I2C, SPI, UART/USART
                            CAN/CAN-FD, etc.) and memory devices (SD cards, SDRAM, flash, etc.). Other considerations for Firmware for the FINCH
                            mission include areas such as data compression algorithms and error recovery code.    
                            </p>
                        </div>
                        <Image fluid style={{ width: '22%', display: 'inline-block', verticalAlign: 'top'}}
                        src='./images/firmware_image.jpg'
                        alt='could not find image'
                        />
                        <Image fluid style={{ width: '25%', display: 'inline-block', verticalAlign: '50px'}}
                        src='./images/confluence_logo.png'
                        alt='could not find image'
                        />
                        <div style={{ width: '75%', display: 'inline-block', paddingLeft: '15px'}}>
                            <p>
                            <b>Team: </b> Systems Engineering 
                            </p>
                            <p>
                            <b>Description: </b> Systems Engineering is a higher level team which focuses on the streamlining and improvement of internal
                            processes within the team. As a part of the team, I helped propose and spearhead the deployment of the Confluence documentation
                            software across the Space Systems team. Other areas of work include improvement of onboarding processes and communication channels. 
                            </p>
                        </div>
                    </div>
                </div>

                <PageFooter id='PageFooter' />
            </div>
        );
    }
}

export default UTATSS;