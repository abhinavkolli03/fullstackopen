import {React} from 'react'

const Person = ({validPeople}) => {
    return(
        validPeople.map((person, i) =>
            <p key={i}>{person.name} {person.number}</p>)
    )
}

export default Person;