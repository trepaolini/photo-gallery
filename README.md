# Photo Gallery

[Live Demo Here](http://students.washington.edu/mpaoli/photo-gallery)

## Instructions to Install

1. Clone this repo locally using `git clone git@github.com:trepaolini/photo-gallery.git`
2. Install dependencies using `npm install`
3. Start the local server using `npm start`
4. Have Fun!

## Description

This interactive photo gallery displays photos taken by Alejandro Escamilla that are available through the Lorem Picsum API.

The photo gallery allows you to enlarge photos and navigate between the gallery using arrow buttons.

The photo gallery also allow you to see all of the available photos as grayscale images, autoplay through all of the enlarged photos, and download your favorite photos.

## Technologies

I used HTML, CSS, and React to create this application. I also utilized the Reactstrap and FontAwesome libraries.

## In The Future

Because I had limited time to creat this app, I know that there are parts of the app that could improve this app overall. Here are the major changes I would make:

1. Currently, the application does not support screen reader functionality. With more time, I would like to make it 100% WCAG compliant by adding accessibility functionality and features through ARIA.

2. I would like to implement unit tests to confirm that currently works would continue to work as I iterate on this application.

3. I would like to make it possible for the user to change the dimensions of the photos in the gallery. The Lorem Picsum API makes it easy to do so, but I did not have enough time to make sure that the layout and style of the app could respond when a user changes photo size.
