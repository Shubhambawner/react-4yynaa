import React, { useEffect, useState } from 'react';
import './style.css';
import CornerstoneViewport from 'react-cornerstone-viewport';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import cornerstone from 'cornerstone-core';



export default function App() {

  let [imageIds, setImageIds] = useState([
    'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.11.dcm',
  ])

  let [viewport, setViewport] = useState({})
  let [playing, setPlaying] = useState(false)
  let [Triger, setTriger] = useState(false)
  let state = {
    tools: [
      // Mouse
      {
        name: 'Wwwc',
        mode: 'active',
        modeOptions: { mouseButtonMask: 1 },
      },
      {
        name: 'Zoom',
        mode: 'active',
        modeOptions: { mouseButtonMask: 2 },
      },
      {
        name: 'Pan',
        mode: 'active',
        modeOptions: { mouseButtonMask: 4 },
      },
      // Scroll
      { name: 'StackScrollMouseWheel', mode: 'active' },
      // Touch
      { name: 'PanMultiTouch', mode: 'active' },
      { name: 'ZoomTouchPinch', mode: 'active' },
      { name: 'StackScrollMultiTouch', mode: 'active' },
    ],
    imageIds
    // : [imageIds[0] +  '?frame=' + frame]
  };

  console.log(state.imageIds);

  function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    // Get the FileList object that contains the list of files that were dropped
    const files = evt.target.files;

    // this UI is only built for a single file so just dump the first one
    let file = files[0];
    console.log(file);
    const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
    setImageIds([imageId])
  }

  return (
    <div>
      <h1>Hello Sample using cornerstonejs</h1>
      <input type={'file'} multiple placeholder='drop files' onChange={handleFileSelect}></input>
      <button onClick={() => { setPlaying(!playing) }}>play/pause</button>
      <CornerstoneViewport
        tools={state.tools}
        imageIds={state.imageIds}
        style={{ minWidth: '100%', height: '512px', flex: '1' }}
        isPlaying={playing}
        // frameRate={10}
        onElementEnabled={elementEnabledEvt => {
          const cornerstoneElement = elementEnabledEvt.detail.element;

          // Save this for later
          // this.setState({
          //   cornerstoneElement,
          // });

          console.log('fired', elementEnabledEvt);

          // Wait for image to render, then invert it
          cornerstoneElement.addEventListener(
            'cornerstoneimagerendered',
            imageRenderedEvent => {
              const viewport = imageRenderedEvent.detail.viewport;
              setViewport(viewport)
            }
          );
        }}
      />
      <p>{JSON.stringify(viewport)}</p>
      <p>{JSON.stringify(cornerstone.metaData.get('', state.imageIds[0]))}</p>
    </div>
  );
}
