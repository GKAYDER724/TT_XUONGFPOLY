<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\DatabaseMessage;
use Illuminate\Notifications\Notification;

class AssignmentNotification extends Notification
{
    use Queueable;

    protected $record;
    protected $assignedUser;

    public function __construct($record, $assignedUser)
    {
        $this->record = $record;
        $this->assignedUser = $assignedUser;
    }

    // Chỉ định kênh gửi là cơ sở dữ liệu (database)
    public function via($notifiable)
    {
        return ['database'];
    }

    // Nội dung thông báo lưu vào cơ sở dữ liệu
    public function toDatabase($notifiable)
    {
        return new DatabaseMessage([
            // 'title' => 'Phân công thành công',
            // 'message' => 'Bạn đã phân công thành công cho: ' . $this->assignedUser->name,
            // 'record_id' => $this->record->id,
            // 'assigned_user_id' => $this->assignedUser->id,
        ]);
    }
}
