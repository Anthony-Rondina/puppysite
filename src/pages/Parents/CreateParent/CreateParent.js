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
        <div>CreateParent</div>
    )
}
export default CreateParent