import React, { Component } from 'react';
import { Divider, Button, Grid, Header, Dimmer, Icon, Image } from 'semantic-ui-react';

import './custom-query.scss';

class CustomQuery extends Component {

    render() {
        const {isQueryEdited, handleUpdateGraphs, handleClearFilters} = this.props;

        //using image placeholders instead of real data for now
        const customQueryGraphs = [
            {
                graphs: [
                    {
                        title: 'Year-Over-Year Sales Growth',
                        data: <Image src={require('../../../img/example-chart.JPG')} fluid />
                    },
                    {
                        title: 'Year-Over-Year Market Sales Growth',
                        data: <Image src={require('../../../img/example-chart.JPG')} fluid />
                    }
                ]
            },
            {
                graphs: [
                    {
                        title: 'Market Sales by Product Type',
                        data: <Image src={require('../../../img/example-chart.JPG')} fluid />
                    },
                    {
                        title: 'Estimated Market Sales by Product Type',
                        data: <Image src={require('../../../img/example-chart.JPG')} fluid />
                    }
                ]
            },
            {
                graphs: [
                    {
                        title: 'Market Sales by Customer Segment',
                        data: <Image src={require('../../../img/example-chart.JPG')} fluid />
                    },
                    {
                        title: 'Estimated Market Sales by Customer Segment',
                        data: <Image src={require('../../../img/example-chart.JPG')} fluid />
                    }
                ]
            },
            {
                graphs: [
                    {
                        title: 'Market Sales by Geographic Region',
                        data: <Image src={require('../../../img/example-chart.JPG')} fluid />
                    },
                    {
                        title: 'Estimated Market Sales by Geographic Region',
                        data: <Image src={require('../../../img/example-chart.JPG')} fluid />
                    }
                ]
            }
        ];

        return (
            <>
                <Grid className='custom-query-content-container'>
                    <Grid.Column textAlign='right' width={16}>
                        {isQueryEdited && (
                            <Button className='inner-button' size='small' icon='undo' labelPosition='left' content='Clear All Filters' onClick={handleClearFilters} />
                        )}
                        <Button className='main-button-color' size='small' icon='save' labelPosition='left' content='Save Search' />
                        <Divider />
                    </Grid.Column>
                    <Grid.Column width={16}>
                        <Dimmer.Dimmable blurring dimmed={isQueryEdited}>
                            <Dimmer className='custom-query-dimmer' inverted verticalAlign='top' active={isQueryEdited}>
                                <Grid centered>
                                    <Grid.Column width={8}>
                                        <Header as='h3'>You have changed the filter inputs so that they no longer match the graphs. Click <span className='dimmer-clear-graphs-text main-button-color' onClick={handleClearFilters}>here</span> to undo your changes.</Header>
                                        <Button className='main-button-color' fluid onClick={handleUpdateGraphs}>
                                            <Icon name='chart bar' />
                                            Update Graphs
                                        </Button>
                                    </Grid.Column>
                                </Grid>
                            </Dimmer>
                            <Grid stackable doubling padded relaxed>
                                {customQueryGraphs.map((row, i) => {
                                    return (
                                        <Grid.Row key={i}>
                                            {row.graphs.map((graph, j) => {
                                                return (
                                                    <Grid.Column key={j} width={8} textAlign='center'>
                                                        <Header as='h3'>{graph.title}</Header>
                                                        {graph.data}
                                                    </Grid.Column>
                                                )
                                            })}
                                        </Grid.Row>
                                    )
                                })}
                            </Grid>
                        </Dimmer.Dimmable>
                    </Grid.Column>
                </Grid>
            </>
        );
    }
}

export default CustomQuery;

                        