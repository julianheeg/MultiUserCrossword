import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Crossword } from './components/crossword/Crossword';

import './custom.css'
import './components/crossword/Crossword.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/crossword' component={Crossword} />
      </Layout>
    );
  }
}
