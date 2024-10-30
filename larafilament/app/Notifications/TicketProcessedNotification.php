<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TicketProcessedNotification extends Notification
{
    use Queueable;

    protected $ticket;

    /**
     * Tạo một instance mới của notification.
     */
    public function __construct($ticket)
    {
        $this->ticket = $ticket;
    }

    /**
     * Xác định những kênh thông báo được sử dụng.
     */
    public function via($notifiable)
    {
        return ['mail']; // Gửi thông báo qua email
    }

    /**
     * Tạo nội dung email.
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->subject('Phiếu hỗ trợ của bạn đã được xử lý')
                    ->greeting('Xin chào!')
                    ->line('Phiếu hỗ trợ của bạn đã được xử lý.')
                    ->line('Tiêu đề: ' . $this->ticket->title)
                    ->line('Nội dung: ' . $this->ticket->content)
                    ->action('Xem chi tiết phiếu hỗ trợ', url('/filament/support-tickets/' . $this->ticket->id))
                    ->line('Cảm ơn bạn đã sử dụng dịch vụ!');
    }
}

