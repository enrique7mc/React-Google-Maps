import React, { Component } from 'react';

const ListItem = (props) => (
  <li>
    <span>{props.store}</span>
    <img
      src="../assets/delete.png"
      data-index={props.index}
      style={{height: 28, width: 28}}
      onClick={props.onItemDeleted}/>
  </li>
);

module.exports = ListItem;
