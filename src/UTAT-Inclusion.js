import React from 'react';
import PageHeader from './Components/PageHeader';
import PageFooter from './Components/PageFooter';
import { Image } from 'react-bootstrap';


class UTATInclusion extends React.Component {

    constructor(props) {
      super(props);
      this.state = {

      };
    }

    render() {

        return (
            <div id='UTATInclusionPageContent'>

                <PageHeader id='PageHeader'/>

                <div id='PageBody'>
                    <div id='UTATInclusionPageText' style={{ padding: '40px'}}>
                            <h1 style={{ paddingBottom: '20px', fontSize: '2.5vw'}}>
                                <b>University of Toronto Aerospace Team (UTAT) Space Systems Inclusion Initiative</b>
                            </h1>
                            <Image fluid style={{ width: '12%', display: 'inline-block', verticalAlign: 'top'}}
                            src='./images/UTAT_White_on_Blue_1000x1000.png'
                            alt='could not find image'
                            />
                            <div style={{ width: '85%', display: 'inline-block', paddingLeft: '10px'}}>
                            <p>
                            <b>Role: </b> Chair
                            </p>
                            <p>
                            <b>Experience: </b> The unrest due to global racial tensions in the summer of 2020 struck an emotional chord with many people
                            in our UTAT team, including myself. I found myself unable to work and think straight as more and more details about current and past 
                            injustices against BIPOC and other discriminated groups surfaced. As a lifelong advocate, I felt both enraged and hopeless in the 
                            light of such blatant and continuing discrimination. It is this feeling that led many people on the team to help in creating a space for 
                            Equity, Diversity, and Inclusion (EDI) matters.
                            </p>
                            </div>
                            <div style={{ width: '100%', display: 'inline-block'}}>
                            <p>
                            The goal of the Inclusion movement at UTAT is to promote EDI initiatives both within our own team and within our broader 
                            engineering community. Too often, technical professions such as engineering like to divorce themselves from social issues.
                            We often hear "but we just want to build" so and so, without much thought for the consequences of the design decisions. However,
                            no matter how hard engineers may try to remove themselves, they are still important and influential members in society. Bias will
                            inflitrate our machine learning models and algorithms and design decisions may adversely impact certain communities more harshly.
                            With this in mind, the Inclusion initiative at UTAT seeks to bring forward engineering as a social actor to help fight against injustices
                            in our communities.
                            </p>
                            </div>
                            <div style={{ width: '60%', display: 'inline-block', paddingRight: '10px'}}>
                            <p>
                            Our early work has had promising results. We are working on both improving our team internally and reaching out to our engineering community
                            through speaking with faculty and outreach to students. Many EDI-related conversations have been integrated into our team's recruitment
                            process and documentation is being reviewed to make sure terminology is non-desriminatory and inclusive. We are actively researching how 
                            the admissions process for engineering impacts various communities (such as underserviced communities) and how we can engage a broader, more 
                            multicultural youth prescence in engineering. All of this work is just one small step on a long road, but we hope to keep moving our community 
                            forward, one step at a time.
                            </p>
                        </div>
                        <Image fluid style={{ width: '38%', display: 'inline-block', verticalAlign: 'top'}}
                            src='./images/Inclusion_pic.png'
                            alt='could not find image'
                            />
                    </div>
                </div>

                <PageFooter id='PageFooter' />
            </div>
        );
    }
}

export default UTATInclusion;