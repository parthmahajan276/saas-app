import CompanionCard from "@/components/CompanionCard"
import CompanionList from "@/components/CompanionList"
import CTA from "@/components/CTA"
import { recentSessions } from "@/constants"
const Page = () => {
  return (
    <main>
      <h1>Popular Companions</h1>

      <section className="home-section">
        <CompanionCard
         id= "456"
         name="Wave Particle Duality"
         topic="Quantum Physics"
         subject= "Physics"
         duration={12}
         color="#2563EB"
         />
         <CompanionCard
         id = "789"
        name =" Acid Base Titration"
        topic = "Analytical Chemistry"
        subject = "Chemistry"
         duration = {15}
         color = "#16A34A"
         
         />
          <CompanionCard
           id="123"
           name="Neura the Brain Explorer"
           topic="Neural Network of the Brain"
           subject="science"
           duration={45}
           color="#ffda6e"
          />
      </section>

      <section className="home-section">
          <CompanionList
             title="Recently completed sessions"
             companions={recentSessions}
            classNames="w-2/3 max-lg:w-full"/>
          <CTA/>
      </section>
    </main>
  )
}

export default Page