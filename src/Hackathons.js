import React from 'react';
import PageHeader from './Components/PageHeader';
import PageFooter from './Components/PageFooter';
import { Image } from 'react-bootstrap';


class Hackathons extends React.Component {

    constructor(props) {
      super(props);
      this.state = {

      };
    }

    render() {

        return (
            <div id='HackathonsPageContent'>

                <PageHeader id='PageHeader'/>

                <div id='PageBody'>
                <div id='AboutMePageText' style={{ padding: '40px'}}>
                    <h1 style={{ paddingBottom: '20px', fontSize: '2.5vw'}}>
                            <b>Hackathons</b>
                    </h1>
                    <p>
                        I have always been excited and enthusiastic in getting involved in technology events such as Hackathons. These have proved
                        to be both great learning and humbling experiences. Below are some examples of Hackathons I have attended.
                    </p>
                    <h2 style={{ fontSize: '2.5vw'}}>
                        NewHacks - Toronto
                    </h2>
                    <Image style={{ width: '18%', display: 'inline-block', verticalAlign: 'top'}}
                        src='./images/NewHacks.png'
                        alt='could not find image'
                    />
                    <div style={{ width: '82%', display: 'inline-block', paddingLeft: '10px'}}>
                        <p>
                        NewHacks, as the name implies, was my first hackathon. It was a hackathon that prioritized giving people their first hackathon
                        experience. I participated in this hackathon in my first year of university. If I'm being honest, I was quite lost and it was very
                        much a crash course in hackathons for me. At that point in my career, I did not yet have much experience with development technologies
                        and so it was a great learning experience. After much debate, our team decided to build an auto-regulation system for diabetic
                        pump injections using machine learning techniques. Although the final product left much to be desired, much was learned in the process.
                        The main challenge with this idea is the fact that the factors leading to diabetic lows and highs is still very much a research field.
                        Without the ability to deduce a variable that helps determine diabetic highs and/or lows (such as blood glucose levels) it becomes
                        very difficult to build a machine learning model. In all, we attempted to research, build, develop a platform for, and create a 
                        presentation for this prototype prediction algorithm.
                        </p>
                    </div>
                    <h2 style={{ fontSize: '2.5vw', paddingTop: '10px'}}>
                        UTDL Designathon - Toronto
                    </h2>
                    <div style={{ width: '70%', display: 'inline-block', paddingRight: '10px'}}>
                        <p>
                        The UTDL Designathon was a bit of a unique concept. It brought together a more multidiscplinary approach to the hackathon format.
                        Notably, rather than building a piece of software, we were building actual physical prototypes for the challenges. The challenge 
                        we took up was to design and create a method for reducing home delivery package theft (such as for online shopping). Our team decided that
                        the most efficient and least invasive method to do so was to design a security box with bluetooth recognition that would only be accessible
                        to the home owner. We used Arduino, CAD, and various motors to produce the security box. My main roles on the team were coding the bluetooth 
                        and motor implementations, as well as physical integration of the prototype in our fabrication facility.
                        </p>
                    </div>
                    <Image style={{ width: '30%', display: 'inline-block', verticalAlign: 'top'}}
                        src='./images/UTDL.jpg'
                        alt='could not find image'
                    />
                    <h2 style={{ fontSize: '2.5vw', paddingTop: '10px'}}>
                        Manulife Security Hackathon - Waterloo
                    </h2>
                    <Image style={{ width: '30%', display: 'inline-block', verticalAlign: 'top'}}
                        src='./images/BurpSuite.png'
                        alt='could not find image'
                    />
                    <div style={{ width: '70%', display: 'inline-block', paddingLeft: '10px'}}>
                        <p>
                            Over the course of my internship at Manulife in the summer of 2020, I had the opportunity to participate in a "Security Hackathon".
                            People in the security space would more commonly know this event as a Capture the Flag event. Essentially, we were provided with
                            a pre-built application which it would be our job to break. The goal was to earn as many points as possible. In order to
                            earn points, a participant had to discover vulnerabilities. As these were discovered, a virtual "flag" would be capture and points
                            would be awarded based on the difficulty level of the vulnerability. In this particular Capture the Flag event, we were provided
                            with the Burp Suite security tool suite in order to monitor and capture web traffic. This proved to be a great learning experience,
                            as I learned more about network security and how to use ethical hacking tools such as Burp Suite.
                        </p>
                    </div>
                </div>
                </div>

                <PageFooter id='PageFooter' />
            </div>
        );
    }
}

export default Hackathons;