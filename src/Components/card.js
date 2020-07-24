import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';
import SimpleModal from './Modal/Modal'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
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

export default function StatusCard({ id, name, time }) {
    const classes = useStyles();
    const [clicked, setclicked] = React.useState(false);

    const handleClick = (e) => {
        e.preventDefault()
        setclicked(!clicked);
    };


    let totalTime = 0
    time.map((time, index) => {
        let timeStart = converter(time.start_time)
        let timeEnd = converter(time.end_time)
        totalTime += diffInTime(timeEnd, timeStart)
    })
    let timeArray = time
    let render = null
    if (clicked) {
        render = <SimpleModal
            key={id + name}
            name={name}
            time={timeArray}
            clicked />
    }
    return (
        <div>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Activity" className={classes.avatar}>
                            {name.slice(0, 1)}
                        </Avatar>
                    }
                    title={name}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Total up time is {totalTime} hrs
        </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Button color="primary" variant="contained" onClick={(e) => { handleClick(e) }}>
                        Details
                </Button>
                </CardActions>
            </Card>
            {render}
        </div>
    );
}