const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(process.env.STRIPE_SECRET);


const processPayment = (req, res) => {
    const { product, token } = req.body;
    console.log('SECRET ', process.env.STRIPE_SECRET);
    console.log('PRODUCT ', product);
    console.log('PRICE ', product.price);
    const idempotencyKey = uuidv4();

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchase of ${product.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }
        }, { idempotencyKey })
    }).then(result => {
        res.status(200).json(result)
    }).catch(error => console.log(error))

}

module.exports = {
    processPayment
}