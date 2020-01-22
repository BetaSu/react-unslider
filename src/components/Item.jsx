import React, {useRef, useEffect} from 'react';

export default function Item(props) {
  const sliderRef = useRef(null);

  useEffect(() => {
    if(!sliderRef.current) {
      return;
    }

    const el = sliderRef.current;
    let start;
    let delta;

    function onMouseDown(e) {
      start = {x: e.pageX, y: e.pageY};
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('touchmove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchend', onMouseUp);
      window.addEventListener('touchcancel', onMouseUp);
    }

    function onMouseMove(e) {
      delta = {horizontal: e.pageX - start.x, vertical: e.pageY - start.y};
      props.onOffsetChange(delta);
    }

    function onMouseUp() {
      let status = {};
      if(!delta) {
        return;
      }

      if(delta.horizontal > 50) {
        status.horizontal = 1;
      } else if(delta.horizontal < -50) {
        status.horizontal = -1;
      } else {
        status.horizontal = 0;
      }

      if(delta.vertical > 50) {
        status.vertical = 1;
      } else if (delta.vertical < -50) {
        status.vertical = -1;
      } else {
        status.vertical = 0;
      }
 
      props.onChange(status);

      status = undefined;
      delta = undefined;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onMouseUp);
      window.removeEventListener('touchcancel', onMouseUp);
    }

    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('touchstart', onMouseDown);
    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      el.addEventListener('touchstart', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onMouseUp);
      window.removeEventListener('touchcancel', onMouseUp);
    };
  }, []);

  return (
    <div 
      className="unslider-items" 
      {...props} 
      ref={sliderRef}
    />
  );
}