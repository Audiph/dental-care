<p align="center">
  <a href="" rel="noopener">
 <img src="https://github.com/Audiph/dental-care/assets/83140802/ba2c2bf6-e3fe-4179-8152-c2ddc2cac0fc" alt="Project logo"></a>
</p>

<h3 align="center">Dental Care</h3>

---


<p align="center"> A Full-stack web application with AWS Deployment
    <br> 
</p>

## 📝 Table of Contents
- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>
This user-friendly platform seamlessly connects patients with a comprehensive suite of dental care tools and resources, promoting proactive oral hygiene and simplifying the management of dental appointments.

The online appointment system not only streamlines the booking process but also provides real-time availability, ensuring you can secure a spot that fits seamlessly into your busy schedule.


## 🏁 Getting Started <a name = "getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites
What things you need to install the software and how to install them.

- Install Node and make sure it's working by using the command ```node --version``` or ```npm --version```
- Install any code editor to open the project from there. i.e. VSCode/Sublime/Notepad++ etc.
- Install Docker
- Install minikube and kubectl
- MongoDB Compass

### Installing
A step by step series of examples that tell you how to get a development env running.

- Go to Client folder and install all the packages; do it in Server folder as well:

```
npm install
```

- Go to Server folder and create `.env` file and paste the 1st 3 values there:

```
// MONGO_URL given here exposes a security risk. This will be removed on a later notice.
MONGO_URL='mongodb+srv://admin:d3nt4Lcar3@dental-care-mongodb-clu.uthghds.mongodb.net/dental-care'
JWT_SECRET='DENTALCARE'
PORT=3000
```
  
- You're now set to run the server. Run the command:

```
npm run dev

// Port will be running on 3000 or 9000; http://localhost:3000 is your server's url
```

- 
- Go to Client folder and revert all '${BASE_URL}' removal from the changes [here](https://github.com/Audiph/dental-care/commit/acf072786b7be1a6651d02df5079f67f1befea2a)
  - Just append back all BASE_URL local variable to all axios call 
- Create `.env.local` file from the root and define the BASE_URL value to your server's url `http://localhost:3000`

```
// Just put below code in your .env.local
BASE_URL=http://localhost:3000
```

- You're now set to run the client. You may now try the dental care web app locally:

```
npm run dev

// Port will be running on 5173; http://localhost:5173 is your server's url
```

Demo video can be seen here:
https://1drv.ms/v/s!AodZKpfuye9n2h8nlSPFp12Gyr3F?e=pVcfwF

## 🎈 Usage <a name="usage"></a>
We have 3 different roles in total

### User
- Can apply as Dentist
- Book/Cancel/Remove/Update an Appointment
- See list of Dentist available

### Dentist
- Can see list of users who booked an appointment
- Accept or reject user's booking
- Update his information

### Admin
- See list of users and dentists
- Accept or reject user's dentist application

## 🚀 Deployment <a name = "deployment"></a>
For now, we can utilize its deployment thru Docker image and pulling it to k8s.
- Just go to root folder of Client and Server and run the commands:

```
// For Server
docker build -t <server-name> .

// For Client
docker build -t <client-name> .
```

- For k8s, go to kubernetes folder:

```
minikube start

kubectl apply -f dentalcare.yaml -f dentalcareapi.yaml
```

## ⛏️ Built Using <a name = "built_using"></a>
- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [ReactJS](https://react.dev/) - Web Framework
- [MaterialUI](https://mui.com/) - Web Component Library
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>
- [@Audiph](https://github.com/Audiph) - Initial work
