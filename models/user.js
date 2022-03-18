import pkg from 'mongoose'
import bcrypt from 'bcryptjs'
const { Schema, model } = pkg

const userSchema = new Schema(
  {
    name: { 
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
)


userSchema.methods.isCorrectPassword = async function (pass) {
  const res = await bcrypt.compare(pass, this.password)
  return !!res || pass === this.password
}

userSchema.pre('save', function (next) {
  const tmpUser = this
  if (this.isModified('password')) {
    bcrypt.hash(tmpUser.password, 10, (_, hash) => {
      tmpUser.password = hash
      next()
    })
  } else {
    next()
  }
})

export default model('User', userSchema, 'users')
