import { useEffect } from 'react'
import AddButton from '../components/dashboard/AddButton'
import CreateProject from '../components/dashboard/CreateProject'
import Hero from '../components/dashboard/Hero'
import Projects from '../components/dashboard/Projects'
import { loadProjects } from '../services/blockchain'
import { useGlobalState } from '../store'

const Home = () => {
  const [projects] = useGlobalState('projects')

  useEffect(() => {
    const fetchProjects = async () => {
      await loadProjects()
    }

    fetchProjects()
  }, [])

  return (
    <>
      <Hero />
      <Projects projects={projects} />
      <CreateProject />
      <AddButton />
    </>
  )
}

export default Home
