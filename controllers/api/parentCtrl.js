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
        const query = Parent.find({}).populate('user')
        query.exec((err, foundParent) => {
            if (!err) {
                res.status(200).json(foundParent)
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
    Parent.findByIdAndUpdate(id, body, { new: true }, (err, updatedParent) => {
        if (!err) {
            res.status(200).json(updatedParent)
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
        //Make the Parent from the form's body
        const Parent = new Parent(body)
        //push Parent to the User's Collection
        user.ParentCollection.push(Parent._id)
        Parent.user = req.user._id
        //save Parent to DB
        Parent.save()
        //save User to DB
        user.save()
        res.status(200).json({ message: "Worked!" })
    } catch (e) {
        res.status(400).json(e);
    }
}

async function show(req, res) {
    try {
        const query = Parent.findById(req.params.id).populate([{
            path: 'comments',
            populate:
            {
                path: "user"
            }
        }, {
            path: 'user',
        }])
        query.exec((err, foundParent) => {
            if (!err) {
                res.status(200).json(foundParent)
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
        Parent.findByIdAndDelete(req.params.id, (err) => {
            if (err) {
                res.status(400).json(err)
            } else {
                res.status(200).json({ message: "Deleted Parent" });
            }
        })
    } catch (e) {
        res.status(400).json(e);
    }
}