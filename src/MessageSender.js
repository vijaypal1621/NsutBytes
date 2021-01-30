import React from "react";
import "./MessageSender.css";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import DescriptionIcon from "@material-ui/icons/Description";
import { Avatar, Button, IconButton } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import CloseRoundedIcon from "@material-ui/icons/CancelRounded";
import {useStateValue} from './StateProvider';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 - rand();
  const left = 50 - rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 320,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  input: {
    display: "none",
  },
}));

function MessageSender() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [photo, setPhoto] = React.useState(null);
  const [video, setVideo] = React.useState(null);
  const [{user}] = useStateValue();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handlePhotoOpen = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    setOpen(true);
  };

  const RemoveSelectedFile = () => {
    const x = document.getElementById("postImage");
    console.log(x.value);
    x.value = "";
    console.log(x.value);
  };

  const handlePhotoClose = () => {
    setPhoto(null);
    RemoveSelectedFile();
  };

  // const handleVideoOpen = (event) => {

  // var source = document.getElementById('video_here');
  // source[0].src = URL.createObjectURL(event.files[0]);
  // source.parent()[0].load();
  // };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className="modal__top">
        <h2 id="simple-modal-title">Create Post</h2>
        <Button onClick={handleClose}>
          <CloseRoundedIcon />
        </Button>
      </div>
      <hr />
      <div className="modal__profile">
        <Avatar src={user?.photoURL} alt={user?.displayName}  />
        <h4 className="modal__title">{user?.displayName}</h4>
      </div>
      <div
        style={{
          maxWidth: "100%",
          overflowX: "hidden",
          overflowY: "auto",
          maxHeight: "300px",
        }}
      >
        <textarea
          className="modal__input"
          rows="5"
          cols="20"
          style={{ width: "100%" }}
          placeholder="Whats on your mind?"
        />
        <div className="modal__input__photo">
          <Button
            style={{ position: "absolute", color: "white" }}
            className="modal__input__photo__button"
            onClick={handlePhotoClose}
          >
            <CloseRoundedIcon />
          </Button>
          <img src={photo} alt="" />
          {video != null ? (
            <video width="400" controls>
              <source src="mov_bbb.mp4" id="video_here" />
              Your browser does not support HTML5 video.
            </video>
          ) : (
            <> </>
          )}
        </div>
      </div>
      <div className="messageSender__bottom row">
      <div className="messageSender__option col-4">
            <input
              accept="image/*"
              className={classes.input}
              id="postImage"
              multiple
              type="file"
              onChange={handlePhotoOpen}
            />
            <label htmlFor="postImage"  className="messageSender__option__label" >
            <div style={{display:"flex",alignItems:"center"}}>
            <IconButton style={{padding:"0"}} color="primary" component="div">
              <InsertPhotoIcon  style={{ color: "green" }} />
            </IconButton>
            <h4 >Photo</h4>
          </div>
            </label>
          </div>
        <div className="messageSender__option col-4">
          <input
            accept="video/*"
            className={classes.input}
            id="postVideo"
            multiple
            type="file"
            name="file[]"
            onChange={handlePhotoOpen}
          />
          <label htmlFor="postVideo" className="messageSender__option__label" >
            <div style={{display:"flex",alignItems:"center"}}>
            <IconButton style={{padding:"0"}}color="primary" component="div">
              <PlayCircleFilledIcon style={{ color: "red" }} />
            </IconButton>
            <h4 >Video</h4>
            </div>
          </label>
        </div>
        <div className="messageSender__option col-4">
          <input accept="" className={classes.input} id="postEvent" />
          <label htmlFor="postEvent" className="messageSender__option__label">
          <div style={{display:"flex",alignItems:"center"}}>
            <IconButton style={{padding:"0"}} color="primary" component="div">
              <DescriptionIcon style={{ color: "blue" }} />
            </IconButton>
            <h4 >Article</h4>
            </div>
          </label>
        </div>
      </div>
      <Button
        className="post__button"
        style={{ color: "white", backgroundColor: "#16a596" }}
      >
        Post
      </Button>
      {/* <SimpleModal /> */}
    </div>
  );

  return (
    <div className="message">
      <div className="messageSender__top">
        <Avatar src={user?.photoURL} alt={user?.displayName} />
        <button type="button" onClick={handleOpen}>
          What's on Your Mind?
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </div>
      <div className="messageSender__bottom row">
      <div className="messageSender__option col-4">
            <input
              accept="image/*"
              className={classes.input}
              id="postImage"
              multiple
              type="file"
              onChange={handlePhotoOpen}
            />
            <label htmlFor="postImage"  className="messageSender__option__label" >
            <div style={{display:"flex",alignItems:"center"}}>
            <IconButton style={{padding:"0"}} color="primary" component="div">
              <InsertPhotoIcon  style={{ color: "green" }} />
            </IconButton>
            <h4 >Photo</h4>
          </div>
            </label>
          </div>
        <div className="messageSender__option col-4">
          <input
            accept="video/*"
            className={classes.input}
            id="postVideo"
            multiple
            type="file"
            name="file[]"
            onChange={handlePhotoOpen}
          />
          <label htmlFor="postVideo" className="messageSender__option__label" >
            <div style={{display:"flex",alignItems:"center"}}>
            <IconButton style={{padding:"0"}}color="primary" component="div">
              <PlayCircleFilledIcon style={{ color: "red" }} />
            </IconButton>
            <h4 >Video</h4>
            </div>
          </label>
        </div>

        <div className="messageSender__option col-4">
          <input accept="" className={classes.input} id="postEvent" />
          <label htmlFor="postEvent" className="messageSender__option__label">
          <div style={{display:"flex",alignItems:"center"}}>
            <IconButton style={{padding:"0"}} color="primary" component="div">
              <DescriptionIcon style={{ color: "blue" }} />
            </IconButton>
            <h4 >Article</h4>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default MessageSender;
