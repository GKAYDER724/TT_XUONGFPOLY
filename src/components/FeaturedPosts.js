import React from 'react';

const FeaturedPosts = ({ listTops }) => {
  return (
    <div className="featured-posts">
      <div className="view-grid">
        {listTops.slice(0, 6).map((ftp, index) => (
          <div key={index}>
            {/* Render your post content here */}
            {ftp.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPosts;