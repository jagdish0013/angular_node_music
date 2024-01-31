var Music = require("../models/music.model");
var multer = require('multer');


// Set up Multer storage for both image and music files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Choose the destination based on the file type (image or music)
    const destination = file.mimetype.startsWith('image/') ? './app/assets/upload/' : './app/assets/music';
    cb(null, destination);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage }).fields([
  { name: 'image', maxCount: 1 },
  { name: 'music', maxCount: 1 },
]);

exports.add = async (req, res) => {

  upload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ error: 'File upload failed!' });
    }

    const imageFile = req.files['image'][0];
    const musicFile = req.files['music'][0];

    try {
      const newMusic = new Music({
        music_name: req.body.music_name,
        description: req.body.description,
        image: imageFile.filename,
        music: musicFile.filename,
      });
  
      const savedMusic = await newMusic.save();
      res.status(201).json({ success : true, message: 'Music added successfully', music: savedMusic });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  
};


exports.list = async (req, res) => {
  Music
        .find()
        .then(saved => {
            let content = {
                data: saved,
                success: true,
                message: 'Record get successfully.'
            };
            return res.send(content);
        })
        .catch(error => {
            let content = {
                data: error,
                success: false,
                message: 'Error while get record'
            };
            return res.send(content);
        })
};

exports.fatchOne = async (req, res) => {

  console.log("call", req.params.id)
  Music
  .findById(req.params.id)
  .then(saved => {
      let content = {
          data: saved,
          success: true,
          message: 'Record Found successfully.'
      };
      return res.send(content);
  })
  .catch(error => {
      let content = {
          data: error,
          success: false,
          message: 'Error while Find record'
      };
      return res.send(content);
  })
};

exports.update = async (req, res) => {

  Music
    .findByIdAndUpdate(req.body.id, req.body)
    .then(saved => {
        let content = {
            data: saved,
            success: true,
            message: 'Record update successfully.'
        };
        return res.send(content);
    })
    .catch(error => {
        let content = {
            data: error,
            success: false,
            message: 'Error while Find record'
        };
        return res.send(content);
    })
};

exports.count = async (req, res) => {

  const totalRecords = await Music.countDocuments();
  res.status(200).json({ count: totalRecords });
};

exports.deleteData = async (req, res) => {

  console.log("delete calll")

  Music
        .findByIdAndRemove(req.params.id)
        .then(saved => {
            let content = {
                data: saved,
                success: true,
                message: 'Record Deleted successfully.'
            };
            return res.send(content);
        })
        .catch(error => {
            let content = {
                data: error,
                success: false,
                message: 'Error while Delete record'
            };
            return res.send(content);
        })
};

exports.search = async (req, res) => {
  console.log("req.body.search")
    Music
    .find({ music_name: req.body.search })
    .then(saved => {
        let content = {
            data: saved,
            success: true,
            message: 'successfully.'
        };
        return res.send(content);
    })
    .catch(error => {
        let content = {
            data: error,
            success: false,
            message: 'Error while record'
        };
        return res.send(content);
    })
}