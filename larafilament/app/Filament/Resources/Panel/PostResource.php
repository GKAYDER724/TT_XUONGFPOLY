<?php

namespace App\Filament\Resources\Panel;

use Filament\Forms;
use Filament\Tables;
use App\Models\Post;
use Livewire\Component;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Section;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Illuminate\Database\Eloquent\Builder;
use Filament\Forms\Components\RichEditor;
use App\Filament\Resources\Panel\PostResource\Pages;
use App\Filament\Resources\Panel\PostResource\RelationManagers;
use App\Models\Category;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\FileUpload;
use Illuminate\Support\Facades\Storage;
use Filament\Tables\Columns\ImageColumn;

class PostResource extends Resource
{
    protected static ?string $model = Post::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?int $navigationSort = 1;

    protected static ?string $navigationGroup = 'Chức năng';

    public static function getModelLabel(): string
    {
        return __('Hiếu ');
    }

    // public static function getPluralModelLabel(): string
    // {
    //     return __('crud.posts.collectionTitle');
    // }

    // public static function getNavigationLabel(): string
    // {
    //     return __('crud.posts.collectionTitle');
    // }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Section::make()->schema([
                Grid::make(['default' => 1])->schema([
                    TextInput::make('title')
                    ->label('Tiêu đề')
                        ->required()
                        ->string()
                        ->autofocus(),

                    RichEditor::make('content')
                    ->label('Nội dung')
                        ->required()
                        ->string()
                        ->fileAttachmentsVisibility('public')
                        // Loại bỏ thẻ <p> khỏi nội dung
                        ->afterStateUpdated(function (callable $set, $state) {
                            $set('content', preg_replace('/<p>(.*?)<\/p>/', '$1', $state));
                        }),
                    // Loại bỏ thẻ <p> khỏi nội dung

                    Select::make('category_id') 
                    ->label('Danh mục')// Change here
                        ->required()
                        ->relationship('category', 'name') 
                        ->preload() 
                        ->options(function () {
                            return Category::getCategoriesWithIndentation();  // Gọi hàm đệ quy để lấy danh mục
                        })
                        ->searchable(), 

                        FileUpload::make('file_path')
                        ->label('Tải lên tệp')
                        ->columns(1)
                        ->multiple()
                        // ->directory('storage')
                        ->enableReordering()
                        ->enableDownload()
                        ->enableOpen()
                        ->storeFileNamesIn ('file_name')
                        
                              
                    
                ]),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->poll('60s')
            ->columns([
                TextColumn::make('title')
                ->label('Tiêu đề'),
                

                TextColumn::make('content')
                ->label('Nội dung')->limit(25),

                TextColumn::make('category.name')
                ->label('Danh mục '), 
                
                    TextColumn::make('file_path')
                    
                    ->label('Tệp')->limit(10),

                    // ImageColumn::make('file_path')
                    // ->label('Tệp')
            ])
            ->filters([])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\ViewAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('id', 'desc');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPosts::route('/'),
            'create' => Pages\CreatePost::route('/create'),
            'view' => Pages\ViewPost::route('/{record}'),
            'edit' => Pages\EditPost::route('/{record}/edit'),
        ];
    }
}
