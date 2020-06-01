import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';


const LoadSpinnerFullPage = () => (
    <Dimmer active page>
        <Loader size='massive' content='Loading' />
    </Dimmer>
)

export default LoadSpinnerFullPage;