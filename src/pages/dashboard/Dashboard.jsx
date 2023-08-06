import './Dashboard.css'
import ProjectFilter from './ProjectFilter';
import { useState } from 'react';

//Proje Bilgi Sayfasını oluşturup projeleri burda saklayıp, dashboard'da göstertik!
import ProjectList from '../../components/ProjectList'

//Proje bilgilerine erişmek için: "useCollection"
import { useCollection } from '../../hooks/useCollection'

import { useAuthContext } from '../../hooks/useAuthContext';


export default function Dashboard() {

  const { documents, error } = useCollection('projects');
  const { user } = useAuthContext();

  const [currentFilter, setCurrentFilter] = useState('All')

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }

  const projects = documents ? documents.filter(doc => {
    switch (currentFilter) {
      case 'All':
        return true
      case 'My Projects':
        let myProjects = false
        doc.projectUserList.forEach(k => {
          if (k.id === user.uid) {
            myProjects = true
          }
        })
        return myProjects
      case 'Desktop':
      case 'Web':
      case 'Mobile':
        return doc.category == currentFilter
      default:
        return true
    }
  }) : null

  return (
    <div>
      <h2 className='page-title'>Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {documents && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} />}
      {documents && <ProjectList projects={projects} />}
    </div>
  )
}