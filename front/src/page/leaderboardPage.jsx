import React, {useEffect, useState} from 'react';
import MenuBar from "../Component/menuBar";
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

const createData = (ranking, name, author, description) => {
    return {
        ranking,
        name,
        author,
        //mdd,
        description
    };
}

const Row = props => {
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell>{row.ranking}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.author}</TableCell>
                {/*<TableCell align="right">{row.mdd}</TableCell*/}
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            {/*<Typography variant="h6" gutterBottom component="div">
                                Graph
                            </Typography>*/}
                            <Typography variant="h6" gutterBottom component="div">
                                Description
                            </Typography>
                            {row.description}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const CollapsibleTable = props => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>id</TableCell>
                        <TableCell>Algorithm</TableCell>
                        <TableCell align="right">Author</TableCell>
                        {/*<TableCell align="right">MDD</TableCell>*/}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.map((row) => (
                        <Row key={row.name} row={row}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export const LeaderboardPage = props => {

    const [algoList, setAlgoList] = useState([]);
    const [perfList, setPerfList] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        let mounted = true;
        const getAlgorithms = async () => {
            const response = await axios.get('/api/algo');
            if (response.status === 200 && mounted) {
                setAlgoList(response.data);
                const newRows = algoList.map(algo => createData(algo.id, algo.name, algo.author, algo.description));
                setRows(newRows);
            }
        }
        getAlgorithms();

        return () => (mounted = false);
    },);

    useEffect(() => {
        let mounted = true;
        const getPerformances = async () => {
            const response = await axios.get('/api/performance');
            if (response.status === 200 && mounted) {
                setPerfList(response.data);
                const newRows = perfList.map(algo => createData(algo.algorithm.id, algo.algorithm.name, algo.algorithm.author.id, algo.MDD))
                setRows(newRows);
            }
        }
        getPerformances();
        return () => (mounted = false);
    }, []);


    return (
        <div>
            <MenuBar/>
            <CollapsibleTable rows={rows}/>
        </div>
    );
}