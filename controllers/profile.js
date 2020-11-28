const profile = ((req, res, postgres) => {
    const { id } = req.params;
    postgres.select('*').from('users').where({ id: id })
        .then(user => {
            if (user.length) {
                res.json(user[0]);
            } else {
                throw err;
            }
        })
        .catch(err => res.status(400).json('Not found'))
});

export default profile;