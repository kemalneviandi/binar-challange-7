const db = require('../../models')

module.exports = async (req, res) => {
  const { roomCode } = req.params;

  const checkIfRoomExists = await db.user_game_room.findOne({
    where: {roomCode: roomCode}
  })

  // handle when room exist
  if (!checkIfRoomExists) {
    return res.json({
      status: false,
      message: 'room not found',
    })
  }

  const checkUserHistory = await db.user_game_histories.findOne({
    where: {UserGameRoomId: checkIfRoomExists.id}
  })

  if (!checkUserHistory) {
    return res.json({
      status: false,
      message: 'game not found',
    })
  }


  res.json({
    status: ((checkUserHistory.playerOneStatus != null) && (checkUserHistory.playerTwoStatus != null)),
    data: checkUserHistory,
  })
}