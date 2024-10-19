<?php

// namespace App\Filament\Resources\Panel;

// use Filament\Forms;
// use Filament\Tables;
// use Livewire\Component;
// use App\Models\Comment;
// use Filament\Forms\Form;
// use Filament\Tables\Table;
// use Filament\Resources\Resource;
// use Filament\Forms\Components\Grid;
// use Filament\Forms\Components\Section;
// use Filament\Tables\Columns\TextColumn;
// use Filament\Forms\Components\TextInput;
// use Illuminate\Database\Eloquent\Builder;
// use Filament\Forms\Components\RichEditor;
// use App\Filament\Resources\Panel\CommentResource\Pages;
// use App\Filament\Resources\Panel\CommentResource\RelationManagers;

// class CommentResource extends Resource
// {
//     protected static ?string $model = Comment::class;

//     protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

//     protected static ?int $navigationSort = 1;

//     protected static ?string $navigationGroup = 'Admin';

//     // public static function getModelLabel(): string
//     // {
//     //     return __('crud.comments.itemTitle');
//     // }

//     // public static function getPluralModelLabel(): string
//     // {
//     //     return __('crud.comments.collectionTitle');
//     // }

//     // public static function getNavigationLabel(): string
//     // {
//     //     return __('crud.comments.collectionTitle');
//     // }

//     public static function form(Form $form): Form
//     {
//         return $form->schema([
//             Section::make()->schema([
//                 Grid::make(['default' => 1])->schema([
//                     RichEditor::make('content')
//                         ->required()
//                         ->string()
//                         ->fileAttachmentsVisibility('public'),

//                     TextInput::make('user_id')
//                         ->required()
//                         ->numeric()
//                         ->step(1),

//                     TextInput::make('support_ticket_id')
//                         ->required()
//                         ->numeric()
//                         ->step(1),
//                 ]),
//             ]),
//         ]);
//     }

//     public static function table(Table $table): Table
//     {
//         return $table
//             ->poll('60s')
//             ->columns([
//                 TextColumn::make('content')->limit(255),

//                 TextColumn::make('user_id'),

//                 TextColumn::make('support_ticket_id'),
//             ])
//             ->filters([])
//             ->actions([
//                 Tables\Actions\EditAction::make(),
//                 Tables\Actions\ViewAction::make(),
//             ])
//             ->bulkActions([
//                 Tables\Actions\BulkActionGroup::make([
//                     Tables\Actions\DeleteBulkAction::make(),
//                 ]),
//             ])
//             ->defaultSort('id', 'desc');
//     }

//     public static function getRelations(): array
//     {
//         return [];
//     }

//     public static function getPages(): array
//     {
//         return [
//             'index' => Pages\ListComments::route('/'),
//             'create' => Pages\CreateComment::route('/create'),
//             'view' => Pages\ViewComment::route('/{record}'),
//             'edit' => Pages\EditComment::route('/{record}/edit'),
//         ];
//     }
// }
