import React, { Component } from 'react';
import { InputGroup, NonIdealState } from "@blueprintjs/core";

export default class Login extends Component {
    render() {
        return (
            <NonIdealState
                visual="search"
                title="No search results"
                description={<span>
                    Your search didn't match any files.<br />Try searching for something else.
                </span>}
                action={<InputGroup className="pt-round" leftIconName="search" placeholder="Search..." />}
            />
        );
    }
}
