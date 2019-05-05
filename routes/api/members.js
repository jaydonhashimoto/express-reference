const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');

//gets all members
router.get('/', (req, res) => {
    res.json(members);
});

//get single member
router.get('/:id', (req, res) => {
    //some returns a boolean, condition is param
    //if user id exists, return true
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        //req.params.id is a string, need to parse as an int
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `no member with the id of ${req.params.id} found` });
    }

});

//create member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    };

    //if name or email is null
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Please include a name and email' });
    }

    //add new member onto members array
    members.push(newMember);
    res.json(members);
    // res.redirect('/');
});

//update member
router.put('/:id', (req, res) => {
    //some returns a boolean, condition is param
    //if user id exists, return true
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        const updMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                //set member value if value was sent with the req
                //if yes, set to new value, else use old value
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;

                res.json({ msg: 'Member updated', member: member });
            }
        });
    } else {
        res.status(400).json({ msg: `no member with the id of ${req.params.id} found` });
    }

});

//delete member
router.delete('/:id', (req, res) => {
    //some returns a boolean, condition is param
    //if user id exists, return true
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json({
            msg: 'member deleted',
            //return all members except the provided id
            members: members.filter(member => member.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({ msg: `no member with the id of ${req.params.id} found` });
    }

});

module.exports = router;