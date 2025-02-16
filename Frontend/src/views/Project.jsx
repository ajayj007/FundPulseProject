import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BackProject from '../components/dashboard/BackProject'
import DeleteProject from '../components/dashboard/DeleteProject'
import ProjectBackers from '../components/dashboard/ProjectBackers'
import ProjectDetails from '../components/dashboard/ProjectDetails'
import UpdateProject from '../components/dashboard/UpdateProject'
import { getBackers, loadProject } from '../services/blockchain'
import { useGlobalState } from '../store'

const Project = () => {
  const { id } = useParams()
  const [loaded, setLoaded] = useState(false)
  const [project] = useGlobalState('project')
  const [backers] = useGlobalState('backers')

  useEffect(async () => {
    await loadProject(id)
    await getBackers(id)
    setLoaded(true)
  }, [])
  return loaded ? (
    <>
      <ProjectDetails project={project} />
      <UpdateProject project={project} />
      <DeleteProject project={project} />
      <BackProject project={project} />
      <ProjectBackers backers={backers} />
    </>
  ) : null
}

export default Project
