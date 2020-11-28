import { createRequire } from 'module';
const require = createRequire(import.meta.url);
// sightengine.check(['faces']).set_url(this.state.imageURL)

const handleApiCall = (req, res) => {
    let sightengine = require('sightengine')('287673599', 'pVZPbBdw3YQsHRYvkt3T');
    sightengine.check(['faces']).set_url(req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Unable to work with API'))
}

const image = ((req, res, postgres) => {
    const { id } = req.body;
    postgres('users')
        .where({ id: id })
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Unable to display entries'))
});

export { image, handleApiCall };