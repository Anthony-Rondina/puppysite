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

        Parent.find({}, (err, foundParents) => {
            if (!err) {
                res.status(200).json(foundParents)
            } else {
                res.status(400).json(err)
            }
        })
        // const query = Parent.find({}).populate('litter')
        // query.exec((err, foundParent) => {
        //     if (!err) {
        //         res.status(200).json(foundParent)
        //     } else {
        //         res.status(400).json({ message: error.message })
        //     }
        // })
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
        const { body } = req
        Parent.create(body, (err, createdParent) => {
            if (!err) {
                res.status(200).json({ message: "Parent Created!", createdParent })
            } else {
                res.status(400).json(err)
            }
        })
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