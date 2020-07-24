import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import { LinearProgress } from '@material-ui/core'

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const diffInTime = (time2, time1) => {

    time2 = new Date(time2).getTime()
    time1 = new Date(time1).getTime()

    return ((time2 - time1) / (1000 * 3600))
}
const converter = (time) => {
    if (time.slice(-2) === 'PM') {
        return (time.slice(0, -7) + " " + (Number(time.slice(-7, -5)) + 12) + time.slice(-5, -2))
    }
    else return time.slice(0, -2)
}

export default function SimpleModal({ name, time ,clicked}) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(clicked);

    const handleClose = () => {
        setOpen(false);
    };
    let timeStart=React.useRef(time)
    console.log(timeStart.current)
    const body = (
        <div style={modalStyle} className={classes.paper}>

            <h2 id="simple-modal-title">{name}</h2>
            <span id="simple-modal-description">
                <LinearProgress variant="determinate" value={60} />
            </span>
            <SimpleModal />
        </div>
    );

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby={name}
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}