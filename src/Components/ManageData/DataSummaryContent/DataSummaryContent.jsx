import React, { Component } from 'react';
import { Grid, Button, Header, Message, Label, Form } from 'semantic-ui-react';

import ModuleTable from './../../../Shared/ModuleTable/ModuleTable';

import './data-summary-content.scss';

class DataSummaryContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submissionComment: '',
            submissionUploadFile: null,
            cleanUploadFile: null
        }
    }

    handleUploadSubmission = (e) => {
        this.setState({ submissionUploadFile: e.target.files[0].name });
        this.props.handleUploadSubmission(e);
    }

    handleUploadCleanFile = (e) => {
        this.setState({ cleanUploadFile: e.target.files[0].name });
        this.props.handleUploadCleanFile(e);
    }

    handleAddComment = (e) => {
        const {submissionComment} = this.state;
        //post call to server with comment

        //update state with comment based on success response
        this.props.handleAddComment(submissionComment);
        this.setState({ submissionComment: '' });
    }

    handleCommentChange = (e, info) => {
        this.setState({ submissionComment: info.value });
    } 

    render() {
        const {submissionUploadFile, cleanUploadFile, submissionComment} = this.state;
        const {selectedSummary, handleSubmissionTableButtonClick} = this.props;

        //for component ModuleTable, prop tableInfo
        const submissionTableInfo = {
            title: 'Data Submissions',
            hasClickEvents: true,
            headers: [
                    {text: 'Filename'},
                    {text: 'Status'},
                    {text: 'Number of Records'},
                    {text: 'Total Quantity'},
                    {text: 'Notes', props: {textAlign: 'center'}},
                    {text: 'Download', props: {textAlign: 'center'}}
                ],
            cellData: [
                {type: 'text', value: 'fileName'},
                {type: 'text', value: 'status'},
                {type: 'text', value: 'recordsAmount'},
                {type: 'text', value: 'totalQuantity'},
                {type: 'clickItem', iconName: 'sticky note', cellFunction: 'submissionNotes'},
                {type: 'clickItem', iconName: 'cloud download', cellFunction: 'downloadSubmissions'}
            ]
        };

        return (
            <Grid relaxed padded>
                <Grid.Column width={16}>
                    <Header as='h2'>{`${selectedSummary.month} ${selectedSummary.year} Data Summary`}</Header>
                    <Label className='file-upload-container' basic as='label' htmlFor='upload-submission'>
                        <Button className='main-button-color' icon='upload' label={{ content: 'Upload Submission' }} labelPosition='right' />
                        {submissionUploadFile}
                        <input id='upload-submission' hidden type='file' onChange={(e) => this.handleUploadSubmission(e)} />
                    </Label>
                </Grid.Column>
                {selectedSummary.status && selectedSummary.status > 1 && (
                    <>
                        <Grid.Column width={16} className='submission-table-container'>
                            <ModuleTable tableInfo={submissionTableInfo} tableData={selectedSummary.submissionData} handleTableButtonClick={handleSubmissionTableButtonClick} />
                        </Grid.Column>
                        <Grid.Column width={16}>
                            <Message>
                                <Message.Header>
                                    Submission Notes
                                </Message.Header>
                                <Message.List>
                                    {selectedSummary.submissionNotes.map((note, i) => {
                                        return (
                                            <Message.Item key={i}>{note}</Message.Item>
                                        )
                                    })}
                                </Message.List>
                            </Message>
                        </Grid.Column>
                        <Grid.Column width={16}>
                            <Label className='file-upload-container' basic as='label' htmlFor='upload-clean-file'>
                                <Button className='main-button-color' icon='upload' label={{ content: 'Upload Clean File' }} labelPosition='right' />
                                {cleanUploadFile}
                                <input id='upload-clean-file' hidden type='file' onChange={(e) => this.handleUploadCleanFile(e)} />
                            </Label>
                        </Grid.Column>
                        {selectedSummary.status === 3 && (
                            <Grid.Column width={16}>
                                <Message info>
                                    <Message.Header>
                                        Review Notes
                                    </Message.Header>
                                    <Message.List>
                                        {selectedSummary.reviewNotes.map((note, i) => {
                                            return (
                                                <Message.Item key={i}>{note}</Message.Item>
                                            )
                                        })}
                                    </Message.List>
                                </Message>
                            </Grid.Column>
                        )}
                        {selectedSummary.submissionComments.length > 0 && (
                            <Grid.Column width={16}>
                                <Message>
                                    <Message.Header>
                                        Comments
                                    </Message.Header>
                                    <Message.List>
                                    {selectedSummary.submissionComments.map((comment, i) => {
                                            return (
                                                <Message.Item key={i}>{comment}</Message.Item>
                                            )
                                        })}
                                    </Message.List>
                                </Message>
                            </Grid.Column>
                        )}
                        <Grid.Column width={16}>
                            <Form onSubmit={this.handleAddComment}>
                                <Form.TextArea label='Add New Comment' value={submissionComment} onChange={this.handleCommentChange} />
                                <Button className='main-button-color' type='submit' content='Save' />
                            </Form>
                        </Grid.Column>
                    </>
                )}
            </Grid>
        );
    }
}

export default DataSummaryContent;



        