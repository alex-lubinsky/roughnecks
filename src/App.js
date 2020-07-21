import React from 'react';
import CheckmarkDashboard from './components/CheckmarkDashboard';
import './styles/App.css';


class App extends React.Component {

  render() {
    return (
    <div>
      <CheckmarkDashboard fallen={false} />
    </div>
    )
  }
}

export default App;