'use-strict'

const { 
    dialogflow,
    SimpleResponse,
    Suggestions,
    LinkOutSuggestion,
    BrowseCarousel,
    BrowseCarouselItem,
    Image,
    BasicCard,
    SignIn,
    RegisterUpdate,
    Button,
  } = require("actions-on-google");

const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp();
const db = admin.firestore();
db.settings({timestampsInSnapshots: true});
const app = dialogflow()
const rp = require('request-promise')
const humanizeDuration = require('humanize-duration')
const moment = require('moment')

app.intent('Default Welcome Intent', (conv) => {
    conv.ask('Greetings! How can I assist?')
    conv.ask(new Suggestions(['Current Orders', 'Make Order', 'Your Orders']))
});

app.intent('lendOrder-getMonitoringFee', (conv) => {
    conv.ask(`Alright! I've got all the details. Do you consent to sign the transaction?`)
    console.log(conv.contexts)
    const context = conv.contexts.get('order')
    console.log('Contexts', context)
});

app.intent('lendOrder-getMonitoringFee - no', (conv) => {
    conv.ask(`❌ Fine the transaction was aborted!`)
    conv.ask(new Suggestions(['Make Order','Current Orders','Your Orders']))
});

app.intent('lendOrder-getMonitoringFee - yes', (conv) => {
    
    console.log('YES',conv.contexts)
    const context = conv.contexts.get('order')
    console.log('Contexts YES', context)
    const parameters = context.parameters
    const orderType = parameters['orderType']
    const collateraltypes = parameters['CollateralTypes']
    const loanamount = parameters['number']
    const loanUnit = parameters['loanamount-unit']
    const interestRate = parameters['interestRate']
    const loanPeriod = parameters['loanPeriod']
    const orderExpiry = parameters['duration.original']
    const monitoringFee = parameters['monitoringFee']
    const orderPlacedAt = Date.now()
    const data = {
        parameters : context.parameters,
        orderDate: orderPlacedAt
    }
    
    return db.collection('transactions').add(data)
    .then(ref => {
        console.log(ref.uid)
        conv.ask(new SimpleResponse({
            text:`️✔️ Done! Your order has been placed successfully.`,
            speech:`️Done! Your order has been placed successfully.`,
        }))
        conv.ask(new BasicCard({
            title: `Order Type: ${orderType.toUpperCase()}`,
            subtitle: `Collateral: ${collateraltypes} | Loan Amount : ${loanamount} ${loanUnit}`,
            text: `Your order comprises ___${interestRate}___ interest rate for ___${loanPeriod}___ with order expiry time of ___${orderExpiry}___  \n_Monitoring Fee: ${monitoringFee}_  \n_Order placed ${moment(orderPlacedAt).fromNow()}..._`,
        }))
        conv.ask(new Suggestions(['Make Order','Current Orders','Your Orders']))
    })
    .catch((err) => {
        console.log(err)
        conv.ask(`Some Error Occured`)
    })
});


app.intent('prevOrders', (conv) => {
    transRef = db.collection('transactions');
    return alltransRef = transRef.get()
    .then((snapshot)=>{
        let i = 0
        let items = []
        
        snapshot.forEach( doc => {
            console.log(i, doc.data())
            let parameters = doc.data().parameters
            console.log(parameters)
            if(i>=0 && i <10){
                items[i] = new BrowseCarouselItem({
                    title: `Order Type: ${parameters['orderType'].toUpperCase()}`,
                    url: `https://google.com`,
                    description: `For the order collateral is ${parameters.CollateralTypes} and loan amount is ${parameters.number} ${parameters['loanamount-unit.original']}. Your order comprises ${parameters.interestRate} interest rate for ${parameters.loanPeriod} with order expiry time of ${parameters['duration.original']}  \nMonitoring Fee: ${parameters.monitoringFee}.`,
                    footer: `Order placed ${moment(doc.data().orderDate).fromNow()}`
                })
            } i++
        });
        conv.ask(`Here are your previous orders:`)
        conv.ask(new BrowseCarousel({
            items: items 
        }));
        conv.ask(new Suggestions(['Make Order','Current Orders']))
    })
});

app.intent('getCurrentOrders', (conv) => {
  const options =  {
    uri : 'https://winged-yeti-201009.appspot.com/offers',
    json: true
  }
  return rp(options)
  .then((response) => {
    const data = response.result
    console.log(data)
    let items = []
    let i = 0
    data.forEach(data => {
        if(i>=0 && i <10){
            items[i] = new BrowseCarouselItem({
                title: `Collateral: ${data['collateralAmount']}`,
                url: `https://google.com`,
                description: `Rate: ${data['interestRatePerDay']}% Loan Duration: ${humanizeDuration(parseInt(data['loanDuration']))}`,
                footer: `🕒 Creation time: ${data['created_at']}`,
              })
        } i++
    })
      conv.ask(`Here are current orders:`);
      conv.ask(new BrowseCarousel({
          items: items 
      }));
      conv.ask(new Suggestions(['Current Orders', 'Make Order', 'Your Orders']))
  })
  .catch((err)=>{
    console.log(err)
    conv.ask('Some Error Occured! Please try again.')
  })
});

exports.fulfillment = functions.https.onRequest(app);
