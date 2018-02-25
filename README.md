# nats-io

# PublishTo  =>  NATS  =>  throughSocketIO  =>  to Browsers

## How to:

## Step 1:

Brew NATS on your MAC:  brew install gnatsd
`start nats daemon: gnatsd -m 8222`
verify your installation: http://localhost:8222
See following? You're good to go

## Step 2:

Now publish messages to NATS server
(on Mac, if you need a telnet brew it:   brew install telnet)
`telnet localhost 4222`
 
and publish a message:
`pub foo 5`
`hello`

## Step 3:

Now cook a web page with Socket IO to receive ( subscribe events ) those message on web and display
