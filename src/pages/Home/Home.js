import _ from 'lodash'
import React, { Component } from 'react'
import { Input, List, Image, Card, Form, Radio } from 'semantic-ui-react'


// const source = _.times(10, () => ({
//     title: faker.company.companyName(),
//     description: faker.company.catchPhrase(),
//     image: faker.internet.avatar(),
//     size: faker.commerce.productAdjective()
// }))

const source = [
    {
        id: 1,
        title: 'Khaki Shirt',
        has: 'small',
        want: 'large',
        image: '/img/white_shirt.jpg',
    },
    {
        id: 2,
        title: 'Khaki Shirt',
        has: 'medium',
        want: 'large',
        image: '/img/white_shirt.jpg',
    },
    {
        id: 3,
        title: 'Khaki Shirt',
        has: 'large',
        want: 'medium',
        image: '/img/white_shirt.jpg',
    },
    {
        id: 4,
        title: 'Khaki Jacket',
        has: 'small',
        want: 'medium',
        image: '/img/khaki_shirt.jpg',
    },
    {
        id: 5,
        title: 'Khaki Jacket',
        has: 'medium',
        want: 'small',
        image: '/img/khaki_shirt.jpg',
    },
    {
        id: 6,
        title: 'Khaki Jacket',
        has: 'Large',
        want: 'small',
        image: '/img/khaki_shirt.jpg',
    },
    {
        id: 7,
        title: 'Khaki Trouser',
        has: 'small',
        want: 'large',
        image: '/img/khai_trouser.jpg',
    },
    {
        id: 8,
        title: 'Khaki Trouser',
        has: 'medium',
        want: 'large',
        image: '/img/khaki_trouser.jpg',
    },
    {
        id: 9,
        title: 'Khaki Trouser',
        has: 'Large',
        want: 'medium',
        image: '/img/khaki_trouser.jpg',
    },

]

const initialState = { 
    isLoading: false, 
    results: [], 
    value: '', 
    searchBy: '' }

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = initialState
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (e, {value}) => {
        setTimeout(() => {
            this.setState({
                searchBy: value
            })
        }, 100);
    }

    // getSearchValue = (obj, searchvalue, searchBy) => {
    //     const re = new RegExp(_.escapeRegExp(searchvalue), 'i')
    //     const isMatch = result => re.test(result[searchBy])

    //     let has = 'small'
        
    //     return _.filter(obj, isMatch)
    // }
    getSearchValue = (data, _want) => {
        const give = this.state.searchBy
        const re = new RegExp(_.escapeRegExp(_want), 'i')
        const isMatch = result => re.test(result.has)
        
        const done1 = _.filter(data, isMatch)
        
        
        if(done1.length > 0) {
            const _re = new RegExp(_.escapeRegExp(give), 'i')
            const _isMatch = result => _re.test(result.want)

            const dataDone = _.filter(done1, _isMatch)

            return dataDone
        }
        //console.log(dataDone)

        
    }

    handleSearchChange = (e, { value }) => {
        
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.setState(initialState)
            //let isMatch = result => re.test(result`${searchBy}`)
            this.setState({
                isLoading: false,
                results: this.getSearchValue(source, value),
                searchBy: this.state.searchBy
                //   results: _.filter(source, isMatch),
            })
        }, 200)

        console.log(this.state.searchBy)
    }

    handleItemClick = (e) => {
        console.log(e)
        this.props.history.push({
            pathname: '/details',
            data: e
        })
    }


    render() {
        const { isLoading, results } = this.state
        return (
            <div>
                <Form>
                    <Form.Field>
                        <Input fluid loading={isLoading} icon='search' placeholder='search..' onChange={_.debounce(this.handleSearchChange, 150, {
                            loading: true,
                        })} />
                        Selected value: <b>{this.state.searchBy}</b>
                    </Form.Field>
                    <Form.Field>
                        <small>What do you have?</small>
                        <div><Radio
                            label='Small'
                            name='radioGroup'
                            value='small'
                            checked={this.state.searchBy === 'small'}
                            onChange={this.handleChange}
                        />
                        <Radio
                            label='Medium'
                            name='radioGroup'
                            value='medium'
                            checked={this.state.searchBy === 'medium'}
                            onChange={this.handleChange}
                        />
                        <Radio
                            label='Large'
                            name='radioGroup'
                            value='large'
                            checked={this.state.searchBy === 'large'}
                            onChange={this.handleChange}
                        />
                        </div>
                    </Form.Field>
                </Form>
                {results.map((item, i) => {
                    return (
                        <Card as='a' key={i} fluid>
                            <List selection animated verticalAlign='middle' >
                                <List.Item>
                                    <Image avatar src={item.image} />
                                    <List.Content>
                                        <List.Header>{item.title}</List.Header>
                                        <List.Description>
                                            {item.address}
                                            <small>
                                                <strong>Has: </strong>
                                                <i>{item.has}</i>
                                            </small>
                                            &nbsp;
                                            <small>
                                                <strong>Want: </strong>
                                                <i>{item.want}</i>
                                            </small>
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                            </List>
                        </Card>
                    )
                })}


            </div>
        )
    }
}

export default Home
