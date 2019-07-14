import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react'
import { Input, List, Image, Card } from 'semantic-ui-react'


const source = _.times(5, () => ({
  title: faker.company.companyName(),
  description: faker.company.catchPhrase(),
  image: faker.internet.avatar(),
  address: faker.address.streetName(),
  price: faker.finance.amount(1, 100, 2, '$'),
}))

const initialState = { isLoading: false, results: [], value: '' }

class SearchBar extends Component {
  constructor(props){
      super(props);
      this.state = initialState
  }

  handleResultSelect = (e, { result }) => {
      this.setState({value: result.title})
      console.log(result);
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 100)
  }

  handleItemClick = (e, data) => {
    console.log(data)
  }
  

  render() {
    const { isLoading, value, results } = this.state

    return (
        <div>
            <Input fluid loading={isLoading} icon='search' placeholder='search..' onChange={_.debounce(this.handleSearchChange, 150, {
                loading: true,
            })}/>
                {this.state.results.map((item,i) => {
                    return (
                        <Card  key={i} fluid>
                        <List selection animated verticalAlign='middle' onItemClick={this.props.handleClick}>
                            <List.Item>
                                <Image avatar src={item.image} />
                                <List.Content>
                                    <List.Header as='a'>{item.title}</List.Header>
                                    <List.Description>{item.address}</List.Description>
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

export default SearchBar
