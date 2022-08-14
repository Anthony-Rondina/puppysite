import { Carousel } from "react-bootstrap"
const LitterSlide = () => {
    return (
        <Carousel style={{ maxWidth: "1250px", height: "950px" }}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://i2-prod.irishmirror.ie/incoming/article5037461.ece/ALTERNATES/s1200b/puppies-main.jpg"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>Spring 2021 Litter</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://i2-prod.mirror.co.uk/incoming/article5037028.ece/ALTERNATES/s1227b/Rescue-dog-gives-birth-to-a-record-14-Doberman-puppies.jpg"
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h3>Summer 2021 Litter</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://images.squarespace-cdn.com/content/v1/5d4cff87cba6000001952085/1565712359608-AT3EHEAZIWCNT58FCJ9X/processed_20190218_171233.jpg"
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>Winter 2021 Litter</h3>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}
export default LitterSlide