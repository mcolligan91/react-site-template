import React, { Component } from 'react';
import { Grid, Icon, Table, Button } from 'semantic-ui-react';

import './module-table.scss'

class ModuleTable extends Component {
    constructor(props) {
        super(props);
    }

    handleItemClick = (e, data) => {
        if (e.target.nodeName === 'I') {
            this.props.handleTableButtonClick(e.target.getAttribute('functionreference'), data);
        }
    }

    render() {
        const {tableInfo, tableData} = this.props;

        return (
            <>
                <Grid.Column>
                    <h3 className='table-header'>{tableInfo.title}</h3>
                    {tableInfo.button ? (
                        <Button content={tableInfo.button.content} icon={tableInfo.button.icon} labelPosition='left' floated='right' />
                    ) : (
                        null
                    )}
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
                            {tableData.map((tableData, i) => {
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
                </Grid.Column>
            </>
        )
    }
}

export default ModuleTable;