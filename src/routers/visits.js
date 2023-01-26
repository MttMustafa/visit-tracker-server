const express = require('express')
const router = new express.Router()
const visitModel = require('../models/visits')

router.get('/', async (req, res) => {
    try {
        res.status(200).send('No op in this route')
    } catch (err) {
        res.status(500).send(err)
    }
})


router.get('/read-visit', async (req, res) => {
    try {
        const params = req.query
        const visits = await visitModel.readVisit(params)
        if(visits.Error) throw visits.Error
        res.status(200).send(visits)
    } catch (err) {
        console.log(err)
        res.status(500).send(`${err}`)
    }
})


router.post('/create-visit', async (req, res) => {
    try {
        const params = req.body.params
        console.log(params)
        const newVisit  = await visitModel.createVisit(params)
        if(newVisit.err) throw Error(visits)

        res.status(201).send(newVisit)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.put('/update-visit', async (req, res) => {
    try {
        const id = req.body.id
        const params = req.body.params
        const newUpdate = await visitModel.updateVisit(id, params)
        if(newUpdate.err) throw Error(visits)
        res.status(200).send(newUpdate)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.delete('/delete-visit', async (req, res) => {
    try {
        const id = req.body.id
        const newDelete = await visitModel.deleteVisit(id)
        if(newDelete.err) throw Error(visits)
        res.status(200).send(newDelete)
    } catch (err) {
        res.status(500).send(err)
    }
})
module.exports = router