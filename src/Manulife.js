import React from 'react';
import PageHeader from './Components/PageHeader';
import PageFooter from './Components/PageFooter';
import { Image } from 'react-bootstrap';


class Manulife extends React.Component {

    constructor(props) {
      super(props);
      this.state = {

      };
    }

    render() {

        return (
            <div id='ManulifePageContent'>

                <PageHeader id='PageHeader'/>

                <div id='PageBody'>
                    <div id='ManulifePageText' style={{ padding: '40px'}}>
                            <h1 style={{ paddingBottom: '20px', fontSize: '2.5vw'}}>
                                <b>Manulife Co-op - Summer 2020</b>
                            </h1>
                            <div style={{ width: '60%', display: 'inline-block', paddingRight: '10px'}}>
                            <p>
                            <b>Role: </b> Full-stack Software Engineer
                            </p>
                            <p>
                            <b>Job Description: </b> At Manulife, I was working as a full-stack software engineer in the Canadian Architecture division.
                            Mainly, coops would work with architects to create Poof of Technologies (PoTs) to demonstrate innovative and potentially
                            implementable solutions. Specifically, I worked in Security Architecture to help automate their Architecture Risk Analysis
                            report process. I worked as my own development team and created a tool which would act to partially automate the process
                            by leveraging previously entered data as well as compiled research to aid in filling out the repetitive reports.
                            </p>
                            </div>
                            <Image fluid style={{ width: '40%', display: 'inline-block', verticalAlign: 'top'}}
                            src='./images/Manulife_logo.png'
                            alt='could not find image'
                            />
                            <div style={{ width: '60%', display: 'inline-block', paddingRight: '10px'}}>
                            <p>
                            <b>Experience: </b> Over the course of this internship, I had the unique experience of working as my own team and working remotely.
                            This allowed me to take great ownership over my work and demonstrate my ability to be a self-starter. Although it was difficult at
                            times, since I was new to many technologies, my teammates and managers were extremely helpful in sharing their experience.
                            In the end, I ended up leaving behind a tool that both functioned, and accomplished the goal of increasing productivity by automating
                            some of the redundant work from the reports.
                            </p>
                            <p>
                            The tools I used to build this product were a <b> React.js frontend, Node.js + Express.js backend, and an SQLite Database </b>.
                            Many APIs were also used in the process, such as a Word report generator in Docxtemplater. Other notable packages used were
                            Material-UI, React-router, Ajax, Query-string, and Multer.
                            </p>
                            <p>
                            I also had the opportunity to work with other coops in order to participate in the Manulife Tech Challenge. Our goal was to 
                            improve the hiring process. To this end, our team created a Microsoft Flow flow in order to automate and streamline the distribution
                            process of resumes to the hiring committee, as well as the feedback collection process.
                            </p>
                            </div>
                        <Image fluid style={{ width: '40%', display: 'inline-block', verticalAlign: 'top'}}
                        src='./images/Manulife_team.jpg'
                        alt='could not find image'
                        />
                    </div>
                </div>

                <PageFooter id='PageFooter' />
            </div>
        );
    }
}

export default Manulife;