import React from 'react';
import PageHeader from './Components/PageHeader';
import PageFooter from './Components/PageFooter';
import { Image } from 'react-bootstrap';


class Tangerine extends React.Component {

    constructor(props) {
      super(props);
      this.state = {

      };
    }

    render() {

        return (
            <div id='TangerinePageContent'>

                <PageHeader id='PageHeader'/>

                <div id='PageBody'>
                    <div id='TangerinePageText' style={{ padding: '40px'}}>
                        <h1 style={{ paddingBottom: '20px', fontSize: '2.5vw'}}>
                            <b>Tangerine Co-op - Summer 2019</b>
                        </h1>
                        <div style={{ width: '50%', display: 'inline-block', paddingRight: '10px'}}>
                            <p>
                            <b>Role: </b> Project Management Office (PMO) Associate
                            </p>
                            <p>
                            <b>Job Description: </b> At Tangerine, I was working as an intern in the Project Management Office, helping to manage and 
                            organize development projects across the company. This included acting as a communication link between the PMO and the squads,
                            helping with the project financials, and preparing reports and presentations on the Agile transformation process at Tangerine.
                            </p>
                            <p>
                            <b>Experience: </b> My experience at Tangerine was a largely positive one. It was my first real internship after my first year of
                            university. I learned the way to act and communicate in a professional company environment. Although the job was largely non-technical,
                            I did have the opportunity to speak with most of the developers on the squads I was helping. From here I had some very interesting conversations
                            about machine learning applications and mathematics, as well as my first introduction to how development works.    
                            </p>
                        </div>
                        <Image fluid style={{ width: '50%', display: 'inline-block', verticalAlign: 'top'}}
                        src='./images/Tangerine_Danny_Green.jpg'
                        alt='could not find image'
                        />
                    </div>
                </div>

                <PageFooter id='PageFooter' />
            </div>
        );
    }
}

export default Tangerine;