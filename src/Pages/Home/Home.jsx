import ExploreDevelopers from '../../Component/Sections/ExploreDevelopers/ExploreDevelopers'
import ExploreProject from '../../Component/Sections/ExploreProject/ExploreProject'
import Feature from '../../Component/Sections/Feature/Feature'
import Hero from '../../Component/Sections/Hero/Hero'
import SearchProjects from '../../Component/Sections/SearchProjects/SearchProjects'
import Stats from '../../Component/Sections/Stats/Stats'

const Home = () => {
  return (
    <section className='landing'>
        <Hero />
        <Stats />
        <Feature />
        <ExploreDevelopers />
        <ExploreProject />
        <SearchProjects />
    </section>
  )
}

export default Home