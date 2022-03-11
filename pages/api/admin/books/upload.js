import formidable from 'formidable';

let mv = require('mv');

export const config = {
    api: {
        bodyParser: false
    }
};
  
export default async function handler(req, res) {
    if(req.method !== 'POST') return res.status(405).end();

    const data = await new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm({ multiples: true });

        form.parse(req, (err, fields, files) => {
            if(err) return reject(err);
            let oldPath = files.file.filepath;
            let newPath = `./public/upload/${files.file.originalFilename}`;
            mv(oldPath, newPath, function(err) {

            });
            res.status(200);
            res.json({
                message: 'Upload succesfully',
                fields,
                files
            });
        });
    });
}