import React, { Component } from 'react';
import { Search, Button, Grid, Header, Icon, Table, Divider, Pagination, Dimmer, Select, Loader } from 'semantic-ui-react';

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
        const {tableData} = this.state;
        if (tableData !== []) {
            this.setState({ tableData: newProps.tableContent, isLoading: false });
        }
    }

    handleUpdatePageLength = (option) => {
        this.setState({ pageLength: option });
    }

    handleItemClick = (e, data) => {
        if (e.target.nodeName === 'I') {
            this.props.tableRowClickFunction(e.target.getAttribute('functionreference'), data);
        }
    }

    render() {
        const {pageLength, tableData, isLoading} = this.state;
        const {pageInfo} = this.props;

        const pageAmountOptions = [10, 20, 50];

        //pagination not yet configured
        const paginationMenu = (
            <Pagination boundaryRange={0} defaultActivePage={1} siblingRange={1} totalPages={3} size='tiny' />
        );

        const headerButtons = pageInfo.headerButtons ? (
            <>
                {pageInfo.headerButtons.map((button, i) => {
                    return (
                        <Button key={i} className={`main-button-color ${button.className}`} icon size='tiny' labelPosition='left' onClick={button.clickFunction}>
                            <Icon name={button.iconName} />
                            {button.content}
                        </Button>
                    )
                })}
            </>
        ) : (
            null
        );

        return (
            <Grid>
                <Grid.Column>
                    <Grid className='interactive-table-container' stackable>
                        <Grid.Column width={16}>
                            <Header as='h2'>{pageInfo.title}</Header>
                            <Divider fitted />
                        </Grid.Column>
                        <Grid.Column largeScreen={6} computer={5} tablet={8}>
                            <Search size='tiny' input={{ fluid: true }} />
                        </Grid.Column>
                        <Grid.Column largeScreen={10} computer={11} tablet={8} verticalAlign='middle'>
                            <Grid stackable doubling>
                                {pageInfo.filters ? (
                                    <Grid.Column width={16} textAlign='left' verticalAlign='middle'>
                                        <span className='filter-label-text'>Filter By:</span>
                                        {pageInfo.filters.map((filter, i) => {
                                            return (
                                                <Select key={i} className='table-filter' compact name={filter.name} options={filter.options} defaultValue={filter.defaultValue} onChange={filter.clickFunction} /> 
                                            )
                                        })}
                                    </Grid.Column>
                                ) : (
                                    null
                                )}
                                <Grid.Column width={16} textAlign='right' verticalAlign='middle'>
                                    {headerButtons}
                                </Grid.Column>
                            </Grid>
                        </Grid.Column>
                        <Grid.Column width={8} verticalAlign='bottom'>
                            {pageAmountOptions.map((option, i) => {
                                return (
                                    <Button key={i} icon content={option} className={pageLength !== option ? 'inactive-paging-button' : 'main-button-color'} onClick={() => this.handleUpdatePageLength(option)} />  
                                )
                            })}
                            <span className='paging-label'>{pageInfo.pagingUnits} / Page</span>
                        </Grid.Column>
                        <Grid.Column only='computer tablet' width={8} textAlign='right'>
                            {paginationMenu}
                        </Grid.Column>
                        <Grid.Column only='mobile' width={8} textAlign='left'>
                            {paginationMenu}
                        </Grid.Column>
                        <Grid.Column width={16}>
                            <Dimmer.Dimmable className='loading-dimmer-container' blurring dimmed={isLoading}>
                                <Dimmer active={isLoading}>
                                    <Loader>Loading</Loader>
                                </Dimmer>
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
            </Grid>
            
        )
    }




}

export default InteractiveTableLayout;