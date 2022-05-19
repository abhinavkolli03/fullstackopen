import {React} from 'react'

const Person = ({name, number, handleDelete}) => {
    return(
        <div>
            <p>{name} {number} </p>
            <button onClick={handleDelete}>delete</button>
        </div>
    )
}

export default Person;