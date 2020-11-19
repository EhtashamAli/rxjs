import { connect } from 'react-redux';
import { switchOn } from './actions'

let App = ({ monitor, switchOn }) => {
  console.log(monitor)
  return (
    <div className="App">
      <p>Temperature : {monitor.temperature}</p>
      <p>Pressure : {monitor.airPressure}</p>
      <p>Humidity : {monitor.humidity}</p>
      <button onClick={switchOn}>Switch On</button>
    </div>
  );
}

App = connect(
  ({ monitor }) => ({ monitor }), { switchOn }
)(App);

export default App;
