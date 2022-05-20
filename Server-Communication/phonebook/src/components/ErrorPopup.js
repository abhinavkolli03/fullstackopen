import {React} from 'react'

const ErrorPopup = ({errorMessage}) => {
    if(errorMessage === null) {
        return null
    }

    const errorStyle = {
        color: 'red',
        fontSize: 20,
        background: 'lightgrey',
        borderStyle: 'solid',
        borderRadius: 10, 
        borderColor: 'red',
        borderWidth: 3,
        padding: 10,
        margin: '10px 10px 10px 10px'
    }

    return(
        <div style={errorStyle}>
            <strong>{errorMessage}</strong>
        </div>
    )
}

export default ErrorPopup;