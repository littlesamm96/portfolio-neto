import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from 'components/BasePage'
import {Container, Row, Col} from 'reactstrap';
import Typed from 'react-typed';
import { useGetUser } from '@/actions/user'
import { useState, useRef, useEffect } from 'react'

const ROLES = [
  'Full Stack Developer', 
  'Data Scientist', 
  'Machine Learning Engineer', 
  'Mobile Applications Developer', 
  'Ethical Hacker', 
  'Network Engineer', 
  'Digital Marketer', 
  'Cyber Security Associate', 
  'Games Developer']

const Index = () => {

  const [ isFlipping, setIsFlipping ] = useState(false)
  const { data, loading } = useGetUser()
  const flipInterval = useRef()

  useEffect(() => {
    startAnimation()
    return () => flipInterval.current && clearInterval(flipInterval.current)
  }, [])

  const startAnimation = () => {
    flipInterval.current = setInterval(() => {
      setIsFlipping(prevFlipping => !prevFlipping)
    }, 20000)
  }

  return (
    <BaseLayout user={data} loading={loading} navClass="transparent" className={`cover ${isFlipping ? 'cover-orange' : 'cover-blue'}`}>
      <BasePage indexPage title="Samm Neto - Software Engineer">
        <div className="main-section">
          <div className="background-image">
            <img src="/images/background-index.png" />
          </div>
          <Container>
            <Row>
              <Col md="6">
                <div className="hero-section">
                  <div className={`flipper ${isFlipping ? 'isFlipping' : ''}`}>
                    <div className="front">
                      <div className="image image-1">
                        <div className="hero-section-content">
                          <h2> Full Stack Developer &amp; Software Engineer </h2>
                          <div className="hero-section-content-intro">
                            Take a look at my portfolio and employment history.
                          </div>
                        </div>
                      </div>
                      <div className="shadow-custom">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                    <div className="back">
                      <div className="image image-2">
                        <div className="hero-section-content">
                          <h2> Full Stack Developer &amp; Software Engineer </h2>
                          <div className="hero-section-content-intro">
                            Ready to tackle a project of any type.
                          </div>
                        </div>
                      </div>
                      <div className="shadow-custom shadow-custom-orange">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6" className="hero-welcome-wrapper">
                <div className="hero-welcome-text">
                  <h1>
                    Welcome to the portfolio website of Samm Neto.
                    Get informed, collaborate and discover projects that I have been working on over the years!
                  </h1>
                </div>
                <Typed strings={ROLES}
                      typeSpeed={70}
                      backSpeed={70}
                      backDelay={1000}
                      loopCount={0}
                      showCursor
                      className="self-typed"
                      cursorChar="|"
                      loop>
                </Typed>
                <div className="hero-welcome-bio">
                  <h1>
                    Happy Browsing ✌🏾!
                  </h1>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </BasePage>
    </BaseLayout>
  )
}

export default Index