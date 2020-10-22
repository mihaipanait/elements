import Popover from '@reach/popover';
import { useRect } from '@reach/rect';
import React, { useRef, useState } from 'react';
import { Button } from 'theme-ui';
import Panel from './PanelComponent';

const ButtonComponent = ({ children, buttonOptions, sx /* ...rest */ }) => {
  const ref = useRef(null);
  const triggerRect = useRect(ref);
  const [showPanel, setShowPanel] = useState(false);
  return (
    <>
      <Button
        ref={ref}
        title={buttonOptions?.title}
        className={buttonOptions?.className ?? 'cl-btn'}
        data-testid={buttonOptions?.testId ?? 'cl-btn'}
        onClick={() => {
          if (buttonOptions?.intercept) {
            try {
              buttonOptions.intercept();
            } catch (err) {
              // eslint-disable-next-line no-console
              console.error(err);
            }
          } else {
            setShowPanel(!showPanel);
          }
        }}
        sx={{
          ...sx
        }}
      >
        {buttonOptions?.icon}
      </Button>

      {showPanel && (
        <Popover
          targetRef={ref}
          position={() => ({
            left: triggerRect?.right + 10,
            top: triggerRect?.top + window.scrollY
          })}
        >
          <Panel
            closable
            onClose={() => setShowPanel(false)}
            sx={{
              fontFamily: 'body',
              zIndex: 2,
              bg: 'transparent'
            }}
          >
            {children}
          </Panel>
        </Popover>
      )}
    </>
  );
};

export default ButtonComponent;
