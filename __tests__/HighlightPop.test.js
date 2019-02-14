import React from 'react';
import { render, fireEvent, waitForDomChange } from 'react-testing-library';
import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import HighlightPop from '../src/lib';

describe('HighlightPop', () => {
  let component;
  let text1;
  let text2;

  const ui = (
    <HighlightPop>
      <p data-testid="text1">Hello, world.</p>
      <p data-testid="text2">Saluton Mundo.</p>
    </HighlightPop>
  );

  const uiWithPopoverItems = (
    <HighlightPop
      popoverItems={classname => <span className={classname}>Share</span>}
    >
      <div className="h-popable">
        <p data-testid="t1">Hello, world.</p>
        <p data-testid="t2">Saluton Mundo.</p>
      </div>
    </HighlightPop>
  );

  beforeEach(() => {
    component = render(ui);
    const { getByTestId } = component;
    text1 = getByTestId('text1');
    text2 = getByTestId('text2');
  });
  it('renders properly', () => {
    expect(text1).toBeInTheDocument();
    expect(text2).toBeInTheDocument();
  });

  it('shows popover menu when text is highlighted', () => {
    const { container } = component;
    window.getSelection = () => {
      return {
        getRangeAt: () => ({
          startContainer: {
            parentNode: text1
          },
          endContainer: {
            parentNode: text1
          },
          getBoundingClientRect: () => ({ x: 2, y: 10, width: 100 })
        }),
        toString() {
          return 'Hello';
        }
      };
    };
    fireEvent.mouseUp(text1);
    waitForDomChange({ container });
    const popoverMenu = container.querySelector('.h-popover');
    expect(popoverMenu).toBeInTheDocument();
    fireEvent.mouseDown(popoverMenu);
  });

  it('shows renders with custom popoverItems', () => {
    const { container, getByTestId, getByText } = render(uiWithPopoverItems);
    const node1 = getByTestId('t1');
    window.getSelection = () => {
      return {
        getRangeAt: () => ({
          startContainer: {
            parentNode: node1
          },
          endContainer: {
            parentNode: node1
          },
          getBoundingClientRect: () => ({ x: 2, y: 10, width: 100 })
        }),
        toString() {
          return 'Hello';
        }
      };
    };
    fireEvent.mouseUp(node1);
    waitForDomChange({ container });

    expect(getByText(/share/i)).toBeInTheDocument();
  });

  it("does not show menu when highlighted region doesn't cotain node", () => {
    const { container, getByTestId } = render(uiWithPopoverItems);
    const node1 = getByTestId('t1');
    window.getSelection = () => {
      return {
        getRangeAt: () => ({
          startContainer: {
            parentNode: node1
          },
          endContainer: {
            parentNode: null
          },
          getBoundingClientRect: () => ({ x: 2, y: 10, width: 100 })
        }),
        toString() {
          return 'Hello';
        }
      };
    };
    fireEvent.mouseUp(node1);
    expect(container.querySelector('.h-popover')).not.toBeInTheDocument();
  });

  it('does not show popover menu when highlighted text is empty', () => {
    const { container } = component;
    window.getSelection = () => ({
      toString() {
        return '';
      }
    });

    fireEvent.mouseUp(text1);
    expect(container.querySelector('.h-popover')).not.toBeInTheDocument();
  });

  it('does not show popover menu when highlighted node is not part of scope', () => {
    const { container } = component;
    window.getSelection = () => {
      return {
        getRangeAt: () => ({
          startContainer: {
            parentNode: null
          },
          endContainer: {
            parentNode: null
          }
        }),
        toString() {
          return 'Hello';
        }
      };
    };

    fireEvent.mouseUp(text1);
    expect(container.querySelector('.h-popover')).not.toBeInTheDocument();
  });

  it('does not show popover menu when start node is not the same as end node', () => {
    const { container } = component;
    window.getSelection = () => {
      return {
        getRangeAt: () => ({
          startContainer: {
            parentNode: text1
          },
          endContainer: {
            parentNode: text2
          },
          getBoundingClientRect: () => ({ x: 2, y: 10, width: 100 })
        }),
        toString() {
          return 'Hello';
        }
      };
    };
    fireEvent.mouseUp(text1);
    expect(container.querySelector('.h-popover')).not.toBeInTheDocument();
  });

  it('does not show popover menu when highlighted text has no width', () => {
    const { container } = component;
    window.getSelection = () => {
      return {
        getRangeAt: () => ({
          startContainer: {
            parentNode: text1
          },
          endContainer: {
            parentNode: text1
          },
          getBoundingClientRect: () => ({ x: 2, y: 10, width: 0 })
        }),
        toString() {
          return 'Hello';
        }
      };
    };
    fireEvent.mouseUp(text1);
    expect(container.querySelector('.h-popover')).not.toBeInTheDocument();
  });
});
