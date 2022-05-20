import {React} from 'react'

const SuccessPopup = ({successMessage}) => {
    if (successMessage === null) {
        return null
    }

    const successStyle = {
        color: 'green',
        fontSize: 20,
        background: 'lightgrey',
        borderStyle: 'solid',
        borderRadius: 10, 
        borderColor: 'green',
        borderWidth: 3,
        padding: 10,
        margin: '10px 10px 10px 10px'
    }

    return (
        <div style={successStyle}>
            <strong>{successMessage}</strong>
        </div>
    )
}

export default SuccessPopup;