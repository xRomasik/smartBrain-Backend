import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import knex from 'knex'
import handleRegister from './controllers/register.js'
import signIn from './controllers/signin.js'
import { image, handleApiCall } from './controllers/image.js'
import profile from './controllers/profile.js'

const postgres = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'root',
        database: 'smartbrain'
    }
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => { res.json(postgres.users) });

app.post('/signin', (req, res) => { signIn(req, res, postgres, bcrypt) })
//app.post('/signin', signIn(postgres, bcrypt)) - cleaner way/harder to imagine

app.post('/register', (req, res) => { handleRegister(req, res, postgres, bcrypt) })

app.get('/profile/:id', (req, res) => { profile(req, res, postgres, bcrypt) })

app.put('/image', (req, res) => { image(req, res, postgres) })

app.post('/imageurl', (req, res) => { handleApiCall(req, res) })

app.listen(3000, () => { console.log('App is running on port 3000') });