import React from 'react'
import { Field, reduxForm } from 'redux-form'


class StreamCreate extends React.Component {


    // we have to pass this input component to component props of Field in render lifecycle method
    // formProps contains all input related information from react-form
    renderInput(formProps) {
        return (            
            <div className="field">
                <label>{formProps.label}</label>
                <input {...formProps.input} />
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
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">                
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>

        );
    }    
}


// to wire up react form with this component we have to do configuration here just like connect from react-redux
// use reduxForm just like connect
// first argument is configuration object, here below we configure form name is streamCreate in redux state
// second argument is React Component wich we want to wire up with react form
export default reduxForm({
    form: 'streamCreate'
})(StreamCreate);