import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useRef } from "react"

const CreateParent = () => {
    const name = useRef()
    const bio = useRef()
    const SplashImg = useRef()
    const imgs = useRef()
    const videos = useRef()
    const retired = useRef()


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("/api/parents/", {
                name: name.current.value, bio: bio.current.value, SplashImg: SplashImg.current.value, imgs: imgs.current.value, videos: videos.current.value, retired: retired.current.checked,
            })
            navigate("/parents")
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <h1>Create New Parent</h1>
            <a href="/parents"><button>Back to Parents</button></a>
            <form onSubmit={handleSubmit}>
                <p>Enter name of the Parent</p>
                <input placeholder='Enter name' type="text" ref={name} />
                <p>Enter bio of the Parent</p>
                <textarea placeholder='Enter bio' type="text" ref={bio} />
                <p>Enter splash image Link</p>
                <input placeholder='Enter image link' type="text" ref={SplashImg} />
                <p>Enter other images</p>
                <input placeholder='Enter image links' type="text" ref={imgs} />
                <p>Enter video of the Parent</p>
                <input placeholder='Enter video link' type="text" ref={videos} />
                <p>Is this parent retired?</p>
                <input type="checkbox" ref={retired} />
                <input type="submit" value="Create New Parent" />
            </form>
        </>
    )
}
export default CreateParent