describe('Rent Form', () =>{
    
    beforeEach('Steps to get to the rent form', () => {
        cy.visit('http://qalab.pl.tivixlabs.com/')
        cy.search(COUNTRY, CITY, P_DATE, D_DATE)   //napisać komendę do tego
        cy.get('#rent').click()
        cy.get('#rent').click()
        cy.get('#rent_form').should('be.visible')
    })

    it('1. Check the appearance of the rent form', () => {
        
        cy.get('label[for="name"]').contains('Name (length < 50)')
        cy.get('label[for="last_name"]').contains('Last name (length < 50)')
        cy.get('label[for="card_number"]').contains('Card number (only digits, length < 25)')
        cy.get('label[for="email"]').contains('Email (must contain @ and length < 50)')
        //i jeszcze placeholdery
        cy.get('#name').should('be.empty') //('have.value', '')
        cy.get('#last_name').should('be.empty') //.should('not.have.value')
        cy.get('#card_number').should('be.empty')
        cy.get('#email').should('be.type') 

        cy.get('.btn btn-primary').should('contain', 'Rent').and('be.visible')

    })

    it('2. Click Search button without filling the fields. Check walidations', () => {
    
        cy.get('#name').should('be.empty') //('have.value', '')
        cy.get('#last_name').should('be.empty') //.should('not.have.value')
        cy.get('#card_number').should('be.empty')
        cy.get('#email').should('be.empty') 
        
        cy.get('.btn btn-primary').click().location('pathname', { timeout: 10000 }).should('include', 'http://qalab.pl.tivixlabs.com/rent/1')
        //TO DO: zapisac url do zmiennej

        //walidation: Wrong order of email & car number!
        cy.get('.alert alert-danger').eq(0).should('contain', 'Name is required')
        cy.get('.alert alert-danger').eq(1).should('contain', 'Last name is required')
        cy.get('.alert alert-danger').eq(2).should('contain', 'Card number is required')
        cy.get('.alert alert-danger').eq(3).should('contain', 'Email is required')

    })

    it('3. Fill the obligatory fields with incorrect email value. Check walidations', () => {
    
        cy.get('#name').type()
        cy.get('#last_name').type()
        cy.get('#card_number').type()
        cy.get('#email').type()
        
        cy.get('.btn btn-primary').click().location('pathname', { timeout: 10000 }).should('include', 'http://qalab.pl.tivixlabs.com/rent/1')
        
        cy.get('.alert alert-danger').eq(0).should('contain', 'Please provide valid email')
    })

    it('4. Fill the obligatory fields with strings/ints of length greater than 50/25 chars/ints. Check walidations', () => {
    
        cy.get('#name').type()
        cy.get('#last_name').type()
        cy.get('#card_number').type()
        cy.get('#email').type()
        
        cy.get('.btn btn-primary').click()

        //walidation: Wrong order of email & car number!
        cy.get('.alert alert-danger').eq(0).should('contain', 'Name value is too long')
        cy.get('.alert alert-danger').eq(1).should('contain', 'Last name value is too long')
        cy.get('.alert alert-danger').eq(2).should('contain','Card number value is too long')
        cy.get('.alert alert-danger').eq(3).should('contain', 'Email value is too long')
    })

    it('5. Fill the obligatory fields with strings/ints of length egual 50/25 chars/ints. Check walidations', () => {
    
        cy.get('#name').type()
        cy.get('#last_name').type()
        cy.get('#card_number').type()
        cy.get('#email').type()
        
        cy.get('.btn btn-primary').click()

        //walidation: Wrong order of email & car number. Name & Last name -> error, should walidate (> not >=)
        cy.get('.alert alert-danger').eq(0).should('contain', 'Name value is too long')
        cy.get('.alert alert-danger').eq(1).should('contain', 'Last name value is too long')
        cy.get('.alert alert-danger').eq(2).should('contain','Card number value is too long')
        cy.get('.alert alert-danger').eq(3).should('contain', 'Email value is too long')
    })

    it('6. Fill the obligatory fields with correct values.Happy Path', () => {
    
        y.get('#name').type()
        cy.get('#last_name').type()
        cy.get('#card_number').type()
        cy.get('#email').type()

        cy.get('.btn btn-primary').click()
        cy.contains('Rent').click()
    })
})