<?php

namespace App\Filament\Resources\Panel;

use Filament\Forms;
use Filament\Tables;
use Livewire\Component;
use Filament\Forms\Form;
use App\Models\Category;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Section;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use App\Filament\Resources\Panel\CategoryResource\Pages;
use Filament\Forms\Components\Select;
use Filament\Tables\Columns\IconColumn;
use Illuminate\Database\Eloquent\Builder;
class CategoryResource extends Resource
{
    protected static ?string $model = Category::class;

    protected static ?string $navigationIcon = 'heroicon-o-archive-box';

    protected static ?int $navigationSort = 1;

    protected static ?string $navigationGroup = 'Chức năng';

    // public static function getModelLabel(): string
    // {
    //     return __('crud.categories.itemTitle');
    // }

    // public static function getPluralModelLabel(): string
    // {
    //     return __('crud.categories.collectionTitle');
    // }

    // public static function getNavigationLabel(): string
    // {
    //     return __('crud.categories.collectionTitle');
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

                        Select::make('parent_id')
                        ->label('Danh mục Cha')
                        ->preload()
                        ->searchable()
                        ->options(function () {
                            return Category::getCategoriesWithIndentation();  // Gọi hàm đệ quy để lấy danh mục
                        })
                        ->nullable()  // Cho phép không chọn danh mục cha
                    
                ]),
            ]),
        ]);
    }

    public static function table(Table $table): Table 
    {
        return $table
            ->query(Category::with('parent')
                ->orderByRaw('COALESCE(parent_id, id), id ASC')) // Sắp xếp theo parent_id và id
            ->columns([
                TextColumn::make('name')
                    ->label('Tên danh mục')
                    ->getStateUsing(function ($record) {
                        $level = 0;
                        $parent = $record->parent;
                        while ($parent) {
                            $level++;
                            $parent = $parent->parent;
                        }
                        return str_repeat('-', $level) . ' ' . $record->name;
                    }),
                TextColumn::make('parent.name')
                    ->label('Danh mục Cha'),
                TextColumn::make('type')
                    ->label('Loại danh mục')
                    ->getStateUsing(function ($record) {
                        return $record->parent_id ? 'Danh mục con' : 'Danh mục cha';
                    })
            ])
            ->filters([])
            ->actions([
                Tables\Actions\EditAction::make(),
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
    public static function getNotifications(): array
    {
        return [
            'databaseNotifications' => true,
            'databaseNotificationsPolling' => '1s',
        ];
    }
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCategories::route('/'),
            'view' => Pages\ViewCategory::route('/{record}'),
            
        ];
    }
    
}
