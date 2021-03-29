import BaseLayout from '@/components/layouts/BaseLayout'
import BasePage from '@/components/BasePage'
import { Row, Col, Button } from 'reactstrap';
import { useRouter } from 'next/router'
import { useGetUser } from '@/actions/user'
import { useDeletePortfolio } from '@/actions/portfolios'
import { useState } from 'react'
import PortfolioApi from '@/lib/api/portfolios'
import PortfolioCard from '@/components/PortfolioCard'
import { isAuthorized } from '@/utils/auth0'

const Portfolios = ({portfolios: initialPortfolios}) => {

    const router = useRouter()
    const [portfolios, setPortfolios] = useState(initialPortfolios)
    const [deletePortfolio, {data, error}] = useDeletePortfolio()
    const {data: dataUser, loading: loadingUser} = useGetUser()

    const _deletePortfolio = async (evt, portfolioId) => {
        
        evt.stopPropagation()
        const isConfirm = confirm('Would you really like to remove this portfolio?')

        if (isConfirm) {
            await deletePortfolio(portfolioId)
            setPortfolios(portfolios.filter(portfolio => portfolio._id !== portfolioId))   
        }     
    }

    return (
        <BaseLayout user={dataUser} loading={loadingUser}>
            <BasePage title="Latest Portfolios - Samm Neto" header="Portfolios" className="portfolio-page">
                <Row>
                    { portfolios.map(portfolio =>
                        <Col key={portfolio._id} onClick={() => { router.push('/portfolios/[id]', `/portfolios/${portfolio._id}`) }} md="4">
                            <PortfolioCard portfolio={portfolio}>
                                { dataUser && isAuthorized(dataUser, 'admin') &&
                                    <>
                                        <Button onClick={(evt) => {
                                            evt.stopPropagation()
                                            router.push('/portfolios/[id]/edit', `/portfolios/${portfolio._id}/edit`)
                                        }} className="mr-2" color="warning">Edit</Button>
                                        <Button onClick={(evt) => _deletePortfolio(evt, portfolio._id)} color="danger">Delete</Button>
                                    </>
                                }
                            </PortfolioCard>
                        </Col>
                    )}
                </Row>
            </BasePage>
        </BaseLayout>
    )
}

export async function getStaticProps() {

    const json = await new PortfolioApi().getAll()
    const portfolios = json.data
    return {
        props: { portfolios },
        revalidate: 1
    }
}

export default Portfolios