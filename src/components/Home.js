import React from 'react';
import Image from 'react-bootstrap/Image';
import '../css/Home.css'; // Create this CSS file to style your components

// Mock data to simulate the services
const basicService = [
  { 
    name: 'Tên miền', 
    imgSrc: 'https://helpdesk.inet.vn/public/img/svg/menu-dich-vu/domain-name.svg', 
    title: 'Helpdesk iNET - Hỗ trợ dịch vụ tên miền',
    link : '#'
  },
  { 
    name: 'Hosting', 
    imgSrc: 'https://helpdesk.inet.vn/public/img/svg/menu-dich-vu/hosting.svg', 
    title: 'Helpdesk iNET - Hỗ trợ dịch vụ hosting',
    link : '/hosting' 
  },
  { 
    name: 'Email', 
    imgSrc: 'https://helpdesk.inet.vn/public/img/svg/menu-dich-vu/email.svg', 
    title: 'Helpdesk iNET - Hỗ trợ dịch vụ email',
    link : '/email' 
  },
  { 
    name: 'Cloud VPS', 
    imgSrc: 'https://helpdesk.inet.vn/public/img/svg/menu-dich-vu/cloud-vps.svg',
    title: 'Helpdesk iNET - Hỗ trợ dịch vụ Cloud VPS' 
  },
  { 
    name: 'Cloud Server', 
    imgSrc: 'https://helpdesk.inet.vn/public/img/svg/menu-dich-vu/cloud-vps.svg', 
    title: '' 
  },
  { 
    name: 'SSL', 
    imgSrc: 'https://helpdesk.inet.vn/public/img/svg/menu-dich-vu/ssl.svg', 
    title: 'Helpdesk iNET - Hỗ trợ dịch vụ SSL' 
  },
];

const otherService = [
  { name: 'Backorder', imgSrc: 'https://helpdesk.inet.vn/public/img/svg/menu-dich-vu/backorder-logo.svg', title: 'Helpdesk iNET - Hỗ trợ dịch vụ backorder' },
  { name: 'Sàn tên miền', imgSrc: 'https://helpdesk.inet.vn/public/img/svg/menu-dich-vu/san-ten-mien.svg', title: 'Helpdesk iNET- Hỗ trợ dịch vụ sàn tên miền' },
  { name: 'Google Workspace', imgSrc: '	https://helpdesk.inet.vn/public/img/svg/menu-dich-vu/google-suite.svg', title: '' },
];

const commonServices = [
  { name: 'Tài khoản iNET', imgSrc: 'https://helpdesk.inet.vn/public/img/svg/menu-dich-vu/acc-panel.svg', title: '' },
  { name: 'Đại lý', imgSrc: 'https://helpdesk.inet.vn/public/img/svg/menu-dich-vu/dai-ly.svg', title: '' },
  { name: 'Cộng tác viên', imgSrc: 'https://helpdesk.inet.vn/public/img/svg/menu-dich-vu/affiliate-helpdesk.svg', title: '' },
];

const ServiceList = ({ title, services }) => (
  <>
    <h5 className="mb-25px">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-journal-text" viewBox="0 0 16 16">
        <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
      </svg>{title}
    </h5>
    <div className={`sv-list-content ${title.toLowerCase().replace(' ', '-')}`}>
      {services.map((service, index) => (
        <div className="hm-item anm-df" key={index}>
          <div className='img-sv'>
            <figure className="fig-img-ltr">
              <Image src={service.imgSrc} height="50" width="50" rounded />
            </figure>
          </div>
          <div className='item-title'> 
            <a className="anm-df" href={service.link} title={service.title}>
              <figcaption>
                <h5 className="fig-title">{service.name}</h5>
              </figcaption>
            </a>
          </div>    
        </div>
      ))}
    </div>
  </>
);

const Home = () => (
  <section className="body-container">
    <div className="content">
      <div className="hm-container">
        <div className="heading-group mb-20px">
          <h1 className="mb-5px">Bài viết hướng dẫn</h1>
          <p className="txt-grey-72">Các bài viết hướng dẫn sử dụng dịch vụ tại iNET</p>
        </div>
      </div>
      <br />
        <ServiceList title="Dịch vụ cơ bản" services={basicService} />
        <br />
        <ServiceList title="Dịch vụ khác" services={otherService} />
        <br />
        <ServiceList title="Hệ thống" services={commonServices} /> 
    </div>
  </section>
);

export default Home;
