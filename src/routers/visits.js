const express = require('express')
const router = new express.Router()
const visitModel = require('../models/visits')

router.get('/visit', async (req, res) => {
    try {
        const params = req.query
        const visits = await visitModel.readVisit(params)
        res.status(200).send(visits)
    } catch (err) {
        res.status(500).send(err)
    }
})


router.post('/visit', async (req, res) => {
    try {
        const params = req.body.params
        console.log(params)
        const newVisit  = await visitModel.createVisit(params)

        res.status(201).send(newVisit)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.put('/visit', async (req, res) => {
    try {
        const id = req.body.id
        const params = req.body.params
        const newUpdate = await visitModel.updateVisit(id, params)
        res.status(200).send(newUpdate)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.delete('/visit', async (req, res) => {
    try {
        const id = req.body.id
        const newDelete = await visitModel.deleteVisit(id)
        res.status(200).send(newDelete)
    } catch (err) {
        res.status(500).send(err)
    }
})
module.exports = router