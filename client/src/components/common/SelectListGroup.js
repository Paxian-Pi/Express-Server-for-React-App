import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const SelectListGroup = ({
    name,
    value,
    refInput,
    error,
    info,
    onChange,
    options
}) => {
    const selectOptions = options.map(option => (
        <option key={option.label} value={option.value}>{option.label}</option>
    ))
    
    return (
        <div className="form-group">
            <select 
                name={name}
                className={classnames("form-control form-control-lg", { "is-invalid": error })}
                value={value}
                onChange={onChange}
                ref={refInput}
            >
                {selectOptions}
            </select>
            {info && <small className='form-text text-muted'>{info}</small>}
            {error && <div className='invalid-feedback'>{error}</div>}
        </div>
    )
}

SelectListGroup.prototype = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func,
    refInput: PropTypes.string,
    options: PropTypes.array.isRequired
}

export default SelectListGroup