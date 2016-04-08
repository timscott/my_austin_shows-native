'use strict';
import React, {
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';
import dateFormat from 'dateformat';

class Shows extends React.Component {
  constructor() {
    super();
    this.state = {
      dataBlob: {},
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      }),
      loaded: false
    }
  }
  componentDidMount() {
    fetch('http://my-austin-shows-too.herokuapp.com/shows')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataBlob: responseData
        });
      }).then(() => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(this.state.dataBlob),
          loaded: true
        })
      })
      .done();
  }
  renderDateHeader(sectionData, sectionID) {
    return (
      <Text style={styles.show_group_head} key={sectionID}>
        {dateFormat(sectionID, 'dddd, mmmm dS', true)}
      </Text>
    )
  }
  renderShowCell(show) {
    let acts_views = show.acts.map(function(act) {
      return (
        <View style={{flexDirection: 'row'}} key={act.name}>
          <Text style={styles.act_time}>
            {act.time}
          </Text>
          <Text>
            {act.name}
          </Text>
        </View>
      )
    });
    return (
      <View style={styles.show} key={show._id}>
        {acts_views}
        <Text style={styles.venue}>
          {show.venue}
        </Text>
      </View>
    );
  }
  renderSeparator(sectionID, rowID) {
    return <View key={`${sectionID}-${rowID}`} style={styles.separator} />
  }
  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderShowCell}
        renderSectionHeader={this.renderDateHeader}
        renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
        onEndReachedThreshold={40}
        style={styles.container} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  show_group: {
    marginBottom: 15
  },
  show_group_head: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f7f7f7',
    backgroundColor: '#252222',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  show: {
    margin: 5,
  },
  act: {
  },
  venue: {
    fontWeight: 'bold',
    color: '#4b76b5'
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  act_time: {
    width: 70
  }
});

export default Shows;