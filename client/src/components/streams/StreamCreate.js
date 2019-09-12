import React from 'react'
import { Field, reduxForm } from 'redux-form'


class StreamCreate extends React.Component {

    // render error message from render input
    // destructure the meta parameter and get error and touched properties out of it
    renderError = ( {error,touched} ) => {
        if(error && touched) {
            return(
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            );
        }
    }

    // we have to pass this input component to component props of Field in render lifecycle method
    // formProps contains all input related information from react-form
    renderInput = (formProps) => {
        const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error' : ''}`
        return (            
            <div className={className}>
                <label>{formProps.label}</label>
                <input {...formProps.input} autoComplete="off" />
                {this.renderError(formProps.meta)}
            </div>                        
            );
    }

    // formValues are the values of Field after submit
    onSubmit(formValues) {
        console.log(formValues);
    }

    render() {
        console.log(this.props);
        return (
            // onSubmit form is handle by redux-form and this callback is registred in the props 
            // we have to pass the normal onSubmit function as callback to this handleSubmitFunction
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">                
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>

        );
    }    
}


// validate function which contains validation for each Field
// which return error object with Field name and error associate with it
const validate = (formValue) => {
    const errors = {};

    // check if title is having content or not if not then attach error message
    if (!formValue.title) {
        // title here is same as the name property in Field componenet
        errors.title ='You must enter title';
    }

    if (!formValue.description) {
        errors.description = 'You must enter description';
    }

    // then this error messages are passdown to the component i.e. here renderInput
    return errors;
}


// to wire up react form with this component we have to do configuration here just like connect from react-redux
// use reduxForm just like connect
// first argument is configuration object, here below we configure form name is streamCreate in redux state
// second argument is React Component wich we want to wire up with react form
export default reduxForm({
    form: 'streamCreate',
    validate: validate
})(StreamCreate);