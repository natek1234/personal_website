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
                    <iframe src="https://docs.google.com/gview?url=https://github.com/natek1234/Resumes/raw/master/Ketan_Vasudeva_Resume.pdf&embedded=true" style={{ width: '100%', height:'100%'}} frameborder="0" title='myResume'></iframe>
                </div>

                <PageFooter id='PageFooter' />
            </div>
        );
    }
}

export default Resume;