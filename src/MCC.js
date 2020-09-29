import React from 'react';
import PageHeader from './Components/PageHeader';
import PageFooter from './Components/PageFooter';
import { Image } from 'react-bootstrap';

class MCC extends React.Component {

    constructor(props) {
      super(props);
      this.state = {

      };
    }

    render() {

        return (
            <div id='MCCPageContent'>

                <PageHeader id='PageHeader'/>

                <div id='PageBody'>
                    <div id='MCCPageText' style={{ padding: '40px'}}>
                            <h1 style={{ paddingBottom: '20px', fontSize: '2.5vw'}}>
                                <b>High School Multicultural Committee (MCC)</b>
                            </h1>
                            <div style={{ width: '100%', display: 'inline-block'}}>
                            <p>
                            <b>Role: </b> Co-founder
                            </p>
                            <p>
                            <b>Experience: </b> In high school, a group of students and I discovered that there was a huge underrepresentation of 
                            minority communities. We often found ourselves wondering "why does no one celebrate our cultures?" or "why does no 
                            one care about our problems?". Our solution to this was to create the school's first Multicultural Committee. The committee's
                            job would be to bring together the school community in celebrating, supporting, and advocating for people of
                            all cultures and ethnic background. Very quickly, our dream turned to reality.
                            </p>
                            </div>
                            <div style={{ width: '55%', display: 'inline-block', paddingRight: '10px'}}>
                            <p>
                            MCC had a huge uptake in popularity from the very first year. We ran many samosa days, henna art events, and fundraisers for
                            communities in need. We immediately had representation from almost every possible minority, and we began immediately working
                            to acknowledge international celebrations and holidays on our school announcements. In our second year, we debuted two events 
                            that would leave a lasting impact and remain to this day. Our first event was called "Taste of the Nations" and was a buffet
                            style event where members of our team would ask their families of different backgrounds to prepare a dish. These dishes were
                            organized into a buffet for the student body consumption. Our second event was our "MCC Talent Show", which consisted of gathering
                            various talents and traditions from the ethnic backgrounds in our team, and turning it into a talent show for the students. This
                            was by far the most ambitious event and took the whole year to prepare. In all, both these events gave and continue to give
                            students a taste and experience of cultures and ethnic backgrounds they never had the chance to experience before. It also continues to provide
                            a venue for students to celebrate their cultures and backgrounds.
                            </p>
                        </div>
                        <Image fluid style={{ width: '45%', display: 'inline-block', verticalAlign: 'top'}}
                            src='./images/MCC_Image.jpg'
                            alt='could not find image'
                            />
                    </div>
                </div>

                <PageFooter id='PageFooter' />
            </div>
        );
    }
}

export default MCC;