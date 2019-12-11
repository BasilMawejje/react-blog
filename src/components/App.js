import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import PostList from './PostList'
import PostCreate from './PostCreate'
import PostDelete from './PostDelete'
import PostShow from './PostShow'
import PostEdit from './PostEdit'

const App = () => {
    return (
        <div className="ui container">
            <BrowserRouter >
                <Switch>
                    <Route path='/' exact component={PostList} />
                    <Route path='/posts/new' component={PostCreate} />
                    <Route path='/posts/edit/:id' component={PostEdit} />
                    <Route path='/posts/delete/:id' component={PostDelete} />
                    <Route path='/posts/:id' component={PostShow} />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;