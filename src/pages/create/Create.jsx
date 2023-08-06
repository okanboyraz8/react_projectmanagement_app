import './Create.css'
import { useState, useEffect } from 'react'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'

//projectUser kullanmak için bütün kullancıları çağırmak veya erişmek lazım, bu yüzden useCollection kullanmamız lazım
//Döküman üzerinde kullanıcılara ulaşacağız, tıpkı online kullanıclar için verilen yeşil daire işlemlerindeki
//mantık gibi... Yani amaç, useCollection kullanarak dökümanlara erişmek...
import { useCollection } from '../../hooks/useCollection'

//Projeyi kimin oluşturduğuna dair bilgi vermek istiyoruz, o açıdan "user" bilgisine ihtyaç var
import { useAuthContext } from '../../hooks/useAuthContext'

//Yeni projeyi kaydetme işlemi için: useFirestore içindeki "documentAdd" kullanılacak!
//bu methodla bir dispatch yöntemiyle IS_PENDING durumuna geçebiliyoruz. Yani bekleme durumu...
import { useFirestore } from '../../hooks/useFirestore'


export default function Create() {

  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('')
  const [projectUser, setProjectUser] = useState([])
  const [users, setUsers] = useState([])

  const [formError, setFormError] = useState(null)

  const { user } = useAuthContext();

  const { documentAdd, response } = useFirestore('projects');
  const navigate = useNavigate();

  const categories = [
    { value: 'Desktop', label: 'Desktop Software' },
    { value: 'Web', label: 'Web software' },
    { value: 'Mobile', label: 'Mobile Software' },
  ]

  const { documents } = useCollection('users')
  console.log(documents);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("name, details, date, category, projectUser", name, details, date, category, projectUser);

    setFormError(null)

    if (!category) {
      setFormError('Please Select Category')
      return
    }

    if (projectUser.length < 1) {
      setFormError('Please Select User for')
      return
    }

    const creator = {
      username: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    const projectUserList = projectUser.map((k) => {
      return {
        username: k.value.username,
        photoURL: k.value.photoURL,
        id: k.value.id
      }
    })

    const newProject = {
      name: name,
      description: details,
      category: category.value,
      endDate: new Date(date),
      comments: [],
      creator,
      projectUserList
    }

    //console.log("newProject", newProject);

    await documentAdd(newProject);

    if (!response.error) {
      navigate('/')
    }

  }

  useEffect(() => {
    if (documents) {
      const options = documents.map(user => {
        return { value: user, label: user.username }
      })
      setUsers(options)
    }

  }, [documents])

  return (
    <div className='create-form'>
      <h2 className='page-title'>Create New Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project Name:</span>
          <input required type="text" onChange={(e) => setName(e.target.value)} value={name}
          />
        </label>

        <label>
          <span>Project Description:</span>
          <textarea required type="text" onChange={(e) => setDetails(e.target.value)} value={details}
          ></textarea>
        </label>

        <label>
          <span>End Date:</span>
          <input required type="date" onChange={(e) => setDate(e.target.value)} value={date}
          />
        </label>

        <label>
          <span>Categories:</span>
          <Select placeholder="Choose" options={categories} onChange={(option) => setCategory(option)} />
        </label>

        <label>
          <span>Project Users:</span>
          <Select placeholder="Select User for Project" options={users}
            onChange={(option) => setProjectUser(option)} isMulti />
        </label>

        <button className='btn'>Add Project</button>
        {formError && <div className='error'>{formError}</div>}
      </form>
    </div>
  )
}
