import React from "react";
import ReactDOM from "react-dom";
import cornerstone from 'cornerstone-core';

import initCornerstone from "./init";
import wadoUriCustomMetaDataProvider from './metadataProvider'

initCornerstone()
cornerstone.metaData.addProvider(wadoUriCustomMetaDataProvider);

import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
