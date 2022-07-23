const Puppy = require('../../models/Puppy');
const Litter = require('../../models/Litter')
const Parent = require('../../models/Parent')

module.exports = {
    create,
    get,
    put,
    show,
    destroy
};

async function get(req, res) {
    try {
        const query = Puppy.find({}).populate('user')
        query.exec((err, foundPuppy) => {
            if (!err) {
                res.status(200).json(foundPuppy)
            } else {
                res.status(400).json({ message: error.message })
            }
        })
    } catch (e) {
        res.status(400).json(e);
    }
}

async function put(req, res) {
    const { body } = req
    const { id } = req.params
    Puppy.findByIdAndUpdate(id, body, { new: true }, (err, updatedPuppy) => {
        if (!err) {
            res.status(200).json(updatedPuppy)
        } else {
            res.status(400).json(err)
        }
    })
}

async function create(req, res) {
    try {
        //get the body from Request
        const { body } = req
        //Find the post from the ID in params
        const user = await User.findById(req.user._id)
        //Make the Puppy from the form's body
        const Puppy = new Puppy(body)
        //push Puppy to the User's Collection
        user.PuppyCollection.push(Puppy._id)
        Puppy.user = req.user._id
        //save Puppy to DB
        Puppy.save()
        //save User to DB
        user.save()
        res.status(200).json({ message: "Worked!" })
    } catch (e) {
        res.status(400).json(e);
    }
}

async function show(req, res) {
    try {
        const query = Puppy.findById(req.params.id).populate([{
            path: 'comments',
            populate:
            {
                path: "user"
            }
        }, {
            path: 'user',
        }])
        query.exec((err, foundPuppy) => {
            if (!err) {
                res.status(200).json(foundPuppy)
            } else {
                res.status(400).json({ message: error.message })
            }
        })
    } catch (e) {
        res.status(400).json(e);
    }

}

async function destroy(req, res) {
    try {
        Puppy.findByIdAndDelete(req.params.id, (err) => {
            if (err) {
                res.status(400).json(err)
            } else {
                res.status(200).json({ message: "Deleted Puppy" });
            }
        })
    } catch (e) {
        res.status(400).json(e);
    }
}