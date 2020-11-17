const express = require('express');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const router = express.Router();

const Member = require('../models/Member');

router.post('/register', async function (req, res) {
  const { name, surname, image, address, lat, lng, username, password } = req.body

  if (name == null || name.length <= 0) {
    res.status(403).json({
      msg: 'please fill name',
      result: {}
    })
  }

  if (surname == null || surname.length <= 0) {
    res.status(403).json({
      msg: 'please fill surname',
      result: {}
    })
  }

  if (image == null || image.length <= 0) {
    res.status(403).json({
      msg: 'please fill image',
      result: {}
    })
  }

  if (address == null || address.length <= 0) {
    res.status(403).json({
      msg: 'please fill address',
      result: {}
    })
  }

  if (lat == null || lat.length <= 0) {
    res.status(403).json({
      msg: 'please fill lat',
      result: {}
    })
  }

  if (lng == null || lng.length <= 0) {
    res.status(403).json({
      msg: 'please fill lng',
      result: {}
    })
  }

  if (username == null || username.length <= 0) {
    res.status(403).json({
      msg: 'please fill username',
      result: {}
    })
  }

  if (password == null || password.length <= 0) {
    res.status(403).json({
      msg: 'please fill password',
      result: {}
    })
  }

  const checkUserName = await Member.findOne({
    username
  })

  if (checkUserName != null) {
    res.status(403).json({
      msg: 'username is already',
      result: {}
    })
  }

  const passwordHash = bcrypt.hashSync(password, 10)
  const member = new Member({
    name: name,
    surname: surname,
    image: image,
    address: address,
    lat: lat,
    lng: lng,
    username: username,
    password: passwordHash
  })

  await member.save()

  res.status(200).json({
    msg: 'success',
    result: { member }
  })
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body
  if (username == null || username.length <= 0) {
    res.status(403).json({
      msg: 'please fill username',
      result: {}
    })
  }

  if (password == null || password.length <= 0) {
    res.status(403).json({
      msg: 'please fill password',
      result: {}
    })
  }

  const member = await Member.findOne({
    username
  })

  if (member) {
    const isCorrect = bcrypt.compareSync(password, member.password)

    if (isCorrect) {
      res.status(200).json({
        msg: 'success',
        result: { member }
      })
    } else {
      res.status(403).json({
        msg: 'Username or Password incorrect',
        result: {}
      })
    }
  } else {
    res.status(403).json({
      msg: 'Username does not exist.',
      result: {}
    })
  }

})

router.put("/updateProfile", async (req, res) => {
  const { memberId, name, surname, image, address, lat, lng } = req.body

  if (memberId == null || memberId.length <= 0) {
    res.status(403).json({
      msg: 'please fill memberId',
      result: {}
    })
  }

  Member.findById(memberId, async (err, member) => {
    if (err) {
      res.status(403).json({
        msg: 'not found member',
        result: {}
      })
    } else {
      member.name = name
      member.surname = surname
      member.image = image
      member.address = address
      member.lat = lat
      member.lng = lng

      await member.save()
      
      res.status(200).json({
        msg: "update success",
        result: {member}
      })
    }
  })
})

module.exports = router;
