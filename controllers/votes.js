const { Vote } = require('../models')

async function create(req, res) {
  try {
    console.log(req.body)
    console.log(req.user)
    req.body.voterId = req.user.profile.id
    const vote = await Vote.create(req.body)
    res.status(200).json(vote)
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: error })
  }
}

async function update(req, res) {
  try {
    const vote = await Vote.findByPk(req.params.id)
    if (vote.voterId === req.user.profile.id) {
      vote.value = req.body.value
      await vote.save()
      res.status(200).json(vote)
    } else {
      throw new Error('Not authorized')
    }
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

module.exports = {
  create,
  update,
}