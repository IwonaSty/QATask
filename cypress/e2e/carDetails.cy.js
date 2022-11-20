const dayjs = require('dayjs')
const TODAY_DATE = dayjs().format('YYYY-MM-DD')
const TOMORROW_DATE = dayjs().add(2,'day').format('YYYY-MM-DD')
const NEXT_WEEK = dayjs().add(6,'day').format('YYYY-MM-DD')
const PREV_DATE = dayjs().add(-2,'day').format('YYYY-MM-DD')

describe('Page with Car Details', () =>{
    
    beforeEach('Fill searching form and click Rent button', () => {
        
        cy.visit('http://qalab.pl.tivixlabs.com', {timeout: 1000})
        cy.FillSearchWithCorrectValues('Poland', 'Wroclaw', TODAY_DATE, NEXT_WEEK)
        cy.contains('Rent').first().click()
        cy.url().should('include' , '/details/3')

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

    it('2. Click Rent button and move to rent form', () => {
    
        cy.contains('Rent!').click()
        cy.url().should('include' , '/rent/')
       
    })

    it('2. Move back to searching page', () => {
    
        cy.contains('Search ').click({force:true})
        cy.url().should('include' , 'tivixlabs.com')
    })


    
})