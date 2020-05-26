import React, { Component } from 'react';
import { Grid, Icon, Table, Button, Dimmer } from 'semantic-ui-react';

import './module-table.scss'

class ModuleTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            tableContent: []
        }
    }

    componentDidMount = () => {
        const {tableData} = this.props;
        this.setState({ tableContent: tableData, isLoading: tableData.length > 0 ? false : true });
    }

    componentWillReceiveProps(newProps) {
        this.setState({ tableContent: newProps.tableData, isLoading: false });
    }

    handleItemClick = (e, data) => {
        if (e.target.nodeName === 'I') {
            this.props.handleTableButtonClick(e.target.getAttribute('functionreference'), data);
        }
    }

    render() {
        const {tableContent, isLoading} = this.state;
        const {tableInfo, buttonClickFunction} = this.props;

        return (
            <>
                <Grid.Column>
                    <Grid>
                        {tableInfo.title ? (
                            <Grid.Column width={16} className='table-header-container module-table-container-column'>
                            <h3 className={`table-header ${!tableInfo.button ? 'table-header-no-button' : ''}`}>{tableInfo.title}</h3>
                            {tableInfo.button ? (
                                <Button className='main-button-color' content={tableInfo.button.content} icon={tableInfo.button.icon} labelPosition='left' floated='right' onClick={buttonClickFunction} />
                            ) : (
                                null
                            )}
                            </Grid.Column>
                        ) : (
                            null
                        )}
                        <Grid.Column width={16} className='module-table-container-column module-table-contatiner'>
                        <Dimmer.Dimmable className='loading-dimmer-container' blurring dimmed={isLoading}>
                            <Dimmer active={isLoading} />
                            <Table selectable striped>
                                <Table.Header>
                                    <Table.Row>
                                        {tableInfo.headers.map((columnData, i) => {
                                            return (
                                                <Table.HeaderCell key={i} width={columnData.width}>{columnData.text}</Table.HeaderCell>
                                            )
                                        })}
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {tableContent.map((tableData, i) => {
                                        return (
                                            <Table.Row key={i} onClick={tableInfo.hasClickEvents ? (e) => this.handleItemClick(e, tableData) : undefined}>
                                                {tableInfo.cellData.map((data, j) => {
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
            </>
        )
    }
}

export default ModuleTable;