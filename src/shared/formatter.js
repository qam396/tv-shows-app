const dateFormatter = function (date) {
  return new Date(date).toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

const currencyFormatter = function (currency) {
  return currency.toLocaleString('en-us', {
    style: 'currency',
    currency: 'USD'
  })
}

export { dateFormatter, currencyFormatter }
