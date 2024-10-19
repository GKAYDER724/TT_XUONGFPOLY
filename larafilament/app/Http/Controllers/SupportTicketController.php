<?php

namespace App\Http\Controllers;

use App\Models\SupportTicket;
use App\Models\SupportTicketFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SupportTicketController extends Controller
{
    // API tạo mới Support Ticket và upload nhiều file
    public function store(Request $request)
    {
        // Validate dữ liệu từ request
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'priority' => 'required|string',
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
                'created_at' => $ticket->created_at,
                'updated_at' => $ticket->updated_at,
                'files' => $files, 
            ]
        ], 201);
    }
}
