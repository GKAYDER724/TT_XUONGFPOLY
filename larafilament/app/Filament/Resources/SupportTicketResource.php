<?php

namespace App\Filament\Resources;


use App\Filament\Resources\SupportTicketResource\Pages;
use App\Filament\Resources\SupportTicketResource\RelationManagers;
use App\Models\SupportTicket;
use Filament\Forms;
use Filament\Forms\Components\Fieldset;
use Filament\Forms\Form;
use App\Models\User;
use App\Models\Department;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Request;
use Filament\Forms\Components\FileUpload;
use Illuminate\Support\HtmlString;
use App\Models\Post;
use Filament\Forms\Components\Placeholder;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\SupportTicketResource\RelationManagers\SupportTicketRepliesRelationManager;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use App\Notifications\AssignmentNotification;
use Filament\Tables\Actions\Action;
use App\Models\SupportTicketFile;




class SupportTicketResource extends Resource
{

    protected static ?string $model = SupportTicket::class;
    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?int $navigationSort = 1;
    protected static ?string $navigationGroup = 'Chức năng';
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Grid::make(1)
                ,
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('department.name') // Sử dụng tên trường quan hệ
                    ->label('Phòng Ban'),


                Tables\Columns\TextColumn::make('title')
                    ->label('Tiêu đề')
                    ->searchable(),

                Tables\Columns\TextColumn::make('content')
                    ->label('Nội dung')
                    ->limit(50), // Giới hạn hiển thị nội dung

                Tables\Columns\TextColumn::make('file_path')
                    ->label('Tệp đính kèm')
                    ->formatStateUsing(function ($state) {
                        if ($state) {
                            $filename = pathinfo($state, PATHINFO_FILENAME);
                            $extension = pathinfo($state, PATHINFO_EXTENSION);
                            return substr($filename, 0, 5) . '.' . $extension;
                        }
                        return null;
                    }),
                Tables\Columns\TextColumn::make('assignedTo.name')
                    ->label('Người xử Lý'),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Ngày tạo')

                    // ->sortable() 

                    ->dateTime('H:i d/m/Y'), // Định dạng theo giờ:phút, ngày/tháng/năm
            ])
            ->defaultSort('created_at', 'desc')


            ->filters([
            ])
            ->actions([




                Tables\Actions\Action::make('view')
                    ->label('Xử Lý')
                    ->form(function ($record) {
                        return [
                            Forms\Components\Group::make([
                                // Fieldset phân công người xử lý
                                Fieldset::make('Phân công')
                                    ->schema([
                                        Forms\Components\Placeholder::make('department_name')
                                            ->label('Phòng ban:')
                                            ->content(fn($record) => $record->department?->name ?? 'Không xác định'),

                                        Forms\Components\Select::make('assigned_to')
                                            ->label('Người xử lý')
                                            ->options(function ($record) {
                                                return User::where('department_id', $record->department_id)
                                                    ->where('is_leader', 0)
                                                    ->pluck('name', 'id');
                                            })
                                            ->default(fn($record) => $record->assigned_to),
                                    ])
                                    ->columns(1),
                                // Fieldset hiện chi tiết các phiếu con (các phiếu trả lời)
                                Fieldset::make('Phiếu trả lời')
                                    ->schema(function ($record) {
                                        // Lấy các phiếu con (replies) từ phiếu hiện tại
                                        $replies = $record->replies;

                                        if ($replies->isEmpty()) {
                                            return [
                                                Forms\Components\Placeholder::make('no_replies')
                                                    ->label('Chưa có câu trả lời nào.')
                                            ];
                                        }

                                        return $replies->map(function ($reply) {
                                            return Forms\Components\Fieldset::make()
                                                ->schema([
                                                    Forms\Components\Placeholder::make('reply_title')
                                                        ->label('Tiêu đề:')
                                                        ->columnSpan('full')
                                                        ->content($reply->title),

                                                    Forms\Components\Placeholder::make('reply_content')
                                                        ->label('Nội dung:')
                                                        ->columnSpan('full')
                                                        ->content(new HtmlString($reply->content)),

                                                    Forms\Components\Placeholder::make('reply_created_at')
                                                        ->label('Ngày tạo:')
                                                        ->columnSpan('full')
                                                        ->content($reply->created_at->format('H:i d/m/Y')),

                                                    Forms\Components\Placeholder::make('reply_assigned_to')
                                                        ->label('Người xử lý:')
                                                        ->columnSpan('full')
                                                        ->content(optional($reply->assignedTo)->name ?? 'Chưa được phân công'),

                                                    Forms\Components\Placeholder::make('reply_department')
                                                        ->label('Phòng ban:')
                                                        ->columnSpan('full')
                                                        ->content(optional($reply->department)->name ?? 'Không xác định'),

                                                    // Forms\Components\Placeholder::make('reply_status')
                                                    //     ->label('Trạng thái:')
                                                    //     ->content($reply->status ?? 'Không xác định'),
                                                ])
                                                ->columns(2); // Hiển thị thông tin với 2 cột
                                        })->toArray();
                                    })
                                    ->columns(1),  // Đặt Fieldset này thành 1 cột
            
                                // Fieldset thông tin Phiếu Hỏi
                                Fieldset::make('Thông tin Phiếu Hỏi')
                                    ->schema([
                                        Forms\Components\Placeholder::make('title')
                                            ->label('Tiêu đề Phiếu hỏi:')
                                            ->content(fn($record) => new HtmlString($record?->title ?? ''))
                                            ->columnSpan('full'),

                                        Forms\Components\Placeholder::make('content')
                                            ->label('Nội dung Phiếu hỏi:')
                                            ->content(fn($record) => new HtmlString($record?->content ?? ''))
                                            ->columnSpan('full'),

                                        Forms\Components\Placeholder::make('file_path')
                                            ->label('Tệp đính kèm:')
                                            ->content(function ($record) {
                                                if ($record->file_path) {
                                                    $extension = strtolower(pathinfo($record->file_path, PATHINFO_EXTENSION));
                                                    $isImage = in_array($extension, ['jpg', 'jpeg', 'png', 'gif']);
                                                    $content = $isImage
                                                        ? "<img src='" . asset('storage/' . $record->file_path) . "' alt='Tệp đính kèm' style='max-width: 100px; max-height: 100px; display: block; margin-bottom: 5px;' />"
                                                        : "<p>" . substr(pathinfo($record->file_path, PATHINFO_FILENAME), 0, 5) . ".$extension</p>";
                                                    $content .= "<a href='" . asset('storage/' . $record->file_path) . "' target='_blank'>" .
                                                        ($isImage ? 'Xem hình ảnh lớn hơn' : 'Tải tệp đính kèm') .
                                                        "</a>";
                                                    return new HtmlString($content);
                                                }
                                                return 'Không có tệp đính kèm';
                                            })
                                            ->columnSpan('full'),

                                        Forms\Components\Placeholder::make('created_at')
                                            ->label('Ngày Tạo:')
                                            ->content(fn($record) => $record?->created_at?->format('H:i d/m/Y') ?? '')
                                            ->columnSpan('full'),
                                    ])
                                    ->columns(2),

                                // Form trả lời
                                Fieldset::make('Trả lời Phiếu Hỏi')
                                    ->schema([
                                        Forms\Components\TextInput::make('response_title')
                                            ->label('Tiêu đề trả lời')
                                            ->placeholder('Nhập tiêu đề cho câu trả lời...')
                                            ->columnSpan('full'),

                                        Forms\Components\RichEditor::make('response_content')
                                            ->label('Nội dung trả lời')
                                            ->placeholder('Nhập nội dung trả lời...')
                                            ->columnSpan('full'),
                                        Forms\Components\FileUpload::make('files')  // Thêm trường tải lên file
                                            ->label('Tệp đính kèm')
                                            ->multiple()  // Cho phép tải lên nhiều file
                                            ->directory('support_ticket_files')  // Thư mục lưu trữ file
                                            ->columnSpan('full')
                                            ->columns(1),

                                    ])

                            ])->columnSpan('full'),
                        ];
                    })
                    ->action(function ($record, array $data) {
                        // Kiểm tra xem có phân công không
                        if (isset($data['assigned_to'])) {
                            // Phân công người xử lý
                            $record->update([
                                'assigned_to' => $data['assigned_to'],
                            ]);

                            $assignedUser = User::find($data['assigned_to']);

                            Notification::make()
                                ->iconColor('success')
                                ->title('Phân công thành công cho: ' . $assignedUser->name)
                                ->success()
                                ->body('Trưởng phòng đã phân công xử lý')
                                ->send();
                        }

                        // Chỉ tạo phiếu trả lời nếu tiêu đề và nội dung được điền
                        if (!empty($data['response_title']) && !empty($data['response_content'])) {
                            // Lấy thông tin department_id và user_id từ phiếu cũ (phiếu cha)
                            $departmentId = $record->department_id; // Lấy department_id của phiếu cha
                            $userId = $record->user_id;  // Lấy user_id của phiếu cha (người tạo phiếu)
            
                            // Tạo một phiếu mới cho câu trả lời với support_ticket_id là ID của phiếu cha
                            $newTicket = SupportTicket::create([
                                'support_ticket_id' => $record->id,  // Lưu ID của phiếu đang trả lời
                                'department_id' => $departmentId,  // ID của phòng ban lấy từ phiếu cha
                                'user_id' => $userId,  // ID của người tạo phiếu lấy từ phiếu cha
                                'title' => $data['response_title'],  // Tiêu đề mới
                                'content' => $data['response_content'],  // Nội dung mới
                                'created_by' => auth()->id(),  // Người tạo (người trả lời)
                                'status' => 'in_progress',  // Trạng thái ban đầu của phiếu trả lời
                            ]);
                            if (isset($data['files']) && is_array($data['files'])) {
                                foreach ($data['files'] as $file) {
                                    // Kiểm tra xem $file có phải là một instance của UploadedFile không
                                    if ($file instanceof \Illuminate\Http\UploadedFile) {
                                        // Lưu file vào bảng support_ticket_files
                                        SupportTicketFile::create([
                                            'support_ticket_id' => $newTicket->id,
                                            'file_name' => $file->getClientOriginalName(), // Lấy tên gốc của file
                                            'file_path' => $file->store('support_ticket_files'), // Lưu file và lấy đường dẫn
                                            'file_size' => $file->getSize(), // Kích thước file
                                            'file_type' => $file->getClientMimeType(), // Loại file
                                        ]);
                                    }
                                }
                            }

                            Notification::make()
                                ->title('Trả lời thành công!')
                                ->body('Câu trả lời đã tạo với tiêu đề  : ' . $newTicket->title)
                                ->success()
                                ->send();
                        } else {
                            // Notification::make()
                            //     ->title('Không có câu trả lời mới')
                            //     ->body('Phiếu không được tạo vì không có tiêu đề và nội dung câu trả lời')
                            //     ->warning()
                            //     ->send();
                        }
                    }),






                Tables\Actions\Action::make('assign')
                    ->label('Phân công')
                    ->action(function ($record, array $data) {
                        // Cập nhật người được phân công
                        $record->update([
                            'assigned_to' => $data['assigned_to'],
                        ]);

                        // Lấy thông tin người được phân công
                        $assignedUser = User::find($data['assigned_to']);

                        // // Gửi thông báo đến người thực hiện phân công và lưu vào cơ sở dữ liệu
                        // auth()->user()->notify(new AssignmentNotification($record, $assignedUser));
            

                        // Hiển thị thông báo thành công cho người thực hiện phân công
                        Notification::make()
                            ->icon('heroicon-o-document-text')
                            ->iconColor('success')
                            ->title('Phân công thành công cho: ' . $assignedUser->name)
                            ->success()
                            ->body('Trưởng phòng đã phân công xử lý')
                            ->send();
                    })
                    ->form(function ($record) {
                        return [
                            Forms\Components\Select::make('assigned_to')
                                ->label('Người xử lý')
                                ->options(
                                    User::where('department_id', $record->department_id)
                                        ->where('is_leader', 0)
                                        ->pluck('name', 'id')
                                )
                                ->default($record->assigned_to)
                                ->required(),
                        ];
                    })
                    ->modalHeading('Phân công Xử Lý')
                    ->modalButton('Phân công'),


            ]);

    }



    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSupportTickets::route('/'),
            'create' => Pages\CreateSupportTicket::route('/create'),
            'edit' => Pages\EditSupportTicket::route('/{record}/edit'),
            'view' => Pages\ViewSupportTicket::route('/{record}'),
        ];
    }
}
