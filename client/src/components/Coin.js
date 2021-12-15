import React from "react";
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import CoinDelete from "./CoinDelete";

class Coin extends React.Component {
    render() {
        return(
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell>{this.props.coinSite}</TableCell>
                <TableCell>{this.props.coinName}</TableCell>
                <TableCell>{this.props.buyPrice}</TableCell>
                <TableCell>{this.props.quantity}</TableCell>
                <TableCell>{this.props.amount}</TableCell>
                <TableCell><CoinDelete stateRefresh={this.props.stateRefresh} id={this.props.id}/></TableCell>
            </TableRow>
        )
    }
}

export default Coin;