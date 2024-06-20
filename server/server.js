const stripe = require('stripe')('sk_test_51O51YbCP0fGgiLA9a4db4LCH3DfKXDdeiidNZUMUFPMgsikPCaLk0ye30yu25KFgiItLZQxo09a0Si0PuWpcVlwI00UCUi8Yl3');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json())

app.get('/',(req, res)=>{
    res.send("Hello, Stripe Payment Integration is in Processing.")
})

app.post('/payment-sheet', async (req, res) => {

    const {amount , currency} = req.body
    // Use an existing Customer ID if this is a returning customer.
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      {customer: customer.id},
      {apiVersion: '2023-10-16'}
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    });
  });

  app.listen(4002, () => console.log("Running on http://192.168.0.101:4002"));