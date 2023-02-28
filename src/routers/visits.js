const express = require('express')
const router = new express.Router()
const visitModel = require('../models/visits')

router.get('/', async (req, res) => {
    try {
        res.status(204).send('No operation in this route')
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
        res.status(500).send(`${err}`)
    }
})


router.post('/create-visit', async (req, res) => {
    try {
        const params = req.body.params
        const newVisit  = await visitModel.createVisit(params)
        if(newVisit.Error) throw newVisit.Error

        res.status(201).send(newVisit)
    } catch (err) {
        res.status(500).send(`${err}`)
    }
})

router.put('/update-visit', async (req, res) => {
    try {
        const id = req.body.id
        const params = req.body.params
        const newUpdate = await visitModel.updateVisit(id, params)
        if(newUpdate.Error) throw newUpdate.Error
        res.status(200).send(newUpdate)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.delete('/delete-visit', async (req, res) => {
    try {
        const id = req.body.id
        const newDelete = await visitModel.deleteVisit(id)
        if(newDelete.Error) throw newDelete.Error
        res.status(200).send(newDelete)
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router