import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Info } from '@material-ui/icons';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <div>
            <h2>Team Access Code <Info onClick={handleClickOpen}/></h2>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle style={{ backgroundColor: '#494A49', color:'#fff'}} id="alert-dialog-slide-title">{"What's the Team Access Code?"}</DialogTitle>
                <DialogContent style={{ backgroundColor: '#494A49',}}>
                    <DialogContentText id="alert-dialog-slide-description" style={{ color: '#fff' }}>
                        Your team will need this code when they register for Trivia Weekend to access your trivia team's portal.  This is only needed upon registration.
                        <br/><br/>Do not distribute this code to other teams.
          </DialogContentText>
                </DialogContent >
                <DialogActions style={{ backgroundColor: '#494A49'}}>
                    <Button onClick={handleClose} color="primary">
                        OK
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}