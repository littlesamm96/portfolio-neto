import BaseLayout from '@/components/layouts/BaseLayout'
import BasePage from '@/components/BasePage'
import { useGetUser } from '@/actions/user'
import { Row, Col } from 'reactstrap'
import { useEffect } from 'react'

const About = () => {

    const { data, loading } = useGetUser()

    useEffect(() => {
        return  () => {
            window.__isAboutLoaded = true
        }
    })

    const createFadeInClass = () => {
        if (typeof window !== 'undefined') {
            return window.__isAboutLoaded ? '' : 'fadein'
        }

        return 'fadein'
    }

    return (
        <BaseLayout user={data} loading={loading}>
            <BasePage title="About Me - Samm Neto" className="about-page">
                <Row className="mt-5">
                    <Col md="6">
                        <div className="left-side">
                            <h1 className={`title ${createFadeInClass()}`}>Welcome 🖐🏾</h1>
                            <h4 className={`subtitle ${createFadeInClass()}`}>About Me</h4>
                            <p className={`subsubTitle ${createFadeInClass()}`}>A little information about myself.</p>
                        </div>
                    </Col>
                    <Col md="6">
                        <div className={`${createFadeInClass()}`}>
                            <p>My name is Samm Neto and I am a Software Engineer based within the United Kingdom. </p>
                            <p>
                            I am a Harvard University Computer Science graduate with several years of experience working with a wide range of technologies to build full stack applications software and my projects range from C# development for large-scale, corporate business applications to smaller-scale, modern mobile and web applications.
                            </p>
                            <p>
                            I have gained several certifications in Web Development, Games Development, Android/iOS Development, Networking, Search Engine Optimization, Ethical Hacking, Data Science, Machine Learning, Artificial Intelligence, Computer Vision, Robotics, iOT and Cyber Security.
                            </p>
                            <p>
                            Throughout my career, I have acquired advanced technical knowledge and the ability to explain programming topics clearly and in detail to a broad audience.
                            </p>
                            <p>
                            As part of my recreational activities, I enjoy spending time reading my bible, watching DVD boxsets, NetFlix, F1 and MotoGP as well as playing video games on my PlayStation&reg; console and playing my guitar.
                            </p>
                        </div>
                    </Col>
                </Row>
            </BasePage>
        </BaseLayout>
    )
}

export default About