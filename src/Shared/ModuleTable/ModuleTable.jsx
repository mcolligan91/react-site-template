import React, { Component } from 'react';
import { Message, Button, Grid, Header, Icon, Menu, Table } from 'semantic-ui-react';

import './module-table.scss'

class ModuleTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {tableInfo, tableData} = this.props;

        return (
            <>
                <Grid.Column>
                    <Header as='h3'>{tableInfo.title}</Header>
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
                                    <Table.Row key={i}>
                                        {tableInfo.cellData.map((data, i) => {
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
            </>
        )
    }
}

export default ModuleTable;