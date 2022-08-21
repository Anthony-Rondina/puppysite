
import { Container, Row, Col, Carousel, Image, Spinner, Button } from 'react-bootstrap'
import styles from "./homePage.module.css"
export default function Homepage() {
    return (
        <Container>
            <img style={{ width: "100%" }} src="https://i0.wp.com/anythingpawsable.com/wp-content/uploads/2013/07/Dog-Pinscher-Laying-Down.jpg?fit=1920%2C1080&ssl=1" alt="" />
            <Container className={styles.infoBox}>
                <h2>Mission Statement</h2>
                <p className={styles.blogPost}>At Puppy Parade we are all about family. We keep our puppies in an environment where they feel like part of a family until they become a part of yours! We give them all individual attention every single day and rarely leave them unattended. We know how we would like our puppy treated and we strive to treat everyone's future puppy like it was part of our family.</p>
            </Container>
            <img style={{ width: "100%" }} src="https://media-be.chewy.com/wp-content/uploads/2021/06/02102805/Doberman-Pinscher_Featured-Image.jpg" alt="" />
            <Container className={styles.infoBox}>
                <h2>Breeding Rights</h2>
                <p className={styles.blogPost}>We do offer the option to obtain breeding rights. Since we are against the idea of puppy mills, we do charge a fee for this and have you undergo a background check to make sure our puppy is going to a good home. We care about where all our puppies end up.</p>
            </Container>
            <img style={{ width: '100%' }} src="https://cdn.mos.cms.futurecdn.net/isRpC3DBAZMKdHiuxHT3FM.jpg" alt="" />
            <Container className={styles.infoBox}>
                <h2>Important Info</h2>
                <p className={styles.blogPost}>Once you have selected a puppy you like, we welcome and encourage keeping in touch! When the time comes to pick up your four legged family memeber, there will be a welcome package that will include: A small bag of food, collar, toy, and vitamins. We will also go over what shots they've been given and offer advice on ear cropping. You will leave with the knowledge you need to give your puppy the best home!</p>
            </Container>
        </Container>
    )
}