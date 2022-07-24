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
        const { mom } = req.params
        const { dad } = req.params
        const { litter } = req.params
        //Find the post from the ID in params
        const mother = await Parent.findById(mom)
        const father = await Parent.findById(dad)
        const desiredLitter = await Litter.findById(litter)
        //Make the Puppy from the form's body
        Litter.create(body, (err, createdPuppy) => {
            if (!err) {
                desiredLitter.puppies.push(createdPuppy._id)
                //add parents and litter to puppy
                createdPuppy.mother = mother._id
                createdPuppy.father = father._id
                createdPuppy.litter = desiredLitter._id
                //save Puppy to DB
                createdPuppy.save()
                res.status(200).json({ message: "Puppy Created!", createdPuppy })
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