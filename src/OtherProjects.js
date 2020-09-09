import React from 'react';
import PageHeader from './Components/PageHeader';
import PageFooter from './Components/PageFooter';
//import { Image } from 'react-bootstrap';


class OtherProjects extends React.Component {

    constructor(props) {
      super(props);
      this.state = {

      };
    }

    render() {

        return (
            <div id='OtherProjectsPageContent'>

                <PageHeader id='PageHeader'/>

                <div id='PageBody'>
                </div>

                <PageFooter id='PageFooter' />
            </div>
        );
    }
}

export default OtherProjects;