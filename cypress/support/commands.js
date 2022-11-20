Cypress.Commands.add('VisitPage',()=> {
    cy.clearCookies(),
    cy.clearLocalStorage(),
    cy.visit('http://qalab.pl.tivixlabs.com/', {timeout: 1000})
    cy.url().should('include' , 'tivixlabs.com')
    cy.log('Website loaded')
    cy.title().should('include','Car rent')
    cy.document()
        .should('have.property', 'charset')
        .and('eq', 'UTF-8')
})

Cypress.Commands.add('FillSearchWithCorrectValues', (country, city, pickupDate, dropoffDate) => {
    cy.VisitPage()
    cy.get('#country').select(country)
    cy.get('#city').select(city)
    cy.get('#pickup').type(pickupDate)
    cy.get('#dropoff').type(dropoffDate)
    cy.get('.btn').click()
})

Cypress.Commands.add('FillRentForm', (name, last_name, card_number, email) => { 

 })



