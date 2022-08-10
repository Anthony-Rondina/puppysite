import axios from 'axios'

export async function uploadImage(formData) {
    try {
        //use axios to post to the upload preset ohtzeh46 with the formdata passed in
        const response = await axios.post("https://api.cloudinary.com/v1_1/anthonyrcodes/image/upload", formData)
        //retrieve the url from the response
        const url = response.data.secure_url
        //return the url
        console.log("url is", url)
        return url
    } catch (error) {
        console.log(error)
    }

}