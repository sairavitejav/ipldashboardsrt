// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class Home extends Component {
  state = {teamsList: [], isLoading: true}

  componentDidMount() {
    this.getteamsList()
  }

  getteamsList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const teamData = data.teams
    const updatedData = teamData.map(item => ({
      id: item.id,
      name: item.name,
      teamImageUrl: item.team_image_url,
    }))
    this.setState({teamsList: updatedData, isLoading: false})
  }

  render() {
    const {teamsList, isLoading} = this.state
    return (
      <div className="main-container">
        <div className="logo-container">
          <img
            className="logo-image"
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
          />
          <h1 className="main-header">IPL Dashboard</h1>
        </div>

        {isLoading ? (
          <div data-testid="loader" className="loader-container">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <ul className="teams-container">
            {teamsList.map(eachTeam => (
              <TeamCard eachTeam={eachTeam} key={eachTeam.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}
export default Home
