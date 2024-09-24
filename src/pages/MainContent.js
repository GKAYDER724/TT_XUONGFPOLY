import React from 'react';
import TicketPage from '../pages/TicketPage';

const MainContent = () => {
  return (
    <main className="main-content container mt-4">
    <div className="tiles swiper-container">
        <div className="row swiper-wrapper">
            <div className="col-md-3 swiper-slide">
                <a className="tile d-block text-center" href="#">
                    <div className="tile-icon-absolute">
                        <i className="ls ls-hosting"></i>
                    </div>
                    <div className="tile-stat">0</div>
                    <div className="tile-title">Dịch vụ</div>
                </a>
            </div>
            <div className="col-md-3 swiper-slide">
                <a className="tile d-block text-center" href="#">
                    <div className="tile-icon-absolute">
                        <i className="ls ls-dns"></i>
                    </div>
                    <div className="tile-stat">0</div>
                    <div className="tile-title">Tên miền</div>
                </a>
            </div>
            <div className="col-md-3 swiper-slide">
                <a className="tile d-block text-center" href="#">
                    <div className="tile-icon-absolute">
                        <i className="icon-default ls ls-document"></i>
                    </div>
                    <div className="tile-stat">0</div>
                    <div className="tile-title">Hóa đơn chưa thanh toán</div>
                </a>
            </div>
            <div className="col-md-3 swiper-slide">
                <a className="tile d-block text-center" href="./TicketPage.js">
                    <div className="tile-icon-absolute">
                        <i className="ls ls-ticket-tag"></i>
                    </div>
                    <div className="tile-stat">1</div>
                    <div className="tile-title">Ticket</div>
                </a>
            </div>
        </div>
    </div>

    <div className="client-home-panels row mt-4">
        {/* Panel for Active Products/Services */}
        <div className="col-md-12" id="servicesPanel">
            <div className="panel panel-active-services">
                <div className="panel-heading">
                    <h5 className="panel-title">
                        <i className="ls ls-hosting"></i>
                        Quản lý dịch vụ
                    </h5>
                </div>
                <div className="panel-body no-data text-center">
                    <div className="no-data-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-box-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.004-.001.274-.11a.75.75 0 0 1 .558 0l.274.11.004.001zm-1.374.527L8 5.962 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339Z"/>
                        </svg>
                    </div>
                    <div className="text-dark">No Active Services Found</div>
                    <a href="" className="btn outline-primary mt-2">Đăng ký dịch vụ</a>
                </div>
            </div>
        </div>

        {/* Panel for Recent Support Tickets */}
        <div className="col-md-6" id="ticketsPanel">
            <div className="panel panel-support-tickets">
                <div className="panel-heading">
                    <h5 className="panel-title">
                        <i className="ls ls-ticket-tag"></i>
                        Ticket mới gửi
                    </h5>
                </div>
                <div className="list-group">
                    <a href="/viewticket.php?tid=918832&amp;c=LsJnyeIc" className="list-group-item list-group-item-action">
                        <span className="status-modern">
                            <b>#918832</b> - hỗ trợ phòng ban
                             - <label className="status" style={{ '--status-color': '#000000' }}>Đã trả lời</label><br />
                            <small>Lần cập nhật cuối: 23/09/2024 (15:53)</small>
                        </span>
                    </a>
                </div>
            </div>
        </div>

        {/* Panel for Registering a New Domain */}
        <div className="col-md-6" id="registerDomainPanel">
            <div className="panel panel-domain-register">
                <div className="panel-heading">
                    <h5 className="panel-title">Đăng ký tên miền</h5>
                </div>
                <div className="panel-body">
                    <form method="post" action="domainchecker.php">
                        <input type="hidden" name="token" value="b68127922fa43b54ba1891ca92bb3a153c8a6c83" />
                        <div className="input-group">
                            <input type="text" name="domain" placeholder="Nhập tên miền cần đăng ký" className="form-control" />
                            <div className="input-group-append">
                                <input type="submit" value="Đăng ký" className="btn btn-success" />
                                <input type="submit" name="transfer" value="Chuyển tên miền" className="btn btn-secondary" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</main>

  );
};

export default MainContent;
