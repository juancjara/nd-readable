import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import Landing from 'Landing'
import Post from 'screens/Post'

import { Provider } from 'react-redux'
import categories from './Categories/ducks'
import posts from './Posts/ducks'
import comments from './Comments/ducks'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import api from './api'

const rootReducer = combineReducers({
  categories,
  posts,
  comments,
})
const createStoreWithMiddleware = applyMiddleware(thunk.withExtraArgument(api))(
  createStore
)
const store = createStoreWithMiddleware(rootReducer)

class App extends Component {
  render() {
    return (
      <div style={{ margin: '0 20px' }}>
        <MuiThemeProvider>
          <Provider store={store}>
            <BrowserRouter>
              <Switch>
                <Route path="/" exact render={() => <Landing />} />
                <Route
                  path="/post/:id"
                  render={({ match: { params: { id } } }) => (
                    <Post postId={id} />
                  )}
                />
              </Switch>
            </BrowserRouter>
          </Provider>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default App
