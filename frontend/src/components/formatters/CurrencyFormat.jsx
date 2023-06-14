const CurrencyFormat = (price) => {
    return price.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })
}
export default CurrencyFormat
