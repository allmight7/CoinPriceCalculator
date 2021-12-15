import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class CoinDelete extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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

    deleteCoin(id) {

        const url = '/api/coins/' + id;
        fetch(url, {
            method: 'DELETE'
        }).then((response) => {
            console.log(response.data);
            this.props.stateRefresh();
        }).catch((error) => console.log("error:", error));
    }
    render(){
        return (
            <div>
            <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>삭제</Button>
            <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle onClose={this.handleClose}>
                    삭제 경고
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        선택한 코인 정보가 삭제됩니다.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={(e) => {this.deleteCoin(this.props.id)}}>삭제</Button>
                    <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
            </div>
        )
    }
}

export default CoinDelete;