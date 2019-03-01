import User from '../models/user.model';

const UserController = {
    emailCheck(req, res) {
        User.findOne()
            .where('email', req.params.email)
            .then(user => {
                if (user)
                    res.status(200).json({ duplicateEmail: true })
                res.status(200).json({ duplicateEmail: false })

            })
            .catch(err => {
                console.log(err);
                res.status(400).json('Failed to check the validation!');
            })
    },

    add(req, res) {
        let user = new User(req.body)
        user.save()
            .then(user => {
                res.status(200).json(user);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json('Failed to add new record!');
            })
    },

    getAll(req, res) {
        User.find((err, users) => {
            if (err) {
                console.log(err);
                res.status(400).json('Failed to get the users!');
            }
            else {
                res.status(200).json(users);
            }
        })
    },

    getById(req, res) {
        User.findById(req.params.id, (err, user) => {
            if (err) {
                console.log(err);
                res.status(400).json('Failed to get the user!');
            }
            else {
                res.status(200).json(user);
            }
        })
    },

    login(req, res) {
        User.find()
            .where('email', req.body.email)
            .where('password', req.body.password)
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json('Failed to login!');
            })
    }
}

export default UserController;