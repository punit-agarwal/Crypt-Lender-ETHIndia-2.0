# Crypt-Lender-ETHIndia-2.0
Gets you make, retrieve and view Lendings over voice

## About Crypt Lender
Crypt Lender makes lending super easy by utilizing the revolutionizing voice technology and is made on top of google assistant. It replaces the traditional approach for lending and provides users with a hassle-free 2-way communication on the google assistant.

## Steps for Local Development  
#### Only for Windows. Steps for Mac and Linux to be added soon.
This is the official repo for the cloud functions running behind the Google Assistant bot.  
Built using [NodeJs](https://nodejs.org/en/) runtime version 8 taking references from the official documentation for [Action on Google](https://developers.google.com/actions/overview).
To locally build and develop the bot replicate the following steps:

#### 1. Initilise Firebase
Setup the your local environment to work with cloud functions by installing and authenticating the [Firebase CLI](https://firebase.google.com/docs/cli).For cloud functions to work enter the commmand `firebase init` throught the terminal in your preferred directory.

#### 2. Add Functions folder
Clear the contents of the function folder creted in the previous step and clone this repository in that folder using `git clone https://github.com/punit-agarwal/ETHIndia-Crypt-Lender-GoogleAssistant.git

#### 3. Import Dialogflow Agent
Once you have replicated the cloud functions, sign in to dialogflow and create a new Agent. Once agent creation is completed head on to settings and click on **Import as ZIP**.
Use the file named **Dialogflow Agent.zip**. Now go to Integrations tab and click on Google Assistant Integration and then click on Test using Actions Console.

#### 4. Deploying Cloud Functions
Now go back to your local directory where you creted your cloud functions. Change your working dirctory to the functions folder and run the command `firebase deploy --projet [PROJECT_ID].`
Project_ID can be found in the Project settings of actions on google console or in the settings tab of your dialogflow agent. Make sure that the ID at both these locations is same. If not, check the account which you are logged in with.
Once the deploy is complete, copy the deployment URL shown in the terminal and paste it in the webhook column of Fullfilment tab of Dialogflow Agent.

#### 5. Test on Actions Simulator
In your actions console go to the tab TEST and test the bot using your queries. You can also test on your Android device with the same Account logged in.

## Further Steps and Development.
Add in more features of your choice and send in your pull request.


## The problem Crypt Lender solves
Crypt Lender makes lending super easy by utilizing the revolutionizing voice technology and is made on top of google assistant. It replaces the traditional approach for lending and provides users with a hassle-free 2-way communication on the google assistant. We made this product while keeping all the required decentralization needs in mind and came up with a safe and secure application for our users on which they can trust their money. Also, we don't store the private keys of users on our servers, hence ensuring privacy. We plan on providing a complete voice-based dashboard feature wherein users can get all the statistics and realtime information about various lends and borrows without even moving a finger. We believe that user experience plays a major role in what a product can achieve and how much impact it can have. Voice Technology has no doubt a great potential and can take over the market as a major add-on to current UI.

## Challenges we ran into
It was a challenging project to work on which came along with a fair share of hurdles in the way. We faced issues while integrating the google assistant application with the blockchain. We used the Lendroid APIs and faced some challenges in understanding and implementing their platform as a base to ours. Lendroid only works with Kovan Testnet and this is something we had to spend quite a lot of time to find out. Also, their kernel-server is written in python and smart contracts in vyper, both of which we are not much familiar with. So, it was a tough time figuring out these small yet challenging things. However, the Lendroid Team was very helpful and guided us along the way in the hackathon. It was hard as well as fun to get a chance to explore the working of Lendroid. The major challenge we encountered was of signing the transactions while providing complete privacy and security to the users. We had to brainstorm for a while and also discussed our ideas with various mentors before coming up with the final product.

## Technologies used
`nodejs` `Web3JS` `infura` `SmartContract` `Google Assistant` `google text to speech API` `Blockchain using Ethereum` `Google Speech Recognition` `Google cloud platform` `Google Cloud APIs`
