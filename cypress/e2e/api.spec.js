/// <reference types ="Cypress" />

const URL = 'https://localhost'

describe('REST API Test of Car Rental Application', () => {
    it('1. Validate Headers', ()=>{
        cy.request('url').as('application')
        cy.get('@application')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json; charset=utf-8')
    })

    it('2. Validate Status Code 200', ()=>{
        cy.request('url').as('application')
        cy.get('@application')
            .its('status').should('equal', '200')
    })

    it('3. Validate Status Code 201', ()=>{
        cy.request('url').as('application')
        cy.get('@application')
            .its('status').should('equal', '201')
    })

    it('4. Validate Name Value', ()=>{
        cy.request('url').as('application')
        cy.get('@application')
            .its('body').should('include', {name: '' })
    })

    it('5. Validate Negative Status Code', ()=>{
        cy.request({
            method: 'GET',
            url: '',
            failOnStatusCode: false,
        }).as('application')
        cy.get('@application')
            .its('status').should('equal', 404)
    })
})