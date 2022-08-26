
import { Container, Row, Col, Carousel, Image, Spinner, Button } from 'react-bootstrap'
import styles from "./WelcomePage.module.css"
import { Link } from 'react-router-dom'
export default function WelcomePage() {
    return (
        <Container>
            <img style={{ width: "100%" }} src="https://www.dobermanplanet.com/wp-content/uploads/2018/12/Doberman-Litter-Large.jpg" alt="" />
            <Container className={styles.infoBox}>
                <h2>Welcome to Puppy Parade!</h2>
                <p className={styles.blogPost}>At Puppy Parade we are all about family. We keep our puppies in an environment where they feel like part of a family until they become a part of yours! We give them all individual attention every single day and rarely leave them unattended. We know how we would like our puppy treated and we strive to treat everyone's future puppy like it was part of our family.</p>
            </Container>
            <img style={{ width: "100%" }} src="https://cdn.marketplace.akc.org/media/980925/1648845107_8222_7252.jpg" alt="" />
            <Container className={styles.infoBox}>
                <Link to="/litters"><h2>Our Litters</h2></Link>
                <p className={styles.blogPost}>We prepare our puppies to be a part of your family by first making them a member of ours. We don't treat them as employees or put them off to the side. Every single day they each get special attention alone with one on one time as well as group activities. In the end we want to encourage a space of activity and fun until they end up in your care!</p>
            </Container>
            <img style={{ width: '100%' }} src="https://www.petplace.com/static/ce8d1d9f57d9bb857e6df43981c68528/98569/AdobeStock_128636255.jpg" alt="" />
            <Container className={styles.infoBox}>
                <Link to="/parents"><h2>Our Parents</h2></Link>
                <p className={styles.blogPost}>Our doberman parents live right along the rest of the family. We make sure they always receive proper love, attention and socialization. They are always excited to welcome visitors to see their puppies and are a joy to have around.</p>
            </Container>
        </Container>
    )
}