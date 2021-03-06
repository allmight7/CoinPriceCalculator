import React from "react";
import { post } from 'axios';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class CoinAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            coinSite: '',
            coinName: '',
            buyPrice: '',
            quantity: '',
            amount: '',
            open: false
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose= () => {
        this.setState({
            coinSite: '',
            coinName: '',
            buyPrice: '',
            quantity: '',
            amount: '',
            open: false
        });
    }

    addCoin = () => {
        const url ='/api/coins';
        const formData = new FormData();
        formData.append('coinSite', this.state.coinSite);
        formData.append('coinName', this.state.coinName);
        formData.append('buyPrice', this.state.buyPrice);
        formData.append('quantity', this.state.quantity);
        formData.append('amount', this.state.buyPrice * this.state.quantity);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }
    
    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCoin()
            .then((response) => {
            console.log(response.data);
            this.props.stateRefresh();
        })
        this.setState({
            coinSite: '',
            coinName: '',
            buyPrice: '',
            quantity: '',
            amount: '',
            open: false
        })
    }


    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    코인 평단 추가
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}> 
                    <DialogTitle>코인 평단 추가</DialogTitle>
                    <DialogContent>
                    <TextField label="거래소명" type="text" name="coinSite" value={this.state.coinSite} onChange={this.handleValueChange}/><br/>
                    <TextField label="코인명" type="text" name="coinName" value={this.state.coinName} onChange={this.handleValueChange}/><br/>
                    <TextField label="매수가격" type="text" name="buyPrice" value={this.state.buyPrice} onChange={this.handleValueChange}/><br/>
                    <TextField label="매수수량" type="text" name="quantity" value={this.state.quantity} onChange={this.handleValueChange}/><br/>
                    <TextField label="매수 총금액" type="text" name="amount" value={this.state.buyPrice*this.state.quantity}  /><br/>
                    
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }
}

export default withStyles(styles)(CoinAdd);