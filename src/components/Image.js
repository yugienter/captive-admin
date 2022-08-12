import React, { memo } from "react";

function Image(props) {
  return (
    <img
      alt=""
      loading="lazy"
      onError={({ currentTarget }) => {
        currentTarget.onerror = null;
        currentTarget.src = "/images/no-image.png";
      }}
      {...props}
    />
  );
}

export default memo(Image);