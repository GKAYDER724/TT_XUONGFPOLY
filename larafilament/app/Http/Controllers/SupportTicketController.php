<?php

namespace App\Http\Controllers;

use App\Models\SupportTicket;
use App\Models\SupportTicketFile;
use Illuminate\Http\Request;
use App\Models\User; // Import model User
use App\Notifications\TicketProcessedNotification;
class SupportTicketController extends Controller
{
    public function getReplies($ticket_id)
    {
        // Tìm phiếu cha dựa trên ticket_id
        $ticket = SupportTicket::findOrFail($ticket_id);

        // Lấy danh sách các phiếu con (replies)
        $replies = $ticket->replies()->with('files')->get();

        // Nếu không có replies
        if ($replies->isEmpty()) {
            return response()->json([
                'status' => false,
                'message' => 'Không có phiếu con nào cho phiếu cha này.'
            ], 404);
        }

        // Lấy files của ticket cha
        $parentFiles = $ticket->files->map(function ($file) {
            return [
                'id' => $file->id,
                'file_name' => $file->file_name,
                'file_path' => $file->file_path,
                'file_size' => $file->file_size,
                'file_type' => $file->file_type,
                'created_at' => $file->created_at,
                'updated_at' => $file->updated_at,
            ];
        });

        // Định dạng replies với files
        $formattedReplies = $replies->map(function ($reply) {
            return [
                'id' => $reply->id,
                'title' => $reply->title,
                'content' => $reply->content,
                'priority' => $reply->priority,
                'status' => $reply->status,
                'assigned_to' => $reply->assignedTo ? $reply->assignedTo->name : null,
                'created_at' => $reply->created_at,
                'updated_at' => $reply->updated_at,
                'files' => $reply->files->map(function ($file) {
                    return [
                        'id' => $file->id,
                        'file_name' => $file->file_name,
                        'file_path' => $file->file_path,
                        'file_size' => $file->file_size,
                        'file_type' => $file->file_type,
                        'created_at' => $file->created_at,
                        'updated_at' => $file->updated_at,
                    ];
                })
            ];
        });

        // Trả về thông tin phiếu cha và danh sách replies
        return response()->json([
            'status' => true,
            'message' => 'Lấy ticket thành công',
            'Phiếu Hỏi' => [
                'id' => $ticket->id,
                'title' => $ticket->title,
                'content' => $ticket->content,
                'priority' => $ticket->priority,
                'status' => $ticket->status,
                'assigned_to' => $ticket->assignedTo ? $ticket->assignedTo->name : null,
                'created_at' => $ticket->created_at,
                'updated_at' => $ticket->updated_at,
                'files' => $parentFiles
            ],
            'Phiếu trả lời' => $formattedReplies
        ], 200);
    }
    public function getTicketsByUser($user_id)
    {
        // Lấy tất cả các ticket của người dùng dựa vào user_id với eager loading files
        $tickets = SupportTicket::where('user_id', $user_id)
            ->whereNull('support_ticket_id')
            ->with('files')
            ->get();

        // Nếu không tìm thấy ticket nào
        if ($tickets->isEmpty()) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy ticket nào cho người dùng này.'
            ], 404);
        }

        // Định dạng tickets với files
        $formattedTickets = $tickets->map(function ($ticket) {
            return [
                'id' => $ticket->id,
                'title' => $ticket->title,
                'content' => $ticket->content,
                'priority' => $ticket->priority,
                'status' => $ticket->status,
                'created_at' => $ticket->created_at,
                'updated_at' => $ticket->updated_at,
                'files' => $ticket->files->map(function ($file) {
                    return [
                        'id' => $file->id,
                        'file_name' => $file->file_name,
                        'file_path' => $file->file_path,
                        'file_size' => $file->file_size,
                        'file_type' => $file->file_type,
                        'created_at' => $file->created_at,
                        'updated_at' => $file->updated_at,
                    ];
                })
            ];
        });

        return response()->json([
            'status' => true,
            'message' => 'Lấy ticket thành công',
            'tickets' => $formattedTickets
        ]);
    }
    // API tạo mới Support Ticket và upload nhiều file
    public function store(Request $request)
    {
        // Validate dữ liệu từ request
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'priority' => 'required|string',
            'user_id' => 'required|integer',
            'status' => 'required|string',
            'files' => 'required|array', // Đảm bảo 'files' là một mảng
            // 'files.*' => 'file|mimes:jpg,jpeg,png,pdf,docx|max:2048' // Quy định file được phép
        ]);

        // Tạo support ticket
        $ticket = SupportTicket::create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'priority' => $validated['priority'],
            'status' => $validated['status'],
            'user_id' => $validated['user_id'],
            // 'department_id' => $validated['department_id'],
        ]);

        // Xử lý upload nhiều file
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                // Lưu file vào storage/app/public/tickets
                $filePath = $file->store('tickets', 'public');

                // Tạo bản ghi file liên kết với support ticket
                SupportTicketFile::create([
                    'support_ticket_id' => $ticket->id,
                    'file_name' => $file->getClientOriginalName(),
                    'file_path' => $filePath,
                    'file_size' => $file->getSize(),
                    'file_type' => $file->getClientMimeType(),
                ]);
            }
        }
        $leaders = User::where('is_leader', 1)->get();

        // Gửi thông báo cho trưởng phòng

        // Lấy danh sách file liên kết với support ticket
        $files = $ticket->files->map(function ($file) {
            return [
                'id' => $file->id,
                'file_name' => $file->file_name,
                'file_path' => $file->file_path,
                'file_size' => $file->file_size,
                'file_type' => $file->file_type,
                'created_at' => $file->created_at,
                'updated_at' => $file->updated_at,
            ];
        });

        return response()->json([
            'status' => true,
            'message' => 'Lấy dữ liệu thành công',
            'ticket' => [
                'id' => $ticket->id,
                'title' => $ticket->title,
                'content' => $ticket->content,
                'priority' => $ticket->priority,
                'status' => $ticket->status,
                'user_id' => $ticket->user_id,
                // 'department_id' => $ticket->department_id,
                'created_at' => $ticket->created_at,
                'updated_at' => $ticket->updated_at,
                'files' => $files,
            ]
        ], 201);
    }
}
