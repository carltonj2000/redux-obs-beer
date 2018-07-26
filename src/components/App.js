import React, { Component } from "react";
import { connect } from "react-redux";

import Search from "./Search";
import Beers from "./Beers";
import { searchBeers } from "../actions";

class App extends Component {
  render() {
    const { beers, searchBeers, loading, messages } = this.props;
    return (
      <div>
        <Search defaultValue={""} onChange={searchBeers} messages={messages} />
        <Beers beers={beers} loading={loading} />
      </div>
    );
  }
}

export default connect(
  state => state,
  { searchBeers }
)(App);
