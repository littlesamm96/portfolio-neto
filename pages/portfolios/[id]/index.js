import BaseLayout from '@/components/layouts/BaseLayout'
import BasePage from '@/components/BasePage'
import { useGetUser } from '@/actions/user'
import PortfolioApi from '@/lib/api/portfolios'
import { formatDate } from 'helpers/functions'
import { useRouter } from 'next/router'

const Portfolio = ({portfolio}) => {

    const { data: dataUser, loading: loadingUser } = useGetUser()
    const router = useRouter()

    return (
        <BaseLayout user={dataUser} loading={loadingUser} navClass="transparent">
            <BasePage 
                noWrapper
                indexPage
                title={`${portfolio.title} - Samm Neto`} 
                metaDescription={portfolio.description}
            >
                <div className="portfolio-detail">
                    <div class="cover-container d-flex h-100 p-3 mx-auto flex-column">
                        <main role="main" class="inner page-cover">
                            { router.isFallback && 
                                <h1 class="cover-heading">Your page is being served ....</h1>
                            }
                            { !router.isFallback &&
                                <>
                                    <h1 class="cover-heading">{portfolio.title}</h1>
                                    <p class="lead dates">{formatDate(portfolio.startDate)} - {formatDate(portfolio.endDate) || 'Present'}</p>
                                    <p class="lead info mb-0">{portfolio.jobTitle} | {portfolio.company} | {portfolio.location}</p>
                                    <p class="lead">{portfolio.description}</p>
                                    <p class="lead">
                                        <a href={portfolio.companyWebsite} target="_" class="btn btn-lg btn-secondary">View Site</a>
                                    </p>
                                </>
                            }
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

    return { paths, fallback: true }
}

export async function getStaticProps({params}) {

    const json = await new PortfolioApi().getById(params.id)
    const portfolio = json.data

    return { props: { portfolio }, revalidate: 1}
}

export default Portfolio