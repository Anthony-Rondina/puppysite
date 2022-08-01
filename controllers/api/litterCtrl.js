const Puppy = require('../../models/Puppy');
const Litter = require('../../models/Litter')
const Parent = require('../../models/Parent');
const { findById } = require('../../models/Parent');

module.exports = {
    create,
    get,
    put,
    show,
    removeLitter,
    destroy
};

async function get(req, res) {
    try {
        const query = Litter.find({}).populate('father mother')
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
    const { mom } = req.params
    const { dad } = req.params
    const { oldmom } = req.params
    const { olddad } = req.params

    const mother = await Parent.findById(mom)
    const father = await Parent.findById(dad)
    Parent.findByIdAndUpdate(oldmom, { $pull: { litters: id } }, { new: true }, function (err, parent) {
        console.log(err)

    });
    Parent.findByIdAndUpdate(olddad, { $pull: { litters: id } }, { new: true }, function (err, parent) {
        console.log(err)
    });
    Litter.findByIdAndUpdate(id, body, { new: true }, (err, updatedLitter) => {
        if (!err) {
            updatedLitter.mother = mother
            updatedLitter.father = father
            console.log("parents added")
            updatedLitter.save()
            Parent.findByIdAndUpdate(mom, { $addToSet: { litters: updatedLitter } }, { returnDocument: 'after' }, (err, updatedLitter) => {

            })
            Parent.findByIdAndUpdate(dad, { $addToSet: { litters: updatedLitter } }, { returnDocument: 'after' }, (err, updatedLitter) => {

            })
            res.status(200).json({ message: "Litter Updated!", updatedLitter })
        } else {
            res.status(400).json(err)
        }
    })
}

async function removeLitter(req, res) {
    const { id } = req.params
    const { mom } = req.params
    const { dad } = req.params
    Parent.findByIdAndUpdate(mom, { $pull: { litters: id } }, { new: true }, function (err, parent) {
        console.log(err)

    });
    Parent.findByIdAndUpdate(dad, { $pull: { litters: id } }, { new: true }, function (err, parent) {
        console.log(err)
    });
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
                createdLitter.save()
                Parent.findByIdAndUpdate(mother._id, { $addToSet: { litters: createdLitter } }, { returnDocument: 'after' }, (err, updatedLitter) => {

                })
                Parent.findByIdAndUpdate(father._id, { $addToSet: { litters: createdLitter } }, { returnDocument: 'after' }, (err, updatedLitter) => {

                })
                res.status(200).json({ message: "Litter Created!", createdLitter })
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
        const query = Litter.findById(req.params.id).populate('father mother')
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