import BaseLayout from '@/components/layouts/BaseLayout'
import BasePage from '@/components/BasePage'
import withAuth from '@/hoc/withAuth'

const OnlyAdmin = ({user, loading}) => {
    return (
        <BaseLayout user={user} loading={loading}>
            <BasePage>
                <h1>Admin - Hello {user.name}</h1>
            </BasePage>
        </BaseLayout>
    )
}

export default withAuth(OnlyAdmin)('admin')