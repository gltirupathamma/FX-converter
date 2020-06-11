import React from "react";
import axios from "axios";
import converter from "./converter.css";
const arr= {"rates":
{
    "CAD":1.5187,
    "HKD":8.753,
    "ISK":149.7,
    "PHP":56.521,
    "DKK":7.4568,
    "HUF":345.0,
    "CZK":26.634,
    "AUD":1.6267,
    "RON":4.8365,
    "SEK":10.4188,
    "IDR":15917.2,
    "INR":85.3085,
    "BRL":5.4944,
    "RUB":77.7388,
    "HRK":7.5719,
    "JPY":122.14,
    "THB":35.418,
  "MYR":4.8287
},
    "base":"EUR",
    "date":"2020-06-09"
}
class Converter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      fromCurrency: "USD",
      toCurrency: "GBP",
      amount: 1,
      currencies: []
    };
  }
  componentDidMount() {
    const currencyAr = ["EUR"];
  for (const key in arr.rates) {
        currencyAr.push(key);
        }
       this.setState({ currencies: currencyAr });
  }
  onConvertClick = () => {
    if (this.state.fromCurrency !== this.state.toCurrency) {
      axios
        .get(
          `https://api.exchangeratesapi.io/latest?base=${
            this.state.fromCurrency
          }&symbols=${this.state.toCurrency}`
        )
        .then(response => {
          const result =
            this.state.amount * response.data.rates[this.state.toCurrency];
          this.setState({ result: result.toFixed(5) });
        })
        .catch(error => {
          console.log("Opps", error.message);
        });
    } else {
      this.setState({ result: "You cant convert the same currency!" });
    }
  };
  onSelect = event => {
    if (event.target.name === "from") {
      this.setState({ fromCurrency: event.target.value });
    } else {
      if (event.target.name === "to") {
        this.setState({ toCurrency: event.target.value });
      }
    }
  };
  render() {
    return (
      <div className="Converter">
        <h2>
          Currency Converter
        </h2>
        <div className="From">
          <input
            name="amount"
            type="text"
            value={this.state.amount}
            onChange={event => this.setState({ amount: event.target.value })}
          />
          <span>
          <label className="label">From Currency</label>
          </span>
      
          <select
            name="from"
            onChange={event => this.onSelect(event)}
            value={this.state.fromCurrency}
          >
            {this.state.currencies.map(cur => (
              <option key={cur}>{cur}</option>
            ))}
          </select>
          <label>To Currency</label>
          <select
            name="to"
            onChange={event => this.onSelect(event)}
            value={this.state.toCurrency}
          >
            {this.state.currencies.map(cur => (
              <option key={cur}>{cur}</option>
            ))}
          </select>
         
          {this.state.result && <p>{this.state.result}</p>}
        </div>
        <button onClick={this.onConvertClick} className="convert">Convert</button>
      </div>
    );
  }
}
export default Converter;