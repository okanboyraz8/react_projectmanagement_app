import Avatar from "../../components/Avatar"

import { useFirestore } from "../../hooks/useFirestore"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useNavigate } from 'react-router-dom'

export default function ProjectSummary({ project }) {

    const { user } = useAuthContext();
    const navigate = useNavigate()

    const { documentDelete } = useFirestore('projects')

    const handleClick = (e) => {
        documentDelete(project.id)
        navigate('/')
    }

    return (
        <div>
            <div className="project-summary">
                <h2 className="page-title">{project.name}</h2>
                <p>Creator of this project: {project.creator.username}</p>
                <p className="date">
                    Project Completion Date: {project.endDate.toDate().toLocaleString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="details">
                    {project.description}
                </p>
                <h4>Project Users:</h4>
                <div className="project-users">
                    {project.projectUserList.map(k => (
                        <div key={k.id}>
                            <Avatar src={k.photoURL} />
                        </div>
                    ))}
                </div>
                {user.uid === project.creator.id && (
                    <button className="btn" onClick={handleClick}>Complete</button>
                )}
            </div>
        </div>
    )
}