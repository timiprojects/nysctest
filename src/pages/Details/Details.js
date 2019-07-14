import React from 'react'
import PropTypes from 'prop-types'
import { Card, Image } from 'semantic-ui-react'

const Details = ({location}) => {
    

    const { title, description, image } = location.data
    return (
        <div>
            <h2>Details</h2>
            <Card fluid>
                <Card.Header>{title}</Card.Header>
                <Card.Content>
                    <Image src={image}/>
                    <Card.Description>
                        {description}
                    </Card.Description>
                </Card.Content>
            </Card>
        </div>
    )
}

Details.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string
}

export default Details

