import {PieChart, Pie, Cell, Legend} from 'recharts'
import './index.css'

const MatchStatistics = props => {
  const {pieChartData} = props

  return (
    <div className="chart-container">
      <PieChart height={500} width={500}>
        <Pie
          data={pieChartData}
          dataKey="status"
          cx="50%"
          cy="50%"
          outerRadius={200}
        >
          <Cell name="Won" fill="#18541b" />
          <Cell name="Lost" fill="red" />
          <Cell name="Drawn" fill="yellow" />
        </Pie>
        <Legend
          layout="horizontal"
          verticalAlign="top"
          align="center"
          iconType="circle"
          wrapperStyle={{fontSize: 30, fontFamily: 'Roboto'}}
        />
      </PieChart>
    </div>
  )
}
export default MatchStatistics
