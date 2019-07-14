import React from 'react'
import { Switch, Route } from 'react-router-dom'
import App from './App'
import Home from './pages/Home/Home'
import Details from './pages/Details/Details'

const Routes = () => {
    return (
        <App>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/details" component={Details} />
            </Switch>
        </App>
    )
}

export default Routes
