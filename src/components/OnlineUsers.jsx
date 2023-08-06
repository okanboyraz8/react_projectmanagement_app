import './OnlineUsers.css'

import Avatar from './Avatar'

import { useCollection } from '../hooks/useCollection'

//Anlık olarak çevrimiçi görme mantığı:
//useCollection'da kullandığımız işlemler Firebase ile bir "onSnapshot" methodu kullanıyor
//Bu method, Firebase ile bir bağlantı oluşturuyor. Bu açık bir bağlantı. Ve sürekli olarak
//bu belgeler dinleniyor. Herhangi bir değişiklik olduğunda otomatik algılanıyor. Ve uygulamada gösteriliyor.



export default function OnlineUsers() {

  const { isPending, error, documents } = useCollection('users')
  //console.log("documents", documents);

  console.log(documents);
  return (
    <div className="user-list">
      <h2>User List</h2>
      {isPending && <div>Users Loading...</div>}
      {error && <div>{error}</div>}
      {documents && documents.map(k => (
        <div key={k.id} className="user-list-item">
            {k.online && <span className='online-user'></span>}
            <span>{k.username}</span>
            <Avatar src={k.photoURL} />
        </div>
      ))}
    </div>
  )
}