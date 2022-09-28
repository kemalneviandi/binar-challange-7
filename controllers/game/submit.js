const db = require('../../models')

module.exports = async (req, res) => {
  const { code, pick, userId} = req.body;

  const checkIfRoomExists = await db.UserGameRoom.findOne({
    where: {roomCode: code}
  })

  
  if (!checkIfRoomExists) {
    return res.json({
      success: false,
      status: 'settled',
      message: 'room not found',
    })
  }

  const payload = {
    UserGameRoomId: checkIfRoomExists.id,
  }

  if (userId == checkIfRoomExists.gameMasterUserId) {
    Object.assign(payload, {
      playerOneUserId : userId,
      playerOnePick: pick,
    })

    await db.UserGameHistories.create(payload);
    return res.json({
      success: true,
      status: 'pending'
    })
  }
  const checkUserGameHistory = await db.userId_game_history.findOne({
    where: {
      UserGameRoomId: checkIfRoomExist.id,
    }
  })

  if (! checkUserGameHistory) {
    return res.json({
      success: false,
      status: 'settled',
      message: 'history not found'
    })
  }

  checkUserGameHistory.playerTwoUserId = userId;
  checkUserGameHistory.playerTwoPick = pick;
  awawit checkUserGameHistory.save();

  //check the winner
  const {playerOnePick,playerTwoPick} = checkUserGameHistory;
  const result = calculate(playerOnePick, playerTwoPick)

  if (typeof result == 'undefined') {
    checkUserGameHistory.playerOneStatus = 'draw';
    checkUserGameHistory.playerTwoStatus = 'draw';
    checkUserGameHistory.winnerUserId = null; 
  } else if (result === true) {
    checkUserGameHistory.playerOneStatus = 'win';
    checkUserGameHistory.playerTwoStatus = 'lose';
    checkUserGameHistory.winnerUserId = checkUserGameHistory.playerOneUserId;

  } else if (result === false) {
    checkUserGameHistory.playerOneStatus = 'lose';
    checkUserGameHistory.playerTwoStatus = 'win';
    checkUserGameHistory.winneruserId = checkUserGameHistory;
  }
}
