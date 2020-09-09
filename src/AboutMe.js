import React from 'react';
import PageHeader from './Components/PageHeader';
import PageFooter from './Components/PageFooter';
import { Image } from 'react-bootstrap';
import { Carousel } from 'antd';

class AboutMe extends React.Component {

    constructor(props) {
      super(props);
      this.state = {

      };
    }

    render() {

        return (
            <div id='AboutMePageContent'>

                <PageHeader id='PageHeader'/>

                <div id='PageBody'>
                    <div id='AboutMePageText' style={{ padding: '40px'}}>
                        <h1 style={{ paddingBottom: '20px', fontSize: '2.5vw'}}>
                            <b>About Me</b>
                        </h1>
                        <Image style={{ width: '29%', display: 'inline-block', verticalAlign: 'top'}}
                            src='./images/About_Me_pic.jpg'
                            alt='could not find image'
                        />
                        <div style={{ width: '70%', display: 'inline-block', padding: '10px'}}>
                            <p>
                            My story begins as a bit of a chaotic adventure. I was born in Zoetermeer, Netherlends, to my French mother and
                            Indian father. From there, I moved around quite a bit, to Ireland, France, back to Ireland, and landing in Canada. Within 
                            Canada, I lived in Gatineau, Quebec before finally 
                            settling down in the city of Oshawa, Ontario where I would spend the majority of my adolescent years. 
                            Moving around as a young boy was quite a challenge. I found myself attending 10 different schools before the
                            age of 10. It was an ever-changing environment with different cultures,
                            languages, and people. However, I would not change anything about this experience. It is this experience
                            that enabled me to burst out of my bubble from an early age. I got to break language barriers in learning both
                            French and English fluently, while my family spoke some Hindi at home. I was able to learn from and observe different
                            cultures, from the westernized European and North American cultures, to the South Asian Indian culture. I attended
                            various types of schools, from religious Christian and Catholic schools, to secular public schools. In all,
                            the experience helped shape who I am and helped provide me with a global world view.
                            </p>
                            <p>
                            Throughout my adventure, there are two things that I learned to value the most above all else. First, I learned to value
                            the people. It is the people that make this world a wonderful, exciting, and evolving world. Everything I do,
                            in my life and in my career, is for the these wonderful people. Second, I learned that I should always push myself to improve,
                            since somewhere out there, there are other people also trying their absolute best.
                            </p>
                        </div>
                        <h2 style={{ paddingTop: '10px', fontSize: '2.5vw'}}>
                            Sporting Career
                        </h2>
                        <div style={{ width: '60%', display: 'inline-block', padding: '10px', paddingLeft: '0px'}}>
                            <p>
                            Throughout my life I have always taken an intense interest in sports. Sports are a fun way for me to tap into my inner competitive
                            spirit. To this day, I would say that sports are my greatest destresser and they help keep me focused on my other more
                            academic and technical work. My sporting career began as a young boy in Ireland. It is there that I picked up a passion
                            for Football (European) and became a huge Barcelona fan. I even played traditional Irish sports, such as Hurley and Irish 
                            Football. From there, after moving to Canada, I picked up Tennis in Gatineau. Tennis became my main competitive sport, playing
                            for 10 years competitively before university. Even throughout elementary school I dabbled in various sports such as Track
                            and Volleyball. Once I reached highschool, I decided to pick up Basketball and Ultimate Frisbee. Over the course of my 4 
                            high school years, I played Football, Basketball, and Ultimate Frisbee yearly, earning some school MVPs and one Athlete of the
                            Year award. As I continued to play Tennis outside of school, I also started playing club Ultimate Frisbee. As a junior and adult,
                            my club team went to nationals on multiple occasions. I took this into university and played on the University of Toronto
                            Varsity Ultimate Team (earning Rookie of the Year), where we represented UofT at national competitions.
                            </p>
                        </div>
                        <div style={{ width: '35%', display: 'inline-block', verticalAlign: 'top', paddingLeft: '10px'}}>
                        <Carousel id='AboutMePageCarousel' vertical='true' dotPosition='bottom' autoplay  >
                                <Image fluid
                                    src='./images/placeholder.jpg'
                                    alt='could not find image'
                                />
                            <Image
                                style={{ width: '20%', height: '100%'}}
                                src='./images/blue_sky2.png'
                                alt='could not find image'
                            /> 

                        </Carousel>
                        </div>

                    </div>
                </div>

                <PageFooter id='PageFooter' />
            </div>
        );
    }
}

export default AboutMe;