
import React from 'react'

export default function Story({story}) {
    console.log(story)
  return (
    <img
      src={story.contentimg}
      alt="story"
      width="100%"
      className="h-full w-full object-cover"
    />
  );
}
