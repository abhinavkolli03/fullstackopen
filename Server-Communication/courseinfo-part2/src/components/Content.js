import {React} from 'react'
import Part from './Part'

const Content = ({parts}) => {
    const total = parts.reduce((sum, current) => sum + current.exercises, 0);

    return(
        <div>
            {parts.map(piece => (
                <Part key={piece.id} name={piece.name} exercises={piece.exercises} />
            ))}
            <p><strong>total of {total} exercises </strong></p>
        </div>
    )
}

export default Content;