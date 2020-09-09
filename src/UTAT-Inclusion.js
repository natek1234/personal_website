import React from 'react';
import PageHeader from './Components/PageHeader';
import PageFooter from './Components/PageFooter';


class UTATInclusion extends React.Component {

    constructor(props) {
      super(props);
      this.state = {

      };
    }

    render() {

        return (
            <div id='UTATInclusionPageContent'>

                <PageHeader id='PageHeader'/>

                <div id='PageBody'>
                    <div id='UTATInclusionPageText' style={{ padding: '40px'}}>
                            <h1 style={{ paddingBottom: '20px', fontSize: '2.5vw'}}>
                                <b>University of Toronto Aerospace Team (UTAT) Space Systems Inclusion Initiative</b>
                            </h1>
                    </div>
                </div>

                <PageFooter id='PageFooter' />
            </div>
        );
    }
}

export default UTATInclusion;