import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';


const PrivacyPolicy = (props) => {
    return (
		<Grid.Column>
			<Grid padded centered>
				<Grid.Column width={12} textAlign='center'>
					<Header as='h2'>Privacy Policy</Header>
					<Segment placeholder>
						<p>Privacy Policy Placeholder Content</p>
					</Segment>
				</Grid.Column>
			</Grid>
		</Grid.Column>
    );
}

export default PrivacyPolicy;