import React from 'react';
import PageHeader from './Components/PageHeader';
import PageFooter from './Components/PageFooter';


class Resume extends React.Component {

    constructor(props) {
      super(props);
      this.state = {

      };
    }

    render() {

        return (
            <div id='ResumePageContent'>

                <PageHeader id='PageHeader'/>

                <div id='PageBody'>
                </div>

                <PageFooter id='PageFooter' />
            </div>
        );
    }
}

export default Resume;