import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const TextFieldGroup = ({
    name,
    placeholder,
    value,
    refInput,
    label,
    error,
    info,
    type,
    onChange,
    disabled
}) => {
    return (
        <div className="form-group">
            <input 
                name={name}
                type={type}
                // Do 'npm install classnames' for  conditionals on 'className'
                className={classnames("form-control form-control-lg", { "is-invalid": error })}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                ref={refInput}
                disabled={disabled}
            />
            {info && <small className='form-text text-muted'>{info}</small>}
            {error && <div className='invalid-feedback'>{error}</div>}
        </div>
    )
}

TextFieldGroup.prototype = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func,
    refInput: PropTypes.string,
    disabled: PropTypes.string
}

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup