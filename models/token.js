import pkg from 'mongoose'
const { Schema, model } = pkg

const tokenSchema = new Schema(
  {
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String, required: true}
  },
  { timestamps: true }
)




export default model('Token', tokenSchema, 'tokens')
