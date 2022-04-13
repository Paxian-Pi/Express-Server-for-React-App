import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const InputGroup = ({
    name,
    placeholder,
    value,
    refInput,
    error,
    icon,
    onChange
}) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={icon} />
                </span>
            </div>
            <input 
                name={name}
                // Do 'npm install classnames' for  conditionals on 'className'
                className={classnames("form-control form-control-lg", { "is-invalid": error })}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                ref={refInput}
            />
            {error && <div className='invalid-feedback'>{error}</div>}
        </div>
    )
}

InputGroup.prototype = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    icon: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    refInput: PropTypes.string
}

InputGroup.defaultProps = {
    type: 'text'
}

export default InputGroup