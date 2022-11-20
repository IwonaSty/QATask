describe('Searching Page', () =>{
    
    beforeEach('Visit base url', () => {
        cy.visit('http://qalab.pl.tivixlabs.com/')
    })

    it('1. Check the appearance of the main page', () => {
    
        cy.get('#navbarNav').should('contain', 'Search ')
        cy.get('label[for="country"]').contains('Country')
        cy.get('label[for="city"]').contains('City')
        cy.get('label[for="model"]').contains('Model')
        cy.get('label[for="pickup"]').contains('Pick-up date')
        cy.get('label[for="dropoff"]').contains('Drop-off date')
        cy.get('.btn btn-primary').should('contain', 'Search').and('be.visible')
        cy.get('h3').contains('Please fill pickup and drop off dates')

        cy.get('#country').should('be.empty') //('have.value', '')
        cy.get('#city').should('be.empty') //.should('not.have.value')
        cy.get('#city').should('be.empty')
        cy.get('#pickup').should('be.type') //data
        cy.get('#dropoff').should('') //data

        //check options to select (GERMANY itp)

    })

    it('2. Click Search button without filling the obligatory fields. Check walidations', () => {
    
        cy.get('#country')
        cy.get('#city').should('be.empty') //.should('not.have.value')
        cy.get('#city').should('be.empty')
        cy.get('#pickup').should('be.type') //data
        cy.get('#dropoff').should('') //data
    })

    it('3. Fill the obligatory fields with incorrect values. Check walidations', () => {
    
        cy.get('#country')
        cy.get('#city').should('be.empty') //.should('not.have.value')
        cy.get('#city').should('be.empty')
        cy.get('#pickup').should('be.type') //data
        cy.get('#dropoff').should('') //data
    })

    it('4. Fill the obligatory fields with correct values.', () => {
    
        cy.get('#country')
        cy.get('#city').should('be.empty') //.should('not.have.value')
        cy.get('#city').should('be.empty')
        cy.get('#pickup').should('be.type') //data
        cy.get('#dropoff').should('') //data
    })
})