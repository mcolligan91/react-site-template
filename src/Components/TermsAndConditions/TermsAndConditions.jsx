import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';


const TermsAndConditions = (props) => {
    return (
		<Grid.Column>
			<Grid padded centered>
				<Grid.Column width={12} textAlign='center'>
					<Header as='h2'>Terms And Conditions</Header>
					<Segment placeholder>
						<p>Terms and Conditions Placeholder Content</p>
					</Segment>
				</Grid.Column>
			</Grid>
		</Grid.Column>
    );
}

export default TermsAndConditions;