/// <reference types="cypress" />

describe('Home page', () => {
  beforeEach (() => {
    cy.visit('/#')
});

it('home page contains main things', () => {
  
  cy.get('.banner > .container > .logo-font')
        .contains ('conduit') 
      cy.get('.container > .nav > :nth-child(1) > .nav-link')
        .contains ('Home')
      cy.get(':nth-child(2) > .nav-link')
        .contains ('Sign in')
      cy.get(':nth-child(3) > .nav-link')
        .contains ('Sign up')
      cy.get('.navbar')
        .contains('conduit')
      cy.contains ('.nav-item','Global Feed')
        .should('exist')
      cy.contains('.sidebar', 'Popular Tags' )
        .should('exist')
});

it('should open Sign In page', () => {
  cy.contains('a', 'Sign in')
    .should('exist')
    .click();

    cy.url()
    .should('include', '/login')

    cy.get('h1.text-xs-center')
    .contains('Sign in')
});

it('should open Sign Up page', () => {
  cy.contains('a', 'Sign up')
    .should('exist')
    .click();

    cy.url()
    .should('include', '/register')

    cy.get('h1.text-xs-center')
    .contains('Sign up')
});
});