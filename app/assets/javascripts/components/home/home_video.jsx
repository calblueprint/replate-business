var Modal = ReactBootstrap.Modal;

/**
 * React component to control video playback on homepage
 * @prop playBtn   - URL for the play button image
 * @prop thumbnail - URL for the video preview
 */
class HomeVideo extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showVideoModal: false };
  }

  _openVideoModal = () => {
    this.setState({ showVideoModal: true });
  }

  _closeVideoModal = () => {
    this.setState({ showVideoModal: false });
  }

  componentDidUpdate = () => {
    if (this.state.showVideoModal) {
      var iframe = document.getElementById("vimeo-player");
      var player = new Vimeo.Player(iframe);

      player.play();
    }
  }

  render() {

    return (
      <div>
        <div
          className={`splash-video video-${this.state.videoStatus}`}
          id="vimeo-player-wrapper"
          onClick={this._openVideoModal}
        >
          <div className="play-btn">
            <img src={this.props.playBtn} />
          </div>
          <img className="thumbnail" src={this.props.thumbnail} />
        </div>
        <Modal
          className="splash-video-modal"
          show={this.state.showVideoModal}
          onHide={this._closeVideoModal}
        >
          <iframe
            src="https://player.vimeo.com/video/180519395"
            width="100%" height="100%"
            frameBorder="0"
            byline="false"
            id="vimeo-player"
            webkitallowfullscreen
            mozallowfullscreen
            allowFullScreen
          ></iframe>
        </Modal>
      </div>
    )
  }
}
