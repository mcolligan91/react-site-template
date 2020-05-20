import React, { Component } from 'react';
import { Search, Button, Grid, Header, Icon, Table, Divider, Pagination } from 'semantic-ui-react';


import './interactive-table-layout.scss';

class InteractiveTableLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageAmount: 20,
            activePage: 1,
            tableData: [] 
        }
    }

    componentDidMount = () => {
        const {tableContent} = this.props;
        this.setState({ tableData: tableContent });
    }

    render() {
        const {pageAmount, activePage, tableData} = this.state;
        const {pageInfo} = this.props;
        
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
                                <Button key={i} className={button.className} icon size='tiny' labelPosition='left' color='teal' onClick={button.clickFunction}>
                                    <Icon name={button.iconName} />
                                    {button.content}
                                </Button>
                            )
                        })}
                    </Grid.Column>
                    <Grid.Column width={8} verticalAlign='bottom'>
                        <Button icon>
                            10
                        </Button>           
                        <Button icon>
                            20
                        </Button>
                        <Button icon>
                            50
                        </Button>
                        <span className='paging-label'>{pageInfo.pagingUnits} / Page</span>
                    </Grid.Column>
                    <Grid.Column width={8} textAlign='right'>
                        <Pagination
                        boundaryRange={0}
                        defaultActivePage={1}
                        siblingRange={1}
                        totalPages={10}
                        />
                    </Grid.Column>
                    <Grid.Column width={16}>
                        <Table selectable striped>
                        <Table.Header>
                                <Table.Row>
                                    {pageInfo.tableInfo.headers.map((columnData, i) => {
                                        return (
                                            <Table.HeaderCell key={i}>{columnData.text}</Table.HeaderCell>
                                        )
                                    })}
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {tableData.map((tableData, i) => {
                                    return (
                                        <Table.Row key={i}>
                                            {pageInfo.tableInfo.cellData.map((data, i) => {
                                                return  (
                                                    <Table.Cell key={i}>{tableData[data.value]}</Table.Cell>
                                                )
                                            })}
                                        </Table.Row>
                                    )
                                })}
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid>
            </Grid.Column>
        )
    }




}

export default InteractiveTableLayout;