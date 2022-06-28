
import { currencyFormatter, dateFormatter, stringFormatter } from '@/shared/formatter'

describe('formatter', () => {
  describe('Give string values to the fuction', () => {
    describe('When string to be formatted', () => {
      it('Then we expect to convert date to en-Us format', () => {
        let dateString = '10-31-2014'
        let returnString = dateFormatter(dateString)
        expect(returnString).toEqual('October 31, 2014')

        dateString = '09-21-2022'
        returnString = dateFormatter(dateString)
        expect(returnString).toEqual('September 21, 2022')
      })

      it('Then we expect to convert currency into en-Us currency-format', () => {
        let amount = 54
        expect(currencyFormatter(amount)).toEqual('$54.00')
      })
    })
  })
})
