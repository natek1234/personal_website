import React from 'react';
import PageHeader from './Components/PageHeader';
import PageFooter from './Components/PageFooter';
import { Image } from 'react-bootstrap';
import { Carousel } from 'antd';
import pic from './images/3MluKk2.png';


class Home extends React.Component {

    constructor(props) {
      super(props);
      this.state = {

      };
    }

    render() {

        return (
            <div id='HomePageContent'>

                <PageHeader id='PageHeader'/>

                <div id='PageBody'>

                    <div id='Carousel'>
                        <Carousel id='HomePageCarousel' vertical='true' dotPosition='bottom' autoplay  >
                            <Image fluid style={{ height: window.innerHeight, textAlign: 'center'}}
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            />
                        <div id='test'>
                        </div>
                        </Carousel>
                    </div>

                    <div id='HomePageText'>
                        <h1 style={{ borderBottom: '1px solid #595959', paddingBottom: '20px'}}>
                            <b>Do More. Go Further.</b>
                        </h1>
                        <h4 style={{ textAlign: 'left'}}>
                            The world is an ever-growing ever-changing ecosystem of opportunities and challenges. As an innovator, 
                            it is my goal to go beyond what we consider our current technological boundaries to inspire future generations 
                            in areas such as space exploration, robotics, AI, and machine learning. As an advocate, it is my goal to break the
                            shackles of our society and promote the creation of a new, more equitable world, both as an engineer, and a global
                            citizen.
                        </h4>
                        <blockquote style={{ textAlign: 'left', fontStyle: 'italic', fontSize: '25px', paddingTop: '20px'}}>
                            "Be the change you wish to see in the world"
                        </blockquote>
                        <p style={{ textAlign: 'right', fontSize: '25px'}}>
                            -Mohandas Gandhi
                        </p>
                    </div>
                </div>

                <PageFooter id='PageFooter' />
            </div>
        );
    }
}

export default Home;