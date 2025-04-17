// Write your code here
import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {eachTeam} = props
  const {id, name, teamImageUrl} = eachTeam
  return (
    <Link to={`/team-matches/${id}`} className="link-container">
      <li className="each-team-container">
        <div>
          <img className="team-image" src={teamImageUrl} alt={name} />
        </div>
        <div>
          <p className="team-name">{name}</p>
        </div>
      </li>
    </Link>
  )
}
export default TeamCard
