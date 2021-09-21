import jimp from 'jimp'

jimp.read('id_color.jpg')
    .then(img => {
        return img
            .greyscale() 
            .quality(100)
            .rgba(false)
            .contrast(0.1)
            .write('out.jpg'); // save
    })
    .catch(err => {
        console.error(err);
    });