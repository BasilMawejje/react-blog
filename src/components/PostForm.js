import React from 'react'
import { Field, reduxForm } from 'redux-form'

class PostForm extends React.Component {
    renderError = ({ error, touched }) => {
        if (error && touched) {
            return (
                <div className='ui error message'>
                    <div className='header'>{error}</div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => {
        return (
                <div className='field'>
                    <label>{label}</label>
                    <input {...input} autoComplete='off' />
                    {this.renderError(meta)}
                </div>
            );
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
                <Field name='title' component={this.renderInput} label='Enter title'/>
                <Field name='body' component={this.renderInput} label='Enter description' />
                <button className='ui button primary'>Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    let errors = {};

    if(!formValues.title) {
        errors.title = 'Please enter a title';
    }

    if(!formValues.body) {
        errors.body = 'Please enter a description';
    }
    
    return errors;
}

export default reduxForm({
    form: 'postForm',
    validate
})(PostForm);