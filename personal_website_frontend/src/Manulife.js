import React from 'react';
import PageHeader from './Components/PageHeader';
import PageFooter from './Components/PageFooter';


class Manulife extends React.Component {

    constructor(props) {
      super(props);
      this.state = {

      };
    }

    render() {

        return (
            <div id='ManulifePageContent'>

                <PageHeader id='PageHeader'/>

                <div id='PageBody'>
                    <div id='ManulifePageText' style={{ padding: '40px'}}>
                            <h1 style={{ paddingBottom: '20px', fontSize: '2.5vw'}}>
                                <b>Manulife Co-op - Summer 2020</b>
                            </h1>
                    </div>
                </div>

                <PageFooter id='PageFooter' />
            </div>
        );
    }
}

export default Manulife;