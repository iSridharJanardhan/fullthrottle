import React, { Component } from "react";
import "./App.css";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emiTenure: "6",
      emiAmount: "500",
      interestRate: "00",
      amount: "00",
      currency: "00",
      numPayments: "00",
      principalAmount: "00",
      principalCurrency: "00"
    };
  }
  componentDidUpdate() {
    
    console.log(this.state.emiAmount, this.state.emiTenure);
    setTimeout((async () => {
      const post = await fetch(
        `https://ftl-frontend-test.herokuapp.com/interest?amount=${
          this.state.emiAmount
        }&numMonths=${this.state.emiTenure}`
      );
      const content = await post.json();
      this.setState({
        interestRate: content.interestRate,
        amount: content.monthlyPayment.amount,
        currency: content.monthlyPayment.currency,
        numPayments: content.numPayments,
        principalAmount: content.principal.amount,
        principalCurrency: content.principal.currency
      });
    })(),5000);
  }
  render() {
    return (
      <div className="App">
        <nav class="uk-navbar-container" uk-navbar>
          <div class="uk-navbar-left">
            <ul class="uk-navbar-nav">
              <li>
                <a className="nav-title" >FullThrottle Labs</a>
              </li>
            </ul>
          </div>
        </nav>
        <div uk-grid="true">
          <div className="container-left">
            <div class="uk-card uk-card1 uk-card-default uk-card-body uk-width-1-2@m">
            <h2>EMI Loan Calculator</h2>
              <h3 class="uk-card-title"><b>Enter Details here</b></h3>
              <h3>Enter loan Amount</h3>
              <form>
                <InputRange
                  name="emiAmount"
                  maxValue={5000}
                  minValue={500}
                  value={this.state.emiAmount}
                  onChange={emiAmount => this.setState({ emiAmount })}
                />
                <h3>Enter loan Tenure</h3>
                <InputRange
                  name="emiTenure"
                  maxValue={24}
                  minValue={6}
                  value={this.state.emiTenure}
                  onChange={emiTenure => this.setState({ emiTenure })}
                />
              </form>
            </div>
          </div>
          <div className="container-right">
            <div
              class="uk-grid-divider uk-card2 uk-child-width-expand@s uk-grid-match"
              uk-grid="true"
            >
              <div class="uk-card2">
                <div class="uk-card uk-card-default uk-card-body">
                  <h3>Interest</h3>
                  <h2>{Math.round(this.state.interestRate * 100)}%</h2>
                </div>
              </div>
              <div class="uk-card2">
                <div class="uk-card uk-card-default uk-card-body">
                  <h3>Monthly Payment</h3>
                  <p>
                    <b>Amount: </b>
                    {this.state.amount}
                  </p>
                  <p>
                    <b>Currency: </b>
                    {this.state.currency}
                  </p>
                </div>
              </div>
              <div class="uk-card2">
                <div class="uk-card uk-card-default uk-card-body">
                  <h3> Payments</h3>
                  <h2>{this.state.numPayments} Months</h2>
                </div>
              </div>
              <div class="uk-card2">
                <div class="uk-card uk-card-default uk-card-body">
                  <h3> Amount</h3>
                  <p>
                    <b>Amount: </b>
                    {this.state.principalAmount}
                  </p>
                  <p>
                    <b>Currency: </b>
                    {this.state.principalCurrency}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
