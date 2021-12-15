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
            fileName: '',
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
            fileName: '',
            open: false
        });
    }

    addCoin = () => {
        const url ='/api/coins';
        const formData = new FormData();
        // formData.append('image', this.state.file);
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
            file: null,
            coinSite: '',
            coinName: '',
            buyPrice: '',
            quantity: '',
            amount: '',
            fileName: '',
            open: false
        })
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
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
                    코인 평단 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}> 
                    <DialogTitle>코인 평단 추가</DialogTitle>
                    <DialogContent>
                    {/* <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" color="primary" component="span" name="file">
                            {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                        </Button>
                    </label>
                    <br/> */}


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

            /*
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                이름: <input type="text" name="coinName" value={this.state.coinName} onChange={this.handleValueChange}/><br/>
                생년월일: <input type="text" name="buyPrice" value={this.state.buyPrice} onChange={this.handleValueChange}/><br/>
                성별: <input type="text" name="quantity" value={this.state.quantity} onChange={this.handleValueChange}/><br/>
                직업: <input type="text" name="amount" value={this.state.amount} onChange={this.handleValueChange}/><br/>
                <button type="submit">추가하기</button>
            </form>
            */
        )
    }
}

export default withStyles(styles)(CoinAdd);