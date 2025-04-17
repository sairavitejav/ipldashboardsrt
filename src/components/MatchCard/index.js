// Write your code here
import './index.css'

const MatchCard = props => {
  const {eachMatch} = props
  const {competingTeam, competingTeamLogo, matchStatus, result} = eachMatch
  const statClass = matchStatus === 'Won' ? 'won-mat-stat' : 'lost-mat-stat'
  return (
    <li className="match-card-container">
      <img
        className="card-image"
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
      />
      <p className="name">{competingTeam}</p>
      <p className="mat-res">{result}</p>
      <p className={statClass}>{matchStatus}</p>
    </li>
  )
}
export default MatchCard
