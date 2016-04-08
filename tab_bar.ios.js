'use strict';
import React, {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
} from 'react-native';

import Shows from './shows.ios';

const TabBar = React.createClass({
  displayName: 'My Austin Shows',
  getInitialState: function() {
    return {
      selectedTab: 'shows',
      notifCount: 0,
      presses: 0,
    };
  },
  render: function() {
    return (
      <TabBarIOS
        tintColor='white'
        barTintColor='#191837'>
        <TabBarIOS.Item
          title='Shows'
          icon={ require('image!ticket') }
          iconSize={30}
          selected={this.state.selectedTab === 'shows'}
          onPress={() => {
            this.setState({
              selectedTab: 'shows',
            });
          }}>
          <Shows/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title='Artists'
          icon={ require('image!group')}
          selected={this.state.selectedTab === 'artists'}
          onPress={() => {
            this.setState({
              selectedTab: 'artists'
            });
          }}>
          <View style={{alignItems: 'center', marginTop: 60}}>
            <Text style={{fontSize: 24}}>Under Construction</Text>
          </View>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },

});

export default TabBar;