const mongoose = require('mongoose');

// Установить соединение
mongoose.connect('mongodb://127.0.0.1/artists');

// создать схему
const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 1,
    maxLength: 64,
    trim: true,
    required: true,
  },
  country: {
    type: String,
    minLength: 2,
    maxLength: 64,
    default: 'Ukraine',
  },
  birthday: {
    type: Date,
    max: new Date(),
    required: true,
  },
  careerStartYear: {
    type: Number,
    validate: {
      validator: function (v) {
        return v >= this.birthday.getFullYear();
      },
    },
    max: [new Date().getFullYear(), 'Career cannot start later than today'],
  },
  email: {
    type: String,
  },
  isMale: {
    type: Boolean,
  },
});

// создать модель по схеме
const Atrist = mongoose.model('Artist', artistSchema);

(async function () {
  try {
    // CRUD
    // INSERT - create - create
    // const newArtist = {
    //   name: 'Yuliia Another',
    //   birthday: new Date(2001, 9, 20),
    //   careerStartYear: 2020,
    //   isMale: false,
    // };
    // const createdArtist = await Atrist.create(newArtist);
    // console.log('createdArtist :>> ', createdArtist);
    //
    // SELECT - find - find(фильтр, проекция, пагинация+)
    // get all
    // const foundArtists = await Atrist.find();
    // console.log('foundArtists :>> ', foundArtists);
    // search by name
    // const foundArtists = await Atrist.find({ name: 'Yuliia Sanina' });
    // console.log('foundArtists :>> ', foundArtists);
    // search by name
    // const foundArtists = await Atrist.find({ name: /yuliia/i });
    // console.log('foundArtists :>> ', foundArtists);
    // prijection
    // const foundArtists = await Atrist.find({}, { name: 1, country: 1 });
    // console.log('foundArtists :>> ', foundArtists);
    // pagination
    // const foundArtists = await Atrist.find({}, null, {
    //   sort: { name: 1 },
    //   limit: 1,
    //   skip: 1,
    // });
    // console.log('foundArtists :>> ', foundArtists);
    //
    // find by id
    // const foundArtist = await Atrist.findById('64db8825b6f58e1449ac7abd');
    // console.log('foundArtist :>> ', foundArtist);
    //
    // UPDATE - updateOne/updateMany - updateOne/updateMany/findOneAndUpdate/findByIdAndUpdate(id, как_обновляем, опции)
    // const updatedArtist = await Atrist.findByIdAndUpdate(
    //   '64db8bccf4b99ffc6c58e0f1',
    //   { birthday: new Date(2025, 0, 3) },
    //   {
    //     new: true, // чтобы из метода возвращалось измененное значение
    //     runValidators: true, // чтобы выполнялись валидаторы при обновлении
    //   }
    // );
    // console.log('updatedArtist :>> ', updatedArtist);

    // DELETE - deleteOne/deleteMany - deleteOne/deleteMany/deleteOneAndUpdate/deleteByIdAndUpdate
    const deletedArtist = await Atrist.findByIdAndDelete(
      '64db8bccf4b99ffc6c58e0f1'
    );
    console.log('deletedArtist :>> ', deletedArtist);
  } catch (err) {
    console.log('err :>> ', err);
  }
})();
