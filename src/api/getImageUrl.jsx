export const getImageUrl = async image => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'images_preset');
    formData.append('cloud_name', 'dx3uedzf4');

    if (image) {
        const res = await fetch('https://api.cloudinary.com/v1_1/dx3uedzf4/image/upload', {
            method: 'POST',
            body: formData

        })
        const data = await res.json();

        return data.url;
    }

}