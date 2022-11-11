import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Popup } from 'semantic-ui-react';
import moment from 'moment';
import './map-item.css';
export default class MapItem extends Component {
  static propTypes = {
    item: PropTypes.any.isRequired,
    scale: PropTypes.any.isRequired,
    origo: PropTypes.any.isRequired,
    onRemove: PropTypes.func.isRequired
  };
  getIconData(type) {
    switch (type) {
      case 'poi':
        return { name: 'map pin', color: 'orange' };
      case 'pod':
        return { name: 'selected radio', color: 'yellow' };
      case 'wreck':
        return { name: 'remove', color: 'green' };
      case 'base':
        return { name: 'circle thin', color: 'blue' };
      case 'cave':
        return { name: 'angle double down', color: 'purple' };
      case 'resource':
        return { name: 'registered', color: 'olive' };
      default:
        return { name: 'user', color: 'white' };
    }
  }
  renderAdditionalData(item) {
    switch (item.type) {
      case 'poi':
        return <div>{item.comment}</div>;
      case 'pod':
        return <div>{item.comment}</div>;
      default:
        return null;
    }
  }
  render() {
    let { origo, scale, item, onRemove } = { ...this.props };
    let style = { position: 'absolute', left: `${origo.x + item.x * scale - 8}px`, top: `${origo.y + item.y * scale - 8}px` };
    let iconData = this.getIconData(item.type);
    return (
      <Popup
        hoverable
        key={`${item.type}_${item.x}_${item.y}`}
        trigger={
          <div className='map-item-icon' style={style}>
            <Icon name={iconData.name} color={iconData.color} />
            {this.renderAdditionalData(item)}
          </div>
        }
        content={
          <div className='map-item-container'>
            <div className='map-item-name'>
              <span>{item.name}</span>
              <Icon name='remove' color='red' onClick={() => onRemove(item)} />
            </div>
            <div className='map-item-comment'>{item.comment}</div>
            <div className='map-item-coords' style={{ display: 'flex' }}>
              <div style={{ marginRight: '5px' }}>X: {item.x}</div>
              <div style={{ marginRight: '5px' }}>Y: {item.y}</div>
            </div>
            <div className='map-item-added'>{item.added}</div>
            <div className='map-item-added'>Discovered {moment(item.added).from(moment().format('LLL'))}</div>
            <div className='map-item-added'>{JSON.stringify(item)}</div>
          </div>
        }
      />
    );
  }
}
