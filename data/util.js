const CONSTANT = require('./constant');
const fs = require('fs');
let G_MAIL_LOGIN = CONSTANT.G_MAIL_LOGIN;

module.exports = {

    writeScreenshot: function (pathForImage, image) {


        return new Promise((resolve, reject) =>
            fs.writeFile(
                G_MAIL_LOGIN.PREFIX_SCREEN_SHOT + pathForImage + '.png',
                image,
                'base64',
                err => err ? reject() : resolve()
            )
        )

    }

};
