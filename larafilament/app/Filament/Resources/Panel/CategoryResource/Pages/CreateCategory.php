<?php

namespace App\Filament\Resources\Panel\CategoryResource\Pages;


use Filament\Notifications\Actions;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;
use App\Filament\Resources\Panel\CategoryResource;

class CreateCategory extends CreateRecord
{
    protected static string $resource = CategoryResource::class;

}
