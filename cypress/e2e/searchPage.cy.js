const dayjs = require('dayjs')
const TODAY_DATE = dayjs().format('YYYY-MM-DD')
const TOMORROW_DATE = dayjs().add(2,'day').format('YYYY-MM-DD')
const PREV_DATE = dayjs().add(-2,'day').format('YYYY-MM-DD')


describe('Searching Page', () =>{
    
    beforeEach('Should load searching page', () => {
        
        cy.visit('http://qalab.pl.tivixlabs.com', {timeout: 1000})
        cy.url().should('include' , 'tivixlabs.com')
        cy.log('Website loaded')
        cy.title().should('include','Car rent')
    })

    it('1. Check the appearance of the searching page', () => {
    
        cy.get('label[for="country"]').contains('Country')
        cy.get('label[for="city"]').contains('City')
        cy.get('label[for="model"]').contains('Model')
        cy.get('label[for="pickup"]').contains('Pick-up date')
        cy.get('label[for="dropoff"]').contains('Drop-off date')
        cy.get('.btn')
            .should('contain', 'Search')
            .and('be.visible')
        cy.get('.alert').contains('Please fill pickup and drop off dates')

        cy.get('#country').should('have.value', '') //should have the same placeholder as in Model
        cy.get('#city').should('have.value', '')
        //above are the ERRORS (country & city)
        cy.get('#model').should('have.value', '') //i placeholder model
        cy.get('#pickup').should('have.value', '') 
        cy.get('#dropoff').should('have.value', '') //have type - data
    })

    it.only('2. Check the appearance of the results in the table', () => {
        
        cy.get('#country').select('Poland')
        cy.get('#city').select('Cracow')
        cy.get('#pickup').type(TODAY_DATE)
        cy.get('#dropoff').type(TOMORROW_DATE)

        cy.get('.btn').click()

        cy.get('#search-results').should('be.visible')
        cy.get('#search-results').children('thead').children().children().eq('0').contains('#')
        cy.get('#search-results').children('thead').children().children().eq('1').contains('Company')
        cy.get('#search-results').children('thead').children().children().eq('2').contains('Model')
        cy.get('#search-results').children('thead').children().children().eq('3').contains('License plate')
        cy.get('#search-results').children('thead').children().children().eq('4').contains('Price')
        cy.get('#search-results').children('thead').children().children().eq('5').contains('Price per day')
        cy.get('#search-results').children('thead').children().children().eq('6').contains('Action')
       
        //fields should remain as filled
        cy.get('#country').should('have.value','1') //Poland=1, Germany=2, France=3
        cy.get('#city').should('have.value','2') //Cracow = 2, Wroclaw =1, Berlin =3, Paris = 4
        cy.get('#pickup').should('have.value',TODAY_DATE)
        cy.get('#dropoff').should('have.value', TOMORROW_DATE)
    })

    it('3. Click Search button without filling the obligatory fields. Check walidations', () => {
    
        cy.get('.btn').click()
        cy.get('.alert').contains('Please fill pickup and drop off dates')
        
    })

    it('4. Fill the obligatory fields with incorrect values (both DATE-fields as past). Check walidations', () => {
    
        cy.get('#country').select('France')
        cy.get('#city').select('Paris')
        cy.get('#model').type('Mazda')
        cy.get('#pickup').type(TOMORROW_DATE)
        cy.get('#dropoff').type(TODAY_DATE)

        cy.get('.btn').click()
        cy.get('.alert').contains('Please enter a valid date!')

        //fields should remain as filled
        cy.get('#country').should('have.value','3') //Poland=1, Germany=2, France=3
        cy.get('#city').should('have.value','4') //Cracow = 2, Wroclaw =1, Berlin =3, Paris = 4
        cy.get('#pickup').should('have.value',TODAY_DATE)
        cy.get('#dropoff').should('have.value', TOMORROW_DATE)
    })

    it('5. Fill the obligatory fields with incorrect values (select city which is not in the selected country). Check walidations', () => {
    
        cy.get('#country').select('France')
        cy.get('#city').select('Berlin')
        cy.get('#model').type('Mazda')
        cy.get('#pickup').type(TODAY_DATE)
        cy.get('#dropoff').type(TOMORROW_DATE)

        cy.get('.btn').click()
        cy.get('#search-results').should('not.be.visible')
        cy.get('.alert').contains('Please enter a valid city!') //should be similar validation as in the dates
        //here is the ERROR (above)
        //but better consult it with the business analist
    
    })

    it('6. Check the results of searching by date & car model.', () => {
    
        cy.get('#country').select('Poland')
        cy.get('#city').select('Cracow')
        cy.get('#model').type('Mazda')
        cy.get('#pickup').type(TODAY_DATE)
        cy.get('#dropoff').type(TOMORROW_DATE)

        cy.get('.btn').click()
        //list of results should contain only the Mazda type
        cy.get('tbody').children('tr').each(($row)=> 
        {
            cy.get($row).children('td').eq(2).contains('Mazda')
        })

        cy.get('#country').should('have.value','Poland')
        cy.get('#city').should('have.value','Cracow')
        cy.get('#model').should('have.value','Mazda')
        cy.get('#pickup').should('have.value',TODAY_DATE)
        cy.get('#dropoff').should('have.value', TOMORROW_DATE)

        cy.get('#country').select('Poland')
        cy.get('#city').select('Cracow')
        cy.get('#model').clear().type('Volkswagen')
        cy.get('#pickup').type(TODAY_DATE)
        cy.get('#dropoff').type(TOMORROW_DATE)

        cy.get('.btn').click()
        //list of results should contain only the Volkswagen type
        cy.get('tbody').children('tr').each(($row)=> 
        {
            cy.get($row).children('td').eq(2).contains('Volkswagen')
        })
    })

    it('7. Fill the obligatory fields with correct values. Check total price', () => {
    
        cy.get('#country').select('Poland')
        cy.get('#city').select('Cracow')
        cy.get('#model').type('Mazda')
        cy.get('#pickup').type(TODAY_DATE)
        cy.get('#dropoff').type(TOMORROW_DATE)
        //2 days

    })
})