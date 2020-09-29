import React from 'react';
import PageHeader from './Components/PageHeader';
import PageFooter from './Components/PageFooter';
import { Image } from 'react-bootstrap';


class ProgrammingProjects extends React.Component {

    constructor(props) {
      super(props);
      this.state = {

      };
    }

    render() {

        return (
            <div id='ProgrammingProjectsPageContent'>

                <PageHeader id='PageHeader'/>

                <div id='PageBody'>
                <div id='AboutMePageText' style={{ padding: '40px'}}>
                    <h1 style={{ paddingBottom: '20px', fontSize: '2.5vw'}}>
                            <b>Programming Projects</b>
                    </h1>
                    <h2 style={{ fontSize: '2.5vw'}}>
                        Personal Projects
                    </h2>
                    <div style={{ width: '70%', display: 'inline-block', paddingRight: '10px'}}>
                    <p>
                        As I have become more comfortable with my technical knowledge, I have started applying my programming skills to various personal
                        projects. Many of these projects are in the web development space, since that is the area in which I felt I had the greatest amount
                        to learn (and least experience) in terms of programming. 
                    </p>
                    <p>
                        <b>Web Calculator - HTML,JS,CSS: </b> My first attempt at dabbling in web development came with the simple task of creating 
                        a web app for a calculator. Although this is nothing special overall, it was a huge first step for me because it helped teach 
                        me the fundamentals of HTML, JS, and CSS for web development. 
                    </p>
                    <p>
                        <b>Auto Speedtest and Analysis - Python: </b> This project was largely brewed out of frustration with my internet provider.
                        In order to show the poor performance of the provider over time, I decided to create a script/API which would leverage the Ookla
                        Speedtest CLI tool, Matplotlib, and Numpy in order to continuously perform speedtests over time. These speedtests are then
                        graphed on a plot. The supported measured values include download speed, upload speed, latency, and jitter data.
                    </p>
                    </div>
                    <Image style={{ width: '30%', display: 'inline-block', verticalAlign: 'top'}}
                        src='./images/programming.png'
                        alt='could not find image'
                    />
                    <p>
                        <b>This Website - React.js: </b> This website was created out of the cumulation of experience gathered particularly after my
                        internship as a Full-stack Software Engineer at Manulife in the summer of 2020. Although it does not require much back-end 
                        implementation, this can be changed over time as features are added.
                    </p>
                    <h2 style={{ fontSize: '2.5vw'}}>
                        High School
                    </h2>
                    <Image style={{ width: '20%', display: 'inline-block', verticalAlign: 'top'}}
                        src='./images/scratch.png'
                        alt='could not find image'
                    />
                    <div style={{ width: '80%', display: 'inline-block', paddingLeft: '10px'}}>
                    <p>
                        High school is where I got my first real experience with programming. In 10th grade, we began teaching coding principles
                        Scratch, which I highly recommend as a starting point for younger students. We then graduated into Python and I created
                        my first game using Python. Over the course of the next couple years, I learned most of my programming fundamentals in both 
                        Python and Java. I made many projects and games, some of which are described below. I also participated in the Canadian Computing
                        Competition ran by Waterloo. For this, I scored in the top 20% of participants despite dealing with connectivity issues which 
                        forfeited 20% of my time. In all, high school was the starting point for my technical career, and I am very thankful to my
                        high school Computer Science teacher for his role in teaching me the fundamentals. Through his courses, I learned my basic data
                        structures (arrays, linked lists, stacks, queues, etc.) and algorithms (sorting algorithms, greedy algorithms, big-O analysis, etc.).
                    </p>
                    </div>
                    <p>
                        Note: Most, if not all, of the listed projects can be found on my <a href='https://github.com/natek1234'>Github</a>.
                    </p>
                    <p>
                        <b>Projects</b>
                    </p>
                    <p>
                        <b>Jetpack Game - Java: </b> One of my major high school projects involved to create a Mario-themed jetpack-joyride-inspired
                        game. This was my first real experience in visually representing a game on a screen. I learned many of the difficulties of
                        object-oriented programming as well as how to manage a multi-file application. 
                    </p>
                    <p>
                        <b>Topographical Map Path Generator - Java: </b> Another high school project involved the generation of a topographical map from a CSV file.
                        Once the map was generated, I had to design a greedy algorithm that would find the "greedy" optimal path to cross the topographical
                        map area.
                    </p>
                    <p>
                        <b>Paddle Pong Game - Java: </b> Created a basic paddle pong game that plays against the user as a part of my Grade 12 summative assignment.
                        The game has varying difficulty levels and even has an impossible mode.
                    </p>
                    <h2 style={{ fontSize: '2.5vw'}}>
                        University
                    </h2>
                    <p>
                        University helped expand my technical knowledge in a great way. Although my fundamentals were already solid from my great
                        high school experience, I was able to apply coding techniques to many areas. Some areas I was able to use these skills in
                        include simulations, firmware, control systems, FPGAs, and MCUs. I also learned non-object-oriented programming and memory management through C.
                        Although theoretical knowledge is a fundamental asset,
                        nothing can outweigh the benefit of applying the knowledge you gain in practice.
                    </p>
                    <p>
                        <b>Projects</b>
                    </p>
                    <p>
                        <b>Chess Player AI - Python: </b> Our major summative project in first year was to use create a chess player AI algorithm that could play
                        and potentially win against a human. In order to accomplish this task, I implemented a mini-max tree solution which essentially
                        acted to recursively search through possible future moves and grade them based on a scoring system. This task proved to be challenging
                        because although the algorithm can easily be improved and made more intelligent by increasing its "future move" search depth,
                        this in turn drastically increases the runtime of the algorithm. This runtime was constrained by the assignment requirements,
                        thus optimizing the algorithm was also an unspoken secondary task to the assignment. 
                    </p>
                    <div style={{ width: '70%', display: 'inline-block', paddingRight: '10px'}}>
                    <p>
                        <b>Computational Fluid Dynamics Modelling - Python: </b> Another part of a summative assignment in first year involved creating a
                        program that could represent a Fluid Dynamics vector field. The end result of this project was multiple files of visual representations of the vector field
                        as it changed with time.
                    </p>
                    <p>
                        <b>Simulations - Matlab: </b> Many assignments in various classes turned out to be programming simulations in Matlab. 
                        Some of these simulations include modelling a building as it withstands an earthquake and modelling the heat transfer
                        inside a metal rod.
                    </p>
                    <p>
                        <b>PID Control Simulation - Matlab: </b> One particular assignment involved using a rover simulation to create a PID control
                        system that would ensure the rover stays on its straight/desired path. This was my first insight into control systems and I learned
                        quite a lot about both the theory behind them, as well as how to implement them.
                    </p>
                    </div>
                    <Image style={{ width: '30%', display: 'inline-block', verticalAlign: 'top'}}
                        src='./images/pid.jpg'
                        alt='could not find image'
                    />
                </div>
                </div>

                <PageFooter id='PageFooter' />
            </div>
        );
    }
}

export default ProgrammingProjects;