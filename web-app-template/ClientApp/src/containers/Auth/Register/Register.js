import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './Register.module.css';
import * as actions from '../../../store/actions/index';
import { validate } from '../../../shared/utility';

class Register extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                errorMessage: null,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                errorMessage: null,
                touched: false
            },
            confirmPassword: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Confirm password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                errorMessage: null,
                touched: false
            }
        }
    };

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: validate(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };

        if (controlName === 'password' || controlName === 'confirmPassword') {
            if ((controlName === 'password' && updatedControls.confirmPassword.value !== event.target.value)
                || (controlName === 'confirmPassword' && updatedControls.password.value !== event.target.value)) {
                updatedControls.confirmPassword.valid = false;
                updatedControls.confirmPassword.errorMessage = "Passwords must be the same";
            } else {
                updatedControls.confirmPassword.valid = true;
                updatedControls.confirmPassword.errorMessage = null;
            }
        }

        this.setState({ controls: updatedControls });
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onRegister({
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        });
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={formElement.config.valid !== true}
                errorMessage={formElement.config.errorMessage}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                valueType={formElement.config.elementConfig.placeholder}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));

        if (this.props.loading) {
            form = <Spinner />;
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p style={{ color: "red" }}>{this.props.error.message}</p>
            );
        }

        return (
            <div className={classes.Register}>
                {this.props.redirect ? <Redirect to="/auth" /> : null}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button type="Success" disabled={this.state.formIsValid === false}>SUBMIT</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.register.loading,
        error: state.register.error,
        redirect: state.register.success
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (payload) => dispatch(actions.register(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);