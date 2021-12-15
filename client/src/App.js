import React,{ Component } from "react";
import './App.css';
import Coin from './components/Coin';
import CoinAdd from './components/CoinAdd';
import Paper from "@material-ui/core/Paper";
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CoinAvg from "./components/CoinAvg";

const styles = theme => ({
  root: {
    with: '100%',
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  grow: {
    flexGrow: 1,
  },
  tableHead: {
    fontSize: '1.0rem',
    backgroundColor: '#33c9dc'
  },
    menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
    display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
    backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing.unit,
    width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
    width: 120,
    '&:focus': {
    width: 200,
      },
  },
  }
})

class App extends Component {
  constructor(props){
      super(props);
      this.state = {
        coins: '',
        completed: 0,
        searchKeyword: ''
      }
  }

  stateRefresh = () => {
    this.setState({
      coins: '',
      completed: 0,
      searchKeyword: ''
    });
    this.callApi().then(res => this.setState({coins : res})).catch(err => console.log(err))
  }
  componentDidMount() {
    this.timer = setInterval(this.progress, 0);
    this.callApi().then(res => this.setState({coins : res})).catch(err => console.log(err))
  }
  callApi = async () => {
    const response = await fetch('/api/coins');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 })
  }

  handleValueChange = (e) => {
    let nextState ={};
    nextState[e.target.name] =e.target.value;
    this.setState(nextState);
  }
    render(){
      const filteredComponents = (data) => {
        data = data.filter((c) => {
          return c.coinName.indexOf(this.state.searchKeyword) > -1;
        });
        return data.map((c) => {
            return <Coin stateRefresh={this.stateRefresh} key={c.id} id={c.id} coinSite={c.coinSite} coinName={c.coinName} buyPrice={priceToString(c.buyPrice)} quantity={priceToString(c.quantity)} amount={priceToString(c.amount)} />
        });
      }
      const getAvg = (data) =>{
        data = data.filter((c) => {
          return c.coinName.indexOf(this.state.searchKeyword) > -1;
        });
        // return data.map((c) => {
        //     return <CoinAvg stateRefresh={this.stateRefresh} key={c.id} id={c.id} coinSite={c.coinSite} coinName={c.coinName} buyPrice={c.buyPrice} quantity={c.quantity} amount={c.amount} />
        // });
        let quantity =0;
        let amount =0;
        let avg =0;
        let coinName = 0;
        let currentPrice =0;
        let profit = 0;
        let profitRate = 0;
         data.map((c) => {
          coinName = c.coinName;
          quantity += c.quantity;
          amount += c.amount;
        });
        avg = (amount/quantity).toFixed(2);
        currentPrice = 37;
        profitRate = ((currentPrice-avg) / avg).toFixed(5);
        profit = amount * profitRate;
        return <CoinAvg stateRefresh={this.stateRefresh} key={coinName} coinName={coinName} 
               buyPrice={priceToString(avg)} quantity={priceToString(quantity)} amount={priceToString(amount)} 
                currentPrice={priceToString(currentPrice)} profitRate={(profitRate * 100).toFixed(2)} profit={priceToString(profit.toFixed(0))}/>
      }
      function priceToString(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
        const { classes } = this.props;
        const cellList = ["번호","거래소명","코인명","매수가격","매수수량","매수 총금액","설정"]
        const cellList2 = ["코인명","평단가","매수수량","매수 총금액","현재코인가격","예상수익률","예상수익금"]
        return (
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                <MenuIcon />
                </IconButton>
                <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                코인 평단 계산기
                </Typography>
                <div className={classes.grow} />
                <div className={classes.search}>
                <div className={classes.searchIcon}>
                <SearchIcon />
                </div>
                <InputBase
                placeholder="검색하기"
                classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
                }}
                name="searchKeyword"
                value={this.state.searchKeyword}
                onChange={this.handleValueChange}
                />
                </div>
              </Toolbar>
            </AppBar>
                    <Paper className={classes.paper}>
                    <Table className={classes.table}>
                      <TableHead >
                        <TableRow>
                          {cellList2.map(c => {
                            return <TableCell className={classes.tableHead}>{c}</TableCell>
                          })}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.coins ? getAvg(this.state.coins) :
                          <TableRow>
                          <TableCell colSpan="6" align="center">
                            <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                          </TableCell>
                        </TableRow>
                        }
                      </TableBody>
                    </Table>
                    </Paper>
            <div className={classes.menu}>
              <CoinAdd stateRefresh={this.stateRefresh}/>
            </div>
            <Paper className={classes.paper}>
            <Table className={classes.table}>
              <TableHead >
                <TableRow>
                  {cellList.map(c => {
                    return <TableCell className={classes.tableHead}>{c}</TableCell>
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.coins ? 
                  filteredComponents(this.state.coins) :
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                  </TableCell>
                </TableRow>
                } 
              </TableBody>
            </Table>
          </Paper>
        </div>
      );
    }  
  }

export default withStyles(styles)(App);
