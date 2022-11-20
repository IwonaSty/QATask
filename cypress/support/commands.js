Cypress.Commands.add('FillSearchWithCorrectValues', (country, city, pickupDate, dropoffDate) => {
    cy.visit('http://qalab.pl.tivixlabs.com', {timeout: 1000})
    cy.get('#country').select(country)
    cy.get('#city').select(city)
    cy.get('#pickup').type(pickupDate)
    cy.get('#dropoff').type(dropoffDate)
    cy.get('.btn').click()
})

Cypress.Commands.add('FillRentForm', (name, last_name, card_number, email) => { 

 })



