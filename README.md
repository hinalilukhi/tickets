This application is design with the purpose of learning microservice architecture concept.

**Technology stack**
**Frontend Technology :** TypeScript, Next.js
**Backend Technology :** Node.js, Express.js
**Databases :** MongoDB, Reddis
**DevOps :** Docker, Kubernets, CI/CD pipeline
**Message Brocker:** Node nats

Number of microservices created are : Auth, Client, Expiration, Order, Payment, Tickets

To run the project please run following command
"git clone .."
"cd tickets"
"skaffold dev"

Task achieved :
1) User can register him self and login
2) Add the ticket for sell
3) Other user can purchase those tickets
4) Real payment gateway has implemented using Stripe.js API
