import { useState } from "react";
import Avatar from "../../components/Avatar"
import { Timestamp } from 'firebase/firestore'
import moment from "moment";
import 'moment/locale/tr'

//Hangi kullanıcının yorum yaptığı önemli, o halde o kullancıyı yakalamak için:
import { useAuthContext } from '../../hooks/useAuthContext'

//Yorum Ekleme İşlemi için, yani yorum ekleme durumunda güncelleme işlemi:
import { useFirestore } from "../../hooks/useFirestore";

export default function ProjectComments({ project }) {

    const { user } = useAuthContext()
    const [newComment, setNewComment] = useState('')

    const { documentUpdate, response } = useFirestore('projects')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentObject = {
            username: user.displayName,
            photoURL: user.photoURL,
            commentText: newComment,
            date: Timestamp.fromDate(new Date()),
            id: Math.random()
        }
        //console.log(commentObject)

        await documentUpdate(project.id, {
            comments: [...project.comments, commentObject]
        })

        console.log(response);

        if (!response.error) {
            setNewComment('')
        }
    }

    return (
        <div className="project-comments">
            <h4>Project Comments</h4>

            <ul>
                {project.comments.length > 0 && project.comments.map(y => (
                    <li key={y.id}>
                        <div className="comment-author">
                            <Avatar src={y.photoURL} />
                            <p>{y.username}</p>
                        </div>
                        <div className="comment-date">
                            <p>{moment(Date(y.date)).fromNow()}</p>
                        </div>
                        <div className="comment-content">
                            <p>{y.commentText}</p>
                        </div>
                    </li>
                ))}
            </ul>

            <form className="add-comment" onSubmit={handleSubmit}>
                <label>
                    <span>Add New Comment:</span>
                    <textarea
                        required
                        onChange={(e) => setNewComment(e.target.value)}
                        value={newComment}
                    ></textarea>
                </label>
                <button className="btn">Add Comment</button>
            </form>
        </div>
    )
}