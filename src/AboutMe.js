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
                            <p style={{ paddingTop: '0', marginTop: '-15px'}}><b>Education: </b> University of Toronto, Engineering Science - Robotics Major</p>
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
                            Goals
                        </h2>
                        <p>
                            As a whole, I consider myself a very ambitious person. I am, and always have been, driven by an innate desire to improve and
                            never settle. Whether it is academically, physically, or socially, I always strive to be the best version of me I can be.
                            This drives me to pursue my ambitions, which are described in more detail below:
                        </p>
                        <p style={{ width: '33%', display: 'inline-block', verticalAlign: 'top', paddingRight: '10px'}}>
                            <b>Academic</b>
                            <ul>
                                <li style={{ paddingBottom: '10px'}}>I hope to pursue graduate studies in a Robotics related field, hopefully at MIT</li>
                                <li style={{ paddingBottom: '10px'}}>I will achieve honors standing in at least 50% of my remaining semesters</li>
                                <li style={{ paddingBottom: '10px'}}>I will graduate earning both a Business and a Psychology minor</li>
                                <li style={{ paddingBottom: '10px'}}>I will read at least 1 personal development book per month</li>
                            </ul>
                        </p>
                        <p style={{ width: '33%', display: 'inline-block', verticalAlign: 'top', paddingRight: '10px'}}>
                            <b>Career</b>
                            <ul>
                                <li style={{ paddingBottom: '10px'}}>I will enter the Robotics R&D field to help develop the next generation of technologies</li>
                                <li style={{ paddingBottom: '10px'}}>I will work for some time in the Space Exploration industry, helping pave the way for humanity to take to the stars</li>
                                <li style={{ paddingBottom: '10px'}}>I will work my jobs, not for the money or security, but because I love to do them. They will help me towards my ultimate goal of helping to advance humanity</li>
                            </ul>
                        </p>
                        <p style={{ width: '33%', display: 'inline-block', verticalAlign: 'top', paddingRight: '10px'}}>
                            <b>Advocacy and Impact</b>
                            <ul>
                                <li style={{ paddingBottom: '10px'}}>I will stay engaged on the advocacy scene, always participating in at least one advocacy initiative at any given time</li>
                                <li style={{ paddingBottom: '10px'}}>I will actively tackle racial, gender, religious, and other injustices in both my personal life, and on the public scene</li>
                                <li style={{ paddingBottom: '10px'}}>Following my quote on the home page, I will be the change I wish to see in the world. I will not only acknowledge what the world can do better, but what I can do better as well</li>
                            </ul>
                        </p>
                        <h2 style={{ fontSize: '2.5vw'}}>
                            Sporting Career
                        </h2>
                        <div style={{ width: '100%', padding: '10px', paddingLeft: '0px'}}>
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
                        <Carousel id='AboutMePageCarousel' vertical='true' dotPosition='bottom' autoplay style={{ margin: 'auto' }}  >
                            <div style={{ height: '625px'}}>    
                            <Image fluid
                                style={{ margin: 'auto' }}
                                src='./images/tennis_pic1.jpg'
                                alt='could not find image'
                            />
                            </div>
                            <div style={{ height: '625px'}}>
                            <Image fluid
                                style={{ margin: 'auto' }}
                                src='./images/ultimate_pic1.jpg'
                                alt='could not find image'
                            /> 
                            </div>
                            <div style={{ height: '625px'}}>
                            <Image fluid
                                style={{ margin: 'auto' }}
                                src='./images/football_pic1.jpg'
                                alt='could not find image'
                            />
                            </div>
                            <div style={{ height: '625px'}}>
                            <Image fluid
                                style={{ margin: 'auto' }}
                                src='./images/basketball_pic1.jpg'
                                alt='could not find image'
                            /> 
                            </div>
                            <div style={{ height: '625px'}}>
                            <Image fluid
                                style={{ margin: 'auto' }}
                                src='./images/ultimate_pic2.jpg'
                                alt='could not find image'
                            /> 
                            </div>
                            <div style={{ height: '625px'}}>
                            <Image fluid
                                style={{ margin: 'auto' }}
                                src='./images/ultimate_pic3.jpg'
                                alt='could not find image'
                            /> 
                            </div>
                            <div style={{ height: '625px'}}>
                            <Image fluid
                                style={{ margin: 'auto' }}
                                src='./images/ultimate_pic4.jpg'
                                alt='could not find image'
                            /> 
                            </div>
                            <div style={{ height: '625px'}}>
                            <Image fluid
                                style={{ margin: 'auto' }}
                                src='./images/ultimate_pic5.jpg'
                                alt='could not find image'
                            /> 
                            </div>
                            <div style={{ height: '625px'}}>
                            <Image fluid
                                style={{ margin: 'auto' }}
                                src='./images/ultimate_pic6.jpg'
                                alt='could not find image'
                            /> 
                            </div>
                            <div style={{ height: '625px'}}>
                            <Image fluid
                                style={{ margin: 'auto' }}
                                src='./images/ultimate_pic7.jpg'
                                alt='could not find image'
                            /> 
                            </div>
                            <div style={{ height: '625px'}}>
                            <Image fluid
                                style={{ margin: 'auto' }}
                                src='./images/ultimate_pic8.jpg'
                                alt='could not find image'
                            />
                            </div>
                            <div style={{ height: '625px'}}>
                            <Image fluid
                                style={{ margin: 'auto' }}
                                src='./images/ultimate_pic9.jpg'
                                alt='could not find image'
                            /> 
                            </div>
                            <div style={{ height: '625px'}}>
                                <Image
                                    style={{ margin: 'auto'}}
                                    src='./images/ultimate_pic10.png'
                                    alt='could not find image'
                                /> 
                            </div>

                        </Carousel>

                    </div>
                </div>

                <PageFooter id='PageFooter' />
            </div>
        );
    }
}

export default AboutMe;