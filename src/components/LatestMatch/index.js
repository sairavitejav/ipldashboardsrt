// Write your code here
import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props
  const {
    competingTeam,
    competingTeamLogo,
    date,
    venue,
    result,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    umpires,
  } = latestMatchDetails
  return (
    <div className="latest-match-container">
      <div className="shudule-container">
        <p>{competingTeam}</p>
        <p>{date}</p>
        <p>{venue}</p>
        <p>{result}</p>
      </div>
      <div>
        <img
          className="opponent-logo"
          src={competingTeamLogo}
          alt={`latest match ${competingTeam}`}
        />
      </div>
      <div>
        <p className="result-head">First Innings</p>
        <p className="result-name">{firstInnings}</p>
        <p className="result-head">Second Innings</p>
        <p className="result-name">{secondInnings}</p>
        <p className="result-head">Man Of The Match</p>
        <p className="result-name">{manOfTheMatch}</p>
        <p className="result-head">Umpires</p>
        <p className="result-name">{umpires}</p>
      </div>
    </div>
  )
}
export default LatestMatch
