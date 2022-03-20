import pkg from 'mongoose'
const { Schema, model } = pkg

const fileSchema = new Schema(
  {
    name: { type: String, required: true},
    size: { type: Number },
    mimetype: { type: String},
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    link: { type: String, required: true}
  },
  { timestamps: true }
)

export default model('File', fileSchema, 'files')
