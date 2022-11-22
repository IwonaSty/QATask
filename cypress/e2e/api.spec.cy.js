/// <reference types ="Cypress" />

const ENDPOINT = '/'
const RENT_ENDPOINT = '/rent/4'
const DETAILS_ENDPOINT= '/details/1'

describe('REST API Test of Car Rental Application', () => {
    it('1. Validate Headers', ()=>{
        cy.request(ENDPOINT).as('application')
        cy.get('@application')
            .its('headers')
            .its('content-type')
            .should('include', 'text/html; charset=utf-8')
    })

    it('2. Validate Main Page Status Code 200', ()=>{
        cy.request(ENDPOINT).as('application')
        cy.get('@application')
            .its('status').should('equal', 200)
    })

    it('3. Validate Car Details Status Code 200', ()=>{
        cy.request(DETAILS_ENDPOINT).as('application')
        cy.get('@application')
            .its('status').should('equal', 200)
    })

    it('4. Validate Car Rental Status Code 200', ()=>{
        cy.request(RENT_ENDPOINT).as('application')
        cy.get('@application')
            .its('status').should('equal', 200)
    })


    it('5. Validate Negative Status Code', ()=>{
        cy.request({
            method: 'GET',
            url: RENT_ENDPOINT,
            failOnStatusCode: false,
        }).as('application')
        cy.get('@application')
            .its('status').should('equal', 404)
    })
})