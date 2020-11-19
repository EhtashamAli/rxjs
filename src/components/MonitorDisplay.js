import React from 'react'
import PropTypes from 'prop-types';

const MonitorDisplay = (props) => {
    return (
        <div className="display_container">
            <p className="unit_container">{props.unit}</p>
            <h3 className="value_container"> {props.value === null ? "waiting for emitter" : props.value }</h3>
            <small>{props.title}</small>
        </div>
    )
}

export default MonitorDisplay


MonitorDisplay.propTypes = {
    title: PropTypes.string,
    value: PropTypes.any ,
    unit: PropTypes.string
}