import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const TextAreaFieldGroup = ({
    name,
    placeholder,
    value,
    refInput,
    error,
    info,
    onChange
}) => {
    return (
        <div className="form-group">
            <textarea 
                name={name}
                // Do 'npm install classnames' for  conditionals on 'className'
                className={classnames("form-control form-control-lg", { "is-invalid": error })}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                ref={refInput}
            />
            {info && <small className='form-text text-muted'>{info}</small>}
            {error && <div className='invalid-feedback'>{error}</div>}
        </div>
    )
}

TextAreaFieldGroup.prototype = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func,
    refInput: PropTypes.string
}

export default TextAreaFieldGroup