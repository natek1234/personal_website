import React from 'react';
import PageHeader from './Components/PageHeader';
import PageFooter from './Components/PageFooter';

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

                <PageFooter id='PageFooter' />
            </div>
        );
    }
}

export default Home;