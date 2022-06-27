
import { currencyFormatter, dateFormatter, stringFormatter } from '@/shared/formatter'

describe('Give input string value', () => {
  describe('When format is required', () => {
    describe('Then value should be formatted based on locale', () => {
      it('should convert date to en-Us format', () => {
        let dateString = '10-31-2014'
        let returnString = dateFormatter(dateString)
        console.log(returnString)
        expect(returnString).toEqual('October 31, 2014')

        dateString = '09-21-2022'
        returnString = dateFormatter(dateString)
        expect(returnString).toEqual('September 21, 2022')
      })

      it('should convert currency into en-Us currency-format', () => {
        let amount = 54
        expect(currencyFormatter(amount)).toEqual('$54.00')
      })
    })
  })
})