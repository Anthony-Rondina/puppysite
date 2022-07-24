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
        Litter.find({}, (err, foundLitters) => {
            if (!err) {
                res.status(200).json(foundLitters)
            } else {
                res.status(400).json(err)
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
        const { mom } = req.params
        const { dad } = req.params
        //Find the post from the ID in params
        const mother = await Parent.findById(mom)
        const father = await Parent.findById(dad)
        //Make the Litter from the form's body
        Litter.create(body, (err, createdLitter) => {
            if (!err) {
                createdLitter.mother = mother
                createdLitter.father = father
                res.status(200).json({ message: "Litter Created!", createdLitter })
                createdLitter.save()
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