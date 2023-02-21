/// <reference types="cypress" />

describe('Sign Up page', () => {


  beforeEach (() => {
    cy.visit('/#/register') 
  });

it('should allow to register user', () => {
    const randomNumber = Math.random().toString().slice(2, 9)
    const userName = `testik${randomNumber}`;
    const existingEmail = `${userName}@qa.team`;

    cy.get('[placeholder="Username"]')
    .type(userName)
    
    cy.get('[placeholder="Email"]')
    .type(existingEmail)
    
    cy.get('[placeholder="Password"]')
    .type('SuperPa$$word123');

    cy.contains('.btn', 'Sign up')
    .click();

    cy.get('.swal-modal')
    .should('contain.text', 'Welcome!')

    cy.get(':nth-child(4) > .nav-link')
    .contains(`${userName}`)

    cy.url()
    .should('eq', Cypress.config().baseUrl + '/#/');
});

it('should not allow to register with allready existing email', () => {
  const randomNumber = Math.random().toString().slice(2, 9)
  const username = `testik${randomNumber}`;
  const email = `${username}@qa.team`;
  const password = 'SuperPa$$word123';
  
  cy.request('POST', 'https://conduit.productionready.io/api/users', {
    email,
    password,
    username
  });

  cy.get('[placeholder="Username"]')
  .type(username + '-new')
  
  cy.get('[placeholder="Email"]')
  .type(email)
  
  cy.get('[placeholder="Password"]')
  .type(password);

  cy.contains('.btn', 'Sign up')
  .click()

  cy.get('.swal-modal')
  .should('contain.text', 'Email already taken.')

});

it.skip('should not allow to register with allready existing username', () => { 
  const randomNumber = Math.random().toString().slice(2, 9)
  const username = `testik${randomNumber}`;
  const email = `${username}@qa.team`;
  const password = 'SuperPa$$word123';
  const email2 = `${username}@qaqa.team`;
  
  cy.request('POST', '/users', {
    email,
    password,
    username
  });

  cy.get('[placeholder="Username"]')
  .type(username)
  
  cy.get('[placeholder="Email"]')
  .type(email2)
  
  cy.get('[placeholder="Password"]')
  .type(password);

  cy.contains('.btn', 'Sign up')
  .click()

  cy.get('.swal-modal')
  .should('contain.text', 'Email already taken.')

});

});