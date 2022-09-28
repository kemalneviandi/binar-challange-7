const db = require('../../models')

module.exports = async (req,res) => {
  const { code,userId } = req.body;

  const checkIfRoomExist = await db.user_game_room.findOne({
    where: {roomCode: code}
  })

  if(checkRoomExists) {
    checkIfRoomExist.gameGuestUserId = user.id;
    await checkIfRoomExist.save();

    return res.json({
      status: true,
      code,
      mode: 'guest',
      message:'you are guest'
    })
  }

  await db.user_game_room.create({
    roomCode: code,
    gameMasterUserId: userId,
  })

  res.json({
    status: true,
    code,
    mode: 'master',
    message: 'you are game master'
  })
}