import React from 'react';
import HeaderBottom from '../components/HeaderBottom';
import FeaturedPosts from '../components/FeaturedPosts';

const Tutorials = () => {
    const listTops = [
        { content: "" },
        { content: "" },
        { content: "" },
        { content: "" },
        { content: "" },
        { content: "" }
    ];

    return (
      <>
        <HeaderBottom />
        <section className="body-container">
            <div className="content">
                <div className="hm-container">
                    <FeaturedPosts listTops={listTops} />
                    <div className='row'>
                        <div className='col-sm-7 col-md-8 col-lg-9'></div>
                    </div>
                </div>
            </div>
        </section>
      </>
    );
  };
  
  export default Tutorials;