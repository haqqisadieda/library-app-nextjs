import formadible from 'formidable';
import mv from 'mv';

export default function upload(req, res) {
    return new Promise((resolve, reject) => {
        const form = new formadible.IncomingForm({ multiples: true });

        form.parse(req, (err, fields, files) => {
            if (err) return reject(err);
            let oldPath = files.file.filepath;
            let newPath = `./public/upload/${files.file.originalFilename}`;
            return mv(oldPath, newPath, function (err) {
                if (err) return res.status(500).end();
                return res.json({
                    fields,
                    files,
                });
            });
        });
    });
}
