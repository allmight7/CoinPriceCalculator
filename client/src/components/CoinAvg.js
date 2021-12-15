import React from "react";
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

class CoinAvg extends React.Component {
    render() {
        return(
            <TableRow>
                <TableCell>{this.props.coinName}</TableCell>
                <TableCell>{this.props.buyPrice}</TableCell>
                <TableCell>{this.props.quantity}</TableCell>
                <TableCell>{this.props.amount}</TableCell>
                <TableCell>{this.props.currentPrice}</TableCell>
                <TableCell>{this.props.profitRate} %</TableCell>
                <TableCell>{this.props.profit}</TableCell>
            </TableRow>
        )
    }
}

export default CoinAvg;