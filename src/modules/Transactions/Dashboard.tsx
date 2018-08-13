import * as React from 'react';
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { Link } from "react-router-dom";
type DashboardProps = {
  actions: any,
  transactions: any[],
}

type InputProps = {
  categories: any,
  cash: number,
  card: number,
  total: number,
}

class Dashboard extends React.Component<any, any> {
     static defaultProps = {
      name: 'Agua',
      defaultAmount: '40',
      date: new Date().getTime(),
      amount: '',
      paid: false,
      id: 0
    }
  
  public render() {
    const total = this.props.total === 0 ? 1 : this.props.total;
    return (
      <div className="Dashboard">
        <Grid>

          <Grid item xs={12}>
            <Grid container>

              <Grid item xs={3}>
                <div className="Dashboard-square">
                  <Button
                    className="Dashboard-square-category-buttom"
                    color="primary"
                    variant="fab">
                    <i className="material-icons md-36">airport_shuttle</i>
                  </Button>
                  {Math.round(this.props.categories.transport / total * 10000) / 100} %
					</div>
              </Grid>
              <Grid item xs={3}>
                <div className="Dashboard-square">
                  <Button
                    className="Dashboard-square-category-buttom"
                    color="primary"
                    variant="fab">
                    <i className="material-icons md-36">fastfood</i>
                  </Button>
                  {Math.round(this.props.categories.food / total * 10000) / 100} %
  
					</div>
              </Grid>
              <Grid item xs={3}>
                <div className="Dashboard-square">
                  <Button
                    className="Dashboard-square-category-buttom"
                    color="primary"
                    variant="fab">
                    <i className="material-icons md-36">videogame_asset</i>
                  </Button>
                  {Math.round(this.props.categories.entertainment / total * 10000) / 100} %
  
					</div>
              </Grid>
              <Grid item xs={3}>
                <div className="Dashboard-square">
                  <Button
                    className="Dashboard-square-category-buttom"
                    color="primary"
                    variant="fab">
                    <i className="material-icons md-36">healing</i>
                  </Button>
                  {Math.round(this.props.categories.health_fitness / total * 10000) / 100} %
  
					</div>
              </Grid>
              <Grid item xs={3}>
                <Grid container>
                  <Grid item xs={12}>
                    <div className="Dashboard-square">
                      <Button
                        className="Dashboard-square-category-buttom"
                        color="primary"
                        variant="fab">
                        <i className="material-icons md-36">home</i>
                      </Button>
                      {Math.round(this.props.categories.household / total * 10000) / 100} %
  
					</div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="Dashboard-square">
                      <Button
                        className="Dashboard-square-category-buttom"
                        color="primary"
                        variant="fab">
                        <i className="material-icons md-36">ring_volume</i>
                      </Button>
                      {Math.round(this.props.categories.communication / total * 10000) / 100} %
  
					</div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <div className="Dashboard-main-square">
                  <span style={{
                    color: 'green'
                  }}>{Math.round(this.props.cash * 100) / 100}</span>
                  <span style={{
                    color: 'red'
                  }}>{Math.round(this.props.card * 100) / 100}</span>
                </div>
                <div className="center">
                  <Button
                    color="primary"
                  >
                    <Link to={'/records'}>transactions</Link>
                  </Button>
                </div>
              </Grid>
              <Grid item xs={3}>
                <Grid container>
                  <Grid item xs={12}>
                    <div className="Dashboard-square">
                      <Button
                        className="Dashboard-square-category-buttom"
                        color="primary"
                        variant="fab">
                        <i className="material-icons md-36">school</i>
                      </Button>
                      {Math.round(this.props.categories.education / total * 10000) / 100} %
									</div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="Dashboard-square">
                      <Button
                        className="Dashboard-square-category-buttom"
                        color="primary"
                        variant="fab">
                        <i className="material-icons md-36">add_shopping_cart</i>
                      </Button>
                      {Math.round(this.props.categories.shopping / total * 10000) / 100} %
					</div>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={3} />
              <Grid item xs={3} />
              <Grid item xs={3} />
              <Grid item xs={3} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <div className="center">
                <Button
                  color="primary"
                  variant="fab"
                  style={
                    {
                      width: 100,
                      height: 100
                    }
                  }
                >
                  <Link to={'/record'}>Income</Link>
                </Button>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="center">
                <Button
                  color="secondary"
                  variant="fab"
                  style={
                    {
                      width: 100,
                      height: 100
                    }
                  }
                >
                  <Link to={'/record'}>Expense</Link>
                </Button>
              </div>
            </Grid>
          </Grid>

        </Grid>



      </div>
    );
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
