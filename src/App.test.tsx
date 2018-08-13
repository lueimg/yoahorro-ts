import * as React from 'react';
import App from './App';
import { configure, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter()})

describe('App', () => {
  it('should render app', () => {
    const wrapper = shallow(<App />, { context: {}, disableLifecycleMethods: true});
    expect(toJson(wrapper)).toMatchSnapshot()
  });

})