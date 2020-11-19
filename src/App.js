import { connect } from 'react-redux';
import { switchOn } from './actions'
import MonitorDisplay from './components/MonitorDisplay';
import './App.css'
let App = ({ monitor, switchOn }) => {

  return (
    <div className="App">
    
      <h1 className="dashboard_title">Dashboard</h1>

      <div className="monitor_container">
        <MonitorDisplay title={"Temperature"} unit={" \u00B0 C"} value={monitor.temperature} />
        <MonitorDisplay title={"Air Pressure"} unit={"mm"} value={monitor.airPressure} />
        <MonitorDisplay title={"Humidity"} unit={"%"} value={monitor.humidity} />
      </div>


      <button onClick={switchOn} className="switch_button">Switch On</button>
    </div>
  );
}

App = connect(
  ({ monitor }) => ({ monitor }), { switchOn }
)(App);

export default App;
