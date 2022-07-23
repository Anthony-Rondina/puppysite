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
        const query = Litter.find({}).populate('user')
        query.exec((err, foundLitter) => {
            if (!err) {
                res.status(200).json(foundLitter)
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
    Litter.findByIdAndUpdate(id, body, { new: true }, (err, updatedLitter) => {
        if (!err) {
            res.status(200).json(updatedLitter)
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
        //Make the Litter from the form's body
        const Litter = new Litter(body)
        //push Litter to the User's Collection
        user.LitterCollection.push(Litter._id)
        Litter.user = req.user._id
        //save Litter to DB
        Litter.save()
        //save User to DB
        user.save()
        res.status(200).json({ message: "Worked!" })
    } catch (e) {
        res.status(400).json(e);
    }
}

async function show(req, res) {
    try {
        const query = Litter.findById(req.params.id).populate([{
            path: 'comments',
            populate:
            {
                path: "user"
            }
        }, {
            path: 'user',
        }])
        query.exec((err, foundLitter) => {
            if (!err) {
                res.status(200).json(foundLitter)
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
        Litter.findByIdAndDelete(req.params.id, (err) => {
            if (err) {
                res.status(400).json(err)
            } else {
                res.status(200).json({ message: "Deleted Litter" });
            }
        })
    } catch (e) {
        res.status(400).json(e);
    }
}