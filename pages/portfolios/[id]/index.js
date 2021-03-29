import BaseLayout from '@/components/layouts/BaseLayout'
import BasePage from '@/components/BasePage'
import { useGetUser } from '@/actions/user'
import PortfolioApi from '@/lib/api/portfolios'
import { formatDate } from 'helpers/functions'

const Portfolio = ({portfolio}) => {

    const { data: dataUser, loading: loadingUser } = useGetUser()

    return (
        <BaseLayout user={dataUser} loading={loadingUser} navClass="transparent">
            <BasePage 
                noWrapper
                indexPage
                title={`${portfolio.title} - Samm Neto`} 
                metaDescription={portfolio.description}
            >
                <div className="portfolio-detail">
                    <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
                        <main role="main" className="inner page-cover">
                            <h1 className="cover-heading">{portfolio.title}</h1>
                            <p className="lead dates">{formatDate(portfolio.startDate)} - {formatDate(portfolio.endDate) || 'Present'}</p>
                            <p className="lead info mb-0">{portfolio.jobTitle} | {portfolio.company} | {portfolio.location}</p>
                            <p className="lead">{portfolio.description}</p>
                            <p className="lead">
                                <a href={portfolio.companyWebsite} target="_" class="btn btn-lg btn-secondary">View Site</a>
                            </p>
                        </main>
                    </div>
                </div>
            </BasePage>
        </BaseLayout>
    )
}

export async function getStaticPaths() {

    const json = await new PortfolioApi().getAll()
    const portfolios = json.data
    const paths = portfolios.map(portfolio => {

        return {
            params: { id: portfolio._id }
        }
    })

    return { paths, fallback: false }
}

export async function getStaticProps({params}) {

    const json = await new PortfolioApi().getById(params.id)
    const portfolio = json.data

    return { props: { portfolio }, revalidate: 60}
}

export default Portfolio