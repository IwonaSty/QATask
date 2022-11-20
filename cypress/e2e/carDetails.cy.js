describe('Page with Car Details', () =>{
    
    beforeEach('Visit base url', () => {
        cy.visit('http://qalab.pl.tivixlabs.com/')
    })

    it('1. Check the appearance of the main page', () => {
    
        cy.get('.card-header').should('contain', MODEL)
        cy.get('.card-title').should('contain', COMPANY)
        cy.get('.card-text').eq(0).should('contain', 'Price per day: ' + PRICE + '$')
        cy.get('.card-text').eq(1).should('contain', 'Location: ' + COUNTRY + ', ' + CITY)
        cy.get('.card-text').eq(2).should('contain', 'License plate: ' + LICENSE)
        cy.get('.card-text').eq(3).should('contain', 'Pickup date: '+ PICKUP_DATE)
        cy.get('.card-text').eq(4).should('contain', 'Dropoff date: '+ DROPOFF_DATE)
    })

    it('2. Click Rent button', () => {
    
        cy.contains('Rent!').click()
       
    })

    it('2. Move back to searching page', () => {
    
        cy.contains('Search ').click({force:true})
    })


    
})