const constants = require('../constant');
const admin = require('firebase-admin');
const {
  reqBody
} = require('../helper');

module.exports.createNewUser = async (req, res) => {
  let response = {
    ...constants.defaultResponseMessage
  }
  try {
    const {
      body
    } = reqBody(req)
    await admin.auth().createUser({
        email: body.email,
        password: 'User123',
      })
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        admin.database().ref('Users').child(userRecord.uid).set({
          ...body,
          role:'user',
          _uid: userRecord.uid
        })

        response.status = 200
        response.message = 'User Berhasil Dibuat'
        response.body = userRecord
      })
      .catch((error) => {
        response.message = error.message
      });

  } catch (error) {
    response.message = error.message
  }

  return res.status(response.status).send(response)
}