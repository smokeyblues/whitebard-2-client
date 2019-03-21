import React, { Component } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Notes.css";

export default class Notes extends Component {
    constructor(props) {
        super(props);

        this.file = null;

        this.state = {
            note: null,
            content: "",
        };
    }

    async componentDidMount() {
        try {
            const note = await this.getNote();
            const { content } = note;

            this.setState({
                note,
                content,
            });
        } catch (e) {
            alert(e);
        }
    }

    getNote() {
        return API.get("notes", `/notes/${this.props.match.params.id}`);
    }

    validateForm() {
        return this.state.content.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    saveNote(note) {
        return API.put("notes", `/notes/${this.props.match.params.id}`, {
            body: note
        });
    }

    handleSubmit = async event => {

        event.preventDefault();

        this.setState({ isLoading: true });

        try {
            await this.saveNote({
                content: this.state.content,
            });
            this.props.history.push("/");
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }


    deleteNote() {
        return API.del("notes", `/notes/${this.props.match.params.id}`);
    }

    handleDelete = async event => {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this note?"
        );

        if (!confirmed) {
            return;
        }

        this.setState({ isDeleting: true });

        try {
            await this.deleteNote();
            this.props.history.push("/");
        } catch (e) {
            alert(e);
            this.setState({ isDeleting: false });
        }
    }

    render() {
        return (
            <div className="Notes">
                {this.state.note &&
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="content">
                        <FormControl
                            onChange={this.handleChange}
                            value={this.state.content}
                            componentClass="textarea"
                        />
                    </FormGroup>
                    <LoaderButton
                        block
                        bsStyle="primary"
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Save"
                        loadingText="Saving…"
                    />
                    <LoaderButton
                        block
                        bsStyle="danger"
                        bsSize="large"
                        isLoading={this.state.isDeleting}
                        onClick={this.handleDelete}
                        text="Delete"
                        loadingText="Deleting…"
                    />
                </form>}
            </div>
        );
    }
}