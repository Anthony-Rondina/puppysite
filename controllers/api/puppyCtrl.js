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
        const query = Puppy.find({}).populate('litter')
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
        //get the body/parents/litter from Request
        const { body } = req
        const { litter } = req.params
        const desiredLitter = await Litter.findById(litter)
        //Make the Puppy from the form's body
        Puppy.create(body, (err, createdPuppy) => {
            if (!err) {
                //add puppy to litter
                desiredLitter.puppies.push(createdPuppy)
                //add parents and litter to puppy
                createdPuppy.mother = desiredLitter.mother
                createdPuppy.father = desiredLitter.father
                createdPuppy.litter = desiredLitter
                //save Puppy to DB
                createdPuppy.save()
                desiredLitter.save()
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
        const query = Puppy.findById(req.params.id).populate('litter')
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
        const { id } = req.params
        const { litter } = req.params
        //Find the post from the ID in params
        const deleteFromLitter = await Litter.findById(litter)
        const litterIndex = deleteFromLitter.puppies.indexOf(id)
        if (litterIndex > -1) { // only splice array when item is found
            deleteFromLitter.puppies.splice(litterIndex, 1); // 2nd parameter means remove one item only
        }
        Puppy.findByIdAndDelete(id, (err) => {
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