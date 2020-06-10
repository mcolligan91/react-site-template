import React, { Component } from 'react';
import { Search, Button, Grid, Header, Icon, Table, Divider, Pagination, Dimmer, Select, Loader } from 'semantic-ui-react';

import './interactive-table-layout.scss';

class InteractiveTableLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLength: 20,
            tableData: [] 
        }
    }


    /*
	summary: updates tableData state with prop from parent component

	params: none

	returns: none
    */
    componentDidMount = () => {
        const {tableContent} = this.props;

        this.setState({ tableData: tableContent });
    }


    /*
	summary: updates tableData state with prop from parent component after parent api call completes and parent state updates

	params: none

	returns: none
    */
    componentWillReceiveProps = (newProps) => {
        const {tableData} = this.state;

        if (tableData !== []) {
            this.setState({ tableData: newProps.tableContent });
        }
    }


    /*
	summary: updates pageLength state that is used for determining how many table rows are displayed in the main table (10, 20, 50)

	params: none

	returns: none
    */
    handleUpdatePageLength = (option) => {
        this.setState({ pageLength: option });
    }


    /*
	summary: determines if the user has clicked on a button within the table row and will trigger the tableRowClickFunction function in the parent component if they have

	params: e - click event data; data - data from table row

	returns: none
    */
    handleItemClick = (e, data) => {
        if (e.target.nodeName === 'I') {
            this.props.tableRowClickFunction(e.target.getAttribute('functionreference'), data);
        }
    }

    render() {
        const {pageLength, tableData} = this.state;
        const {isLoading, pageInfo} = this.props;

        const pageAmountOptions = [10, 20, 50];

        //pagination not yet configured
        const paginationMenu = (
            <Pagination boundaryRange={0} defaultActivePage={1} siblingRange={1} totalPages={3} size='tiny' />
        );

        const tableRowContent = (
            <>
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
            </>
        );

        const noResultsRow = (
            <>
                <Table.Row>
                    <Table.Cell colSpan={pageInfo.tableInfo.headers.length} textAlign='center'>
                        There are no results to display.
                    </Table.Cell>
                </Table.Row>
            </>
        );

        return (
            <Grid>
                <Grid.Column>
                    <Grid className='interactive-table-container' stackable>
                        <Grid.Column width={16}>
                            <Header as='h2'>{pageInfo.title}</Header>
                            <Divider fitted />
                        </Grid.Column>
                        <Grid.Column largeScreen={6} computer={5} tablet={6}>
                            <Search size='tiny' input={{ fluid: true }} />
                        </Grid.Column>
                        <Grid.Column largeScreen={10} computer={11} tablet={10} verticalAlign='middle'>
                            <Grid stackable doubling>
                                {pageInfo.filters && (
                                    <Grid.Column width={16} textAlign='left' verticalAlign='middle'>
                                        <span className='filter-label-text'>Filter By:</span>
                                        {pageInfo.filters.map((filter, i) => {
                                            return (
                                                <Select key={i} className='table-filter' compact name={filter.name} options={filter.options} defaultValue={filter.defaultValue} onChange={filter.clickFunction} /> 
                                            )
                                        })}
                                    </Grid.Column>
                                )}
                                {pageInfo.headerButtons && (
                                    <>
                                        <Grid.Column only='computer tablet' width={16} textAlign='right' verticalAlign='middle'>
                                            {pageInfo.headerButtons.map((button, i) => {
                                                return (
                                                    <Button key={i} className={`main-button-color ${button.className}`} size='tiny' icon labelPosition='left' onClick={button.clickFunction}>
                                                        <Icon name={button.iconName} />
                                                        {button.content}
                                                    </Button>
                                                )
                                            })}
                                        </Grid.Column>
                                        <Grid.Column only='mobile' width={16} textAlign='center' verticalAlign='middle'>
                                            {pageInfo.headerButtons.map((button, i) => {
                                                return (
                                                    <Button key={i} className={`main-button-color ${button.className}`} icon size='mini' labelPosition='left' onClick={button.clickFunction}>
                                                        <Icon name={button.iconName} />
                                                        {button.content}
                                                    </Button>
                                                )
                                            })}
                                        </Grid.Column>
                                    </>
                                )}
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
                        <Grid.Column width={16} className='interactive-table-layout-table-container'>
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
                                        {tableData && tableData.length > 0 ? (
                                            <>
                                                {tableRowContent}
                                            </>
                                        ) : (
                                            <>
                                                {noResultsRow}
                                            </>
                                        )}
                                    </Table.Body>
                                </Table>
                            </Dimmer.Dimmable>
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
            </Grid>  
        );
    }
}

export default InteractiveTableLayout;