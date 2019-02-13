import React from 'react';
import { mount } from 'enzyme';
import HighlightPop from '../lib/';

describe('<HighlightPop />', () => {
  test('should mount properly', () => {
    const spy = jest.spyOn(HighlightPop.prototype, 'componentDidMount');
    const wrapper = mount(<HighlightPop children={<div />} />);
    expect(spy).toHaveBeenCalled();
    wrapper.unmount();
  });
});
