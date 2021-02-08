import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'
const URL = 'http://localhost:3000/stocks/'

class MainContainer extends Component {

  state = {
    stocks: [],
    boughtStocks: [],
    alphabetically: false,
    price: false, 
    filteredStocks: []
  }

  componentDidMount() {
    fetch(URL)
      .then(r => r.json())
      .then(stocks => this.setState({stocks: stocks}))
  }

  buyStock = (stock) => {
    this.setState({
      boughtStocks: [...this.state.boughtStocks, stock]
    })
  }

  sellStock = (stock) => {
    this.setState({
      boughtStocks: this.state.boughtStocks.filter(stonk => stonk !== stock)
    })
  }

  sortAlphabetically = () => {
    if (this.state.filteredStocks.length > 0) {
      const sorted = this.state.filteredStocks
      sorted.sort((a, b) => (a.ticker > b.ticker) ? 1 : -1)
      this.setState({
        alphabetically: true,
        price: false,
        filterStocks: sorted
      })
    } else {
      const sorted = this.state.stocks
      sorted.sort((a, b) => (a.ticker > b.ticker) ? 1 : -1)
      this.setState({
        stocks: sorted,
        alphabetically: true,
        price: false
      })
    }
  }

  sortByPrice = () => {
    if (this.state.filteredStocks.length > 0) {
      const sorted = this.state.filteredStocks
      sorted.sort((a, b) => (a.price > b.price) ? 1 : -1)
      this.setState({
        alphabetically: false,
        price: true,
        filterStocks: sorted
      })
    } else {
      const sorted = this.state.stocks
      sorted.sort((a, b) => (a.price > b.price) ? 1 : -1)
      this.setState({
        stocks: sorted,
        alphabetically: false,
        price: true
      })
    }
  }

  filterStocks = (e) => {
    // const filtered = this.state.stocks.filter(stock => stock.type === e.target.value ? stock : null)
    // filtered.filter(stock => stock.type === e.target.value ? stock : null)
    this.setState({
      filteredStocks: this.state.stocks.filter(stock => stock.type === e.target.value ? stock : null)
    })
  }

  render() {
    return (
      <div>
        <SearchBar filterStocks={this.filterStocks} alphabetically={this.state.alphabetically} price={this.state.price} sortAlphabetically={this.sortAlphabetically} sortByPrice={this.sortByPrice}/>

          <div className="row">
            <div className="col-8">

              <StockContainer buyStock={this.buyStock} stocks={this.state.stocks} filteredStocks={this.state.filteredStocks}/>

            </div>
            <div className="col-4">

              <PortfolioContainer sellStock={this.sellStock} boughtStocks={this.state.boughtStocks}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
