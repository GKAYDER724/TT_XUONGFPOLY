import React from 'react';

const Sidebar = () => {
  return (
    <aside className="main-sidebar">
      {/* Account Info Panel */}
      <div className="panel panel-sidebar panel-client-details">
        <div className="panel-heading">
          <h5 className="panel-title">
            <i className="fas fa-user"></i> Thông tin tài khoản
            <i className="fa fa-chevron-up panel-minimise pull-right"></i>
          </h5>
        </div>
        <div className="panel-body">
          <strong>Kayer Tyk</strong><br />
          186<br />
          Xã Tường Lộc<br />
          Huyện Tam Bình, Vĩnh Long, 700000<br />
          Viet Nam
        </div>
        <div className="panel-footer clearfix">
          <a href="clientarea.php?action=details" className="btn btn-success btn-sm btn-block">
            <i className="fas fa-pencil-alt"></i> Cập nhật
          </a>
          <a href="/logout.php" className="btn btn-outline btn-sm btn-block">Đăng xuất</a>
        </div>
      </div>

      {/* Contacts Panel */}
      <div className="panel panel-client-contacts">
        <div className="panel-heading">
          <h5 className="panel-title">
            <i className="far fa-folder"></i> Thông tin liên hệ
            <i className="fa fa-chevron-up panel-minimise pull-right"></i>
          </h5>
        </div>
        <div className="list-group">
          <div className="list-group-item">Không tìm thấy thông tin liên hệ</div>
          <a href="" className="list-group-item contact-more">
            <i className="fas fa-ticket ls ls-more"></i> Thêm
          </a>
        </div>
        <div className="panel-footer clearfix">
          <a href="" className="btn btn-default btn-sm btn-block">
            <i className="fas fa-plus"></i> Thêm thông tin mới ...
          </a>
        </div>
      </div>

      {/* Shortcuts Panel */}
      <div className="panel panel-sidebar">
        <div className="panel-heading">
          <h5 className="panel-title">
            <i className="fas fa-bookmark"></i> Liên kết nhanh
            <i className="fa fa-chevron-up panel-minimise pull-right"></i>
          </h5>
        </div>
        <div className="list-group">
          <a href="" className="list-group-item">
            <i className="fas fa-ticket ls ls-basket"></i> Đăng ký dịch vụ
          </a>
          <a href="" className="list-group-item">
            <i className="fas fa-ticket ls ls-dns"></i> Đăng ký tên miền
          </a>
          <a href="" className="list-group-item">
            <i className="fas fa-ticket ls ls-reply"></i> Đăng xuất
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
