import {React} from 'react'

const PersonForm = (props) => {
    return(
        <div>
            <div>
                name: <input onChange={props.changeName}/>
            </div>
            <div>
                number: <input onChange={props.changeNumber}/>
            </div>
            <div>
                <button type="submit" onClick={props.handleSubmit}>add</button>
            </div>
        </div>
    )
}

export default PersonForm;