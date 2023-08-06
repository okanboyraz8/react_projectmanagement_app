import React from 'react'

import './ProjectList.css'
import Avatar from './Avatar'

import { Link } from 'react-router-dom'


export default function ProjectList({ projects }) {
    return (
        <div className='project-list'>
            {projects.length === 0 && <p>No projects added yet</p>}
            {projects.map(project => (
                <Link to={`/projects/${project.id}`} key={project.id}>
                    <h4>{project.name}</h4>
                    <p>{project.endDate.toDate().toLocaleString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <div className='project-user'>
                        <ul>
                            {project.projectUserList.map(k => (
                                <li key={k.id}>
                                    <Avatar src={k.photoURL} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </Link>
            ))}
        </div>
    )
}