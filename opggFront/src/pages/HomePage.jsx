import { Link } from "react-router-dom"
import SearchForm from "../components/SearchForm"
import "../styles/HomePage.css"

function HomePage() {
  return (
    <div className="home-page">
      <header className="header">
        <Link to="/" className="logo">
          LEAGUEv0
        </Link>
      </header>

      <main className="main-content">
        <div className="container">
          <h1 className="title">Find Your Summoner</h1>
          <SearchForm />
        </div>
      </main>

      <div className="stars-background">
        <div className="stars-container">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>
      </div>
    </div>
  )
}

export default HomePage

