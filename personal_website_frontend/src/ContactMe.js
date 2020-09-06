import React from 'react';
import PageHeader from './Components/PageHeader';
import PageFooter from './Components/PageFooter';
import ContactMeForm from './Components/ContactMeForm'


class ContactMe extends React.Component {

    constructor(props) {
      super(props);
      this.state = {

      };
    }

    render() {

        return (
            <div id='ContactMePageContent'>

                <PageHeader id='PageHeader'/>

                <div id='PageBody' style={{ padding: '40px', textAlign: 'center'}}>
                    <h1 style={{ fontSize: '2.5vw'}}>
                        <b>Contact Me</b>
                    </h1>
                    
                    <ContactMeForm />
                </div>

                <PageFooter id='PageFooter' />
            </div>
        );
    }
}

export default ContactMe;