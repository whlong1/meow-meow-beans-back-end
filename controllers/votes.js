const { Vote, Profile } = require('../models')

async function castVote(req, res) {
  try {
    req.body.voterId = req.user.profile.id

    const prevVote = await Vote.findOne({
      where: {
        voterId: req.body.voterId,
        profileId: req.body.profileId
      }
    })

    if (prevVote) {
      prevVote.value = req.body.value
      await prevVote.save()
    } else {
      await Vote.create(req.body)
    }

    const profile = await Profile.findByPk(req.body.profileId,
      { include: [{ model: Vote, as: "votesReceived" }] }
    )

    res.status(200).json(profile)
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

module.exports = {
  castVote,
}