// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const dayjs = require('dayjs')
const TODAY_DATE = dayjs().format('DD-MM-YYYY')
const TIME_5_MIN_BEFORE = dayjs().subtract(5, 'minutes').format('HH:mm')


Cypress.Commands.add('FillRentForm', (name, last_name, card_number, email) => {  })

Cypress.Commands.add('selectDate', (date) => {
    
    var currentMonth = dayjs().month()
    var currentYear = dayjs().year()
    var dateConverted = dayjs(date, 'DD-MM-YYYY')
    var dateConvertedTemp = dayjs('DD-MM-YYYY')
    var i
        while(dateConverted.year() < currentYear)
        {
            cy.log('prev year')
            for(i = 0; i < 12; i++)
            {
                cy.xpath('//*[@class="datepicker-days"]/table/thead/tr').children('.prev').click({force:true}).wait(WAIT250)
            }
            dateConvertedTemp.subtract(12, 'months').format('DD-MM-YYYY')
            currentYear = dateConvertedTemp.year()
        }
        while(dateConverted.year() > currentYear)
        {
            cy.log('next year')
            for(i = 0; i < 12; i++)
            {
                cy.xpath('//*[@class="datepicker-days"]/table/thead/tr').children('.next').click({force:true}).wait(WAIT250)
            }
            dateConvertedTemp.subtract(-12, 'months').format('DD-MM-YYYY')
            currentYear = dateConvertedTemp.year()
        }
        while(dateConverted.month() < currentMonth){
            cy.log('prev month')
            cy.xpath('//*[@class="datepicker-days"]/table/thead/tr').children('.prev').click({force:true}).wait(WAIT250)
            dateConvertedTemp.subtract(1, 'months').format('DD-MM-YYYY')
            currentMonth = dateConvertedTemp.month()
        }
        while(dateConverted.month() > currentMonth){
            cy.log('next month')
            cy.xpath('//*[@class="datepicker-days"]/table/thead/tr').children('.next').click({force:true}).wait(WAIT250)
            dateConvertedTemp.subtract(-1, 'months').format('DD-MM-YYYY')
            currentMonth = dateConvertedTemp.month()
        }
        var dateInMs=new Date(Date.UTC(dateConverted.year(),dateConverted.month(),dateConverted.date()))
        cy.get('[data-date="'+dateInMs.valueOf()+'"]').click()
})


