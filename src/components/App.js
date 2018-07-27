import React, { Component } from "react";
import { connect } from "react-redux";

import Search from "./Search";
import Beers from "./Beers";
import { searchBeers, searchBeersCancel } from "../actions";

class App extends Component {
  render() {
    const {
      beers,
      searchBeers,
      loading,
      messages,
      searchBeersCancel
    } = this.props;
    return (
      <div>
        <Search
          defaultValue={""}
          onChange={searchBeers}
          messages={messages}
          onCancel={searchBeersCancel}
          loading={loading}
        />
        <Beers beers={beers} loading={loading} />
      </div>
    );
  }
}

export default connect(
  state => state,
  { searchBeers, searchBeersCancel }
)(App);
