import React from 'react';
import PageHeader from './Components/PageHeader';
import PageFooter from './Components/PageFooter';
import { Image } from 'react-bootstrap';


class EWB extends React.Component {

    constructor(props) {
      super(props);
      this.state = {

      };
    }

    render() {

        return (
            <div id='EWBPageContent'>

                <PageHeader id='PageHeader'/>

                <div id='PageBody'>
                <   div id='EWBPageText' style={{ padding: '40px'}}>
                            <h1 style={{ paddingBottom: '20px', fontSize: '2.5vw'}}>
                                <b>Engineers Without Borders (EWB) Canada</b>
                            </h1>
                            <Image fluid style={{ width: '35%', display: 'inline-block', verticalAlign: 'top'}}
                            src='./images/EWB_UofT_Logo.png'
                            alt='could not find image'
                            />
                            <div style={{ width: '65%', display: 'inline-block', paddingLeft: '10px'}}>
                            <p>
                            <b>Team: </b> Policy and Advocacy
                            </p>
                            <p>
                            <b>Experience: </b> Engineers Without Borders (EWB) Canada, UofT chapter was my first experience with a larger nonprofit advocacy
                            organization. I chose to become a member of EWB in my first year of university because it aligned perfectly with the two most important aspects of my life and career:
                            engineering/innovation and advocacy. I spent my time in EWB helping the team advocate for EWB's Hello2030 plans, which consisted largely
                            of getting countries to support the UN's sustainable development goals. Some of these goals involved eradicating poverty and hunger,
                            fighting inequality, promoting education and literacy, and climate action. All of these areas are of great importance to me
                            personally, which made it easy to buy into the team.
                            </p>
                            <p>
                            I had the opportunity to do various outreach projects with the team. In order to support the organization's Hello2030 plan,
                            we canvassed the UofT campus to raise awareness, launched social media campaigns, and met with Members of Parliament (MPs).
                            Particularly, meeting with MPs was a great experience, bringing the message right to the top levels of government. Our work 
                            was not limited to promoting these goals. Over the course of the year I was a member of EWB, we ran many fundraisers to support
                            various communities. One example of this would be our fundraiser selling bracelets to support an indigenous community.
                            </p>
                        </div>
                    </div>
                </div>

                <PageFooter id='PageFooter' />
            </div>
        );
    }
}

export default EWB;