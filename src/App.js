import React, { Component } from "react";
import "./App.css";

// FontAwesome Components(for arrow icons)
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

// Reactstrap Components
import { Form, FormGroup, Label, Input, Container, Row, Col } from "reactstrap";

// Gallery Component
import { Gallery } from "./Gallery";
library.add(faAngleRight, faAngleLeft);

// This app is an interactive photo gallery for photos taken from the Lorem Picum API

// The root App Compenent holds all the information for the app and gets picture information from the
// Lorem Picsum API

// The Gallery component holds most of the interactivity of this app, including creating the photos
// and allow users to enlarge and click through photos in the gallery.
class App extends Component {
  // This constructor creates the apps state, which keeps track of
  // most of the apps changeable content, such as the photos for the gallery,
  // any errors that come up, and user input like the grayscale option

  // Width and height cannot be changed in this iteration of the app due to lack of
  // available time to properly test and integrate
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      loading: false,
      error: null,
      width: 600,
      height: 600,
      grayscale: false,
      baseURL: "https://picsum.photos/"
    };
  }

  // When the app is ready, load in the photos and show an error/lodaing screen if unavailable
  componentDidMount() {
    this.getImages();
  }

  // This function gets images from the Lorem Picsum API, first getting a JSON list of all
  // all the images then filtering out the id numbers of each photo and then saving the direct image
  // url for each photo to be used in the gallery.

  // If the user has chosen the grayscale option, the API call will receive grayscale versions of the photos
  getImages() {
    this.setState({ isLoading: true });
    fetch("https://picsum.photos/list")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Could not load the images, please try again.");
        }
      })
      .then(data => {
        let photoUrls = [];
        let url = this.state.baseURL;

        if (this.state.grayscale) {
          url += "g/";
        }

        url += this.state.width + "/" + this.state.height + "?image=";

        data
          .filter(photo => photo.author === "Alejandro Escamilla")
          .forEach(photo => {
            photoUrls.push(url + photo.id.toString());
          });
        this.setState({ photos: photoUrls });
      })
      .catch(error => this.setState({ error, loading: false }));
  }

  // Renders the web page, giving a loading or error message if the page does not load correctly
  // Includes 4 major content areas: A title, an introduction paragraph, a checkbox for grayscale, and the photo gallery
  render() {
    if (this.state.error) {
      return (
        <p>
          Unfortunately, an error has occured. Please make sure you are
          connected to the internet. Here is the error message:{" "}
          {this.state.error.message}
        </p>
      );
    }

    if (this.state.loading) {
      return <p>Loading... (Thanks for being patient)</p>;
    }

    return (
      <Container>
        <header className="header">
          <h1>Photographer Spotlight: Alejandro Escamilla</h1>
        </header>
        <Container>
          <p className="introduction ">
            This interactive gallery showcases the works of Allejandro
            Escamilla, whose photography ranges from quaint displays of phones
            and laptops to brooding images of forks and shoes.
          </p>
          <Row>
            <Col xs={{ size: 4, offset: 4 }}>
              <Form className="checkboxes">
                <FormGroup className="checkbox" check inline>
                  <Input
                    type="checkbox"
                    className="checkbox"
                    onChange={() => {
                      this.setState({ grayscale: !this.state.grayscale });
                      this.getImages();
                    }}
                    id="grayscale"
                  />
                  <Label for="grayscale" check>
                    Change Images to Grayscale
                  </Label>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
        <Container>
          <Gallery photos={this.state.photos} />
        </Container>
        <footer> &copy; 2018: Tre Paolini </footer>
      </Container>
    );
  }
}

export default App;
