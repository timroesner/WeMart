import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/profilepanel.css'

export default class ProfilePanel extends React.Component{

    state = {
        currentTabIndex: null
    };

    renderChildren() {
        const { children, onSelect } = this.props;
        const { currentTabIndex } = this.state;
        let index = 0;

        return React.Children.map(children, (child) => {
                const component = React.cloneElement(child, {
                    index: index,
                    focus: currentTabIndex === index,
                    onClick: onSelect,
                    onMenuItemFocus: this.handleMenuItemFocus
                });
                index += 1;
                return component
        })
    }

    render(){
        return(
            <div className="profile-panel">
                {/*Profile Panel Title*/}
                <h4 className="profile-panel__h4">{this.props.title}</h4>
                {/*Profile Panel Content*/}
                {this.props.content}
                {this.renderChildren()}
            </div>
        );
    }
}

ProfilePanel.propTypes = {
    children: PropTypes.node,
    content: PropTypes.node,
    title: PropTypes.string.isRequired,
    size: PropTypes.string
};