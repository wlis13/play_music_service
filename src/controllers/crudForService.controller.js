const {
  addMusicService,
  GetAllMusicService,
  getOneMusicService,
  removeAllService,
  updateMusicService,
} = require("../services/addMusicDb.service");

async function getMusicsController(_req, res) {
  try {
    const getMusics = await GetAllMusicService();
    res.status(200).json(getMusics)
  } catch (error) {
    res.status(500).json({ message: `Erro ao buscar todas as músicas: ${error}` })
  }
};

async function getOneMusicController(req, res) {
  try {
    const { title } = req.query;
    const getMusics = await GetAllMusicService();
    const { _id } = getMusics.filter((item) => item.title === title);
    const filteredMusic = await getOneMusicService(_id);
    res.status(200).json(filteredMusic);
  } catch (error) {
    res.status(500).json({ message: `Erro ao buscar uma música: ${error}` })
  }
};

async function addMusicController(req, res) {
  try {
    const newMusic = req.body;
    const responseAddMusic = await addMusicService(newMusic);
    res.status(202).json({ message: responseAddMusic })
  } catch (error) {
    res.status(500).json({ message: `Erro ao adicionar música: ${error}` })
  }
};

async function updateMusicController(req, res) {
  try {
    const musicUpdate = req.body;
    const getMusics = await GetAllMusicService();
    const { _id } = getMusics.find((music) => music.title === musicUpdate.title);
    const updatedMusic = await updateMusicService(_id, musicUpdate);
    res.status(202).json({ message: updatedMusic })
  } catch (error) {
    res.status(500).json({ message: `Erro ao atualizar música: ${error}` });
  }
}

async function removeMusicsController(_req, res) {
  try {
    const responseRemoveMusic = await removeAllService();
    res.status(204).json({ message: `${responseRemoveMusic}` });
  } catch (error) {
    res.status(500).json({ message: `Erro ao remover música: ${error}` })
  }
}


module.exports = {
  addMusicController,
  getMusicsController,
  getOneMusicController,
  removeMusicsController,
  updateMusicController,
}