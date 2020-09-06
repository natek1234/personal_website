import React from 'react';
import PageHeader from './Components/PageHeader';
import PageFooter from './Components/PageFooter';


class UTATSS extends React.Component {

    constructor(props) {
      super(props);
      this.state = {

      };
    }

    render() {

        return (
            <div id='UTATSSPageContent'>

                <PageHeader id='PageHeader'/>

                <div id='PageBody'>
                    <div id='UTATSSPageText' style={{ padding: '40px'}}>
                            <h1 style={{ paddingBottom: '20px', fontSize: '2.5vw'}}>
                                <b>University of Toronto Aerospace Team (UTAT) Space Systems Division</b>
                            </h1>
                    </div>
                </div>

                <PageFooter id='PageFooter' />
            </div>
        );
    }
}

export default UTATSS;