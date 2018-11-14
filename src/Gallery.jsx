import React, { Component } from "react";

// Reactstrap Components
import {
  Container,
  Row,
  Col,
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

// FontAwesome Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./gallery.css";

export class Gallery extends Component {
  // This constrctor keeps track of the galleries changeable states:
  // If the modal is open or closed, the current index for the picture in the modal,
  // if the autoplay feature is activated, and which interval function is controling the
  // modal's autoplay feature
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      currIndex: 0,
      autoplay: false,
      intervalFunction: null
    };

    this.toggle = this.toggle.bind(this);
  }

  // This function controls the autoplay feature by starting and clearing a set interval,
  // depending on if the autoplay option is checked or unchecked
  controlAutoplay = active => {
    if (active) {
      this.setState({ intervalFunction: setInterval(this.forward, 1500) });
    } else {
      clearInterval(this.state.intervalFunction);
    }
  };

  // This function toggles the modal to open or close, as well as reset the autoplay feature
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      autoplay: false
    });
    clearInterval(this.state.intervalFunction);
  };

  // This method will move the carousel onto the next photo once the right arrow is click
  forward = () => {
    // Resets the carousel if moving forward on the last photo
    if (this.state.currIndex === this.props.photos.length - 1) {
      return this.setState(state => ({
        currIndex: 0
      }));
    }

    this.setState(state => ({
      currIndex: state.currIndex + 1
    }));
  };

  // This method will move the carousel backwards to the previous photo when the left arrow is clicked
  backward = () => {
    // Moves to the last photo in the set if going backward from the start
    if (this.state.currIndex === 0) {
      return this.setState({
        currIndex: this.props.photos.length - 1
      });
    }

    this.setState(state => ({
      currIndex: state.currIndex - 1
    }));
  };

  // Renders the photo gallery, which contains the list of photos, the modal that allows
  // users to move through the photos, a checkbox to control the autoplay feature,
  // and a button to download the full image
  render() {
    return (
      <Container className="galleryContainer">
        <Row>
          {this.props.photos.map((photo, i) => (
            <Col
              className="galleryCol"
              key={i}
              sm="12"
              md="3"
              // Could not get accessibility worked out in this iteration due to lack of time
              // role="button"
              // aria-pressed="false"
              // tabIndex="0"
            >
              {/* Images open up a enlarged modal view when clicked */}
              <img
                className="galleryPhoto"
                onClick={() => {
                  this.setState({ currIndex: i });
                  this.toggle();
                }}
                key={i}
                src={photo}
                alt="Taken by Alejandro Escamilla"
              />
            </Col>
          ))}
        </Row>
        {/* This modal opens up when an photo is clicked It allows for users to move
        forward and backwards through the photos by click */}
        <Modal
          size="xl"
          className={this.props.className}
          isOpen={this.state.modal}
          toggle={this.toggle}
          tabIndex="-1"
        >
          <Container className="modalStyle">
            <ModalBody>
              <Col>
                <img
                  className="modalPhoto"
                  src={this.props.photos[this.state.currIndex]}
                  alt="Taken by Alejandro Escamilla"
                />
              </Col>
            </ModalBody>
            <Row>
              <Col
                // tabIndex="0"
                // role="button"
                // aria-pressed="false"
                onClick={this.backward}
                className="backwardCol"
              >
                <FontAwesomeIcon icon="angle-left" className="backwardArrow" />
              </Col>
              <Col
                // tabIndex="0"
                // role="button"
                // aria-pressed="false"
                onClick={this.forward}
                className="forwardCol"
              >
                <FontAwesomeIcon icon="angle-right" className="forwardArrow" />
              </Col>
            </Row>
            <Row>
              <Col xs={{ size: 4, offset: 4 }}>
                <Form className="checkboxes autoplay">
                  <FormGroup className="checkbox" check inline>
                    <Input
                      type="checkbox"
                      className="checkbox"
                      onChange={() => {
                        this.controlAutoplay(!this.state.autoplay);
                        this.setState({ autoplay: !this.state.autoplay });
                      }}
                      id="autoplay"
                    />
                    <Label for="autoplay" check>
                      Autoplay
                    </Label>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col xs={{ size: 4, offset: 4 }} className="buttonCol">
                <a
                  href={this.props.photos[this.state.currIndex]}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <button className="button"> Download </button>
                </a>
              </Col>
            </Row>
          </Container>
        </Modal>
      </Container>
    );
  }
}
