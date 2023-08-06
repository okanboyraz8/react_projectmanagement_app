import { useState } from 'react'

const filterList = ['All', 'My Projects', 'Desktop', 'Web', 'Mobile']

export default function ProjectFilter({ currentFilter, changeFilter }) {

    //const [currentFilter, setCurrentFilter] = useState('All')

    const handleClick = (newFilter) => {
        changeFilter(newFilter)
    }
    //console.log(currentFilter)

    return (
        <div className="project-filter">
            <nav>
                <p>Filters: </p>
                {filterList.map((f) => (
                    <button key={f}
                        onClick={() => handleClick(f)}
                        className={currentFilter === f ? 'active' : ''}
                    >{f}</button>
                ))}
            </nav>
        </div>
    )
}