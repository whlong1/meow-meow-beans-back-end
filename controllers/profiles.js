const cloudinary = require('cloudinary').v2
const { Profile, Vote } = require('../models')

async function index(req, res) {
  try {
    const profiles = await Profile.findAll(
      { include: [{ model: Vote, as: "votesReceived" }] }
    )

    const profilesWithAverageVote = profiles.map((p) => {
      const total = p.votesReceived.reduce((sum, v) => sum + v.value, 0)
      const rating = total / p.votesReceived.length
      return { ...p.toJSON(), rating }
    })

    res.status(200).json(profilesWithAverageVote)
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

async function show(req, res) {
  try {
    const profile = await Profile.findByPk(req.params.id,
      { include: [{ model: Vote, as: "votesReceived" }] }
    )

    const total = profile.votesReceived.reduce((sum, v) => sum + v.value, 0)
    const rating = total / profile.votesReceived.length

    res.status(200).json({ ...profile.toJSON(), rating })
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

async function addPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const profile = await Profile.findByPk(req.params.id)
    const image = await cloudinary.uploader.upload(
      imageFile, { tags: `${req.user.email}` }
    )
    profile.photo = image.url
    await profile.save()
    res.status(201).json(profile.photo)
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: error })
  }
}

module.exports = { index, addPhoto, show }