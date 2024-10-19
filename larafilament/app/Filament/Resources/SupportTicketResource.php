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
                    ->schema([

                        Forms\Components\Card::make()
                            ->label('Phiếu Hỏi')
                            ->schema([
                                Forms\Components\Grid::make(1)
                                    ->schema([
                                        Forms\Components\Placeholder::make('title')
                                            ->label('Tiêu đề Phiếu hỏi:')
                                            ->content(fn($record) => new HtmlString($record?->title ?? ''))
                                            ->columnSpan(1),
                                        Forms\Components\Placeholder::make('content')
                                            ->label('Nội dung Phiếu hỏi:')
                                            ->content(fn($record) => new HtmlString($record?->content ?? ''))
                                            ->columnSpan(1),
                                        Forms\Components\Placeholder::make('file_path')
                                            ->label('Tệp đính kèm:')
                                            ->content(
                                                fn($record) => $record?->file_path
                                                ? new HtmlString(
                                                    (in_array(strtolower(pathinfo($record->file_path, PATHINFO_EXTENSION)), ['jpg', 'jpeg', 'png', 'gif'])
                                                        ? '<img src="' . asset('storage/' . $record->file_path) . '" alt="Tệp đính kèm" style="max-width: 100px; max-height: 100px; display: block; margin-bottom: 5px;" />'
                                                        : '<p>' . substr(pathinfo($record->file_path, PATHINFO_FILENAME), 0, 5) . '.' . pathinfo($record->file_path, PATHINFO_EXTENSION) . '</p>'
                                                    ) .
                                                    '<a href="' . asset('storage/' . $record->file_path) . '" target="_blank">' .
                                                    (in_array(strtolower(pathinfo($record->file_path, PATHINFO_EXTENSION)), ['jpg', 'jpeg', 'png', 'gif'])
                                                        ? 'Xem hình ảnh lớn hơn'
                                                        : 'Tải tệp đính kèm') .
                                                    '</a>'
                                                )
                                                : 'Không có tệp đính kèm'
                                            )
                                            ->columnSpan(1),

                                        Forms\Components\Placeholder::make('created_at')
                                            ->label('Ngày Tạo:')
                                            ->content(fn($record) => new HtmlString($record?->created_at ?? ''))
                                            ->columnSpan(1)
                                    ]),
                            ])
                            ->columnSpan(1),
                        // Forms\Components\Card::make()
                        //     ->label('Phiếu trả lời')
                        //     ->schema([
                        //         Forms\Components\Repeater::make('replies')
                        //             ->relationship('replies', fn($query) => $query->orderBy('created_at', 'desc')) // Sắp xếp từ mới nhất đến cũ nhất
                        //             ->label('Phiếu trả lời:')
                        //             ->schema([
                        //                 Forms\Components\Grid::make(1)
                        //                     ->schema([
                        //                         Forms\Components\Placeholder::make('title')
                        //                             ->label('Tiêu đề:')
                        //                             ->content(fn($record) => new HtmlString($record?->title ?? ''))
                        //                             ->columnSpan(1),

                        //                         // Thêm TextInput cho tiêu đề trả lời mới
                        //                         Forms\Components\TextInput::make('title')
                        //                             ->label('Tiêu đề trả lời mới')
                        //                             ->placeholder('Nhập tiêu đề trả lời')
                        //                             ->columnSpan(1),

                        //                         Forms\Components\Placeholder::make('content')
                        //                             ->label('Nội dung:')
                        //                             ->content(fn($record) => new HtmlString($record?->content ?? ''))
                        //                             ->columnSpan(1),

                        //                         // Thêm TextInput cho nội dung trả lời mới
                        //                         Forms\Components\TextInput::make('content')
                        //                             ->label('Nội dung trả lời mới')
                        //                             ->placeholder('Nhập nội dung trả lời')
                        //                             ->columnSpan(1),

                        //                         Forms\Components\Placeholder::make('file_path')
                        //                             ->label('Tệp đính kèm:')
                        //                             ->content(
                        //                                 fn($record) => $record?->file_path
                        //                                 ? new HtmlString(
                        //                                     (in_array(strtolower(pathinfo($record->file_path, PATHINFO_EXTENSION)), ['jpg', 'jpeg', 'png', 'gif'])
                        //                                         ? '<img src="' . asset('storage/' . $record->file_path) . '" alt="Tệp đính kèm" style="max-width: 100px; max-height: 100px; display: block; margin-bottom: 5px;" />'
                        //                                         : '<p>' . substr(pathinfo($record->file_path, PATHINFO_FILENAME), 0, 5) . '.' . pathinfo($record->file_path, PATHINFO_EXTENSION) . '</p>'
                        //                                     ) .
                        //                                     '<a href="' . asset('storage/' . $record->file_path) . '" target="_blank">' .
                        //                                     (in_array(strtolower(pathinfo($record->file_path, PATHINFO_EXTENSION)), ['jpg', 'jpeg', 'png', 'gif'])
                        //                                         ? 'Xem hình ảnh lớn hơn'
                        //                                         : 'Tải tệp đính kèm') .
                        //                                     '</a>'
                        //                                 )
                        //                                 : 'Không có tệp đính kèm'
                        //                             )
                        //                             ->columnSpan(1),

                        //                         Forms\Components\Placeholder::make('created_at')
                        //                             ->label('Ngày Tạo:')
                        //                             ->content(fn($record) => new HtmlString($record?->created_at ?? ''))
                        //                             ->columnSpan(1),
                        //                     ]),
                        //             ]),
                        //     ])
                        //     ->columnSpan(1),

                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
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
                Tables\Columns\TextColumn::make('parent.title')
                    ->label('Phiếu hỏi ')
                    ->toggleable(),
            ])
            ->filters([
                Tables\Filters\Filter::make('support_ticket_id')
                    ->label('Phiếu trả lời')
                    ->query(fn(Builder $query) => $query->whereNull('support_ticket_id')),
            ])
            ->actions([
                Tables\Actions\Action::make('rep')
                    ->label("Trả lời")
                    ->form(function ($record) {
                        $listChildTicketsByID = SupportTicket::where('support_ticket_id', $record->id)->get();

                        // Hiển thị thông tin phiếu hỏi
                        $listChildTickets = [];
                        foreach ($listChildTicketsByID as $key => $ticket) {
                            $listChildTickets[$key] = Forms\Components\Placeholder::make('department_id')
                                ->label('Phòng ban')
                                ->content(function () {
                                    return '';
                                });
                        }
                        return [
                            // Form nhập câu trả lời

                            Fieldset::make('Trả Lời')
                                ->schema([
                                    Grid::make(['default' => 1])->schema([
                                        TextInput::make('title')
                                            ->label('Tiêu đề')
                                            ->required()
                                            ->string()
                                            ->autofocus(),
                                        RichEditor::make('content')
                                            ->label('Nội dung')
                                            ->required()
                                            ->string(),
                                        FileUpload::make('file_path')
                                            ->label('Tải lên tệp')
                                            ->columns(1)
                                            ->multiple()
                                            ->directory('storage')
                                            ->enableReordering()
                                            ->enableDownload()
                                            ->enableOpen()
                                            ->storeFileNamesIn('file_name'),
                                    ]),
                                ]),
                            // Hiển thị danh sách phiếu trả lời
                            Fieldset::make('Phiếu Trả Lời')
                         
                                ->schema([
                                    Forms\Components\Grid::make(1)
                                    ->schema([
                                    Forms\Components\Repeater::make('replies')
                                        ->relationship('replies', fn($query) => $query->orderBy('created_at', 'desc')) // Sắp xếp từ mới nhất đến cũ nhất
                                        ->label('')
                                        ->schema([
                                            Forms\Components\Grid::make(1)
                                                ->schema([
                                                    Forms\Components\Placeholder::make('title')
                                                        ->label('Tiêu đề:')
                                                        ->content(fn($record) => new HtmlString($record?->title ?? ''))
                                                        ->columnSpan(1),
                                                    Forms\Components\Placeholder::make('content')
                                                        ->label('Nội dung:')
                                                        ->content(fn($record) => new HtmlString($record?->content ?? ''))
                                                        ->columnSpan(1),
                                                    Forms\Components\Placeholder::make('file_path')
                                                        ->label('Tệp đính kèm:')
                                                        ->content(
                                                            fn($record) => $record?->file_path
                                                            ? new HtmlString(
                                                                (in_array(strtolower(pathinfo($record->file_path, PATHINFO_EXTENSION)), ['jpg', 'jpeg', 'png', 'gif'])
                                                                    ? '<img src="' . asset('storage/' . $record->file_path) . '" alt="Tệp đính kèm" style="max-width: 100px; max-height: 100px; display: block; margin-bottom: 5px;" />'
                                                                    : '<p>' . substr(pathinfo($record->file_path, PATHINFO_FILENAME), 0, 5) . '.' . pathinfo($record->file_path, PATHINFO_EXTENSION) . '</p>'
                                                                ) .
                                                                '<a href="' . asset('storage/' . $record->file_path) . '" target="_blank">' .
                                                                (in_array(strtolower(pathinfo($record->file_path, PATHINFO_EXTENSION)), ['jpg', 'jpeg', 'png', 'gif'])
                                                                    ? 'Xem hình ảnh lớn hơn'
                                                                    : 'Tải tệp đính kèm') .
                                                                '</a>'
                                                            )
                                                            : 'Không có tệp đính kèm'
                                                        )
                                                        ->columnSpan(1),
    
                                                    Forms\Components\Placeholder::make('created_at')
                                                        ->label('Ngày Tạo:')
                                                        ->content(fn($record) => new HtmlString($record?->created_at ?? ''))
                                                        ->columnSpan(1),
                                                ]),
                                        ]),
                                    ])
                                ]),

                            // Hiển thị thông tin phiếu hỏi
                            Fieldset::make('Câu Hỏi')
                                ->schema([
                                    Forms\Components\Placeholder::make('title')
                                        ->label('Tiêu đề Phiếu hỏi:')
                                        ->content(fn($record) => new HtmlString($record?->title ?? ''))
                                        ->columnSpan(1),
                                    Forms\Components\Placeholder::make('content')
                                        ->label('Nội dung Phiếu hỏi:')
                                        ->content(fn($record) => new HtmlString($record?->content ?? ''))
                                        ->columnSpan(1),
                                    Forms\Components\Placeholder::make('file_path')
                                        ->label('Tệp đính kèm:')
                                        ->content(fn($record) => $record?->file_path
                                            ? new HtmlString('<a href="' . asset('storage/' . $record->file_path) . '" target="_blank">Tải tệp đính kèm</a>')
                                            : 'Không có tệp đính kèm')
                                        ->columnSpan(1),
                                    Forms\Components\Placeholder::make('created_at')
                                        ->label('Ngày Tạo:')
                                        ->content(fn($record) => new HtmlString($record?->created_at ?? ''))
                                        ->columnSpan(1),
                                ]),
                        ];
                    })
                    ->action(function ($record, array $data): void {
                     
                        // Xử lý lưu dữ liệu từ form
                        // $reply = new SupportTicket([
                        //     'support_ticket_id' => $record->id,
                        //     'title' => $data['title'] ?? null, // Kiểm tra giá trị title
                        //     'content' => $data['content'] ?? null,
                        //     'file_path' => $data['file_path'] ?? null, // Kiểm tra giá trị file_path
                        // ]);

                        // // Kiểm tra nếu tiêu đề vẫn còn trống sau khi kiểm tra mặc định
                        // if (empty($reply->title)) {
                        //     throw new \Exception('Trường tiêu đề là bắt buộc.');
                        // }

                        $record->save([
                            'support_ticket_id' => $record->id,
                            'title' => $data['title'] , // Kiểm tra giá trị title
                            'content' => $data['content'] ,
                            'file_path' => $data['file_path'] , // Kiểm tra giá trị file_path

                        ]);

                        // Thông báo thành công hoặc thất bại
                    }),


                // Tables\Actions\ViewAction::make()->label('Xem'),
                // Tables\Actions\EditAction::make()->label('Trả lời'),
              

                Tables\Actions\Action::make('assign')
                    ->label('Phân công')
                    ->action(function ($record, array $data) {
                        $record->update([
                            'department_id' => $data['department_id'],
                            'assigned_to' => $data['assigned_to'],
                        ]);
                    })
                    ->form([
                        Forms\Components\Select::make('department_id')
                            ->label('Phòng ban')
                            ->options(Department::all()->pluck('name', 'id'))
                            ->required(),
                        Forms\Components\Select::make('assigned_to')
                            ->label('Người xử lý')
                            ->options(User::all()->pluck('name', 'id'))
                            ->required(),

                       
                    ])
                    ->modalHeading('Phân công công việc')
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
