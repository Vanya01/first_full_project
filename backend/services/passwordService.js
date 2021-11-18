const bcrypt = require('bcrypt');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    comparing: async (password, hashPassword) => {
        const isPasswordMathced = await bcrypt.compare(password, hashPassword);

        if (!isPasswordMathced) {
            throw new Error('Wrong email or password!');
        }
    }
};
