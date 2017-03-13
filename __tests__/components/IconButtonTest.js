import test from 'ava'
import React from 'react'
import IconButton from '../../src/components/IconButton'
import { shallow } from 'enzyme'

test('button component structure', t => {
  const wrapper = shallow(<IconButton />);
  t.is(wrapper.name(), 'TouchableOpacity') // root component
  t.is(wrapper.children().length, 1) // has 1 child
});
