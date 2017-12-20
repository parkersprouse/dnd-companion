import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';

export default class LoginPage extends Component {
  render() {
    return (
      <OuterContainer>
        <Header />
        <InnerContainer>
          <h1 className="page-title">Login</h1>
          {
            !!this.props.location.state && !!this.props.location.state.next ?
            <Row>
              <Col xs={12} md={6} mdOffset={3}>
                <div className="pt-callout pt-intent-danger form-error-msg">
                  <span className="pt-icon-issue"></span> You must be logged in to view that page
                </div>
              </Col>
            </Row>
            : null
          }
          <LoginForm location={this.props.location} />
          <div className="login-form-extra-links">
            <a href="/register">Need an account?</a> | <a href="/register">Forgot password?</a>
          </div>
        </InnerContainer>
      </OuterContainer>
    );
  }
}
