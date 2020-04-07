import React from 'react'

interface UnauthorizedPageProps {

}

const UnauthorizedPage: React.FC<UnauthorizedPageProps> = () => {
    return <>You shouldn't see this page unless you were authorized to see it.</>;
}

export default UnauthorizedPage