import React, { Component } from 'react';
import { Search, Button, Grid, Header, Icon, Table, Divider, Pagination, Dimmer } from 'semantic-ui-react';

import './interactive-table-layout.scss';

class InteractiveTableLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            pageLength: 20,
            tableData: [] 
        }
    }

    componentDidMount = () => {
        const {tableContent} = this.props;

        this.setState({ tableData: tableContent, isLoading: tableContent.length > 0 ? false : true });
    }

    componentWillReceiveProps(newProps) {
        this.setState({ tableData: newProps.tableContent, isLoading: false });
    }

    handleUpdatePageLength = (option) => {
        this.setState({ pageLength: option });
    }

    handleItemClick = (e, data) => {
        if (e.target.nodeName === 'I') {
            this.props.handleTableButtonClick(e.target.getAttribute('functionreference'), data);
        }
    }

    render() {
        const {pageLength, tableData, isLoading} = this.state;
        const {pageInfo} = this.props;

        const pageAmountOptions = [10, 20, 50];

        //pagination not configured
        
        return (
            <Grid.Column>
                <Grid stackable style={{ padding: '15px' }}>
                    <Grid.Column width={16}>
                        <Header as='h2'>{pageInfo.title}</Header>
                        <Divider fitted />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Search size='tiny' input={{ fluid: true }} />
                    </Grid.Column>
                    <Grid.Column width={10} textAlign='right' verticalAlign='middle'>
                        {pageInfo.headerButtons.map((button, i) => {
                            return (
                                <Button key={i} className={`main-button-color ${button.className}`} icon size='tiny' labelPosition='left' onClick={button.clickFunction}>
                                    <Icon name={button.iconName} />
                                    {button.content}
                                </Button>
                            )
                        })}
                    </Grid.Column>
                    <Grid.Column width={8} verticalAlign='bottom'>
                        {pageAmountOptions.map((option, i) => {
                            return (
                                <Button key={i} icon content={option} className={pageLength !== option ? 'inactive-paging-button' : 'main-button-color'} onClick={() => this.handleUpdatePageLength(option)} />  
                            )
                        })}
                        <span className='paging-label'>{pageInfo.pagingUnits} / Page</span>
                    </Grid.Column>
                    <Grid.Column width={8} textAlign='right'>
                        <Pagination
                        boundaryRange={0}
                        defaultActivePage={1}
                        siblingRange={1}
                        totalPages={3}
                        />
                    </Grid.Column>
                    <Grid.Column width={16}>
                        <Dimmer.Dimmable className='loading-dimmer-container' blurring dimmed={isLoading}>
                            <Dimmer active={isLoading} />
                            <Table selectable striped fixed>
                                <Table.Header>
                                    <Table.Row>
                                        {pageInfo.tableInfo.headers.map((columnData, i) => {
                                            return (
                                                <Table.HeaderCell key={i} {...columnData.props}>{columnData.text}</Table.HeaderCell>
                                            )
                                        })}
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {tableData.map((tableData, i) => {
                                        return (
                                            <Table.Row key={i} onClick={pageInfo.tableInfo.hasClickEvents ? (e) => this.handleItemClick(e, tableData) : undefined}>
                                                {pageInfo.tableInfo.cellData.map((data, j) => {
                                                    return data.type === 'text' ? (
                                                        <Table.Cell key={j}>{tableData[data.value]}</Table.Cell>
                                                    ) : data.type === 'clickItem' ? (
                                                        <Table.Cell key={j} textAlign='center' verticalAlign='middle'><Icon className='table-row-icon-button' name={data.iconName} functionreference={data.cellFunction}/></Table.Cell>
                                                    ) : (
                                                        null
                                                    )
                                                })}
                                            </Table.Row>
                                        )
                                    })}
                                </Table.Body>
                            </Table>
                        </Dimmer.Dimmable>
                    </Grid.Column>
                </Grid>
            </Grid.Column>
        )
    }




}

export default InteractiveTableLayout;