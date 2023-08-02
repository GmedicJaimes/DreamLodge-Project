import Cards from "../../components/Cards/Cards"
import { Footer } from "../../components/Footer/Footer"
import { Navbar } from "../../components/NavBar/NavBar"



export const HomePage: React.FC = () => {
  return (
    <div>
        <h1>homePage</h1>
        <Navbar/>
        <Cards/>
        <Footer/>

    </div>
  )
}
