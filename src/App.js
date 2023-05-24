import {Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import TechEraDetails from './components/TechEraDetails'
import NotFound from './components/NotFound'

import './App.css'

// Replace your code here
const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses/:id" component={TechEraDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
