<?php

namespace App\Filament\Resources\Panel;

use Filament\Forms;
use Filament\Tables;
use App\Models\User;
use Livewire\Component;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

use Filament\Notifications\Notification;

use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Section;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Illuminate\Database\Eloquent\Builder;
use Filament\Forms\Components\Select;
use App\Filament\Resources\Panel\UserResource\Pages;
use App\Filament\Resources\Panel\UserResource\RelationManagers;
use Filament\Forms\Components\FileUpload;
use Filament\Tables\Columns\ImageColumn;



class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?int $navigationSort = 1;

    protected static ?string $navigationGroup = 'Chức năng';

    public static function getModelLabel(): string
    {
        return __('Người Dùng ');
    }

    // public static function getPluralModelLabel(): string
    // {
    //     return __('crud.users.collectionTitle');
    // }

    // public static function getNavigationLabel(): string
    // {
    //     return __('crud.users.collectionTitle');
    // }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Section::make()->schema([
                Grid::make(['default' => 1])->schema([
                    TextInput::make('name')
                        ->label('Tên')
                        ->required()
                        ->string()
                        ->autofocus(),

                    TextInput::make('number')->label('Số điện thoại')
                        ->required(),


                    TextInput::make('email')
                        ->required(),
                    // ->label('Email')
                    // ->string()
                    // ->unique('users', 'email', ignoreRecord: true)
                    // ->email(),

                    TextInput::make('password')
                        ->label('Mật Khẩu')
                        ->password() // Hiển thị dưới dạng mật khẩu (input type="password")
                        ->required() // Bắt buộc
                        ->maxLength(25) // Độ dài tối đa 255 ký tự
                        ->rules(['min:8']) // Độ dài tối thiểu 8 ký tự
                        ->dehydrateStateUsing(fn($state) => $state), // Đảm bảo state được giữ nguyên

                    // TextInput::make('number')->label('Số điện thoại')
                    //     ->required(),




                    // Forms\Components\Select::make('roles')
                    // ->relationship('roles', 'name')
                    // ->multiple()
                    // ->preload()
                    // ->searchable(),

                    Select::make('roles')
                    ->label('Vai trò')
                    ->relationship('roles', 'name')  // Sử dụng relationship với roles
                    // ->multiple()  // Cho phép chọn nhiều vai trò nếu cần
                    ->preload()  // Load sẵn các lựa chọn
                    ->searchable(),  // Cho phép tìm kiếm vai trò

                    Select::make('department_id')
                        ->label('Phòng Ban')
                        ->required()
                        ->relationship('department', 'name')
                        ->searchable()
                        ->preload()
                        ->native(false),

                    FileUpload::make('file_path')
                        ->label('Tải Ảnh lên')
                        ->columns(1)
                        ,
                 
                    ]),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->poll('60s')
            ->columns([
                TextColumn::make('roles.name')
                ->label('Vai trò'),
                TextColumn::make('name')->label('Tên'),
                TextColumn::make('number')->label('Số điện thoại'),
                TextColumn::make('email')->label('Email'),
                TextColumn::make('department.name')->label('Phòng Ban'),
                ImageColumn::make('file_path')->label('Ảnh'),
            ])
            ->filters([])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\ViewAction::make(),
                Tables\Actions\Action::make('setPassword')
                    ->label('Cấp mật khẩu')
                    ->icon('heroicon-o-key') // Thêm icon hình chìa khóa
                    ->form([ // Form trong modal để hiển thị mật khẩu và cho phép chỉnh sửa
                        Forms\Components\TextInput::make('password')
                            ->label('Mật khẩu mới')
                            ->default(Str::random(12)) // Tạo mật khẩu ngẫu nhiên mặc định
                            ->required(),
                    ])
                    ->action(function ($record, $data) {
                        // Lưu mật khẩu mới vào cơ sở dữ liệu sau khi xác nhận
                        $record->update(['password' => Hash::make($data['password'])]);

                        // Hiển thị thông báo thành công
                        Notification::make()
                            ->title('Mật khẩu mới đã được cấp!')
                            ->body("Mật khẩu mới là: {$data['password']}")
                            ->success()
                            ->send();
                    })
                    ->requiresConfirmation() // Hiển thị modal yêu cầu xác nhận
                    ->modalHeading('Cấp mật khẩu mới')
                    ->modalSubheading('Xem và tùy chỉnh mật khẩu mới trước khi xác nhận.')
                    ->modalButton('Xác nhận cấp mật khẩu'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()->label('Xóa'),
                    Tables\Actions\BulkAction::make('bulkSetPassword')
                        ->label('Cấp mật khẩu')
                        ->icon('heroicon-o-key') // Thêm icon cho bulk action
                        ->form([ // Chỉ tạo một trường nhập mật khẩu chung cho tất cả các tài khoản
                            Forms\Components\TextInput::make('password')
                                ->label('Mật khẩu mới')
                                ->default(Str::random(12)) // Tạo mật khẩu ngẫu nhiên mặc định
                                ->required(), // Người dùng có thể thay đổi mật khẩu trước khi áp dụng
                        ])
                        ->action(function ($records, $data) {
                            $newPassword = $data['password']; // Lấy mật khẩu từ form
                            $passwordList = [];

                            foreach ($records as $record) {
                                // Cập nhật mật khẩu cho tất cả các tài khoản đã chọn
                                $record->update(['password' => Hash::make($newPassword)]);
                                $passwordList[] = "{$record->name}: {$newPassword}";
                            }

                            // Hiển thị thông báo thành công với danh sách mật khẩu
                            Notification::make()
                                ->title('Mật khẩu mới đã được cấp!')
                                ->body("Mật khẩu đã được áp dụng cho các tài khoản:\n" . implode("\n", $passwordList))
                                ->success()
                                ->send();
                        })
                        ->requiresConfirmation() // Yêu cầu xác nhận trước khi thực hiện
                        ->modalHeading('Cấp mật khẩu mới cho các tài khoản đã chọn')
                        ->modalSubheading('Mật khẩu mới sẽ được áp dụng cho tất cả tài khoản được chọn.')
                        ->modalButton('Xác nhận cấp mật khẩu')

                ])->label('Hành động '),
            ])
            ->defaultSort('id', 'desc');
    }


   // Tạo mới user
public static function beforeCreate($data)
{
    $user = User::create($data);
    
    // Gán vai trò nếu có trong dữ liệu
    if (isset($data['roles'])) {
        $user->syncRoles($data['roles']); // Đồng bộ vai trò
    }
    
    return $user;
}

// Cập nhật user
public static function beforeSave($data, $record)
{
    // Cập nhật thông tin người dùng
    $record->update($data);

    // Đồng bộ vai trò nếu có trong dữ liệu
    if (isset($data['roles'])) {
        $record->syncRoles($data['roles']);
    }

    return $record;
}

    
    

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'view' => Pages\ViewUser::route('/{record}'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
