const bcrypt = require('bcrypt')

const createHas = password => {
    const salt = bcrypt.genSaltSync(10)
    const passwordEncrypted = bcrypt.hashSync( password , salt )
    return passwordEncrypted
}

const useValidPassword = ( user , password ) => {
    return bcrypt.compareSync( password , user.password )
}

module.exports = {
    createHas,
    useValidPassword
}