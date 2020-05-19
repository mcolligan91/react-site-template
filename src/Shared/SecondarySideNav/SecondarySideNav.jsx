import React, {Component} from 'react';
import { Header, Accordion, Menu, Icon, List, Button } from 'semantic-ui-react';
 
import './secondary-side-nav.scss';

class SecondarySideNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: null
        }
    }

    componentDidMount = () => {
        const {initialIndex} = this.props.menuInfo;
        this.setState({ activeIndex: initialIndex });
    }

    handleClick = (e, titleProps) => {
        const {index} = titleProps,
            {activeIndex} = this.state,
            newIndex = activeIndex === index ? -1 : index;
    
        this.setState({ activeIndex: newIndex })
      }

    render() {
        const {activeIndex} = this.state;
        const {menuInfo, handleItemClick} = this.props;

        return (
            <>
                <Menu className='side-nav secondary-side-nav' borderless vertical>
                    <Header className='secondary-side-nav-header' textAlign='center' size='medium'>{menuInfo.title}</Header>
                    {menuInfo.menuItems.map((mainData, i) => {
                        return (
                            <Menu.Item key={i}>
                                {mainData.content && mainData.content.length > 0 ? (
                                    <Accordion styled>
                                        <Accordion.Title key={i} className='second-side-nav-menu-item main-background-color' active=    {activeIndex === i} index={i} onClick={this.handleClick}>
                                            {mainData.content && mainData.content.length > 0 ? (
                                                <Icon name='dropdown' />
                                            ) : (
                                                null
                                            )}
                                            {mainData.title}
                                        </Accordion.Title>
                                        <Accordion.Content active={activeIndex === i}>
                                            <List relaxed selection>
                                                {mainData.content.map((data, i) => {
                                                    return (
                                                        <List.Item key={i} className='second-side-nav-list-item' onClick={handleItemClick}>
                                                            {data.month}
                                                        </List.Item>
                                                    )
                                                })}
                                            </List>
                                        </Accordion.Content>
                                    </Accordion>
                                    ) : (
                                        <Button href={`#${mainData.link}`} className='second-side-nav-menu-item main-background-color' fluid>{mainData.title}</Button>
                                )}
                            </Menu.Item>
                        )
                    })}
                </Menu>
            </>
        )
    }
}

export default SecondarySideNav;