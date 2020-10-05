[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Cypress.io tests](https://img.shields.io/badge/cypress.io-tests-green.svg?style=flat-square)](https://cypress.io)

# Semanticbits Cypress Template

This is based on a template for QA folks that have cypress completely setup. All you need to do is add your tests and application specific functionality. Please ask `dan.reale@semanticbits.com` for login credentials for the template setup.

please refer to the cypress docs:
https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell

# Setting up the Workspace
The QA team uses Intellij IDE as the main development ide for cypress. 

## First, clone the repository into your intellij
## NOTE: DO NOT INSTALL CYPRESS OR ITS RELATED TOOLS AS SUDO/ADMINISTRATOR
Once the repo has been cloned, you can begin working with the repository.
To begin working with the repository, first run `npm install` in the console.

## Cypress - Running Manual
In Intellij, set the debug configurations as follows:


`npm run cypress:open:qa` - opens cypress with the QA config

`npm run cypress:open:dev` - opens cypress with the dev config <- This is where QA performs automation development

## Congifuration and Permissions for Bonnie/MAT
The QA team uses environment variables to ensure data security. 

Please contact Bonnie/MAT QA for the current list of environment variables and values. 

These values should be placed inside the user's `.bash_profile` 

NOTE: In case the user does not own their bash profile, run the following command: `sudo chown your_user_name ~/.bash_profile`

Cypress environment variables should begin with the word `CYPRESS`, for example: `CYPRESS_DEV_PASSWORD`
However, when the environment variable is referenced within the automation suite, the `CYPRESS` portion of the variable should be left out. 

## Visual Diffing
Set your cypress.json or environment config
To compare screenshots against base shots
```
"screenshotsFolder": "cypress/snapshots/actual",
"env": {
    "type": "actual"
  }
```
To take base screenshots
```
"screenshotsFolder": "cypress/snapshots/base",
"env": {
    "type": "base"
  }
```
`cy.compareSnapshot('home');` or `cy.compareSnapshot('home', '0.04');`
Documentation
https://github.com/mjhea0/cypress-visual-regression

### Docker
`docker build -f Dockerfile.ui.cypress -t qppuicypress .` - Builds docker image with node 10 and latest version of chrome
`docker build -f Dockerfile.ui -t qppui .` - builds source code

### Jenkins
setup pipeline build
pull latest from repo
reference the jenkins file in the repo

### Husky
This tool will lint on every commit.

##### Lint
* `npm run lint:cypress` - runs the cypress linter
* `npm run lint:standard` - runs the standard linter for js files
* `npm run lint:standard:fix` - run the linter and fixes any issues it can
* `npm run lint:all` - runs all the linters - jenkins build
* standard linter is ran on every commit and also run as part of the jenkins build




<!-- Docker commands -->

To see list of images
* docker images -a

Running test for the very first time
* docker-compose -f docker-compose.yml up {service name}

To rebuild same docker image
* docker-compose up --build

To remove all the images
* docker rmi -f $(docker images -a -q)

To remove single image
* docker rmi {name or image id}

To remove all the containers and volumes
* docker rm -vf $(docker ps -a -q)

To simply remove everthing
* docker system prune --all

