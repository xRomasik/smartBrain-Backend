const signIn = ((req, res, postgres, bcrypt) => {
    // const signIn = (postgres, bcrypt) => (req, res) => { - cleaner way, harder to imagine
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json('inccorect form of submition')
    }
    postgres.select('email', 'hash').from('login')
        .where({ email: email })
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return postgres.select('*')
                    .from('users')
                    .where({ email: email })
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('Unable to login'))
            } else {
                res.status(400).json('wrong credentials')
            }
        })
        .catch(err => res.status(400).json('wrong credentials'))
});

export default signIn;