import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import MatchStatistics from '../MatchStatistics'
import './index.css'

class TeamMatches extends Component {
  state = {
    bannerDetails: [],
    latestMatchDetails: [],
    recentMatchDetails: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatchesList()
  }

  getTeamMatchesList = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)

    const data = await response.json()
    const teamBannerData = {
      teamBannerUrl: data.team_banner_url,
    }
    const updatedLatestMatch = {
      competingTeam: data.latest_match_details.competing_team,
      competingTeamLogo: data.latest_match_details.competing_team_logo,
      date: data.latest_match_details.date,
      venue: data.latest_match_details.venue,
      result: data.latest_match_details.result,
      firstInnings: data.latest_match_details.first_innings,
      secondInnings: data.latest_match_details.second_innings,
      manOfTheMatch: data.latest_match_details.man_of_the_match,
      umpires: data.latest_match_details.umpires,
      latestMatchStatus: data.latest_match_details.match_status,
    }
    const recentMatchData = data.recent_matches.map(eachMatch => ({
      id: eachMatch.id,
      competingTeam: eachMatch.competing_team,
      competingTeamLogo: eachMatch.competing_team_logo,
      result: eachMatch.result,
      matchStatus: eachMatch.match_status,
    }))
    this.setState({
      bannerDetails: teamBannerData,
      latestMatchDetails: updatedLatestMatch,
      recentMatchDetails: recentMatchData,
      isLoading: false,
    })
  }

  render() {
    const {
      latestMatchDetails,
      recentMatchDetails,
      bannerDetails,
      isLoading,
    } = this.state
    const {teamBannerUrl} = bannerDetails
    const matchStatus = {
      won: 0,
      lost: 0,
      drawn: 0,
    }
    recentMatchDetails.forEach(eachMatch => {
      const status = eachMatch.matchStatus
      if (status === 'Won') {
        matchStatus.won += 1
      } else if (status === 'Lost') {
        matchStatus.lost += 1
      } else {
        matchStatus.drawn += 1
      }
    })

    if (latestMatchDetails.latestMatchStatus === 'Won') {
      matchStatus.won += 1
    } else if (latestMatchDetails.latestMatchStatus === 'Lost') {
      matchStatus.lost += 1
    } else {
      matchStatus.drawn += 1
    }

    const pieChartData = [
      {name: 'Won', status: matchStatus.won},
      {name: 'Lost', status: matchStatus.lost},
      {name: 'Drawn', status: matchStatus.drawn},
    ]

    const {match} = this.props
    const {params} = match
    const {id} = params
    let special
    switch (id) {
      case 'RCB':
        special = 'rcb'
        break
      case 'KKR':
        special = 'kkr'
        break
      case 'KXP':
        special = 'kxp'
        break
      case 'CSK':
        special = 'csk'
        break
      case 'RR':
        special = 'rr'
        break
      case 'MI':
        special = 'mi'
        break
      case 'SH':
        special = 'srh'
        break
      case 'DC':
        special = 'dc'
        break
      default:
        special = ''
        break
    }
    return (
      <div className={`matches-main-container ${special}`}>
        {isLoading ? (
          <div data-testid="loader" className="loader-container">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div>
            <div>
              <Link to="/">
                <button className="back-btn" type="button">
                  Back
                </button>
              </Link>
            </div>
            <img
              className="banner-image"
              src={teamBannerUrl}
              alt="team banner"
            />
            <MatchStatistics pieChartData={pieChartData} />

            <p className="latest">Latest Matches</p>
            <LatestMatch latestMatchDetails={latestMatchDetails} />
            <ul className="match-cards-container">
              {recentMatchDetails.map(eachMatch => (
                <MatchCard eachMatch={eachMatch} key={eachMatch.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}
export default TeamMatches
