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

class CoinCurrentPriceAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            coinName: '',
            currentPrice: '',
            open: false
        }
    }

    handleClickOpen = () => {
        this.setState({
            coinName: '',
            currentPrice: '',
            open: true
        });
    }

    handleClose= () => {
        this.setState({
            coinName: '',
            currentPrice: '',
            open: false
        });
    }

    addCoin = () => {
        const url ='/api/current';
        const formData = new FormData();
        formData.append('coinName', this.state.coinName);
        formData.append('currentPrice', this.state.currentPrice);
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
            currentPrice: '',
            open: false
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }


    render() {
        return (
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>
                    ?????? ????????? ??????
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}> 
                    <DialogTitle>?????? ????????? ??????</DialogTitle>
                    <DialogContent>
                    <TextField label="?????????" type="text" name="coinName" value={this.state.coinName} onChange={this.handleValueChange}/><br/>
                    <TextField label="?????? ?????????" type="text" name="currentPrice" value={this.state.currentPrice} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>??????</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>??????</Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }
}

export default withStyles(styles)(CoinCurrentPriceAdd);