import React from 'react';
import PageHeader from './Components/PageHeader';
import PageFooter from './Components/PageFooter';


class Tangerine extends React.Component {

    constructor(props) {
      super(props);
      this.state = {

      };
    }

    render() {

        return (
            <div id='TangerinePageContent'>

                <PageHeader id='PageHeader'/>

                <div id='PageBody'>
                    <div id='TangerinePageText' style={{ padding: '40px'}}>
                            <h1 style={{ paddingBottom: '20px', fontSize: '2.5vw'}}>
                                <b>Tangerine Co-op - Summer 2019</b>
                            </h1>
                    </div>
                </div>

                <PageFooter id='PageFooter' />
            </div>
        );
    }
}

export default Tangerine;