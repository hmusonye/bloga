import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class PostsNew extends Component {
    renderField(field) {
        const { meta: { touched, error} } = field;
        const ClassName = `form-group ${ touched && error ? 'has-danger' :'' }`;

        return (
            <div className={ClassName}>
                <label>{ field.label }</label>
                <input
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    { touched ? error : '' }
                </div>
            </div>
        )
    }

    onSubmit (values) {
        console.log(values);
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            // .bind to allow us control over this == component 
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                <Field 
                    label="Title"
                    name="title"
                    component={this.renderField}
                />

                <Field
                    label="Categories"                
                    name="categories"
                    component={this.renderField}
                />

                <Field 
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    // validate inputs from values object
    if ( !values.title ) {
        errors.title = "Enter a title";
    }

    if ( !values.categories ) {
        errors.categories = "Enter some categories please";
    }

    if ( !values.content ) {
        errors.content = "Enter some content please";
    }

    // if errors empty, the form is fine to submit
    // if errors has any properties, redux form assumes the form invalid 
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
}) (PostsNew);