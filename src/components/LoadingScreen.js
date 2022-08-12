import React, { memo } from "react";

import { Spin } from "antd";

function LoadingScreen() {
  return (
    <div className="loading-panel">
      <Spin />
    </div>
  );
}

export default memo(LoadingScreen);